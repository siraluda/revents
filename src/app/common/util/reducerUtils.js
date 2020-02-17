// this is exported to testReducer.js to create a reducer
export const createReducer = (initialState, fnMap) => {
    return (state = initialState, {type, payload}) => {
        const handler = fnMap[type]; // the handler is the reducer function which matches the type

        return handler ? handler(state, payload) : state
    }
}