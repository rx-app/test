import React, {FC, useEffect, Children, useContext} from "react";
import clsx from "clsx";

import {groupContext} from "./context";
import useStyles from "./styles";
import {useWidth} from "../../utils/useSize";


export interface ItemProps {
    priority?: number;
}


const Item: FC<ItemProps> = function Item(props) {
    const {children, priority} = props;
    Children.only(children);
    const {item} = useStyles(props);
    const updateSize = useContext(groupContext);
    const [width, wrapNode] = useWidth("ToolbarItem");

    useEffect(
        () => {
            if (updateSize === null) {
                return;
            }
            const {index, dispatch} = updateSize;
            if (width !== null) {
                dispatch({index, size: {width}, priority});
            }
        },
        [width, updateSize, priority],
    );

    return wrapNode(<div className={clsx(item)}>{children}</div>);
};

export default Item;
