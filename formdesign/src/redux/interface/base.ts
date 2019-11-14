import {ThunkAction} from "redux-thunk";
import {Action, AnyAction} from "redux";

import {StateType} from "../store";

export type ActionWithState<T extends Action = AnyAction> = ThunkAction<void, StateType, undefined, T>;
