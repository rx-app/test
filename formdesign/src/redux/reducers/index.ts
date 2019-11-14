import {combineReducers} from "redux";
import paper from "./paper";
import node from "./node";
import style from "./style";
import selection from "./selection";
import dialog from "./dialog";

export default combineReducers({paper, node, style, selection, dialog});
