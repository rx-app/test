import React from "react";
import {createUseStyles} from "react-jss";
import clsx from "clsx";
import Select from "../select";
import SingleButton from "../button";

const styles = {
    div: {
        margin: "10px 0 0",
        "& div:nth-child(1)": {
            flex: 2,
        },
        "& div:nth-child(2)": {
            flex: 1,
        }
    },
    groupBtn: {
        marginRight: 5,
        border: "1px solid #c9c9cf",
        borderRight: 0,
        "& svg": {
            margin: 0,
            width: "100%",
            padding: "7px 0",
            borderRight: "1px solid #c9c9cf",
        }
    }
};
const useStyles = createUseStyles(styles, {name: "Font"});
export default function Font() {
    const classes = useStyles();
    return (
        <li>
            <label>字体</label>
            <div>
                <Select data={[{value: "111111111111111111111111111111333331111112222", key: "1"}, {value: "1", key: "1"}]} />
            </div>
            <div className={clsx(classes.div)}>
                <Select data={[{value: "111111111111111111111111111111333331111112222", key: "1"}, {value: "1", key: "1"}]} />
                <Select data={[{value: "111111111111111111111111111111333331111112222", key: "1"}, {value: "1", key: "1"}]} />
            </div>
            <div className={clsx(classes.div)}>
                <div className={clsx(classes.groupBtn)}>
                    <SingleButton title="加粗" action="加粗" icon="#icon-jiacu" />
                    <SingleButton title="倾斜" action="倾斜" icon="#icon-qingxie" />
                    <SingleButton title="下划线" action="下划线" icon="#icon-xiahuaxian" />
                </div>
                <Select data={[{value: "111111111111111111111111111111333331111112222", key: "1"}, {value: "1", key: "1"}]} />
            </div>
        </li>
    );
}
