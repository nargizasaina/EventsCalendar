import {createSlice} from "@reduxjs/toolkit";

const name = 'events';
const eventsSlice = createSlice({
    name,
    initialState: {
        event: null,
        myEvents: [],
        otherEvents: [],
        fetchLoading: false,
        fetchError: null,
        postLoading: false,
        postError: null,
        deleteLoading: false,
        deleteError: null
    },
    reducers: {
        fetchMyEventsRequest(state) {
            state.fetchLoading = true;
            state.fetchError = null;
        },
        fetchMyEventsSuccess(state, action) {
            state.myEvents = action.payload;
            state.fetchLoading = false;
        },
        fetchMyEventsFailure(state, action) {
            state.fetchLoading = false;
            state.fetchError = action.payload;
        },

        fetchAllEventsRequest(state) {
            state.fetchLoading = true;
            state.fetchError = null;
        },
        fetchAllEventsSuccess(state, action) {
            state.otherEvents = action.payload;
            state.fetchLoading = false;
        },
        fetchAllEventsFailure(state, action) {
            state.fetchLoading = false;
            state.fetchError = action.payload;
        },

        createEventRequest(state){
            state.postLoading = true;
            state.postError = null;
        },
        createEventSuccess(state) {
            state.postLoading = false;
        },
        createEventFailure(state, action){
            state.postLoading = false;
            state.postError = action.payload;
        },

        deleteEventRequest(state){
            state.deleteLoading = true;
            state.deleteError = null;
        },
        deleteEventSuccess(state){
            state.deleteLoading = false;
        },
        deleteEventFailure(state, action){
            state.deleteLoading = false;
            state.deleteError = action.payload;
        }
    }
});

export default eventsSlice;