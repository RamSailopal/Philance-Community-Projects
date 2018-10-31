import {
    START_PROJECT,
    START_PROJECT_BUDGET_CHANGED,
    START_PROJECT_DESCRIPTION_CHANGED,
    START_PROJECT_END_DATE_CHANGED,
    START_PROJECT_FIELDS_EMPTY,
    START_PROJECT_FREELANCERS_CHANGED,
    START_PROJECT_NAME_CHANGED,
    START_PROJECT_START_DATE_CHANGED,
    START_PROJECT_VOLUNTEERS_CHANGED,
    START_PROJECT_ZIP_CODE_CHANGED,
    START_PROJECT_NETWORK_ERROR,
    START_PROJECT_REQUEST_SUCCESS,
    START_PROJECT_UNMOUNT,
    START_PROJECT_FILES_CHANGED,
    START_PROJECT_FILES_UPLOAD_SUCCESS,
    START_PROJECT_FILES_UPLOAD_FAILED,
    START_PROJECT_COUNTRY_CHANGED,
    START_PROJECT_INTERESTS_CHANGED
} from '../actions/types'

const INITIAL_STATE = {
    name: '',
    description: '',
    zipCode: '',
    volunteers: '',
    freelancers: '',
    interests: '',
    startDate: '',
    files: [],
    endDate: '',
    budget: '',
    requestCompleted: false,
    text: 'CREATE A PROJECT',
    uploadStatus:'NOT_INITIATED',
    country:''
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case START_PROJECT_FILES_UPLOAD_SUCCESS:
            return {...state, uploadStatus: 'Files Uploaded and Project has been created!'}
        case START_PROJECT_FILES_UPLOAD_FAILED:
            return {...state, uploadStatus: 'Upload Failed'}
        case START_PROJECT:
            return {...state, text: 'CREATE A PROJECT'}
        case START_PROJECT_NAME_CHANGED: 
            return {...state, name: action.payload}
        case START_PROJECT_DESCRIPTION_CHANGED:
            return{...state, description: action.payload}
        case START_PROJECT_ZIP_CODE_CHANGED:
            return{...state, zipCode: action.payload}
        case START_PROJECT_VOLUNTEERS_CHANGED:
            return{...state, volunteers: action.payload}
        case START_PROJECT_FREELANCERS_CHANGED:
            return{...state, freelancers: action.payload} 
        case START_PROJECT_START_DATE_CHANGED:
            return{...state, startDate: action.payload} 
        case START_PROJECT_END_DATE_CHANGED:
            return{...state, endDate: action.payload} 
        case START_PROJECT_BUDGET_CHANGED:
            return{...state, budget: action.payload}
        case START_PROJECT_COUNTRY_CHANGED:
            return{...state, country: action.payload}
        case START_PROJECT_FILES_CHANGED:
            return{...state, files: action.payload}
        case START_PROJECT_FIELDS_EMPTY:
            return{...state, text: 'ALL FIELDS REQUIRED'}
        case START_PROJECT_NETWORK_ERROR:
            return{...state, text: 'NETWORK ERROR'}
        case START_PROJECT_REQUEST_SUCCESS:
            return{...state, requestCompleted: true}
        case START_PROJECT_INTERESTS_CHANGED:
            return{...state, interests:action.payload}
        case START_PROJECT_UNMOUNT:
            return{
                ...state,
                name: '',
                description: '',
                zipCode: '',
                country:'',
                volunteers: '',
                interests: '',
                freelancers: '',
                startDate: '',
                endDate: '',
                budget: '',
                files:'',
                requestCompleted: false,
                text: 'CREATE A PROJECT',
                uploadStatus:'NOT_INITIATED',
            }
        default:
        return state
    }
}