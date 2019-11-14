import {Reducer} from "redux";
import {keyBy} from "lodash";
import {BaseNode, NodeAction} from "../interface/node";

export type NodeState = Record<string, BaseNode>;

const nodeReducer: Reducer<NodeState, NodeAction> = function nodeReducer(state: NodeState = {}, action: NodeAction) {
    switch (action.type) {
        default:
            return state;
        case "addNode":
            if (state[action.node.id] !== undefined) {
                throw new Error(`Cannot add node with duplicate id:${action.node.id}`);
            }
            return {...state, [action.node.id]: action.node};
        case "addNodes": {
            const nodesMap = keyBy(action.nodes, (node) => {
                if (state[node.id] !== undefined) {
                    throw new Error(`Cannot add node with duplicate id:${node.id}`);
                }
                return node.id;
            });
            return {...state, ...nodesMap};
        }
        case "updateNode":
            if (state[action.node.id] === undefined) {
                throw new Error(`Node not found, id:${action.node.id}`);
            }
            return {...state, [action.node.id]: action.node};
    }
};

export default nodeReducer;
