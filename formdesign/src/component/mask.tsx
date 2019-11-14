import React, {FC, useRef, useEffect} from "react";
import {createUseStyles} from "react-jss";
import clsx from "clsx";


const styles = {
    mask: {
        position: "fixed",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        opacity: "1",
        zIndex: "100",
    }
};

const useStyles = createUseStyles(styles, {name: "mask"});

const Mask: FC<{onClickOnce: () => void}> = function Mask({onClickOnce}) {
    const {mask} = useStyles();
    const ref = useRef<HTMLDivElement | null>(null);


    useEffect(() => {
        const tar = ref.current;
        if (tar !== null) {
            tar.addEventListener("pointerup", onClickOnce, {once: true, capture: false, passive: true});
            return () => {
                tar.removeEventListener("pointerup", onClickOnce);
            };
        }
        return undefined;
    }, [onClickOnce, ref]);
    return <div ref={ref} className={clsx(mask)}> </div>;
};

export default Mask;
