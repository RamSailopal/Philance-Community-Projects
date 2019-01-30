import {
    APPLY_FOR_PROJECT_MESSAGE_CHANGED,
    APPLY_FOR_PROJECT_ROLE_CHANGED,
    APPLY_FOR_PROJECT_REMOVE_TOASTER,
    APPLY_FOR_PROJECT_UPDATE_SUCCESS,
    APPLY_FOR_PROJECT_ALREADY_APPLIED,
    LOGOUT_USER
} from '../actions/types'

const INITIAL_STATE = {
    message: '',
    role: '',
    toast: false,
    text: ''
}

export default (state = INITIAL_STATE, action) => {

    switch(action.type) {
        case APPLY_FOR_PROJECT_MESSAGE_CHANGED: 
            return {...state, message: action.payload}
        
        case APPLY_FOR_PROJECT_ROLE_CHANGED: 
            return {...state, role: action.payload}
        
        case APPLY_FOR_PROJECT_REMOVE_TOASTER: 
            return {...state, toast: false}
        
        case APPLY_FOR_PROJECT_UPDATE_SUCCESS: 
            return {...state, text: 'You have successfully applied for the project', toast: true}
        
        case APPLY_FOR_PROJECT_ALREADY_APPLIED:
            return {...state, text: 'You have already applied for the project', toast: true}
        case LOGOUT_USER:
            return {...state,
                message: '',
                role: '',
                toast: false,
                text: ''
            }
        default:
            return state
    }
}