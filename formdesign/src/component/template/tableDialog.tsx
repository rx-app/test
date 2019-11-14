import React from "react";
import {createUseStyles} from "react-jss";
import clsx from "clsx";
import DialogTitle from "./dialogTitle";
import DialogActions from "./dialogActions";
import Input from "./input";


const styles = {
    dialog: {
        width: 340,
        background: "#fff",
        borderRadius: 3,
        paddingBottom: 10,
        boxShadow: "0 0 10px #999",
        overflow: "hidden",
        position: "fixed",
        top: "30%",
        left: "50%",
        marginLeft: -170,
        zIndex: 999
    },
    DialogContent: {
        width: 300,
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-around",
        background: "#fff",
        padding: "30px 0",
        overflow: "hidden",
    }
};
const useStyles = createUseStyles(styles, {name: "Dialog"});
interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
}
export default function Dialog(props: Props) {
    const classes = useStyles();
    const {open, setOpen} = props;
    return (
        <>
            {open ? (
                <div className={clsx(classes.dialog)}>
                    <DialogTitle title="插入表格" onClose={setOpen} />
                    <div className={clsx(classes.DialogContent)}>
                        <Input title={["行数"]} />
                        <Input title={["列数"]} />
                    </div>
                    <DialogActions onClose={setOpen} />
                </div>
            ) : null}
        </>
    );
}
