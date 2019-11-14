import React from "react";
import {createUseStyles} from "react-jss";
import clsx from "clsx";
import GetInfo from "./getInfo";

const styles = {
    InputBox: {
        height: "32px",
        width: "70%",
        lineHeight: "32px",
        margin: "0 5px",
        padding: "0 5px",
        border: "1px solid #c9c9cf",
        "&:focus": {
            borderColor: "#3788ff",
            backgroundColor: "#f6f7f8",
            boxShadow: "0",
        }
    },
    leftText: {
        fontSize: 13,
        lineHeight: "30px",
        display: "inline-block",
        textAlign: "right",
    },
    rightText: {
        fontSize: 13,
        lineHeight: "30px",
        textAlign: "left",
    }
};
const useStyles = createUseStyles(styles, {name: "Input"});
interface Props {
    title: string[];
}
export default function Input(props: Props) {
    const classes = useStyles();
    const {title} = props;
    const [val, val1] = title;
    return (
        <>
            <span className={clsx(classes.leftText)}>{val}</span>
            <input
                className={clsx(classes.InputBox)}
                onInput={(event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
                    const {value} = event.target as HTMLInputElement;
                    GetInfo(val, value);
                }}
            />
            <span className={clsx(classes.rightText)}>{val1}</span>
        </>
    );
}
