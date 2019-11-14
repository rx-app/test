import React, {memo, FC} from "react";
import clsx from "clsx";
import useStyles from "./styles";

const Sperator = memo(function Sperator() {
    const {sperator} = useStyles();
    return <span className={clsx(sperator)} />;
} as FC);
export default Sperator;
