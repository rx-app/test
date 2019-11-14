import React from "react";
import {makeStyles, createStyles} from "@material-ui/core/styles";
import PopoverUI from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import SubMenu from "./subMenu";

const useStyles = makeStyles(() => createStyles({
    typography: {
        fontSize: "13px",
        borderRadius: "0px !important",
        padding: "5px",
        float: "left",
        "&>div": {
            minWidth: 250,
            margin: 0,
            padding: 5,
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
                color: "#333",
            }
        },
    },
    icon: {
        display: "inline-block",
        width: "16px",
        height: "16px",
        lineHeight: "16px",
        padding: "7px 0",
        margin: "0 5px",
        float: "left",
    },
    icon2: {
        display: "inline-block",
        width: "8px",
        height: "16px",
        lineHeight: "16px",
        padding: "7px 0",
        margin: "0 5px",
        float: "left",
    },
    btn: {
        background: "none",
        boxShadow: "none",
        padding: "0px",
        float: "left",
        minWidth: "auto",
        "&:hover": {
            background: "none",
            boxShadow: "none",
        },
    }
}));

interface Props {
    action: string;
    title: string;
    icon: string;
}
export default function SelectPopover(props: Props) {
    const classes = useStyles();
    const {action, icon} = props;
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
        <>
            <Button aria-describedby={id} variant="contained" onClick={handleClick} className={classes.btn}>
                <svg className={classes.icon} aria-hidden="true">
                    <use xlinkHref={icon} />
                </svg>
                <svg className={classes.icon2} aria-hidden="true">
                    <use xlinkHref="#icon-xiala" />
                </svg>
            </Button>
            <PopoverUI
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                PaperProps={{square: true}}
            >
                <>
                    <SubMenu type={action} />
                </>
            </PopoverUI>
        </>
    );
}
