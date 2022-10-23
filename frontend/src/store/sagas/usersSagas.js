import axiosApi from "../../axiosApi";
import {put, takeEvery} from "redux-saga/effects";
import {
    facebookLoginRequest,
    loginFailure,
    loginRequest, loginSuccess,
    logoutRequest,
    registerFailure,
    registerRequest,
    registerSuccess
} from "../actions/usersActions";
import {addNotification} from "../actions/notifyActions";
import {historyPush} from "../actions/historyActions";

export function* registerUserSaga({payload: userData}) {
    try{
        const response = yield axiosApi.post('/users', userData);
        console.log(response);
        yield put(registerSuccess(response.data));
        yield put(addNotification('Register Successful', 'success'));
        yield put(historyPush('/'));
    } catch (e) {
        console.log(e);
        yield put(registerFailure(e));
    }
}

export function* loginUserSaga({payload: userData}) {
    try{
        const response = yield axiosApi.post('/users/sessions', userData);
        console.log('1');
        yield put(loginSuccess(response.data));
        console.log('2');
        yield put(addNotification('Login Successful', 'success'));
        yield put(historyPush('/'));
        console.log('3');
    } catch (e) {
        yield put(loginFailure(e.response.data));
    }
}

export function* facebookLoginUserSaga({payload: userData}) {
    try{
        const response = yield axiosApi.post('/users/facebookLogin', userData);
        yield put(loginSuccess(response.data));
        yield put(addNotification('Facebook Login Successful', 'success'));
        yield put(historyPush('/'));
    } catch (e) {
        yield put(loginFailure(e.response.data));
    }
}

export function* logoutUser(getState) {
    try{
        const token = getState().users.user.token;
        const headers = {'Authorization': token};
        yield axiosApi.delete('/users/sessions', {headers});
        yield put(historyPush('/'));
    } catch (e) {
    }
}

const userSagas = [
    takeEvery(registerRequest, registerUserSaga),
    takeEvery(loginRequest, loginUserSaga),
    // takeEvery(facebookLoginRequest, facebookLoginUserSaga),
    // takeEvery(logoutRequest, logoutUser)
];

export default userSagas;