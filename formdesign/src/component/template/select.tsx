import React from "react";
import {createStyles, makeStyles, withStyles, Theme} from "@material-ui/core/styles";
import SelectBtn from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputBase from "@material-ui/core/InputBase";

const BootstrapInput = withStyles((theme: Theme) => createStyles({
    input: {
        position: "relative",
        fontSize: 15,
        padding: "0 20px 0 10px",
        height: "30px",
        lineHeight: "30px",
        transition: theme.transitions.create(["border-color", "box-shadow"]),
        fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            "Segoe UI",
            "Roboto",
            "Helvetica Neue",
            "Arial",
            "sans-serif",
            "Apple Color Emoji",
            "Segoe UI Emoji",
            "Segoe UI Symbol",
        ].join(","),
    }
}))(InputBase);

const useStyles = makeStyles(() => createStyles({
    selectBox: {
        margin: "0 5px",
        float: "left",
        "& .MuiSelect-icon": {
            color: "#979ca4",
            fontSize: "20px",
            padding: "2px 0px",
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
}));
const usePaperStyle = makeStyles(() => createStyles({
    paper: {
        marginTop: "34px",
        padding: "5px",
        "& ul": {
            padding: 0,
            "& li": {
                fontSize: 14,
                "& svg": {
                    padding: "0",
                    margin: "0",
                },
                "&.Mui-selected": {
                    background: "#ebedf0",
                },
                "&:hover": {
                    background: "#ebedf0",
                },
            },
        },
    },
}));

interface DataFont {
    key: string;
    value: string;
}

interface Props {
    action: string;
    type: string;
    data: DataFont[];
}
export default function FontSelect(props: Props) {
    const classes = useStyles();
    const paperClasses = usePaperStyle();
    const {type, data} = props;
    const [state, setState] = React.useState<{value: string | number; key: string}>(data[0]);

    const showTemplate = () => {
        switch (type) {
            case "noIcon":
                return data.map((item: DataFont) => <MenuItem value={item.key} key={item.key}>{item.value}</MenuItem>);
                break;
            case "icon":
                return (
                    data.map((item: DataFont) => (
                        <MenuItem
                            value={item.value}
                            key={item.key}
                        >
                            <svg
                                className={classes.icon}
                                aria-hidden="true"
                            >
                                <use
                                    xlinkHref={item.key}
                                />
                            </svg>
                        </MenuItem>
                    )));
                break;
            default:
                return "";
                break;
        }
    };
    return (
        <>
            <SelectBtn
                className={classes.selectBox}
                value={state.value}
                onChange={
                    (event) => {
                        setState({
                            ...state,
                            value: event.target.value as string
                        });
                    }
                }
                input={<BootstrapInput name="value" id="age-customized-select" />}
                MenuProps={{PaperProps: {square: true}, PopoverClasses: paperClasses}}
            >
                {showTemplate()}
            </SelectBtn>
        </>
    );
}
