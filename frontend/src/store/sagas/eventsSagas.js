import {put, takeEvery} from 'redux-saga/effects';
import axiosApi from "../../axiosApi";
import {fetchMyEventsFailure, fetchMyEventsRequest, fetchMyEventsSuccess} from "../actions/eventsActions";
import {addNotification} from "../actions/notifyActions";

export function* fetchMyEvents() {
    try{
        const response = yield axiosApi('/events');
        yield put(fetchMyEventsSuccess(response.data));
    }catch (e) {
        yield put(fetchMyEventsFailure(e.response.data));
        yield put(addNotification('Fetch events failed!', 'error'));
    }
}

const eventsSagas = [
    takeEvery(fetchMyEventsRequest, fetchMyEvents),
];

export default eventsSagas;