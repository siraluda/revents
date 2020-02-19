import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'; // only used in development it include dev-tools enhancer and middlewares
import rootReducer from "../reducers/rootReducers";
import thunk from "redux-thunk";

export const configureStore = () => {
    const middlewares = [thunk];

    const composedEnhancer = composeWithDevTools(applyMiddleware(...middlewares)) //combining devtoolsEnhancer and middlewares
    
    const store = createStore(rootReducer, composedEnhancer)

    return store;
} 

