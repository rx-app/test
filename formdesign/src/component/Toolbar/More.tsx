import React, {FC, useRef, useCallback, useState, useEffect} from "react";
import clsx from "clsx";
import useStyles from "./styles";
import getOffset from "../../utils/getOffset";
import Mask from "../mask";

export const MoreWidth = 40;

const More: FC = function More({children}) {
    const {more, moreItem} = useStyles();

    const ref = useRef(null);
    const [pos, setPos] = useState<{top: number; right: number} | null>(null);
    const calcPos = useCallback(() => {
        const tar = ref.current as (HTMLSpanElement | null);
        if (tar === null) {
            return;
        }
        const tarPos = tar.getBoundingClientRect();
        const offset = getOffset(tar);

        setPos({top: tarPos.height, right: offset.width - tarPos.right});
    }, [setPos]);
    const onClick = useCallback(() => {
        calcPos();
    }, [calcPos]);
    const onResize = useCallback(() => {
        if (pos !== null) {
            calcPos();
        }
    }, [calcPos, pos]);
    useEffect(() => {
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("resize", onResize);
        };
    }, [onResize]);

    const hide = useCallback(() => setPos(null), [setPos]);

    return (
        <>
            <span ref={ref} className={clsx(more)} {...{onClick}} />
            {
                pos !== null ? (
                    <>
                        <Mask onClickOnce={hide} />
                        <div style={{top: pos.top, right: pos.right}} className={clsx(moreItem)} onClick={hide}>
                            {children}
                        </div>
                    </>
                ) : null
            }
        </>
    );
};
export default More;
