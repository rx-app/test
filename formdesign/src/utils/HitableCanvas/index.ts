import {castArray, noop} from "lodash";

export type SingleOrArray<T> = T | T[];
export type DrawCallback = (ctx: CanvasRenderingContext2D, drawData: unknown) => void;


export interface CanvasNodeEvent {
    redraw: (cb: () => void) => void;
}
export interface CanvasNode {
    type?: string;
    id?: string;
    zOrder?: number;
    userData?: unknown;
    drawData?: unknown;
    draw: DrawCallback;
    drawHittest?: DrawCallback;
    registerEvent?: Partial<CanvasNodeEvent>;
}

const hookHittestCtx = function hookHittestCtx(ctx: CanvasRenderingContext2D): CanvasRenderingContext2D & {hitColor: string} {
    const proto = Reflect.getPrototypeOf(ctx);
    const setFillStyle = Reflect.getOwnPropertyDescriptor(proto, "fillStyle")!.set!.bind(ctx);
    const setStrokeStyle = Reflect.getOwnPropertyDescriptor(proto, "strokeStyle")!.set!.bind(ctx);
    const setShadowColor = Reflect.getOwnPropertyDescriptor(proto, "shadowColor")!.set!.bind(ctx);

    return Object.defineProperties(ctx, {
        fillStyle: {set: noop},
        strokeStyle: {set: noop},
        shadowColor: {set: noop},
        globalAlpha: {set: noop},
        hitColor: {
            set(val: string) {
                setShadowColor(val);
                setFillStyle(val);
                setStrokeStyle(val);
            }
        },
    });

    // 用Proxy会更直观，但是性能会稍差
    // return <CanvasRenderingContext2D & { hitColor: string }>new Proxy(ctx, {
    //     set(obj, prop, value) {
    //         switch (prop) {
    //             case "fillStyle":
    //             case "strokeStyle":
    //             case "shadowColor":
    //             case "globalAlpha":
    //                 return true;
    //             case "hitColor":
    //                 Reflect.set(obj, "fillStyle", value);
    //                 Reflect.set(obj, "shadowColor", value);
    //                 Reflect.set(obj, "strokeStyle", value);
    //                 return true;
    //             default:
    //                 return Reflect.set(obj, prop, value);
    //         }
    //     },
    //     get(obj, propName) {
    //         const prop = Reflect.get(obj, propName);
    //         if ((typeof prop === "function") && !obj.hasOwnProperty(propName) && Reflect.getPrototypeOf(obj).hasOwnProperty(propName)) {
    //             return prop.bind(obj);
    //         }
    //         return prop;
    //     }
    // });
};

const setEventCallback = function setEventCallback<
    T extends keyof CanvasNodeEvent,
    K extends Parameters<CanvasNodeEvent[T]>[0]
>(events: Partial<CanvasNodeEvent>, name: T, cb: K) {
    if (events[name] !== undefined) {
        events[name]!(cb);
    }
};

export const NOT_SUPPORT_CANVAS = "Can't get context of canvas. Change a browser may fix this problem";
export default class HitableCanvas {
    private width = 0;

    private height = 0;

    private ctx: CanvasRenderingContext2D | null = null;

    private hittestCtx: (CanvasRenderingContext2D & {hitColor: string}) | null = null;

    private mapHittest: Map<number, Readonly<CanvasNode>> = new Map();

    private mapNodeColor: WeakMap<Readonly<CanvasNode>, string> = new WeakMap();

    private renderOrder: Readonly<CanvasNode>[][] = [];


    public attach(canvas: HTMLCanvasElement | null, debugCanvas: HTMLCanvasElement | null = null) {
        if (canvas !== null) {
            const context = canvas.getContext("2d");
            if (context === null) {
                throw new Error(NOT_SUPPORT_CANVAS);
            }

            let hitCanvas;
            if (debugCanvas === null) {
                hitCanvas = document.createElement("canvas");
                hitCanvas.width = canvas.width;
                hitCanvas.height = canvas.height;
                hitCanvas.style.pointerEvents = "none";
            } else {
                hitCanvas = debugCanvas;
            }
            const hitContext = hitCanvas.getContext("2d", {alpha: false});
            if (hitContext === null) {
                throw new Error(NOT_SUPPORT_CANVAS);
            }
            this.ctx = context;
            this.hittestCtx = hookHittestCtx(hitContext);
        } else {
            this.ctx = null;
            this.hittestCtx = null;
        }
    }

