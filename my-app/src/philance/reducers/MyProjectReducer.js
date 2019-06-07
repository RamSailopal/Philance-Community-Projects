import {
    MY_PROJECT_GET_PROJECTS,
    MY_PROJECT_STORE_PROJECTS,
    LOGOUT_USER
} from '../actions/types'

const INITIAL_STATE = {
    response: [],
    length: 0,
    list: [],
    totalPages: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MY_PROJECT_GET_PROJECTS:
            return { ...state, response: action.payload, length: action.payload.length, totalPages: action.totalPages }
        case MY_PROJECT_STORE_PROJECTS:
            return { ...state, list: action.payload }
        case LOGOUT_USER:
            return {
                response: [],
                length: 0,
                list: []
            }
        default:
            return state
    }
}