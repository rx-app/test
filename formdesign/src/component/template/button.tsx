import React, {useState} from "react";
import {createUseStyles} from "react-jss";
import clsx from "clsx";

import "../../utils/font/iconfont";
import GetInfo from "./getInfo";

const styles = {
    icon: {
        display: "inline-block",
        width: "16px",
        height: "16px",
        backgroundSize: "100% 100%",
        float: "left",
        padding: 7,
        margin: "0 5px",
        "&:hover": {
            background: "#b8ceee",
        }
    },
    active: {
        background: "#b8ceee",
    },
};
const useStyles = createUseStyles(styles, {name: "SingleButton"});

interface Props {
    action: string;
    title: string;
    icon: string;
}
export default function SingleButton(props: Props) {
    const classes = useStyles();
    const {action, icon} = props;

    const [isActive, setIsActive] = useState(false);
    return (
        <>
            <svg
                className={`${clsx(classes.icon)} ${isActive ? clsx(classes.active) : ""}`}
                aria-hidden="true"
                onClick={
                    () => {
                        setIsActive(!isActive);
                        GetInfo("普通按钮", action);
                    }
                }
            >
                <use xlinkHref={icon} />
            </svg>
        </>
    );
}
