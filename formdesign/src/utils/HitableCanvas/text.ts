// TODO: 不同大小的字的下划线宽度,Excel不支持,但是Word是支持的
import {CanvasNode, DrawCallback} from ".";

import buildFontString from "./font";

export type AlignV = "top" | "center" | "bottom";
export type AlignH = "left" | "center" | "right";
export interface TextOptions {
    family: string;
    size: number;
    lineHeight?: number;
    alignH?: AlignH;
    alignV?: AlignV;
    color?: string;
    bold?: boolean;
    italic?: boolean;
    underLine?: string;
    strike?: boolean;
    id?: string;
    zOrder?: number;
    userData?: unknown;

}

interface TextDrawData {
    color: string;
    font: string;
    text: string;
    x: number;
    y: number;
    width: number;
    height: number;
    textOrigin: {
        baseLine: "top" | "middle" | "ideographic";
        align: AlignH;
        x: number;
        y: number;
    };
    lineSetting: {
        startX: number;
        endX: number;
        lineY: number;
        lineWidth: number;
        style: string;
    }[];
}

const ptToPixel = function ptToPixel(inPt: number) {
    return inPt / 72 * 96.0;
};

const getTextPos = function getTextPos(x: number, y: number, alignV: AlignV, alignH: AlignH, width: number, height: number) {
    let offsetX: number;
    let offsetY: number;
    let baseLine: CanvasTextBaseline;
    let align: CanvasTextAlign;
    switch (alignH) {
        case "left":
            offsetX = 0;
            align = "left";
            break;
        case "right":
            offsetX = width;
            align = "right";
            break;
        case "center":
            offsetX = width / 2;
            align = "center";
            break;
        default:
            throw new Error("unsupported horizontal alignment");
    }
    switch (alignV) {
        case "top":
            offsetY = 0;
            baseLine = "top";
            break;
        case "bottom":
            offsetY = height;
            baseLine = "ideographic";
            break;
        case "center":
            offsetY = height / 2;
            baseLine = "middle";
            break;
        default:
            throw new Error("unsupported vertical alignment");
    }
    return {baseLine, align, x: offsetX + x, y: offsetY + y};
};

const getLineSettings = function getLineSettings(
    x: number,
    y: number,
    alignV: AlignV,
    alignH: AlignH,
    textWidth: number,
    textHeight: number,
    underLine: string | undefined,
    strike: string | undefined,
) {
    const lineWidth = (textHeight / 14) * 0.75;
    let startX: number;
    let lineY: number;
    switch (alignH) {
        case "left":
            startX = x;
            break;
        case "right":
            startX = x - textWidth;
            break;
        case "center":
            startX = x - (textWidth / 2);
            break;
        default:
            throw new Error("unsupported horizontal alignment");
    }
    switch (alignV) {
        case "top":
            lineY = y + textHeight;
            break;
        case "bottom":
            lineY = y;
            break;
        case "center":
            lineY = y + (textHeight / 2);
            break;
        default:
            throw new Error("unsupported vertical alignment");
    }
    const endX = startX + textWidth;
    const ret = [];
    if (underLine !== undefined) {
        ret.push({startX, endX, lineWidth, lineY, style: underLine});
    }
    if (strike !== undefined) {
        ret.push({startX, endX, lineWidth, lineY: lineY - (textHeight * 0.4), style: strike});
    }
    return ret;
};

const drawText: DrawCallback = function drawText(ctx, drawData) {
    const {color, font, text, width, textOrigin, lineSetting} = drawData as TextDrawData;
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.textBaseline = textOrigin.baseLine;
    ctx.textAlign = textOrigin.align;
    ctx.fillText(text, textOrigin.x, textOrigin.y, width);
    lineSetting.forEach(({lineWidth, style, startX, endX, lineY}) => {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = style;
        ctx.beginPath();
        ctx.moveTo(startX, lineY);
        ctx.lineTo(endX, lineY);
        ctx.stroke();
    });
};

const drawTextHittest: DrawCallback = function drawTextHittest(ctx, drawData) {
    const {x, y, width, height} = drawData as TextDrawData;
    ctx.fillRect(x, y, width, height);
};

const tempCtx = document.createElement("canvas").getContext("2d");
if (tempCtx === null) {
    throw new Error("Can't get context of canvas. Change a browser may fix this problem");
}

const type = "text";
const createText = function createText(
    {x, y}: {x: number; y: number},
    {width, height}: {width: number; height: number},
    text: string,
    options: TextOptions,
): CanvasNode {
    const font = buildFontString(options);
    const {color = "black", alignH = "left", alignV = "top", underLine, strike, size, id, zOrder, userData} = options;
    const textOrigin = getTextPos(x, y, alignV, alignH, width, height);
    let lineSetting: {startX: number; endX: number; lineY: number; style: string; lineWidth: number}[] = [];
    if ((underLine !== undefined) || (strike === true)) {
        tempCtx.font = font;
        const textHeight = ptToPixel(size);
        const textWidth = Math.min(Math.ceil(tempCtx.measureText(text).width), width);
        lineSetting = getLineSettings(
            textOrigin.x,
            textOrigin.y,
            alignV,
            alignH,
            textWidth,
            textHeight,
            underLine,
            strike === true ? color : undefined,
        );
    }

    return {
        id,
        zOrder,
        userData,
        type,
        drawData: {
            color,
            font,
            text,
            x,
            y,
            width,
            height,
            textOrigin,
            lineSetting,
        },
        draw: drawText,
        drawHittest: drawTextHittest,
    };
};


export default createText;
