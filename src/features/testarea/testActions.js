import { INCREMENT_COUNTER, DECREMENT_COUNTER } from "./testConstants";

// Here we have action creators i.e. the function that return actions is an object
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