import {
    ALREADY_REGISTER,
    INVALID_EMAIL,
    FIELDS_EMPTY,
    NETWORK_ERROR,
    REGISTER_EMAIL_CHANGED,
    REGISTER_FIRST_NAME_CHANGED,
    REGISTER_LAST_NAME_CHANGED,
    REGISTER_PASSWORD_CHANGED,
    REGISTRATION_PENDING,
    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    WEAK_PASSWORD,
    REMOVE_REGISTER_TOAST,
    LOGOUT_USER
} from '../actions/types'

const INITIAL_STATE = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    registered : false,
    showToast: false,
    error: 'GET STARTED'
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case REGISTER_USER:
            return {...state, error: 'GET STARTED'}
        case REGISTER_EMAIL_CHANGED: 
            return {...state, email: action.payload, error: 'GET STARTED'}
        case REGISTER_PASSWORD_CHANGED:
            return{...state, password: action.payload, error: 'GET STARTED'}
        case REGISTER_FIRST_NAME_CHANGED:
            return{...state, firstName: action.payload, error: 'GET STARTED'}
        case REGISTER_LAST_NAME_CHANGED:
            return{...state, lastName: action.payload, error: 'GET STARTED'}
        case FIELDS_EMPTY:
            return {...state, error: 'ALL FIELDS ARE REQUIRED'}
        case INVALID_EMAIL:
            return {...state, error: 'INVALID EMAIL'}
        case NETWORK_ERROR:
            return {...state, error: 'NETWORK ERROR'}
        case ALREADY_REGISTER:
            return {...state, error: 'ALREADY REGISTERED'}
        case WEAK_PASSWORD:
            return {...state, error: 'WEAK PASSWORD'}
        case REGISTER_USER_SUCCESS:
            return {...state, registered: true, showToast: true}
        case REGISTRATION_PENDING:
            return {...state, error: 'LOADING...'}
        case REMOVE_REGISTER_TOAST:
            return {...state, showToast: false}
        case LOGOUT_USER:
            return {
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                registered : false,
                showToast: false,
                error: 'GET STARTED'
            }
        default:
            return state
    }
}