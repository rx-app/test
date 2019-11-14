import {noop} from "lodash";
import {CanvasNode, DrawCallback} from ".";

interface ImageDrawData {
    x: number;
    y: number;
    width: number;
    height: number;
    image: HTMLImageElement;
    background?: string;

}


const drawImage: DrawCallback = function drawLine(ctx, drawData) {
    const {x, y, width, height, image, background} = drawData as ImageDrawData;
    if (background !== undefined) {
        ctx.fillStyle = background;
        ctx.fillRect(x, y, width, height);
    }
    ctx.drawImage(image, x, y, width, height);
};

const drawImageHittest: DrawCallback = function drawLineHittest(ctx, drawData) {
    const {x, y, width, height} = drawData as ImageDrawData;
    ctx.fillRect(x, y, width, height);
};

const type = "image";
export default function createImage(
    url: string,
    {x, y}: {x: number; y: number},
    {width, height}: {width: number; height: number},
    options: {
        id?: string;
        zOrder?: number;
        userData?: unknown;
        originPos?: "center" | "topLeft";
        background?: string;
    } = {},
): CanvasNode {
    const {id, zOrder, userData, background, originPos = "topLeft"} = options;
    const image = new Image();
    let newX = x;
    let newY = y;
    switch (originPos) {
        case "center":
            newX -= width / 2;
            newY -= height / 2;
            break;
        default:
    }
    const drawData = {x: newX, y: newY, width, height, image, background};
    const node: CanvasNode = {
        type,
        id,
        zOrder,
        userData,
        drawData,
        draw: noop,
        drawHittest: drawImageHittest,
        registerEvent: {
            redraw: (cb) => {
                image.onload = () => {
                    node.draw = drawImage;
                    cb();
                };
                image.src = url;
            }
        }
    };



    return node;
}
