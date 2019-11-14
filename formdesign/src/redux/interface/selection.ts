export interface SelectAction {
    type: "selectItem" | "unselectItem";
    items: string[];
}

export interface ClearSelectiontAction {
    type: "clearSelection";
}

export interface ToggleSelectAction {
    type: "toggleSelectItem";
    items: string[];
}


export type SelectionAction = SelectAction | ClearSelectiontAction | ToggleSelectAction;
