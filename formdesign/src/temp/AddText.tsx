import React from "react";
import {random} from "lodash";

import MyButton from "./MyButton";
import {Item as ToolItem} from "../component/Toolbar";
import {addText} from "../redux/actions/node";

const AddText = function AddText() {
    return (
        <ToolItem>
            <MyButton click={() => addText("测试", {x: random(0, 500, false), y: random(0, 800, false)}, {family: "宋体", size: random(10, 14, false)})}>
                addText
            </MyButton>
        </ToolItem>
    );
};

export default AddText;
