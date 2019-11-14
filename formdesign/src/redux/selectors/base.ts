import {createSelectorCreator, defaultMemoize} from "reselect";

import store, {StateType} from "../store";

export const selectorIgnoreStateChange = createSelectorCreator(
    defaultMemoize,
    (prev, cur) => cur === prev || (cur as unknown as StateType) === store.getState(),
);

export const getIdFromArgs = function getNodeIdFromArgs(_: StateType, id: string) {
    return id;
};
