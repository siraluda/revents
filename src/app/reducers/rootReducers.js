import { combineReducers } from "redux";
import { reducer as FormReducer } from "redux-form";// this is an inbuilt reducer used to add form functionality
import { reducer as ToastrReducer } from "react-redux-toastr"; // this is an inbuilt reducer needed for adding notifications to sour applications
import testReducer from "../../features/testarea/testReducer";
import eventReducer from "../../features/event/eventReducer";
import modalReducer from "../../features/modals/modalReducer";
import authReducer from "../../features/auth/authReducer";
import asyncReducer from "../../features/async/asyncReducer";

const rootReducer = combineReducers({
    test: testReducer,
    events: eventReducer,
    form: FormReducer,
    modals: modalReducer,
    auth: authReducer,
    async: asyncReducer,
    toastr: ToastrReducer
})

export default rootReducer;