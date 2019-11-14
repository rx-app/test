import React from "react";
import {createUseStyles} from "react-jss";
import clsx from "clsx";

const styles = {
    root: {
        background: "#fff",
        boxShadow: "0 0 10px #999",
        width: 270,
        overflow: "hidden",
        padding: 10,
        "& h5": {
            margin: "15px 0",
        }
    },
    ul: {
        padding: 0,
        listStyle: "none",
        "& li": {
            float: "left",
            width: "18px",
            height: "18px",
            cursor: "pointer",
            border: "2px solid #fff",
            "& span": {
                display: "inline-block",
                width: "14px",
                height: "14px",
                border: "2px solid #fff",
                textIndent: "-999px"
            },
            "&:hover": {
                border: "2px solid #b8ceee"
            }
        }
    }
};
const useStyles = createUseStyles(styles, {name: "ColorList"});
interface Props {
    onClose: (open: boolean) => void;
    setColor: (color: string) => void;
}
export default function ColorList(props: Props) {
    const classes = useStyles();
    const {setColor, onClose} = props;
    const colorList: string[] = ["", "#ff0000", "#ff7200", "#ffc000", "#f2fb00", "#a1f727", "#35e452", "#32e4de", "#1cacff", "#372dff", "#000000", "#fff", "#ffd3d3", "#ffddcc", "#fff1c6", "#f8fac9", "#eefcd9", "#e0fde5", "#ddfaf9", "#dff3ff", "#e0deff", "#7f7f7f", "#f4f4f4", "#ffa3a3", "#ffbe9e", "#ffe38f", "#dcfaaf", "#b8f7c3", "#bff8f6", "#bbe4fc", "#b8b4ff", "#595959", "#a8d08d"];
    return (
        <div className={clsx(classes.root)}>
            <h5>选择颜色</h5>
            <ul className={clsx(classes.ul)}>
                {colorList.map((item) => (
                    <li key={item}>
                        <span
                            style={{background: item}}
                            onClick={() => {
                                setColor(item);
                                onClose(false);
                            }}
                        >
                            {item}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
