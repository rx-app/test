import {createSelector} from "reselect";
import createCachedSelector from "re-reselect";
import {values, keys} from "lodash";

import {StateType} from "../store";
import {BaseNode} from "../interface/node";
import {getIdFromArgs} from "./base";


export const getNodes = function getNodes(state: StateType) {
    return state.node;
};

export const getNodeArray = createSelector(getNodes, (nodes) => values(nodes));

export const getNodeIds = createSelector(getNodes, (nodes) => keys(nodes));


export const assertExist = function assertExist(nodes: Record<string, BaseNode>, nodeId: string): BaseNode {
    if (nodes[nodeId] === undefined) {
        throw new Error(`Node not found, id:${nodeId}`);
    }
    return nodes[nodeId];
};

export const assertType = function assertType<T extends BaseNode>(node: BaseNode, type: string): (T["data"]) {
    if (node.type !== type) {
        throw new Error(`${node.id} is not a ${type} node`);
    }
    return (node as T).data;
};

export const getNodeById = createCachedSelector(
    getNodes,
    getIdFromArgs,
    (nodes, id) => {
        assertExist(nodes, id);
        return nodes[id];
    }
)(getIdFromArgs);
