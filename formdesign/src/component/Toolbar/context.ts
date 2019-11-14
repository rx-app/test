import {createContext} from "react";

export interface GroupContext {
    index: number;
    dispatch: (action: {index: number; size: {width: number}; priority?: number}) => void;
}

export interface ToolbarContext {
    index: number;
    count: number;
    width: number;
}

export const groupContext = createContext<GroupContext | null>(null);

export const toolbarContext = createContext<ToolbarContext | null>(null);
