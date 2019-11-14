import React from "react";
import {createUseStyles} from "react-jss";
import clsx from "clsx";

const styles = {
    DialogTitle: {
        background: "#f9fafb",
        height: 50,
        lineHeight: "50px",
        padding: "0 15px",
        fontSize: 15,
        "& span": {
            cursor: "pointer",
            float: "right",
            fontSize: 20,
            color: "#767c85",
            "&:hover": {
                color: "#333",
            },
        }
    }
};
const useStyles = createUseStyles(styles, {name: "DialogTitle"});
interface Props {
    title: string;
    onClose: (open: boolean) => void;
}
export default function DialogTitle(props: Props) {
    const classes = useStyles();
    const {title, onClose} = props;
    return (
        <>
            <div className={clsx(classes.DialogTitle)}>
                {title}
                <span onClick={() => onClose(false)}>×</span>
            </div>
        </>
    );
}
