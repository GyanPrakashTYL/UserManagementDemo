import actionTypes from "./actionTypes"

export const registerRequest = (userInfo) => {
    return {
        type: actionTypes.REGISTER_REQUEST,
        payload: userInfo
    }
}

export const registerSuccess = (userInfo) => {
    return {
        type: actionTypes.REGISTER_SUCCESS,
        payload: {
            email: userInfo.email,
            password: userInfo.password
        }
    }
}

export const loginRequest = (userCreds) => {
    return {
        type: actionTypes.LOGIN_REQUEST,
        payload: userCreds
    }
}

export const loginSuccess = (sessionToken) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        payload: sessionToken
    }
}

export const errorOccured = (errorMessage) => {
    return {
        type: actionTypes.ERROR_OCCURED,
        error: errorMessage
    }
}

export const getUserInfo = (sessionToken) => {
    return {
        type: actionTypes.USER_INFO_REQUEST,
        payload: sessionToken
    }
}

export const userInfoSuccess = (userInfo) => {
    return {
        type: actionTypes.USER_INFO_SUCCESS,
        payload: userInfo
    }
}

export const secretChangeRequest = (changeReq) => {
    return {
        type: actionTypes.SECRET_UPDATE_REQUEST,
        payload: changeReq
    }
}

export const secretChangeSuccess = (changedSecret) => {
    return {
        type: actionTypes.SECRET_UPDATE_SUCCESS,
        payload: changedSecret
    }
}