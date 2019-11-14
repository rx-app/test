import createLine from "../../utils/HitableCanvas/line";
import {createSubNode} from "./helper";

export interface LineProps {
    x1: number;
    y1: number;
    x2?: number;
    y2?: number;
    options?: {
        id?: string;
        color?: string;
        zOrder?: number;
        userData?: unknown;
        width?: number;
        hitWidth?: number;
    };
}

const Line = createSubNode<LineProps>((props) => {
    const {x1, y1, x2 = x1, y2 = y1, options} = props;
    if ((x1 === x2) && (y1 === y2)) {
        throw new Error(`Line should not have 0 lenght (${x1},${y1}), (${x2},${y2})`);
    }

    return createLine({x: x1, y: y1}, {x: x2, y: y2}, options);
});

export default Line;
