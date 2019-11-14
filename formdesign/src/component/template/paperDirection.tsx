import React from "react";
import {createUseStyles} from "react-jss";
import clsx from "clsx";
import {connect} from "react-redux";


const styles = {
    icon: {
        display: "inline-block",
        width: "8px",
        height: "16px",
        lineHeight: "16px",
        padding: "7px 0",
        margin: "0 5px",
        float: "left",
    },
    root: {
        width: 260,
        overflow: "hidden",
        fontSize: 13,
        padding: "5px 0",
        "&>div": {
            width: 250,
            margin: 0,
            padding: 5,
            height: 20,
            lineHeight: "20px",
            overflow: "hidden",
            cursor: "pointer",
            "& svg": {
                float: "left",
                width: "14px",
                height: "14px",
                margin: "3px",
            },
            "&:hover": {
                background: "#ebedf0",
            }
        },
    }
};

const useStyles = createUseStyles(styles, {name: "PaperDirection"});
const PaperDirection = connect()(() => {
    const classes = useStyles();
    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.icon)}>
                <svg aria-hidden="true">
                    <use xlinkHref="#icon-heng" />
                </svg>
                横向
            </div>
            <div className={clsx(classes.icon)}>
                <svg aria-hidden="true">
                    <use xlinkHref="#icon-shu" />
                </svg>
                竖向
            </div>
        </div>
    );
});
export default PaperDirection;
