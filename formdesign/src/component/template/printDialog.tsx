import React from "react";
import {createUseStyles} from "react-jss";
import clsx from "clsx";
import DialogTitle from "./dialogTitle";
import DialogActions from "./dialogActions";

const styles = {
    dialog: {
        width: 650,
        background: "#fff",
        borderRadius: 3,
        paddingBottom: 10,
        boxShadow: "0 0 10px #999",
        overflow: "hidden",
        position: "fixed",
        top: "30%",
        left: "50%",
        marginLeft: -325,
        zIndex: 999
    },
    DialogContent: {
        overflow: "hidden",
    },
    left: {
        float: "left",
        padding: 30,
    },
    right: {
        float: "right",
        width: 200,
        height: 250,
        margin: 40,
        background: "#f9fafb",
        textIndent: -999,
        "&:after": {
            display: "inline-block",
            width: "100px",
            background: "#fff",
            height: "150px",
            content: "''",
            margin: 50,
            boxShadow: "0 0 5px #ddd",
        }
    }
};
const useStyles = createUseStyles(styles, {name: "Dialog"});
export default function Dialog() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    return (
        <>
            {open ? (
                <div className={clsx(classes.dialog)}>
                    <DialogTitle title="打印" onClose={setOpen} />
                    <div className={clsx(classes.DialogContent)}>
                        <div className={clsx(classes.left)}>
                            <div>目标打印机</div>
                            <div>页码</div>
                            <DialogActions onClose={setOpen} />
                        </div>
                        <div className={clsx(classes.right)}>right</div>
                    </div>
                </div>
            ) : null}
        </>
    );
}
