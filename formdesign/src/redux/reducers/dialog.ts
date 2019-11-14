import {Reducer} from "redux";
import {DialogAction} from "../actions";

export interface DialogState {
    show: string[];
}

const initState: DialogState = {
    show: [],
};

const dialog: Reducer<DialogState, DialogAction> = function dialog(state = initState, action: DialogAction) {
    const {type} = action;
    switch (type) {
        default:
            return state;
        case "SetDialogVisiable": {
            const {show} = action;
            return {
                ...state,
                show
            };
        }
    }
};

export default dialog;
