import React from "react";
import {createUseStyles} from "react-jss";
import clsx from 'clsx'
import Popper, {PopperPlacementType} from '@material-ui/core/Popper';

import Color from "./color";
import Border from "./border";
import {setPaperType} from "../../redux/actions/paper";


const styles = {
    ul: {
        listStyle: "none",
        overflow: "hidden",
        padding: "5px 18px 10px",
        margin: 0,
        borderBottom: "1px solid #ebedf0",
        "& li": {
            float: "left",
            margin: 6,
            padding: 4,
            "&:hover": {
                background: "#ebedf0",
            }
        }
    },
    icon: {
        width: "16px",
        height: "16px",
    },
    triangle: {
        "&:after": {
            display: "inline-block",
            float: "right",
            margin: 6,
            content: "''",
            width: 0,
            height: 0,
            borderLeft: "4px solid #979ca4",
            borderTop: "4px solid transparent",
            borderRight: "4px solid transparent",
            borderBottom: "4px solid transparent",
        },
    },
    myPopper: {
        zIndex: '99999',
        '&>div': {
            marginTop: '0px!important',
        }
    },
    root: {
        width: 180,
        background: "#fff",
        fontSize: 13,
        borderRadius: "0px !important",
        padding: "5px 0",
        "&>div": {
            margin: 0,
            padding: 5,
            height: 20,
            lineHeight: "20px",
            overflow: "hidden",
            cursor: "pointer",
            "& svg": {
                float: "left",
                width: "14px",
                height: "14px",
                margin: "3px",
            },
            "&:hover": {
                background: "#ebedf0",
            }
        },
    },
};
const useStyles = createUseStyles(styles, {name: "PaperTable"});
export default function PaperTable() {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [placement, setPlacement] = React.useState<PopperPlacementType>();
    const classes = useStyles();
    const handleClick = (newPlacement: PopperPlacementType) => (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        setAnchorEl(event.currentTarget);
        setOpen(prev => placement !== newPlacement || !prev);
        setOpen2(false)
        setPlacement(newPlacement);
    };
    const handleClick2 = (newPlacement: PopperPlacementType) => (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        setAnchorEl(event.currentTarget);
        setOpen2(prev => placement !== newPlacement || !prev);
        setOpen(false)
        setPlacement(newPlacement);
    };

    const data: string[] = ["#icon-wubiankuang", "#icon-youbiankuang", "#icon-waibiankuang", "#icon-waibiankuangjiacu", "#icon-xiabiankuang", "#icon-shangbiankuang", "#icon-zuobiankuang", "#icon-youbiankuang1"];
    return (
        <>
            <div className={clsx(classes.root)}>
                <ul className={clsx(classes.ul)}>
                    {data.map((item) => (
                        <li key={item}>
                            <svg className={clsx(classes.icon)} aria-hidden="true">
                                <use xlinkHref={item} />
                            </svg>
                        </li>
                    ))}
                </ul>
                <div className={clsx(classes.triangle)} onClick={handleClick("right-start")}>
                    <svg aria-hidden="true">
                        <use xlinkHref="#icon-biankuangyanse" />
                    </svg>
                    边框颜色

                </div>
                <div className={clsx(classes.triangle)} onClick={handleClick2("right-start")} >
                    <svg aria-hidden="true">
                        <use xlinkHref="#icon-biankuangyangshi" />
                    </svg>
                    边框样式
                </div>
                <Popper className={clsx(classes.myPopper)} open={open} anchorEl={anchorEl} placement={placement} transition>
                    {<Color />}
                </Popper>
                <Popper className={clsx(classes.myPopper)} open={open2} anchorEl={anchorEl} placement={placement} transition>
                    {<Border />}
                </Popper>
            </div>
        </>
    );
}
