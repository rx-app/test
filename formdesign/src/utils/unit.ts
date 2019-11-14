import {partialRight, spread, flow, round} from "lodash";

export type SizeValue = number | string;
export type Unit = "mm" | "cm" | "inch" | "pixel";

const PPI = 96.0;
const MM_PER_INCH = 25.4;
const CONVERSIONS: {[to in Unit]?: {[from in Unit]?: number}} = {
    pixel: {
        pixel: 1,
        inch: PPI,
        mm: PPI / MM_PER_INCH,
        cm: PPI / MM_PER_INCH * 10,

    },
    inch: {
        pixel: 1 / PPI,
        inch: 1,
        mm: 1 / MM_PER_INCH,
        cm: 1 / MM_PER_INCH * 10,
    },
    mm: {
        pixel: MM_PER_INCH / PPI,
        inch: MM_PER_INCH,
        mm: 1,
        cm: 10,
    },
    cm: {
        pixel: MM_PER_INCH / 10 / PPI,
        inch: MM_PER_INCH / 10,
        mm: 0.1,
        cm: 1,
    },
};

export const convert = function convert(value: number, srcUnit: Unit, tarUnit: Unit, precision = 5) {
    if (!Reflect.has(CONVERSIONS, tarUnit)) {
        throw new Error(`Cannot convert to ${tarUnit}`);
    }
    if (!Reflect.has(CONVERSIONS[tarUnit]!, srcUnit)) {
        throw new Error(`Cannot convert from ${srcUnit} to ${tarUnit}`);
    }
    return round(CONVERSIONS[tarUnit]![srcUnit]! * value, precision);
};

const regValueWithUnit = /^(-?\d+(?:\.\d+)?)(mm|cm|inch|pixel)?$/;

export type ConvertFunc = (value: SizeValue) => number;
export type CustomConvertFunc = (value: SizeValue, unit: Unit) => number;

export const createUnitConverter = function createUnitConverter(defUnit: Unit) {
    const getValueUnit = function getValueUnit(value: SizeValue): [number, Unit] {
        if (typeof value === "number") {
            return [value, defUnit];
        }
        const match = regValueWithUnit.exec(value);
        if (match === null) {
            throw new Error("Invalid value");
        }
        return [parseFloat(match[1]), match[2] === undefined ? defUnit : match[2] as Unit];
    };

    return {
        toPixel: flow([getValueUnit, spread(partialRight(convert, "pixel", 0))]) as ConvertFunc,
        toCM: flow([getValueUnit, spread(partialRight(convert, "cm", 3))]) as ConvertFunc,
        toMM: flow([getValueUnit, spread(partialRight(convert, "mm", 2))]) as ConvertFunc,
        toInch: flow([getValueUnit, spread(partialRight(convert, "inch", 3))]) as ConvertFunc,
        convert: ((value, unit, precision = 5) => {
            const valueUnit = getValueUnit(value);
            return convert(valueUnit[0], valueUnit[1], unit, precision);
        }) as CustomConvertFunc,
    };
};

export default createUnitConverter("mm");
