import React from "react";

import MyButton from "./MyButton";
import {Item as ToolItem} from "../component/Toolbar";
import {addCell, updateCell, addCells} from "../redux/actions/node";
import unit from "../utils/unit";
import Store from "../redux/store";
import {getPaperAreaWidth} from "../redux/selectors/paper";

export const addCell1 = function addCell1() {
    return (
        <ToolItem>
            <MyButton click={() => addCell(200, 100, 100, 100)}>
                addCell1
            </MyButton>
        </ToolItem>
    );
};

export const addCell2 = function addCell2() {
    return (
        <ToolItem>
            <MyButton click={() => addCell("cell_1", 100, "cell_1", 100)}>
                addCell2
            </MyButton>
        </ToolItem>
    );
};

export const addCell3 = function addCell3() {
    return (
        <ToolItem>
            <MyButton click={() => addCell("cell_1", 100, "cell_1", "cell_2")}>
                addCell3
            </MyButton>
        </ToolItem>
    );
};

export const setCell = function setCell() {
    return (
        <ToolItem>
            <MyButton click={() => updateCell("cell_4", 300, 300, 100, 100)}>
                setCell1
            </MyButton>
        </ToolItem>
    );
};

export const addCell3x3 = function addCell3x3() {
    return (
        <ToolItem>
            <MyButton click={() => addCells(3, 4, getPaperAreaWidth(Store.getState()) / 4, unit.toPixel(5.5), 0, 0)}>
                addCell3x3
            </MyButton>
        </ToolItem>
    );
};
