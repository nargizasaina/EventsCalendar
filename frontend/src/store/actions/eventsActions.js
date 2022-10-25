import eventsSlice from "../slices/eventsSlice";

export const {
    fetchMyEventsRequest,
    fetchMyEventsSuccess,
    fetchMyEventsFailure,
    createEventRequest,
    createEventSuccess,
    createEventFailure,
    deleteEventRequest,
    deleteEventSuccess,
    deleteEventFailure
} = eventsSlice.actions;