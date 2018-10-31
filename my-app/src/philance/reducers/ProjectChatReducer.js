import {
    PROJECT_APPLICANT_DETAILS_GET_DETAILS,
    PROJECT_CHAT_MESSAGE_UPDATE,
    PROJECT_CHAT_UNMOUNT,
} from '../actions/types'

const INITIAL_STATE = {
    messages: [],
}

export default (state = INITIAL_STATE, action) => {

    switch(action.type) {
        case PROJECT_CHAT_MESSAGE_UPDATE:
            return {
                ...state,
                messages:action.payload,
            }
        case PROJECT_CHAT_UNMOUNT:
            return {
                ...state,
                messages:[],
            }
        default:
            return state
    }
}