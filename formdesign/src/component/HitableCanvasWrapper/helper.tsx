import {useContext, useEffect, FC, createContext} from "react";
import {CanvasNode} from "../../utils/HitableCanvas";


export interface CanvasContextType {
    add: (node: CanvasNode) => void;
    remove: (node: CanvasNode) => void;
}
export const canvasContext = createContext<CanvasContextType | null>(null);
export const createSubNode = function createSubNode<T>(creator: (props: T) => CanvasNode) {
    return ((props: T) => {
        const canvas = useContext(canvasContext);
        useEffect(() => {
            if (canvas !== null) {
                const node = creator(props);
                canvas.add(node);
                return () => {
                    canvas.remove(node);
                };
            }
            return undefined;
        }, [canvas, props]);
        return null;
    }) as FC<T>;
};
