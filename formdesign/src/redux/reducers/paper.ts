import {Reducer} from "redux";
import {PaperAction} from "../actions";
import {getPaperSize} from "../../utils/paperHelper";
import {getMargin} from "../../utils/marginHelper";

export interface PaperState {
    size: {
        width: number;
        height: number;
    };
    margin: {
        top: number;
        bottom: number;
        left: number;
        right: number;
    };
}

const initState: PaperState = {
    size: getPaperSize("A4"),
    margin: getMargin("normal"),
};

const paper: Reducer<PaperState, PaperAction> = function paper(state = initState, action: PaperAction) {
    const {type} = action;
    switch (type) {
        default:
            return state;
        case "setPaperSize":
        {
            const {width, height} = action;
            return {
                ...state,
                size: {width, height}
            };
        }
    }
};

export default paper;
