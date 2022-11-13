import { createStore, applyMiddleware, Store, compose } from "redux"
import thunk from "redux-thunk"

import reducer from "./reducer"

const enhancers = [];
const middleware = [thunk];

//@ts-ignore
const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

export const store: Store<TransactionState, TransactionAction> & {
    dispatch: DispatchType
} = createStore(reducer, composedEnhancers)