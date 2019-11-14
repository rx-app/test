// TODO: dynamic Load Fonts  new FontFace()
export interface FontOptions {
    family: string;
    size: number;
    lineHeight?: number;
    bold?: boolean;
    italic?: boolean;
}

export default function buildFontString(ops: FontOptions) {
    const {family, size, lineHeight, bold, italic} = ops;
    return `${italic === true ? "italic " : ""}${bold === true ? "bold " : "normal "}${size}pt${lineHeight !== undefined ? `/${lineHeight}` : ""} ${family}`;
}
