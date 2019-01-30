import {
    EMAIL_CHANGED,
    EMAIL_EMPTY,
    RESET_PASSWORD_NETWORK_ERROR,
    RESET_PASSWORD_EMAIL_SENT,
    PASSWORD_CHANGED,
    PASSWORD_CHANGED_SUCCESS
} from '../actions/types'

const INITIAL_STATE = {
    email: '',
    emailSent: false,
    password: '',
    success:false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMAIL_CHANGED:
            return { ...state, email: action.payload }
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload }
        case EMAIL_EMPTY:
            return { ...state, error: 'Email Field can\'t be empty' }
        case RESET_PASSWORD_NETWORK_ERROR:
            return { ...state, error: 'Invalid Credentials' }
        case RESET_PASSWORD_EMAIL_SENT:
            return { ...state, emailSent: true }
        case PASSWORD_CHANGED_SUCCESS:
            return { ...state, success:true }
        default:
            return state
    }
}