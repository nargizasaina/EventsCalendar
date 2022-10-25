import eventsSlice from "../slices/eventsSlice";

export const {
    fetchMyEventsRequest,
    fetchMyEventsSuccess,
    fetchMyEventsFailure,
    fetchAllEventsRequest,
    fetchAllEventsSuccess,
    fetchAllEventsFailure,
    createEventRequest,
    createEventSuccess,
    createEventFailure,
    deleteEventRequest,
    deleteEventSuccess,
    deleteEventFailure
} = eventsSlice.actions;