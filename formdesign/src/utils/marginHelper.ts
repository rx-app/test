import {mapValues} from "lodash";
import unit, {SizeValue} from "./unit";

export interface Margin4 {
    left: SizeValue;
    right: SizeValue;
    top: SizeValue;
    bottom: SizeValue;
}
export interface Margin2 {
    leftRight: SizeValue;
    topBottom: SizeValue;
}

export type MarginSetting = Margin4 | Margin2 | SizeValue;

export const DEFAULT_MARGINS: {[key: string]: MarginSetting} = {
    normal: {topBottom: "25.4mm", leftRight: "31.8mm"},
    narrow: "12.7mm",
    moderate: {topBottom: "25.4mm", leftRight: "19.1mm"},
    wide: {topBottom: "25.4mm", leftRight: "50.8mm"},
};

export const getMargin = function getMargin(
    setting: (keyof typeof DEFAULT_MARGINS) | MarginSetting
): {left: number; right: number; top: number; bottom: number} {
    if (typeof setting === "string") {
        if (Reflect.has(DEFAULT_MARGINS, setting)) {
            return getMargin(DEFAULT_MARGINS[setting]);
        }
        const margin = unit.toPixel(setting);
        return {left: margin, right: margin, top: margin, bottom: margin};
    }
    if (typeof setting === "number") {
        const margin = unit.toPixel(setting);
        return {left: margin, right: margin, top: margin, bottom: margin};
    }
    if (Reflect.has(setting, "left")) {
        const {left, right, top, bottom} = mapValues(setting as Margin4, unit.toPixel);
        return {left, right, top, bottom};
    }
    const {leftRight, topBottom} = mapValues(setting as Margin2, unit.toPixel);
    return {left: leftRight, right: leftRight, top: topBottom, bottom: topBottom};
};
