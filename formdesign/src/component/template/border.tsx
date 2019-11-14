import React from "react";
import {createUseStyles} from "react-jss";
import clsx from "clsx";

const styles = {
    root: {
        boxShadow: "0 0 10px #999",
        width: 270,
        background: "#fff",
        fontSize: 13,
        borderRadius: "0px !important",
        padding: "5px 0",
        "&>div": {
            margin: 0,
            padding: 5,
            height: 20,
            lineHeight: "20px",
            overflow: "hidden",
            cursor: "pointer",
            "&:hover": {
                background: "#ebedf0",
                "&:after": {
                    color: "#5599fd",
                    display: "inline-block",
                    float: "right",
                    content: "'✔'",
                    marginRight: 10,
                },
            },
            "& hr": {
                width: "70%",
                margin: 10,
                float: "left",
            }
        },
    },
};
const useStyles = createUseStyles(styles, {name: "PaperTable"});
export default function PaperTable() {
    const classes = useStyles();
    return (
        <>
            <div className={clsx(classes.root)}>
                <div>
                    <hr />
                </div>
                <div>
                    <hr style={{borderTop: "2px solid #000"}} />
                </div>
                <div>
                    <hr style={{borderTop: "3px solid #000"}} />
                </div>
                <div>
                    <hr style={{borderTop: "1px double #000"}} />
                </div>
                <div>
                    <hr style={{borderTop: "1px dashed #000"}} />
                </div>
            </div>
        </>
    );
}
