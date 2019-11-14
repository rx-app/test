import {uniqueId, partial, flatten} from "lodash";

import {TextStyle} from "../interface/style";
import {NodeAction, TextNode, CellNode, NumberOrDependence} from "../interface/node";


const uniqueTextId = partial(uniqueId, "text_");
const uniqueCellId = partial(uniqueId, "cell_");

export const addText = function addText(
    text: string,
    pos: {x: number; y: number; relatedNode?: string},
    styleOrName?: TextStyle | string,
    styleNameOrUndef?: string,
): NodeAction<TextNode> {
    const {x, y, relatedNode: base} = pos;
    let styleName;
    let style;
    if (styleOrName === undefined) {
        style = {};
    } else if (typeof styleOrName === "string") {
        styleName = styleOrName;
        style = {};
    } else {
        style = styleOrName;
        styleName = styleNameOrUndef;
    }
    const id = uniqueTextId();
    return {
        type: "addNode",
        node: {
            id,
            type: "text",
            data: {
                text,
                style,
                styleName,
                pos: {x, y, base},
            }
        },
    };
};



export const addCell = function addCell(
    width: NumberOrDependence,
    height: NumberOrDependence,
    top: NumberOrDependence,
    left: NumberOrDependence,
): NodeAction<CellNode> {
    const id = uniqueCellId();
    return {
        type: "addNode",
        node: {
            id,
            type: "cell",
            data: {
                width,
                height,
                top,
                left,
                outLine: {},
            },
        },
    };
};

export const addCells = function addCells(
    row: number,
    col: number,
    width: number,
    height: number,
    top: number,
    left: number,
): NodeAction<CellNode> {
    const nodes: CellNode[][] = [];
    const type = "cell";
    for (let i = 0; i < row; i += 1) {
        const rowCells: CellNode[] = [];
        for (let j = 0; j < col; j += 1) {
            const id = uniqueCellId();
            let nodeLeft: NumberOrDependence;
            let nodeTop: NumberOrDependence;
            if (j === 0 && i === 0) {
                nodeLeft = left;
                nodeTop = top;
            } else if (j === 0) {
                nodeLeft = [nodes[i - 1][0].id, "left"];
                nodeTop = nodes[i - 1][j].id;
            } else if (i === 0) {
                nodeLeft = rowCells[j - 1].id;
                nodeTop = [rowCells[j - 1].id, "top"];
            } else {
                nodeLeft = rowCells[j - 1].id;
                nodeTop = nodes[i - 1][j].id;
            }
            rowCells.push({
                id,
                type,
                data: {
                    width: i === 0 ? width : nodes[i - 1][j].id,
                    height: j === 0 ? height : rowCells[j - 1].id,
                    left: nodeLeft,
                    top: nodeTop,
                    outLine: {},
                },
            });
        }
        nodes.push(rowCells);
    }
    return {
        nodes: flatten(nodes),
        type: "addNodes",
    };
};

export const updateCell = function updateCell(
    id: string,
    width: NumberOrDependence,
    height: NumberOrDependence,
    top: NumberOrDependence,
    left: NumberOrDependence,
): NodeAction<CellNode> {
    return {
        type: "updateNode",
        node: {
            id,
            type: "cell",
            data: {
                width,
                height,
                top,
                left,
                outLine: {}
            }
        }
    };
};
