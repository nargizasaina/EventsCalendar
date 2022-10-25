import axiosApi from "../../axiosApi";
import {put, takeEvery} from "redux-saga/effects";
import {
    addFriendFailure, addFriendRequest,
    addFriendSuccess,
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
        yield put(registerSuccess(response.data));
        yield put(addNotification('Register Successful', 'success'));
        yield put(historyPush('/'));
    } catch (e) {
        yield put(registerFailure(e.response.data));
    }
}

export function* loginUserSaga({payload: userData}) {
    try{
        const response = yield axiosApi.post('/users/sessions', userData);
        yield put(loginSuccess(response.data));
        yield put(addNotification('Login Successful', 'success'));
        yield put(historyPush('/'));
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

export function* addFriend({payload: email}) {
    try{
        yield axiosApi.post('/users/friends/new', {email});
        yield put(addFriendSuccess());
        yield put(addNotification('Friend is invited successfully!', 'success'));
    } catch (e) {
        yield put(addFriendFailure(e.response.data));
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
    takeEvery(facebookLoginRequest, facebookLoginUserSaga),
    takeEvery(addFriendRequest, addFriend),
    takeEvery(logoutRequest, logoutUser),
];

export default userSagas;