import React, {FC} from "react";
import {createUseStyles, useTheme} from "react-jss";
import clsx from "clsx";
import ScrollBar from "react-scrollbars-custom";

import {ThemeType} from "../../styles/theme";

const styles = {
    root: {
        position: "absolute",
        top: "0",
        bottom: "0",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        background: ({theme}: {theme: ThemeType}) => theme.bg,
    },
    Header: {top: "0"},
    Footer: {bottom: "0"},
    Main: {flex: "1", overflow: "hidden"},
};

const useStyles = createUseStyles(styles, {name: "fullpage"});

const FullPage: FC = function FullPage(props) {
    const {children} = props;
    const theme = useTheme();
    const classes = useStyles({theme});
    return (
        <div className={clsx(classes.root)}>
            {children}
        </div>
    );
};

export const Header: FC = function Top(props) {
    const {children} = props;
    const theme = useTheme();
    const classes = useStyles({theme});
    return (
        <div className={clsx(classes.Header)}>
            {children}
        </div>
    );
};

export const Footer: FC = function Bottom(props) {
    const {children} = props;
    const theme = useTheme();
    const classes = useStyles({theme});
    return (
        <div className={clsx(classes.Footer)}>
            {children}
        </div>
    );
};

export const Main: FC = function Body(props) {
    const {children} = props;
    const theme = useTheme();
    const classes = useStyles({theme});
    return (
        <ScrollBar className={clsx(classes.Main)}>
            {children}
        </ScrollBar>
    );
};

export default FullPage;
