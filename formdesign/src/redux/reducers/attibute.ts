import {Reducer} from "redux";
import {DialogAction} from "../actions";
// import {getPaperSize} from "../../utils/paperHelper";
// import {getMargin} from "../../utils/marginHelper";

export interface DialogState {
    show: string[]
}

const initState: DialogState = {
    show: ["0"],
};

const dialog: Reducer<DialogState, DialogAction> = function paper(state = initState, action: DialogAction) {
    const {type} = action;
    switch (type) {
        default:
            return state;
        case "SetDialogVisiable":
            {
                const {show} = action;
                return {
                    ...state,
                    show
                };
            }
    }
};

export default dialog;
