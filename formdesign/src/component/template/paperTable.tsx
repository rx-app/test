import React, {useState} from "react";
import {createUseStyles} from "react-jss";
import clsx from "clsx";
import TableDialog from "./tableDialog";

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
        width: 200,
        background: "#fff",
        fontSize: 13,
        borderRadius: "0px !important",
        padding: "5px 0",
        "&>div": {
            width: 190,
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
    },
    triangle: {
        "&:after": {
            display: "inline-block",
            float: "right",
            margin: 6,
            content: "''",
            width: 0,
            height: 0,
            borderLeft: "4px solid #979ca4",
            borderTop: "4px solid transparent",
            borderRight: "4px solid transparent",
            borderBottom: "4px solid transparent",
        },
    },
};
const useStyles = createUseStyles(styles, {name: "PaperTable"});
export default function PaperTable() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [dialog, setDialog] = useState(false);
    return (
        <>
            <div className={clsx(classes.root)}>
                <div onClick={() => {setOpen(!open); setDialog(!dialog)}} className={clsx(classes.triangle)}>
                    <svg aria-hidden="true">
                        <use xlinkHref="#icon-charubiaoge" />
                    </svg>
                    插入表格
                </div>
                <div onClick={() => setOpen(!open)}>
                    <svg aria-hidden="true">
                        <use xlinkHref="#icon-shouhuibiaoge" />
                    </svg>
                    手绘表格
                </div>
            </div>
            <TableDialog open={dialog} setOpen={setDialog} />
        </>
    );
}
