import { 
    INTERESTS_ARRIVED,
    UNSELECT_FILES, 
    USER_PROFILE_USER_IMAGE_CHANGED_FOR_PREVIEW, 
    START_PROJECT_FILES_UPLOAD_FAILED, 
    LOGOUT_USER, 
    TASK_DETAILS_SET_DETAILS,
    PROJECT_TASK_DETAILS_FILES_UPLOAD_SUCCESS,
    PROJECT_TASK_DETAILS_FILES_UPLOAD_FAILED,
    PROJECT_TASK_DETAILS_NAME_CHANGED,
    PROJECT_TASK_DETAILS_DESCRIPTION_CHANGED,
    PROJECT_TASK_DETAILS_START_DATE_CHANGED,
    PROJECT_TASK_DETAILS_END_DATE_CHANGED,
    PROJECT_TASK_DETAILS_FILES_CHANGED,
    PROJECT_TASK_DETAILS_FIELDS_EMPTY,
    PROJECT_TASK_DETAILS_NETWORK_ERROR,
    PROJECT_TASK_DETAILS_REQUEST_SUCCESS,
    PROJECT_TASK_DETAILS_STATUS_CHANGED,
    PROJECT_TASK_DETAILS_PRIORITY_CHANGED,
    PROJECT_TASK_DETAILS_START_USER_SELECTED_CHANGED,
    PROJECT_TASK_DETAILS_UPDATE_REQUEST_SUCCESS,
    PROJECT_TASK_DETAILS_UNMOUNT,
} from '../actions/types'

const INITIAL_STATE = {
    response:[],
    taskName:'',
    description:'',
    status:'',
    userSelected:'',
    priority:'',
    endDate:'',
    startDate:'',
    assignee:{},
    author:{},
    files:[],
    taskAttachments:[],
    isUpdated:false,
    
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case PROJECT_TASK_DETAILS_FILES_UPLOAD_SUCCESS:
            return {...state, uploadStatus: 'Files Uploaded and Project has been created!'}
        case PROJECT_TASK_DETAILS_FILES_UPLOAD_FAILED:
            return {...state, uploadStatus: 'Upload Failed'}
        case PROJECT_TASK_DETAILS_NAME_CHANGED: 
            return {...state, taskName: action.payload}
        case PROJECT_TASK_DETAILS_DESCRIPTION_CHANGED:
            return{...state, description: action.payload}
        case PROJECT_TASK_DETAILS_START_DATE_CHANGED:
            return{...state, startDate: action.payload} 
        case PROJECT_TASK_DETAILS_END_DATE_CHANGED:
            return{...state, endDate: action.payload} 
        case PROJECT_TASK_DETAILS_FILES_CHANGED:
            return{...state, files: action.payload}
        case PROJECT_TASK_DETAILS_FIELDS_EMPTY:
            return{...state, text: 'ALL FIELDS REQUIRED'}
        case PROJECT_TASK_DETAILS_NETWORK_ERROR:
            return{...state, text: 'NETWORK ERROR'}
        case PROJECT_TASK_DETAILS_REQUEST_SUCCESS:
            return{...state, requestCompleted: true}
        case PROJECT_TASK_DETAILS_STATUS_CHANGED:
            return{...state, status: action.payload}
        case PROJECT_TASK_DETAILS_PRIORITY_CHANGED:
            return{...state, priority: action.payload}
        case PROJECT_TASK_DETAILS_START_USER_SELECTED_CHANGED:
            return{...state, userSelected: action.payload}
        case PROJECT_TASK_DETAILS_UPDATE_REQUEST_SUCCESS:
            return{...state, isUpdated: true}
        case PROJECT_TASK_DETAILS_UNMOUNT:
            return{
                ...state, 
                isUpdated: false,
                response:[],
                taskName:'',
                description:'',
                status:'',
                userSelected:'',
                priority:'',
                endDate:'',
                startDate:'',
                assignee:{},
                author:{},
                files:[],
                taskAttachments:[],
            }
        case TASK_DETAILS_SET_DETAILS:
            return {...state,
            
                projectId:action.payload.projectId,
                taskId:action.payload.taskId,
                taskName:action.payload.taskName,
                description:action.payload.description,
                userSelected:action.payload.assignedTo,
                priority:action.payload.priority,
                assignedBy:action.payload.assignedBy,
                status:action.payload.status,
                targetHours:action.payload.targetHours,
                startDate:action.payload.startDate,
                endDate:action.payload.endDate,
                creationDate:action.payload.creationDate,
                createdBy:action.payload.createdBy,
                lastUpdatedDate:action.payload.lastUpdatedDate,
                lastUpdatedBy:action.payload.lastUpdatedBy,
                author:action.payload.author,
                assignee:action.payload.assignee,
                taskAttachments:action.payload.taskAttachments,
            
            }
        default:
        return state
    }
}