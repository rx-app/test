import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";

import reducers from "./reducers";

const composeEnhancers = (process.env.NODE_ENV !== "production")
    && (typeof window === "object")
    && (typeof (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === "function") // eslint-disable-line @typescript-eslint/no-explicit-any
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) // eslint-disable-line @typescript-eslint/no-explicit-any
    : compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
export type StateType = ReturnType<typeof store.getState>;
export default store;
