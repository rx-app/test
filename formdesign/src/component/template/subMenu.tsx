import React from "react";

import PaperDirection from "./paperDirection";
import PaperMargins from "./paperMargins";
import PaperSize from "./paperSize";
import PaperTable from "./paperTable";
import PaperBorder from "./paperBorder";

const paper = (type: string) => {
    switch (type) {
        case "边框设置":
            return <PaperBorder />;
            break;
        case "纸张大小":
            return <PaperSize />;
            break;
        case "纸张方向":
            return <PaperDirection />;
            break;
        case "页边距":
            return <PaperMargins />;
            break;
        case "边框设置":
            return <PaperBorder />;
            break;
        case "绘制表格":
            return <PaperTable />;
            break;
        default:
            return "";
            break;
    }
};
interface Props {
    type: string;
}
export default function SubMenu(props: Props) {
    const {type} = props;
    return <>{paper(type)}</>;
}
