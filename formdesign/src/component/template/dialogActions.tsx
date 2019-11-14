import React from "react";
import {createUseStyles} from "react-jss";
import clsx from "clsx";

const styles = {
    DialogActions: {
        textAlign: "center",
        padding: 10,
        "& span": {
            cursor: "pointer",
            float: "right",
            fontSize: 20,
            color: "#767c85",
            "&:hover": {
                color: "#333",
            },
        },
        "& button": {
            width: 70,
            height: 30,
            lineHeight: "30px",
            margin: "0 10px",
            borderRadius: 2,
            fontSize: 13,
            fontWeight: "bolder",
        },
    },
    ok: {
        border: "none",
        color: "#fff",
        background: "#3788ff",
        "&:hover": {
            background: "#2a7ffc",
        }
    },
    cancel: {
        border: "1px solid #484d55",
        color: "#484d55",
        background: "#fff",
        "&:hover": {
            background: "#f9fafb",
        }
    }
};
const useStyles = createUseStyles(styles, {name: "DialogActions"});
interface Props {
    onClose: (open: boolean) => void;
}
export default function DialogActions(props: Props) {
    const classes = useStyles();
    const {onClose} = props;
    return (
        <div className={clsx(classes.DialogActions)}>
            <button
                type="button"
                onClick={() => onClose(false)}
                className={clsx(classes.ok)}
            >
                确定
            </button>
            <button
                type="button"
                onClick={() => onClose(false)}
                className={clsx(classes.cancel)}
            >
                取消
            </button>
        </div>
    );
}
