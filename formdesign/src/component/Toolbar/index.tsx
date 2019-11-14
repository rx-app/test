import React, {FC, useMemo, Children} from "react";
import clsx from "clsx";
import PropTypes from "airbnb-prop-types";

import useStyles from "./styles";
import Group from "./Group";
import Item from "./Item";
import {toolbarContext} from "./context";
import {useWidth} from "../../utils/useSize";

const Toolbar: FC = function Toolbar(props) {
    const {children} = props;
    Children.only(children); // todo: to support multipy groups
    const classes = useStyles();
    const [width, wrapper] = useWidth("toolbar");
    const groups = useMemo(
        () => {
            const count = Children.count(children);
            return Children.map(
                children,
                (child, index) => <toolbarContext.Provider value={{count, index, width}}>{child}</toolbarContext.Provider>
            );
        },
        [children, width],
    );
    return wrapper(
        <div className={clsx(classes.toolbar)}>
            {groups}
        </div>
    );
};

Toolbar.propTypes = {
    children: PropTypes.childrenOfType(Group),
};

export default Toolbar;
export {Group, Item};
