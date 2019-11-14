import {createUseStyles} from "react-jss";

const styles = {
    toolbar: {
        width: "100%",
        height: 100,
        "& span": {
            display: "inline-block",
        }
    },
    toolbarGroup: {
        display: "inline-block",
        overflowY: "auto",
        whiteSpace: "nowrap",
    },
    item: {
        display: "inline-block",
    },
    sperator: {
        "&:after": {
            // display: "inline-block",
            content: "'分隔符'",
        },
    },
    more: {
        "&:after": {
            // display: "inline-block",
            content: "'更多'",
        },
    },
    moreItem: {
        whiteSpace: "normal",
        position: "absolute",
        marginTop: "5px",
        marginLeft: "30px",
        background: "white",
        zIndex: "101",
    },
};

const useStyles = createUseStyles(styles, {name: "toolbar"});
export default useStyles;
