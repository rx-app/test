import React, {useState} from "react";
import {createUseStyles} from "react-jss";
import clsx from "clsx";

const styles = {
    radio: {
        cursor: "pointer",
        display: "inline-block",
        height: 12,
        width: 12,
        verticalAlign: "middle",
        backgroundColor: "#fff",
        borderRadius: "100%",
        border: "2px solid #4a7cfb",
        "& i": {
            margin: 2,
            height: 8,
            width: 8,
            display: "block",
            borderRadius: "100%",
            backgroundColor: "#4a7cfb",
            textIndent: "-999px",
        }
    },
};
const useStyles = createUseStyles(styles, {name: "Input"});

export default function Input() {
    const classes = useStyles();
    const [checked, setChecked] = useState(false);
    return (
        <>
            <span className={clsx(classes.radio)} onClick={() => setChecked(!checked)}>
                {checked ? <i>radio</i> : null}
            </span>
        </>
    );
}
