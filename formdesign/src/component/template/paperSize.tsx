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
        background: "#fff",
        fontSize: 13,
        borderRadius: "0px !important",
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
const useStyles = createUseStyles(styles, {name: "PaperSize"});

const PaperSize = connect()(() => {
    const classes = useStyles();
    return (
        <div className={clsx(classes.root)}>
            <div>
                <svg aria-hidden="true">
                    <use xlinkHref="#icon-A" />
                </svg>
                <b>A3</b>
                （29.6cm x 41.91cm）
            </div>
            <div>
                <svg aria-hidden="true">
                    <use xlinkHref="#icon-A1" />
                </svg>
                <b>A3</b>
                （20.9cm x 29.6cm）
            </div>
        </div>
    );
});
export default PaperSize;
