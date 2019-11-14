import {mapValues} from "lodash";
import unit from "./unit";

export type Layout = "landscape" | "portrait"; // 横向 | 纵向
export type PaperType = "A1" | "A2" | "A3" | "A4" | "A5" | "B1" | "B2" | "B3" | "B4" | "B5";

export const PAPER_IN_PORTRAIT: {[key in PaperType]: string} = {
    A1: "594mm*840mm",
    A2: "420mm*594mm",
    A3: "297mm*420mm",
    A4: "210mm*297mm",
    A5: "148mm*210mm",
    B1: "706mm*1000mm",
    B2: "500mm*706mm",
    B3: "353mm*500mm",
    B4: "250mm*353mm",
    B5: "176mm*250mm",
};

const regSize = /^(\d+(?:\.\d+)?(?:mm|cm|inch|pixel)?)\*(\d+(?:\.\d+)?(?:mm|cm|inch|pixel)?)$/;
export const getPaperSize = function getPaperSize(type: PaperType | string, layout: Layout = "portrait") {
    const paperSize = Reflect.has(PAPER_IN_PORTRAIT, type) ? PAPER_IN_PORTRAIT[type as PaperType] : type;
    const match = regSize.exec(paperSize);
    if (match === null) {
        throw new Error("not valid paper size");
    }
    const width = match[1];
    const height = match[2];
    return mapValues(layout === "portrait" ? {width, height} : {width: height, height: width}, unit.toPixel);
};
