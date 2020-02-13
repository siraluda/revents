import { INCREMENT_COUNTER, DECREMENT_COUNTER } from "./testConstants";

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