import React from "react";
import {connect} from "react-redux";

/* eslint-disable react/button-has-type,  @typescript-eslint/no-explicit-any */
const MyButton = connect()((props: any) => {
    const {dispatch, click, ...other} = props;
    return <button {...other} onClick={() => dispatch(click())} />;
});

export default MyButton;
