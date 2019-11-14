import {jss} from "react-jss";

const styles = {
    "@global": {
        body: {
            width: "100%",
            height: "100%",
            margin: 0,
        }
    },
};

const globalStyle = jss.createStyleSheet(styles, {meta: "globalStyle", index: -1});

globalStyle.attach();
export default globalStyle;
