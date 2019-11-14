import React from "react";
import {createUseStyles} from "react-jss";
import clsx from "clsx";
import SingleButton from "../button";

const styles = {
    groupBtn: {
        marginRight: 5,
        border: "1px solid #c9c9cf",
        borderRight: 0,
        "& svg": {
            margin: 0,
            width: "100%",
            padding: "7px 0",
            borderRight: "1px solid #c9c9cf",
        }
    }
};
const useStyles = createUseStyles(styles, {name: "Alignment"});
export default function Alignment() {
    const classes = useStyles();
    return (
        <li>
            <label>对齐</label>
            <div className={clsx(classes.groupBtn)}>
                <SingleButton title="左对齐" action="左对齐" icon="#icon-youduiqi" />
                <SingleButton title="居中" action="居中" icon="#icon-chuizhiduiqi" />
                <SingleButton title="右对齐" action="右对齐" icon="#icon-zuoduiqi" />
            </div>
        </li>
    );
}
