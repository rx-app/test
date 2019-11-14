import {Reducer} from "redux";

import {NodeAction} from "../actions";
import {TextStyle} from "../interface/style";

export interface StyleState {
    text?: Record<string, TextStyle>;
}

const styleReducer: Reducer<StyleState, NodeAction> = function styleReducer(state: StyleState = {}, _action: NodeAction) {
    return state;
};

export default styleReducer;
