import { 
    INTERESTS_ARRIVED,
    UNSELECT_FILES, 
    USER_PROFILE_USER_IMAGE_CHANGED_FOR_PREVIEW, 
    START_PROJECT_FILES_UPLOAD_FAILED, 
    LOGOUT_USER, 
    PROJECT_TASKS_ARRIVED 
} from '../actions/types'

const INITIAL_STATE = {
    response:[],
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case PROJECT_TASKS_ARRIVED:
            return {...state,
                response:action.payload,            
            }
        default:
        return state
    }
}