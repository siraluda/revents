import { INCREMENT_COUNTER, DECREMENT_COUNTER } from "./testConstants";
import { createReducer } from "../../app/common/util/reducerUtils";


const initialState = {
    data: 40
}

// Here we add functionality to our actions
const incrementCounter = (state) => {
    return {...state, data: state.data + 1};
}
const decrementCounter = (state) => {
    return {...state, data: state.data - 1};
}

// this is exported to rootreducer.js
export default createReducer(initialState, {
    [INCREMENT_COUNTER]: incrementCounter,
    [DECREMENT_COUNTER]: decrementCounter
});




// ALTERNATIVE METHOD OF CREATING REDUCERS
// const testReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case INCREMENT_COUNTER:
//             return {...state, data: state.data + 1};
    
//         case DECREMENT_COUNTER:
//             return {...state, data: state.data - 1};

//         default:
//             return state;
//     }
// }