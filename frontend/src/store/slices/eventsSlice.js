import {createSlice} from "@reduxjs/toolkit";

const name = 'events';
const eventsSlice = createSlice({
    name,
    initialState: {
        myEvents: [],
        otherEvents: [],
        fetchLoading: false,
        fetchError: null,
        postLoading: false,
        postError: null
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
        }
    }
});

export default eventsSlice;