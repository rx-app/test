import React, {useState} from "react";
import {connect} from "react-redux";
import {createUseStyles} from "react-jss";
import clsx from "clsx";
import Checkbox, {CheckboxProps} from "@material-ui/core/Checkbox";
import InputBox from "./input";


const styles = {
    root: {
        width: 310,
        background: "#fff",
        fontSize: "13px",
        borderRadius: "0px !important",
        float: "left",
        "&>div": {
            minWidth: 250,
            margin: 0,
            padding: "15px 5px",
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
                color: "#333",
            }
        },
    },
    icon: {
        borderRadius: 2,
        width: 12,
        height: 12,
        border: "2px solid #c9c9cf",
        "$root.Mui-focusVisible &": {
            outline: "2px auto rgba(19,124,189,.6)",
            outlineOffset: 2,
        },
        "input:hover ~ &": {
            backgroundColor: "#ebf1f5",
        },
        "input:disabled ~ &": {
            boxShadow: "none",
            background: "rgba(206,217,224,.5)",
        },
    },
    checkedIcon: {
        border: "2px solid #0086ed",
        backgroundColor: "#0086ed",
        backgroundImage: "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
        "&:before": {
            display: "block",
            width: 12,
            height: 12,
            backgroundImage:
                "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath"
                + " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 "
                + "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
            content: "''",
        },
        "input:hover ~ &": {
            backgroundColor: "#0086ed",
        },
    },
    ul: {
        width: "300px",
        overflow: "hidden",
        margin: "3px 0px",
        paddingLeft: "5px",
        "& li": {
            width: "50%",
            float: "left",
            fontSize: "12px",
            lineHeight: "16px",
            listStyle: "none",
        },
    },
    marginBottom: {
        marginBottom: "10px",
    },
    title: {
        fontSize: 14,
        height: "40px",
        lineHeight: "40px",
        display: "block",
        borderTop: "1px solid #eee",
        position: "relative",
    },
    checkBox: {
        float: "right",
    }
};
const useStyles = createUseStyles(styles, {name: "PaperMargins"});
interface DataFont {
    name: string;
    icon: string;
    data: string[];
}
const StyledCheckbox = (props: CheckboxProps) => {
    const classes = useStyles();

    return (
        <Checkbox
            className={clsx(classes.checkBox)}
            disableRipple
            color="default"
            checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
            icon={<span className={clsx(classes.icon)} />}
            {...props}
        />
    );
};

const PaperMargins = connect()(() => {
    const classes = useStyles();
    const [show, setShow] = useState(false);
    const list: DataFont[] = [
        {name: "上次的自定义设置", icon: "#icon-shangcishezhi", data: ["上：5.54com", "下：5.54com", "左：5.54com", "右：5.54com"]},
        {name: "普通", icon: "#icon-putong", data: ["上：5.54com", "下：5.54com", "左：5.54com", "右：5.54com"]},
        {name: "窄", icon: "#icon-zhai", data: ["上：5.54com", "下：5.54com", "左：5.54com", "右：5.54com"]},
        {name: "适中", icon: "#icon-shizhong", data: ["上：5.54com", "下：5.54com", "左：5.54com", "右：5.54com"]},
        {name: "宽", icon: "#icon-kuan", data: ["上：5.54com", "下：5.54com", "左：5.54com", "右：5.54com"]}
    ];
    return (
        <div className={clsx(classes.root)}>
            {list.map((item: DataFont) => (
                <div key={item.name}>
                    <svg aria-hidden="true">
                        <use xlinkHref={item.icon} />
                    </svg>
                    <b>{item.name}</b>
                    <ul className={clsx(classes.ul)}>
                        {item.data.map((data) => <li key={data}>{data}</li>)}
                    </ul>
                </div>
            ))}
            <b className={classes.title}>
                自定义页边距
                <StyledCheckbox onClick={() => setShow(!show)} />
            </b>
            <ul className={clsx(classes.ul)} style={{display: show ? "block" : "none"}}>
                <li className={clsx(classes.marginBottom)}>
                    <InputBox title={["上", "cm"]} />
                </li>
                <li className={clsx(classes.marginBottom)}>
                    <InputBox title={["下", "cm"]} />
                </li>
                <li className={clsx(classes.marginBottom)}>
                    <InputBox title={["左", "cm"]} />
                </li>
                <li className={clsx(classes.marginBottom)}>
                    <InputBox title={["右", "cm"]} />
                </li>
            </ul>
        </div>
    );
});
export default PaperMargins;
