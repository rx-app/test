import {SetDialogVisiableAction} from "../interface/attibute";


export const SetDialogVisiable = function SetDialogVisiable(show: string[]): SetDialogVisiableAction {
    return {
        show,
        type: "SetDialogVisiable",
    };
};
