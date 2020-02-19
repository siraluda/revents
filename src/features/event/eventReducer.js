import { createReducer } from "../../app/common/util/reducerUtils";
import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT, FETCH_EVENT } from "./eventConstants";


 const initialState = [];

const createEvent = (state, payload) => {
    // [Create a copy of the list of events, and then append the newly created event]
    return [...state, payload.event]
}

const updateEvent = (state, payload) => {
  //Create a copy of the list of all events excluding the updated event, and then append updated event
    return [
        ...state.filter(event => event.id !== payload.event.id), payload.event
    ]
}

const deleteEvent = (state, payload) => {
    return [ // Create a new copy of all events whose id doesnt much the eventId
        ...state.filter(event => event.id !== payload.eventId)
    ]
}

const fetchEvents = (state, payload) => {
  return payload.events
}

export default createReducer(initialState, {
    [CREATE_EVENT]: createEvent,
    [UPDATE_EVENT]: updateEvent,
    [DELETE_EVENT]: deleteEvent,
    [FETCH_EVENT]: fetchEvents
})