import React, {FC, useContext, useReducer, useEffect} from "react";
import createGroup from "../../utils/HitableCanvas/group";
import {CanvasNode} from "../../utils/HitableCanvas";
import {canvasContext} from "./helper";

const groupReducer = function groupReducer(items: CanvasNode[], action: {type: "add" | "remove"; node: CanvasNode}) {
    switch (action.type) {
        case "add":
            items.push(action.node);
            return items;
        case "remove": {
            const index = items.indexOf(action.node);
            if (index !== -1) {
                items.splice(items.indexOf(action.node), 1);
                return items;
            }
            return items;
        }
        default:
            throw new Error("unknown action");
    }
};
export interface GroupProps {
    userData?: unknown;
}

const Group: FC<GroupProps> = function Group(props) {
    const {children, userData} = props;

    const canvas = useContext(canvasContext);
    const [groupItems, dispatch] = useReducer(groupReducer, []);
    useEffect(() => {
        if (canvas !== null) {
            const node = createGroup(groupItems, {userData});
            canvas.add(node);
            return () => {
                canvas.remove(node);
            };
        }
        return undefined;
    }, [groupItems, canvas, userData]);

    return (
        <canvasContext.Provider value={
            {
                add: (node) => dispatch({type: "add", node}),
                remove: (node) => dispatch({type: "remove", node}),
            }
        }
        >
            {children}
        </canvasContext.Provider>
    );
};

export default Group;
