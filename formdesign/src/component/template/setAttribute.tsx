import React from "react";
import {createUseStyles} from "react-jss";
import clsx from "clsx";

import {connect} from "react-redux";
import {StateType} from "../../redux/store";
import WidthAndHeight from "./attribute/widthAndHeight";
import ObliqueLine from "./attribute/obliqueLine";
import Type from "./attribute/type";
import Font from "./attribute/font";
import Alignment from "./attribute/alignment";

const styles = {
    root: {
        position: "fixed",
        top: 0,
        bottom: 0,
        right: 0,
        zIndex: 999,
        width: 300,
        fontSize: 13,
        backgroundColor: "#f5f6f8",
        lineHeight: "30px",
        margin: 0,
        "& label": {
            display: "inline-block",
            width: 80,
            height: 32,
            lineHeight: "32px",
            float: "left",
        },
    },
    title: {
        padding: 15,
        fontSize: 15,
        borderBottom: "1px solid #dcdce5",
    },

    ul: {
        listStyle: "none",
        padding: "0 10px",
        margin: 0,
        "& li": {
            overflow: "hidden",
            margin: "10px 0",
            "& div": {
                display: "flex",
                justifyContent: "space-around",
                width: 193,
                float: "right",
                "& span label": {
                    width: "auto",
                }
            },
        }
    },

};
const useStyles = createUseStyles(styles, {name: "ContextMenu"});
const attributeType = (type: string) => {
    switch (type) {
        case "0":
            return <Alignment />;
            break;
        case "1":
            return <ObliqueLine />;
            break;
        case "2":
            return <Type />;
            break;
        case "3":
            return <Font />;
            break;
        case "4":
            return <WidthAndHeight />;
            break;
        default:
            return "";
            break;
    }
};

export interface Props {
    show: string[];
}

const ContextMenu = (props: Props) => {
    const classes = useStyles();
    const {show} = props;

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.title)}>单元格配置</div>
            <ul className={clsx(classes.ul)}>
                {show.length !== 0 ? attributeType(show[0]) : null}
            </ul>
        </div>
    );
};

const mapStateToProps = function mapStateToProps(state: StateType) {
    return {
        show: state.dialog.show,
    };
};

// const mapDispatchToProps = (dispatch) => {
//     return {
//         changeShow() {
//             dispatch({
//                 show: ["0"],
//                 type: "SetDialogVisiable",
//             })
//         }
//     }
// }

export default connect(mapStateToProps, null)(ContextMenu);
