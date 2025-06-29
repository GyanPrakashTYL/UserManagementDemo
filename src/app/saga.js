import { put, call, takeEvery } from "redux-saga/effects";
import * as Api from '../api/apis';
import { errorOccured, loginRequest, loginSuccess, registerSuccess, secretChangeSuccess, userInfoSuccess } from "./actions";
import actionTypes from "./actionTypes";

function* registerSaga(action) {
    try {
        const {username, email, password} = action.payload;
        const response = yield call(Api.registerUser, {username, email, password})
        
        if(response.success) {
            yield put(registerSuccess(action.payload))
            // Request a Login
            yield put(loginRequest({email, password}))
        }
        
    } catch (err) {
        yield put(errorOccured(err.message))
    }
}

function* loginSaga(action) {
    try {
        const {email, password} = action.payload
        const response = yield call(Api.loginUser, email, password)

        if(response.success) {
            yield put(loginSuccess(response.sessionToken))
        }
    } catch(err) {
        yield put(errorOccured(err.message))
    }
}

function* getUserInfoSaga(action) {
    try {
        const sessionToken = action.payload
        const response = yield call(Api.getUserInfo, sessionToken)

        if(response.success) {
            yield put(userInfoSuccess(response))
        }
    } catch(err) {
        yield put(errorOccured(err.message))
    }
}

function* updateSecretSaga(action) {
    try {
        const response = yield call(Api.changeUserSecret, action.payload.sessionToken, action.payload.newSecret)

        if(response.success) {
            yield put(secretChangeSuccess(action.payload.newSecret))
        }

    } catch(err) {
        yield put(errorOccured(err.message))
    }
}

function* watchAuth() {
    yield takeEvery(actionTypes.REGISTER_REQUEST, registerSaga)
    yield takeEvery(actionTypes.LOGIN_REQUEST, loginSaga)
    yield takeEvery(actionTypes.USER_INFO_REQUEST, getUserInfoSaga)
    yield takeEvery(actionTypes.LOGIN_SUCCESS, getUserInfoSaga)
    yield takeEvery(actionTypes.SECRET_UPDATE_REQUEST, updateSecretSaga)
}

export default watchAuth;