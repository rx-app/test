import {connect} from "react-redux";

import {Text} from "../HitableCanvasWrapper";
import {StateType} from "../../redux/store";
import {getNodeById} from "../../redux/selectors/node";
import {TextNode} from "../../redux/interface/node";
import {getIsSelected} from "../../redux/selectors/selection";
import {getPaperOffset} from "../../redux/selectors/paper";

const mapStateToProps = (state: StateType, props: {id: string}) => {
    const {id} = props;
    const isSelect = getIsSelected(state, id);
    const node = getNodeById(state, id) as TextNode;
    const offset = getPaperOffset(state);
    const {data: {text, pos, style}} = node;

    return {
        text,
        width: 100,
        height: 100,
        options: {
            family: style.family!,
            size: style.size!,
            userData: node,
            color: isSelect ? "red" : undefined,
        },
        x: pos.x + offset.left,
        y: pos.y + offset.top,
    };
};

export default connect(mapStateToProps)(Text);
