import createCachedSelector from "re-reselect";
import {StateType} from "../store";
import {getIdFromArgs} from "./base";


export const getSelection = (s: StateType) => s.selection;
export const getIsSelected = createCachedSelector(
    getSelection,
    getIdFromArgs,
    (selection, id) => selection.includes(id)
)(getIdFromArgs);
