import {TextStyle} from "./style";


export interface AbsoultePosition {
    x: number;
    y: number;
}

export interface RelativePosition {
    x: number;
    y: number;
    base: string;
}

export type NumberOrDependence = number | string | [string, string];

export type Position = AbsoultePosition | RelativePosition;

export interface BaseNode {
    id: string;
    type: string;
    data: unknown;
}

export interface TextNode extends BaseNode {
    type: "text";
    data: {
        pos: Position;
        text: string;
        style: TextStyle;
        styleName?: string;
        userData?: unknown;
        zOrder?: number;
    };
}

export interface OutlineStyle {
    color: string;
    weight: number;
    lineType: string;
}
export interface CellNode extends BaseNode {
    type: "cell";
    data: {
        width: NumberOrDependence;
        height: NumberOrDependence;
        left: NumberOrDependence;
        top: NumberOrDependence;
        outLine: {
            left?: OutlineStyle;
            right?: OutlineStyle;
            top?: OutlineStyle;
            bottom?: OutlineStyle;
        };
    };
}



export interface SingleNodeAction<T extends BaseNode = BaseNode> {
    type: "addNode" | "updateNode" | "removeNode";
    node: T;
}

export interface BatchNodeAction<T extends BaseNode = BaseNode> {
    type: "addNodes";
    nodes: T[];
}

export type NodeAction<T extends BaseNode = BaseNode> = SingleNodeAction<T> | BatchNodeAction<T>;
