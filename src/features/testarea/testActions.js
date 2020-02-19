import { INCREMENT_COUNTER, DECREMENT_COUNTER } from "./testConstants";
import { 
    //asyncActionStart, 
    asyncActionFinish } from "../async/asyncActions";
import { ASYNC_ACTION_START } from "../async/asyncConstants";

// Here we have action creators i.e. the function that return actions is an object. 
// We also dispatch our action type and payload from here by exporting them.

export const incrementCounter = () => {
    return {
        type: INCREMENT_COUNTER
    }
}

export const decrementCounter = () => {
    return {
        type: DECREMENT_COUNTER
    }
}


// Redux Thunk

const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

// Redux thunk action creator. Here we can dispatch multiple actions from different reducers e.g TestReducer, eventReducer etc in our case
export const incrementAsync = (name) => {
    return async dispatch => {
        //dispatch(asyncActionStart()); or
        dispatch({type: ASYNC_ACTION_START, payload: name})
        await delay(1000)
        dispatch(incrementCounter())
        dispatch(asyncActionFinish())
    }

}

export const decrementAsync = (name) => {
    return async dispatch => {
        //dispatch(asyncActionStart()); or
        dispatch({type: ASYNC_ACTION_START, payload: name})
        await delay(1000)
        dispatch({type: DECREMENT_COUNTER})
        dispatch(asyncActionFinish())
    }

}