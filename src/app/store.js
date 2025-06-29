import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import actionTypes from './actionTypes'
import watchAuth from './saga';
import createSagaMiddleware from 'redux-saga'

const userReducer = (state = {
    id: 0,
    username: '',
    email: '',
    secret: '',
    sessionToken: ''
}, action) => {
    switch(action.type) {
        case actionTypes.LOGIN_SUCCESS:
            return {...state, sessionToken: action.payload}
        
        case actionTypes.USER_INFO_SUCCESS:
            return {
                ...state,
                id: action.payload.id,
                username: action.payload.username,
                email: action.payload.email,
                secret: action.payload.secret
            }
        
        case actionTypes.SECRET_UPDATE_SUCCESS:
            return {
                ...state,
                secret: action.payload
            }

        default:
            return state
    }
}

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: {
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(watchAuth)

export default store