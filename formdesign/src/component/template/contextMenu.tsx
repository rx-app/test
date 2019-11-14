import React from "react";
import {createUseStyles} from "react-jss";
import clsx from "clsx";


const styles = {
    root: {
        boxShadow: "0 0 10px #999",
        width: 300,
        fontSize: 13,
        backgroundColor: "#fff",
        padding: "10px 0",
        margin: 0,
        "& li": {
            height: "36px",
            lineHeight: "36px",
            padding: "0 25px",
            cursor: "pointer",
            "&:hover": {
                background: "#ebedf0",
            }
        }
    },
    line: {
        borderBottom: "1px solid #ebedf0",
    }
};
const useStyles = createUseStyles(styles, {name: "ContextMenu"});
export default function ContextMenu() {
    const classes = useStyles();
    const data = [
        {value: "剪切", line: false, show: true, disable: false},
        {value: "复制", line: false, show: true, disable: false},
        {value: "粘贴", line: true, show: true, disable: true},
        {value: "合并单元格", line: true, show: true, disable: false},
        {value: "插入", line: false, show: true, disable: false},
        {value: "插入", line: false, show: true, disable: false},
        {value: "删除所在行", line: true, show: true, disable: false},
        {value: "插入", line: false, show: true, disable: false},
        {value: "插入", line: false, show: true, disable: false},
        {value: "删除所在列", line: true, show: true, disable: false},
        {value: "清除格式", line: false, show: true, disable: false},
        {value: "清楚内容", line: false, show: true, disable: false}
    ];
    return (
        <ul className={clsx(classes.root)}>
            {
                data.map((item) => (
                    <>
                        <li className={item.line ? clsx(classes.line) : ""}>{item.value}</li>
                    </>
                ))
            }
        </ul>
    );
}
