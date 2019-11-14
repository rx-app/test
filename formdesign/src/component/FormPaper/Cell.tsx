import React, {FC} from "react";
import {connect} from "react-redux";
import {Group, Line, Area} from "../HitableCanvasWrapper";
import {getCellRect} from "../../redux/selectors/cell";
import {StateType} from "../../redux/store";
import {getPaperOffset} from "../../redux/selectors/paper";

export interface CellProps {
    width: number;
    height: number;
    left: number;
    top: number;
    background?: string;
}

const Cell: FC<CellProps> = function Cell(props) {
    const {width, height, left, top, background} = props;
    const options = {color: "blue", hitWidth: 9};
    const bottom = top + height;
    const right = left + width;

    return (
        <Group>
            <Line x1={left} x2={right} y1={top} {...{options}} />
            <Line x1={left} x2={right} y1={bottom} {...{options}} />
            <Line x1={left} y1={top} y2={bottom} {...{options}} />
            <Line x1={right} y1={top} y2={bottom} {...{options}} />
            {background !== undefined ? <Area x={left} y={top} options={{color: background}} {...{width, height}} /> : null}
        </Group>
    );
};

const mapStateToProps = (state: StateType, props: {id: string}) => {
    const {id} = props;
    const {width, height, top, left} = getCellRect(state, id);
    const offset = getPaperOffset(state);


    return {
        width,
        height,
        top: offset.top + top,
        left: offset.left + left,
    };
};

export default connect(mapStateToProps)(Cell);
