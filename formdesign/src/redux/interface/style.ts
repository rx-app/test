import {AlignV, AlignH} from "../../utils/HitableCanvas/text";

export interface TextStyle {

    family?: string;
    size?: number;
    lineHeight?: number;
    alignH?: AlignH;
    alignV?: AlignV;
    color?: string;
    bold?: boolean;
    italic?: boolean;
    underLine?: boolean;
    underLineColor?: string;
    strike?: boolean;
}
