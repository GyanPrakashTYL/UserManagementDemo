import { configureStore } from '@reduxjs/toolkit';
import actionTypes from './actionTypes'

const userReducer = (state = {
    id: 0,
    name: '',
    email: '',
    secret: ''
}, action) => {
    switch(action.type) {
        case actionTypes.USER_LOGGED_IN:
            // todo
        default:
            return state
    }
}

const store = configureStore({
    reducer: {
        user: userReducer
    }
})