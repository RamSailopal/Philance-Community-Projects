import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER,
    PASSWORD_EMPTY,
    EMAIL_EMPTY,
    FIELDS_EMPTY,
    INVALID_CREDENTIALS,
    LOGIN_NETWORK_ERROR,
    LOGOUT_USER,
    USER_AUTHENTICATION_REFRESH_TOKENS,
    SET_USER_LOGGED_IN,
    REGISTER_USER_SUCCESS
} from '../actions/types'
import { storeLocal } from '../helpers/helper';
const INITIAL_STATE = {
    email: '',
    password: '',
    token: null,
    isLoggedIn: false,
    error: 'LET\'s GO',
    userId: ''
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SET_USER_LOGGED_IN: 
            return {...state, userId:action.payload,isLoggedIn:true}
        case EMAIL_CHANGED: 
            return {...state, email: action.payload}
        case PASSWORD_CHANGED:
            return{...state, password: action.payload}
        case LOGIN_USER:
            return{...state, error: 'LET\'s GO'}
        case LOGIN_USER_SUCCESS:
        // alert(action.payload)
            storeLocal('userid',action.payload.userId)
            storeLocal('email',action.email)
            storeLocal('auth',action.payload.token)
            storeLocal('refresh',action.payload.refreshToken)
            return {...state, authToken:action.payload.token, refreshToken:action.payload.refreshToken, isLoggedIn: true, userId: action.payload.userId}
        case  FIELDS_EMPTY:
            return {...state, error: 'Both fields must filled'}
        case PASSWORD_EMPTY:
            return {...state, error: 'Password Field can\'t be empty'}
        case EMAIL_EMPTY:
            return {...state, error: 'Email Field can\'t be empty'} 
        case USER_AUTHENTICATION_REFRESH_TOKENS:
            action.payload.token?storeLocal('auth',action.payload.token):null
            action.payload.refreshToken?storeLocal('refresh',action.payload.refreshToken):null
            return {...state,
                authToken:action.payload.token,
                refreshToken:action.payload.refreshToken,
            } 
        case INVALID_CREDENTIALS:
            return {...state, error: 'Invalid Credentials'}
        case LOGIN_NETWORK_ERROR:
            return {...state, error: 'Invalid Credentials'}
        case REGISTER_USER_SUCCESS:
            return {...state, userId: action.payload.user.userId}
        case LOGOUT_USER:
            return {...state,
                email: '',
                password: '',
                token: null,
                isLoggedIn: false,
                error: 'LET\'s GO'
            }
        default:
        return state
    }
}