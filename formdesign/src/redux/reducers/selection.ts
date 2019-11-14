import {Reducer} from "redux";
import {difference, union, xor} from "lodash";

import {SelectionAction} from "../interface/selection";



export type SelectionState = string[];



const selection: Reducer<SelectionState, SelectionAction> = function selection(state = [], action) {
    switch (action.type) {
        default: return state;
        case "clearSelection":
            return [];
        case "selectItem":
            return union(state, action.items);
        case "unselectItem":
            return difference(state, action.items);
        case "toggleSelectItem":
            return xor(state, action.items);
    }
};

export default selection;
