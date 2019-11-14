import React, {FC, useEffect, useRef, useCallback, useMemo} from "react";
import {createUseStyles} from "react-jss";
import clsx from "clsx";

import HitableCanvas, {CanvasNode} from "../../utils/HitableCanvas";
import {debugLog} from "../../utils/isDebug";
import {canvasContext} from "./helper";

import Area from "./Area";
import Group from "./Group";
import Image from "./Image";
import Line from "./Line";
import Text from "./Text";

export {Area, Group, Image, Line, Text};


export interface HitableCanvasWrapperProps {
    debug?: boolean;
    width: number;
    height: number;
    onHit?: (node: CanvasNode | undefined, ev: Event) => void;
}

const styles = {
    root: {
        width: (props: HitableCanvasWrapperProps) => props.width,
        height: (props: HitableCanvasWrapperProps) => props.height,
        display: "block",
        background: "#fff",
    },
    debugDiv: {
        width: (props: HitableCanvasWrapperProps) => props.width,
        height: (props: HitableCanvasWrapperProps) => props.height,
    },
    posAbsoulte: {
        position: "absolute",
    },
    debugCanvas: {
        position: "absolute",
        width: (props: HitableCanvasWrapperProps) => props.width,
        height: (props: HitableCanvasWrapperProps) => props.height,
        pointerEvents: "none",
        opacity: "0.2",
    },
};
const useStyles = createUseStyles(styles, {name: "hitableCanvas"});

const HitableCanvasWrapper: FC<HitableCanvasWrapperProps> = function HitableCanvasWrapper(props) {
    const {debug, width, height, onHit = debugLog("CanvasHit"), children} = props;

    const classes = useStyles(props);

    const dirtyCheck = useMemo(() => {
        const dirty = {
            dirty: 0,
            setDirty() {
                dirty.dirty += 1;
            }
        };
        return dirty;
    }, []);
    const redraw = useCallback(() => dirtyCheck.setDirty(), [dirtyCheck]);

    const refCanvas = useRef<HTMLCanvasElement | null>(null);
    const refDebugCanvas = useRef<HTMLCanvasElement | null>(null);
    const hitableCanvas = useMemo(() => new HitableCanvas(), []);

    const onPointerDown = useCallback(
        (ev: React.PointerEvent<HTMLCanvasElement>) => {
            const {x: offsetX, y: offsetY, width: w, height: h} = (ev.target as HTMLCanvasElement).getBoundingClientRect() as DOMRect;
            const x = (ev.clientX - offsetX) / w * width;
            const y = (ev.clientY - offsetY) / h * height;
            onHit(hitableCanvas.hittest(x, y), ev.nativeEvent);
        },
        [hitableCanvas, width, height, onHit],
    );

    useEffect(
        () => {
            hitableCanvas.attach(refCanvas.current, refDebugCanvas.current);
            redraw();
        },
        [hitableCanvas, redraw],
    );

    useEffect(
        () => {
            hitableCanvas.resize(width, height);
            redraw();
        },
        [width, height, hitableCanvas, redraw],
    );

    useEffect(() => {
        let lastDirty = 0;
        let requestId: number;

        const animation = () => {
            const {dirty} = dirtyCheck;
            if (dirty !== lastDirty) {
                lastDirty = dirty;
                hitableCanvas.draw();
            }
            requestId = requestAnimationFrame(animation);
        };
        requestId = requestAnimationFrame(animation);
        return () => cancelAnimationFrame(requestId);
    }, [hitableCanvas, dirtyCheck]);

    let canvas;
    if (debug === true) {
        canvas = (
            <div className={clsx(classes.debugDiv)}>
                <canvas className={clsx(classes.root, classes.posAbsoulte)} ref={refCanvas} {...{width, height, onPointerDown}} />
                <canvas className={clsx(classes.debugCanvas)} ref={refDebugCanvas} />
            </div>
        );
    } else {
        canvas = <canvas className={clsx(classes.root)} ref={refCanvas} {...{width, height, onPointerDown}} />;
    }
    return (
        <canvasContext.Provider value={{
            add: (node) => {
                hitableCanvas.add(node);
                redraw();
            },
            remove: (node) => {
                hitableCanvas.remove(node);
                redraw();
            },
        }}
        >
            {canvas}
            {children}
        </canvasContext.Provider>
    );
};

export default HitableCanvasWrapper;
