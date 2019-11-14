import createText, {TextOptions} from "../../utils/HitableCanvas/text";
import {createSubNode} from "./helper";

export interface TextProps {
    x: number;
    y: number;
    width: number;
    height: number;
    text: string;
    options: TextOptions;
}

const Text = createSubNode<TextProps>((props) => {
    const {x, y, width, height, text, options} = props;
    return createText({x, y}, {width, height}, text, options);
});

export default Text;
