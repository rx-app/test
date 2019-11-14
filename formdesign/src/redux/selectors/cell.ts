import createCachedSelector from "re-reselect";
import {uniq, isString} from "lodash";

import {getNodeById, assertType, getNodes, assertExist} from "./node";
import {CellNode, NumberOrDependence} from "../interface/node";
import {StateType} from "../store";
import {selectorIgnoreStateChange, getIdFromArgs} from "./base";

export const getCellDepends = createCachedSelector(
    getNodeById,
    getIdFromArgs,
    (node) => {
        assertType(node, "cell");
        const {data} = node as CellNode;
        return uniq([data.left, data.top, data.width, data.height].filter(isString));
    }
)(getIdFromArgs);

export const getCellDependNodes = createCachedSelector(
    getNodes,
    getIdFromArgs,
    getCellDepends,
    (nodes, _, depends) => depends.map((d) => assertExist(nodes, d))
)(getIdFromArgs);

const get = function get<T>(o: {[key: string]: unknown}, key: string) {
    if (Reflect.has(o, key)) {
        return o[key] as T;
    }
    throw new Error(`Cannot find key:${key} in ${o}`);
};

const getCellValueDeep = function getCellValueDeep(
    val: NumberOrDependence,
    cb: (s: string) => {[key: string]: number},
    defKey: string,
): number {
    if (typeof val === "number") {
        return val;
    }
    return Array.isArray(val) ? get(cb(val[0]), val[1]) : get(cb(val), defKey);
};

export const getCellRect: (s: StateType, id: string) => {
    width: number;
    height: number;
    left: number;
    top: number;
    right: number;
    bottom: number;
} = createCachedSelector(
    (state) => state,
    getIdFromArgs,
    getNodeById,
    getCellDependNodes,
    (state, _, node) => {
        const cellData = assertType<CellNode>(node, "cell");
        const width = getCellValueDeep(cellData.width, (dep) => getCellRect(state, dep), "width");
        const height = getCellValueDeep(cellData.height, (dep) => getCellRect(state, dep), "height");
        const left = getCellValueDeep(cellData.left, (dep) => getCellRect(state, dep), "right");
        const top = getCellValueDeep(cellData.top, (dep) => getCellRect(state, dep), "bottom");
        const right = left + width;
        const bottom = top + height;
        return {width, height, left, top, right, bottom};
    }
)({keySelector: getIdFromArgs, selectorCreator: selectorIgnoreStateChange});
