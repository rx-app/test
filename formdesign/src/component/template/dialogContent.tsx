import React from "react";
import {createUseStyles} from "react-jss";
import clsx from "clsx";

const styles = {
    DialogContent: {
        padding: 20,
    }
};
const useStyles = createUseStyles(styles, {name: "DialogContent"});
export default function DialogContent() {
    const classes = useStyles();
    return (
        <div className={clsx(classes.DialogContent)}></div>
    );
}
