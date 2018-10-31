import { LOGOUT_USER, USER_PROFILE_GET_SETTINGS_INFO, USER_PROFILE_UPDATE_SETTINGS_INFO } from '../actions/types'

const INITIAL_STATE = {
    emailNotifications:'',
    pushNotifications:'',
    textNotifications:'',
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_PROFILE_GET_SETTINGS_INFO:
            return{
                ...state,
                emailNotifications:action.payload.emailNotifications,
                pushNotifications:action.payload.pushNotifications,
                textNotifications:action.payload.textNotifications,
            }
        case USER_PROFILE_UPDATE_SETTINGS_INFO:
            return{
                ...state,
                emailNotifications:action.payload.emailNotifications,
                pushNotifications:action.payload.pushNotifications,
                textNotifications:action.payload.textNotifications,
            }
        case LOGOUT_USER:
            return {
                ...state,
                emailNotifications:'',
                pushNotifications:'',
                textNotifications:'',
            }
        default:
            return state
    }
}