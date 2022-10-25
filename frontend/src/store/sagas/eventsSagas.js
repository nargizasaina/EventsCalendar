import {put, takeEvery} from 'redux-saga/effects';
import axiosApi from "../../axiosApi";
import {
    createEventFailure, createEventRequest,
    createEventSuccess, deleteEventFailure, deleteEventRequest, deleteEventSuccess,
    fetchMyEventsFailure,
    fetchMyEventsRequest,
    fetchMyEventsSuccess
} from "../actions/eventsActions";
import {addNotification} from "../actions/notifyActions";
import {historyPush} from "../actions/historyActions";

export function* fetchMyEvents() {
    try{
        const response = yield axiosApi('/events');
        yield put(fetchMyEventsSuccess(response.data));
    }catch (e) {
        yield put(fetchMyEventsFailure(e.response.data));
        yield put(addNotification('Fetch events failed!', 'error'));
    }
}

export function* createEvent({payload: event}) {
    try{
        yield axiosApi.post('/events', event);
        yield put(createEventSuccess());
        yield put(addNotification('The event is added successfully!', 'success'));
        yield put(historyPush('/'));
    } catch (e) {
        yield put(createEventFailure(e.response.data));
    }
}

export function* deleteEvent({payload: id}) {
    try{
        yield axiosApi.delete('/events/' + id);
        yield put(deleteEventSuccess());
        yield put(addNotification('The event is deleted successfully!', 'success'));
    }catch (e) {
        yield put(deleteEventFailure(e.response.data));
    }
}

const eventsSagas = [
    takeEvery(fetchMyEventsRequest, fetchMyEvents),
    takeEvery(createEventRequest, createEvent),
    takeEvery(deleteEventRequest, deleteEvent),

];

export default eventsSagas;