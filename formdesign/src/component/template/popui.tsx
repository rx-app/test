import React from 'react';
import {createUseStyles} from 'react-jss'
import clsx from 'clsx'
import Popper, {PopperPlacementType} from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';



const styles = {
    root: {
        width: 500,
    },
    typography: {
        padding: '2px',
    },
};

const useStyles = createUseStyles(styles, {name: "PositionedPopper"});

export default function PositionedPopper() {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState<PopperPlacementType>();
    const classes = useStyles();

    const handleClick = (newPlacement: PopperPlacementType) => (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        setAnchorEl(event.currentTarget);
        setOpen(prev => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };

    return (
        <div className={clsx(classes.root)}>
            <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                11111111111111111111111111111111
            </Popper>

            <Button onClick={handleClick('right-start')}>right-start</Button>

        </div>
    );
}
