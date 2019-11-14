import {castArray} from "lodash";

import {SelectAction, ClearSelectiontAction, ToggleSelectAction} from "../interface/selection";
import {ActionWithState} from "../interface/base";
import {getNodeIds} from "../selectors/node";



// const getIDs = function getIDs(items: BaseNode | BaseNode[]) {
//     return castArray(items).map((node) => node.id);
// };
export const selectItem = function selectItem(items: string | string[]): SelectAction {
    return {
        type: "selectItem",
        items: castArray(items),
    };
};

export const unselectItem = function unSelectItem(items: string | string[]): SelectAction {
    return {
        type: "unselectItem",
        items: castArray(items),
    };
};

export const clearSelection = function clearSelection(): ClearSelectiontAction {
    return {type: "clearSelection"};
};

export const toggleSelectItem = function toggleSelectItem(items: string | string[]): ToggleSelectAction {
    return {
        type: "toggleSelectItem",
        items: castArray(items),
    };
};

export const selectAll = function selectAll(): ActionWithState {
    return (dispatch, getState) => {
        dispatch(selectItem(getNodeIds(getState())));
    };
};

export const reverseSelect = function reverseSelect(): ActionWithState {
    return (dispatch, getState) => {
        dispatch(toggleSelectItem(getNodeIds(getState())));
    };
};
