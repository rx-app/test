import React from "react";
import Input from "../input";

export default function widthAndHeight() {
    return (
        <li>
            <label>宽高</label>
            <div>
                <Input title={["W"]} />
                <Input title={["H"]} />
            </div>
        </li>
    );
}
