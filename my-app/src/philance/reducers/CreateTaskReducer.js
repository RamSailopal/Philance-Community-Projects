import {
    PROJECT_TASKS,
    PROJECT_TASKS_DESCRIPTION_CHANGED,
    PROJECT_TASKS_END_DATE_CHANGED,
    PROJECT_TASKS_FIELDS_EMPTY,
    PROJECT_TASKS_NAME_CHANGED,
    PROJECT_TASKS_START_DATE_CHANGED,
    PROJECT_TASKS_NETWORK_ERROR,
    PROJECT_TASKS_REQUEST_SUCCESS,
    PROJECT_TASKS_FILES_CHANGED,
    PROJECT_TASKS_FILES_UPLOAD_SUCCESS,
    PROJECT_TASKS_FILES_UPLOAD_FAILED,
    PROJECT_TASKS_STATUS_CHANGED,
    PROJECT_TASKS_PRIORITY_CHANGED,
    PROJECT_TASKS_START_USER_SELECTED_CHANGED,
    CREATE_PROJECT_TASKS_UNMOUNT,
} from '../actions/types'

const INITIAL_STATE = {
    task: {},
    name: '',
    description: '',
    status: '',
    assignee: '',
    startDate: '',
    endDate: '',
    priority: '',
    files: [],
    userSelected:null,
    priority:'Normal'
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case PROJECT_TASKS_FILES_UPLOAD_SUCCESS:
            return {...state, uploadStatus: 'Files Uploaded and Project has been created!'}
        case PROJECT_TASKS_FILES_UPLOAD_FAILED:
            return {...state, uploadStatus: 'Upload Failed'}
        case PROJECT_TASKS:
            return {...state, text: 'CREATE A PROJECT'}
        case PROJECT_TASKS_NAME_CHANGED: 
            return {...state, name: action.payload}
        case PROJECT_TASKS_DESCRIPTION_CHANGED:
            return{...state, description: action.payload}
        case PROJECT_TASKS_START_DATE_CHANGED:
            return{...state, startDate: action.payload} 
        case PROJECT_TASKS_END_DATE_CHANGED:
            return{...state, endDate: action.payload} 
        case PROJECT_TASKS_FILES_CHANGED:
            return{...state, files: action.payload}
        case PROJECT_TASKS_FIELDS_EMPTY:
            return{...state, text: 'ALL FIELDS REQUIRED'}
        case PROJECT_TASKS_NETWORK_ERROR:
            return{...state, text: 'NETWORK ERROR'}
        case PROJECT_TASKS_REQUEST_SUCCESS:
            return{...state, requestCompleted: true}
        case PROJECT_TASKS_STATUS_CHANGED:
            return{...state, status: action.payload}
        case PROJECT_TASKS_PRIORITY_CHANGED:
            return{...state, priority: action.payload}
        case PROJECT_TASKS_START_USER_SELECTED_CHANGED:
            return{...state, userSelected: action.payload}
        // case PROJECT_TASKS_VIEW_TASK:
        //     return{...state, userSelected: action.payload}
        case CREATE_PROJECT_TASKS_UNMOUNT:
            return{
                ...state,
                name: '',
                description: '',
                status: '',
                assignee: '',
                startDate: '',
                endDate: '',
                priority: 'Normal',
                files: [],
            }
        default:
        return state
    }
}