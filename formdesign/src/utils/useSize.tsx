/* eslint-disable import/prefer-default-export */
import React, {useState, useCallback, FC} from "react";
import {withSize} from "react-sizeme";
import {debugLog} from "./isDebug";

interface SizeData {
    width: number | null;
    height: number | null;
    position?: {
        right: number;
        left: number;
        top: number;
        bottom: number;
    } | null;
}
type OnSize = (size: SizeData) => void;
const log = debugLog("useSize");

const EmptyNode = withSize({monitorPosition: true, noPlaceholder: true})<{onSize?: OnSize}>((function EmptyNode(props) {
    return props.children;
}) as FC);

const useWidth = function useWidth(debugName?: string): [number, (node: React.ReactElement) => React.ReactElement] {
    const [width, setWidth] = useState<number>(0);
    const onSize = useCallback<OnSize>(
        (size) => {
            log(debugName, size.position);
            if ((size.width !== null) && (size.width !== undefined) && (size.width !== width)) {
                setWidth(size.width);
            }
        },
        [debugName, width],
    );
    const wrapNode = useCallback(
        (node: React.ReactElement) => (
            <EmptyNode onSize={onSize}>
                {node}
            </EmptyNode>
        ),
        [onSize],
    );

    return [
        width,
        wrapNode
    ];
};

export {useWidth};
