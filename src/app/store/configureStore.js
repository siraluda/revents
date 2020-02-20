import { createStore, applyMiddleware } from "redux";
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import firebase from '../config/firebase';
import { composeWithDevTools } from 'redux-devtools-extension'; // only used in development it include dev-tools enhancer and middlewares
import rootReducer from "../reducers/rootReducers";
import thunk from "redux-thunk";

const rrfConfig ={
    userProfile: 'users',
    attachAuthisReady: true,
    useFirestoreForProfile: true
}

export const configureStore = () => {
    const middlewares = [thunk.withExtraArgument({getFirebase, getFirestore})];

    const composedEnhancer = composeWithDevTools(
        applyMiddleware(...middlewares), 
        reactReduxFirebase(firebase, rrfConfig), 
        reduxFirestore(firebase)); //combining devtoolsEnhancer, middlewares, firebase and firestores
    
    const store = createStore(rootReducer, composedEnhancer)

    return store;
} 

