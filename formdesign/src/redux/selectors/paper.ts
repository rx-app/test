import {StateType} from "../store";

export const getPaperAreaWidth = ({paper}: StateType) => paper.size.width - paper.margin.left - paper.margin.right;

export const getPaperOffset = ({paper}: StateType) => ({top: paper.margin.top, left: paper.margin.left});
