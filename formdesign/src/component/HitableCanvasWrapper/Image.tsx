import createImage from "../../utils/HitableCanvas/image";
import {createSubNode} from "./helper";

export interface ImageProps {
    x: number;
    y: number;
    width: number;
    height: number;
    url: string;
    options?: {
        id?: string;
        zOrder?: number;
        userData?: unknown;
        originPos?: "center" | "topLeft";
        background?: string;
    };
}

const Image = createSubNode<ImageProps>((props) => {
    const {x, y, width, height, url, options} = props;
    return createImage(url, {x, y}, {width, height}, options);
});

export default Image;
