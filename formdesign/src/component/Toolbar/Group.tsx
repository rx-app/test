import React, {FC, Children, useMemo, useReducer, useContext, Reducer} from "react";
import PropTypes from "airbnb-prop-types";
import clsx from "clsx";

import useStyles from "./styles";
import Item from "./Item";
import {groupContext, toolbarContext} from "./context";
import Sperator from "./Sperator";
import More, {MoreWidth} from "./More";


export interface GroupProps {
    name: string;
}

const Group: FC = function Group(props) {
    const {children} = props;
    const classes = useStyles();
    const context = useContext(toolbarContext);
    const {index: gId = 0, count = 0, width: tbWidth = 0} = context === null ? {} : context;

    const [itemSize, dispatch] = useReducer<Reducer<number[], {index: number; size: {width: number}; priority?: number}>>(
        (state, action) => {
            const {index, size} = action;
            if (state[index] !== size.width) {
                const newState = [...state];
                newState[index] = size.width;
                return newState;
            }
            return state;
        },
        [],
    );

    const wrapped = useMemo(() => {
        let newWidth = itemSize[0] + MoreWidth;
        let i = 1;
        while (newWidth + itemSize[i] < tbWidth) {
            newWidth += itemSize[i];
            i += 1;
        }
        const wrappedItem = [];
        while (i < itemSize.length) {
            wrappedItem.push(i);
            i += 1;
        }

        return wrappedItem;
    }, [tbWidth, itemSize]);

    const childrenWithContext = useMemo(
        () => Children.map(children, (child, index) => (
            wrapped.includes(index)
                ? null
                : (
                    <groupContext.Provider value={{dispatch, index}}>
                        {child}
                    </groupContext.Provider>
                )
        )),
        [children, wrapped],
    );

    const moreChildren = useMemo(() => {
        const childrenArray = Children.toArray(children);
        return <More>{wrapped.map((i) => childrenArray[i])}</More>;
    }, [children, wrapped]);

    return context === null
        ? null
        : (
            <>
                <div className={clsx(classes.toolbarGroup)}>
                    {childrenWithContext.filter((_v, i) => !wrapped.includes(i))}
                    {wrapped.length >= 1 ? moreChildren : null}
                    {gId !== count - 1 ? <Sperator /> : null}
                </div>
            </>
        );
};

Group.propTypes = {
    children: PropTypes.childrenOfType(Item).isRequired,
};

export default Group;
