import React from "react";

import MyButton from "./MyButton";
import {Item as ToolItem} from "../component/Toolbar";
import {clearSelection, reverseSelect, selectAll} from "../redux/actions/selection";


export const ClearSelection = function ClearSelection() {
    return (
        <ToolItem>
            <MyButton click={() => clearSelection()}>清除选中</MyButton>
        </ToolItem>
    );
};

export const SelectAll = function SelectAll() {
    return (
        <ToolItem>
            <MyButton click={() => selectAll()}>全部选中</MyButton>
        </ToolItem>
    );
};

export const ReverseSelect = function ReverseSelect() {
    return (
        <ToolItem>
            <MyButton click={() => reverseSelect()}>反选</MyButton>
        </ToolItem>
    );
};
