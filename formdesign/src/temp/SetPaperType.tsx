import React from "react";

import MyButton from "./MyButton";
import {Item as ToolItem} from "../component/Toolbar";
import {setPaperType} from "../redux/actions/paper";

const SetPaperType = function SetPaperType(type: "A3" | "A4") {
    return (
        <ToolItem>
            <MyButton click={() => setPaperType(type)}>{type}</MyButton>
        </ToolItem>
    );
};

export default SetPaperType;
