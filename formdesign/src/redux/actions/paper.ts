import {PaperType, getPaperSize} from "../../utils/paperHelper";
import {SetPaperSizeAction} from "../interface/paper";

export const setPaperType = function setPaperType(type: PaperType): SetPaperSizeAction {
    const {width, height} = getPaperSize(type);
    return {
        width,
        height,
        type: "setPaperSize",
    };
};

export const setPaperSize = function setPaperSize(size: string): SetPaperSizeAction {
    const {width, height} = getPaperSize(size);
    return {
        width,
        height,
        type: "setPaperSize",
    };
};
