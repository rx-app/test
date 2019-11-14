import React from "react";
import ReactDom from "react-dom";
import {JssProvider, ThemeProvider} from "react-jss";
import {Provider} from "react-redux";

import App from "./App";
import theme from "./styles/theme";
import "./styles/globalStyle";
import isDebug from "./utils/isDebug";
import store from "./redux/store";


ReactDom.render(
    <Provider store={store}>
        <JssProvider id={{minify: !isDebug()}}>
            <ThemeProvider {...{theme}}>
                <App />
            </ThemeProvider>
        </JssProvider>
    </Provider>,
    document.querySelector("#spreadsheet"),
);
