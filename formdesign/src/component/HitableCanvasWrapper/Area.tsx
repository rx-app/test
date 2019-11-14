import createArea from "../../utils/HitableCanvas/area";
import {createSubNode} from "./helper";

export interface AreaProps {
    x: number;
    y: number;
    width: number;
    height: number;
    options?: {
        id?: string;
        zOrder?: number;
        userData?: unknown;
        color?: string;
    };
}

const Area = createSubNode<AreaProps>((props) => {
    const {x, y, width, height, options} = props;
    return createArea({x, y}, {width, height}, options);
});

export default Area;
