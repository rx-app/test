export interface SetPaperSizeAction {
    type: "setPaperSize";
    width: number;
    height: number;
}

export type PaperAction = SetPaperSizeAction;
