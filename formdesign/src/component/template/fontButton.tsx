import React from "react";
import {createUseStyles} from "react-jss";
import clsx from "clsx";

import "../../utils/font/iconfont";
import GetInfo from "./getInfo";

const styles = {
    root: {
        overfloat: "hidden",
        float: "left",
        margin: "0 7px",
        cursor: "pointer",
    },
    content: {
        display: "inline-block",
        height: "16px",
        padding: "7px 4px",
        backgroundSize: "100% 100%",
        float: "left",
        fontSize: 13,
    },
    arrows: {
        display: "inline-block",
        width: "8px",
        height: "16px",
        lineHeight: "16px",
        padding: "7px 0",
        margin: "0 5px",
        float: "left",
    },
};
const useStyles = createUseStyles(styles, {name: "FontButton"});

interface Props {
    action: string;
    content: string;
}
export default function FontButton(props: Props) {
    const classes = useStyles();
    const {action, content} = props;
    return (
        <div className={clsx(classes.root)} onClick={() => GetInfo("文字下拉按钮", action)}>
            <div className={clsx(classes.content)}>{content}</div>
            <svg className={clsx(classes.arrows)} aria-hidden="true">
                <use xlinkHref="#icon-xiala" />
            </svg>
        </div>
    );
}
