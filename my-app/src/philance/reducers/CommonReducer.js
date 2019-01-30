import { INTERESTS_ARRIVED,UNSELECT_FILES, USER_PROFILE_USER_IMAGE_CHANGED_FOR_PREVIEW, START_PROJECT_FILES_UPLOAD_FAILED, LOGOUT_USER } from '../actions/types'

const INITIAL_STATE = {
    interestOptions:[],
    uploadStatus:'NOT_INITIATED',
    filesSelected:false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case INTERESTS_ARRIVED:
            return {...state, interestOptions: action.payload}
        case START_PROJECT_FILES_UPLOAD_FAILED:
            return {...state, uploadStatus: 'Upload Failed'}
        case USER_PROFILE_USER_IMAGE_CHANGED_FOR_PREVIEW:
            return {...state, filesSelected:true}
        case UNSELECT_FILES:
            return {...state, filesSelected:false}
        case 'RESET_FILE_UPLOAD':
            return {
                ...state,
                uploadStatus:'NOT_INITIATED',
                filesSelected:false
            }
        case LOGOUT_USER:
            return{
                uploadStatus:'NOT_INITIATED',
                filesSelected:false
            }
        default:
        return state
    }
}