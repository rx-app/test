import {mapValues} from "lodash";
import {CanvasNode, DrawCallback, CanvasNodeEvent} from ".";

const type = "group";

const callAll = function callAll<T extends(...args: any[]) => unknown>(funcs: T[]) {
    return (...args: Parameters<T>) => {
        funcs.forEach((func) => func(...args));
    };
};

const createGroupDraw = function createGroupDraw(nodes: CanvasNode[]): DrawCallback {
    return (ctx) => {
        nodes.forEach((node) => {
            node.draw(ctx, node.drawData);
        });
    };
};

const createGroupDrawHittest = function createGroupDrawHittest(nodes: CanvasNode[]): DrawCallback {
    return (ctx) => {
        nodes.forEach((node) => {
            if (node.drawHittest !== undefined) {
                node.drawHittest(ctx, node.drawData);
            } else {
                node.draw(ctx, node.drawData);
            }
        });
    };
};

const createEventCallback = function createEventCallback(nodes: CanvasNode[]): Partial<CanvasNodeEvent> {
    const events: {[key in keyof CanvasNodeEvent]?: CanvasNodeEvent[key][]} = {};
    nodes.forEach((node) => {
        if (node.registerEvent !== undefined) {
            (Reflect.ownKeys(node.registerEvent) as (keyof CanvasNodeEvent)[]).forEach((event) => {
                if (node.registerEvent![event] !== undefined) {
                    if (events[event] === undefined) {
                        events[event] = [node.registerEvent![event]!];
                    } else {
                        events[event]!.push(node.registerEvent![event]!);
                    }
                }
            });
        }
    });
    return mapValues(events, (cbs) => callAll(cbs!));
};

const createGroupNode = function createGroupNode(
    nodes: CanvasNode[],
    options: {
        id?: string;
        zOrder?: number;
        userData?: unknown;
    } = {},
): CanvasNode {
    const {id, zOrder, userData} = options;
    return {
        type,
        id,
        zOrder,
        userData,
        draw: createGroupDraw(nodes),
        drawHittest: createGroupDrawHittest(nodes),
        registerEvent: createEventCallback(nodes),
    };
};

export default createGroupNode;
