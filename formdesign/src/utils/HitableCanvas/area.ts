import {CanvasNode, DrawCallback} from ".";

interface AreaDrawData {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string | undefined;
}

const drawArea: DrawCallback = function drawArea(ctx, drawData) {
    const {x, y, width, height, color} = drawData as AreaDrawData;
    if (color !== undefined) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
    }
};

const drawAreaHittest: DrawCallback = function drawAreaHittest(ctx, drawData) {
    const {x, y, width, height} = drawData as AreaDrawData;
    ctx.fillRect(x, y, width, height);
};

const type = "area";
export default function createArea(
    {x, y}: {x: number; y: number},
    {width, height}: {width: number; height: number},
    options: {id?: string; color?: string; zOrder?: number; userData?: unknown} = {},
): CanvasNode {
    const {zOrder, userData, color, id} = options;
    return {
        type,
        id,
        zOrder,
        userData,
        drawData: {x, y, width, height, color},
        draw: drawArea,
        drawHittest: color !== undefined ? undefined : drawAreaHittest,
    };
}