    public resize(width: number, height: number) {
        if (!this.isValid()) {
            return;
        }
        this.width = width;
        this.height = height;
        this.hittestCtx!.canvas.width = width;
        this.hittestCtx!.canvas.height = height;
    }

    public getSize() {
        return {width: this.width, height: this.height};
    }

    public add(nodes: SingleOrArray<CanvasNode>) {
        castArray(nodes).forEach((node) => this.addOne(node));
    }

    public remove(nodes: SingleOrArray<CanvasNode>) {
        castArray(nodes).forEach((node) => this.removeOne(node));
    }

    public getCount() {
        return this.mapHittest.size;
    }

    public draw() {
        if (!this.isValid()) {
            return;
        }
        this.ctx!.clearRect(0, 0, this.width, this.height);
        this.hittestCtx!.clearRect(0, 0, this.width, this.height);
        this.renderOrder.forEach((group) => {
            group.forEach((node) => {
                node.draw(this.ctx!, node.drawData);
                this.drawHittest(this.mapNodeColor.get(node)!, node);
            });
        });
    }

    public hittest(x: number, y: number) {
        if (this.hittestCtx !== null) {
            const [r, g, b] = this.hittestCtx.getImageData(x, y, 1, 1).data;
            const color = (r << 16) + (g << 8) + b; // eslint-disable-line no-bitwise
            return this.mapHittest.get(color);
        }
        return undefined;
    }

    private hasNode(node: CanvasNode) {
        return this.mapNodeColor.has(node);
    }

    private getUniqColor() {
        let color;
        do {
            color = Math.floor(Math.random() * 256 * 256 * 256);
        } while ((color !== 0) && this.mapHittest.has(color)); // 0 is used to clear item
        return color;
    }

    private addOne(node: CanvasNode) {
        if (this.hasNode(node)) {
            throw new Error("Duplicate Node");
        }
        if (node.zOrder !== undefined && !Number.isInteger(node.zOrder)) {
            throw new Error("Invalid zOrder, should be undefined or Integer");
        }

        const color = this.getUniqColor();

        this.mapHittest.set(color, node);
        this.mapNodeColor.set(node, `#${color.toString(16).padStart(6, "0")}`);
        if (node.zOrder === undefined) {
            if ((this.renderOrder.length > 0) && (this.renderOrder[0][0].zOrder === undefined)) {
                this.renderOrder[0].push(node);
            } else {
                this.renderOrder.unshift([node]);
            }
        } else {
            const order = this.renderOrder.findIndex((v) => (v[0].zOrder === undefined ? false : v[0].zOrder >= node.zOrder!));
            if (order === -1) {
                this.renderOrder.push([node]);
            } else if (this.renderOrder[order][0].zOrder === node.zOrder) {
                this.renderOrder[order].push(node);
            } else {
                this.renderOrder.splice(order, 0, [node]);
            }
        }
        if (node.registerEvent !== undefined) {
            setEventCallback(node.registerEvent, "redraw", this.onRedraw.bind(this));
        }
    }

    private removeOne(node: CanvasNode) {
        if (!this.hasNode(node)) {
            throw new Error("Node doesn't exsit");
        }
        const colorIndex = parseInt(this.mapNodeColor.get(node)!.substring(1), 16);
        const order = this.renderOrder.findIndex((v) => v[0].zOrder === node.zOrder)!;
        const group = this.renderOrder[order];
        group.splice(group.indexOf(node), 1);
        if (group.length === 0) {
            this.renderOrder.splice(order, 1);
        }
        this.drawHittest("#000", node);

        this.mapHittest.delete(colorIndex);
        this.mapNodeColor.delete(node);
    }

    private onRedraw() {
        let once = false;
        if (!once) {
            once = true;
            requestAnimationFrame(() => {
                this.draw();
                once = false;
            });
        }
    }

    private drawHittest(color: string, node: CanvasNode) {
        if (this.hittestCtx !== null) {
            this.hittestCtx.hitColor = color;
            if (node.drawHittest !== undefined) {
                node.drawHittest(this.hittestCtx, node.drawData);
            } else {
                node.draw(this.hittestCtx, node.drawData);
            }
        }
    }

    private isValid() {
        return (this.ctx !== null) && (this.hittestCtx !== null);
    }
}
