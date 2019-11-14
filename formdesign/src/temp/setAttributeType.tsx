import React from "react";

import MyButton from "./MyButton";
import {Item as ToolItem} from "../component/Toolbar";
import SetDialogVisiable from "../redux/actions/dialog";

const SetDialogType = function SetPaperType(btnName: string, type: string[]) {
    return (
        <ToolItem>
            <MyButton click={() => SetDialogVisiable(type)}>{btnName}</MyButton>
        </ToolItem>
    );
};

export default SetDialogType;
