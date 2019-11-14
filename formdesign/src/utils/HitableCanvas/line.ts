import {CanvasNode, DrawCallback} from ".";

interface LineDrawData {
    start: {x: number; y: number};
    end: {x: number; y: number};
    width: number;
    hitWidth: number;
    color: string;
}

const line = function line(ctx: CanvasRenderingContext2D, start: {x: number; y: number}, end: {x: number; y: number}, width: number) {
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
};

const drawLine: DrawCallback = function drawLine(ctx, drawData) {
    const {start, end, width, color} = drawData as LineDrawData;
    ctx.strokeStyle = color;
    line(ctx, start, end, width);
};

const drawLineHittest: DrawCallback = function drawLineHittest(ctx, drawData) {
    const {start, end, hitWidth} = drawData as LineDrawData;
    line(ctx, start, end, hitWidth);
};
const type = "line";

export default function createLines(
    start: {x: number; y: number},
    end: {x: number; y: number},
    options: {
        id?: string;
        color?: string;
        zOrder?: number;
        userData?: unknown;
        width?: number;
        hitWidth?: number;
    } = {},
): CanvasNode {
    const {id, zOrder, userData, width = 1, hitWidth, color = "black"} = options;
    return {
        type,
        id,
        zOrder,
        userData,
        drawData: {width, hitWidth, start, end, color},
        draw: drawLine,
        drawHittest: hitWidth !== undefined ? drawLineHittest : undefined,
    };
}
