import {SetDialogVisiableAction} from "../interface/dialog";

export default function SetDialogVisiable(show: string[]): SetDialogVisiableAction {
    return {
        show,
        type: "SetDialogVisiable",
    };
}
