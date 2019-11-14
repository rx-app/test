import React, {FC, useMemo, useCallback} from "react";
import {connect} from "react-redux";
import {createUseStyles} from "react-jss";
import clsx from "clsx";

import HitableCanvasWrapper from "../HitableCanvasWrapper";
import {StateType} from "../../redux/store";
import {BaseNode} from "../../redux/interface/node";
import {toggleSelectItem} from "../../redux/actions/selection";
import {CanvasNode} from "../../utils/HitableCanvas";
import isDebug from "../../utils/isDebug";
import Cell from "./Cell";
import Text from "./Text";
import {getNodeArray} from "../../redux/selectors/node";

const styles = {
    root: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
    },
    paper: {
        margin: "5px",
    }
};

const useStyles = createUseStyles(styles, {name: "fromPaper"});

export interface Size {
    width: number;
    height: number;
}

export interface MarginSetting {
    left: number;
    right: number;
    top: number;
    bottom: number;
}

export interface FromPaperProps {
    size: Size;
    margin: MarginSetting;
    elements: BaseNode[];
    onHit: (item: string) => void;
}

const FromPaper: FC<FromPaperProps> = function FromPaper(props) {
    const {size, elements, onHit} = props;
    const {root, paper} = useStyles();

    const eleNodes = useMemo(() => elements.map(({id, type}) => {
        switch (type) {
            default: return null;
            case "text":
                return <Text key={id} id={id} />;
            case "cell": {
                return <Cell key={id} id={id} />;
            }
        }
    }), [elements]);

    const onHitCallback = useCallback((node: CanvasNode | undefined) => {
        if (node !== undefined) {
            onHit((node.userData as BaseNode).id);
        }
    }, [onHit]);
    return (
        <div className={clsx(root)}>
            <div className={clsx(paper)}>
                <HitableCanvasWrapper {...size} onHit={onHitCallback} debug={isDebug("canvas", false)}>{eleNodes}</HitableCanvasWrapper>
            </div>
        </div>
    );
};

const mapStateToProps = function mapStateToProps(state: StateType) {
    return {
        size: state.paper.size,
        margin: state.paper.margin,
        elements: getNodeArray(state),
    };
};

const mapDispatchToProps = {onHit: toggleSelectItem};

export default connect(mapStateToProps, mapDispatchToProps)(FromPaper);
