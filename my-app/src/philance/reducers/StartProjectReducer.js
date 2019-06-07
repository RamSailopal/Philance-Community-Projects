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
    START_PROJECT_INTERESTS_CHANGED,
    START_PROJECT_BUDGET_FORMAT,
    START_PROJECT_STARTEND,
    START_PROJECT_VOLERR,
    START_PROJECT_FREEERR,
    START_PROJECT_SUMMARY_CHANGED,
    START_PROJECT_CHALLENGE_CHANGED,
    START_PROJECT_SOLUTION_CHANGED,
    START_PROJECT_JUSTIFICATION_CHANGED,
    START_PROJECT_IMAGES_FILES_CHANGED,
    START_PROJECT_DOCUMENTS_FILES_CHANGED,
    START_PROJECT_BUDGET_DETAILS_CHANGED,
    START_PROJECT_CITY_CHANGED,
    START_PROJECT_SUPPLIES_NEEDED_CHANGED
} from '../actions/types'

const INITIAL_STATE = {
    name: '',
    description: '',
    zipCode: '',
    volunteers: 0,
    freelancers: 0,
    interests: '',
    startDate: '',
    imagesFiles: [],
    documentsFiles: [],
    endDate: '',
    budget: '',
    requestCompleted: false,
    text: 'CREATE A PROJECT',
    uploadStatus: 'NOT_INITIATED',
    country: '',
    summary: '',
    challenge: '',
    solution: '',
    justification: '',
    budgetDetails: '',
    suppliesNeeded: '',
    city: '',
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case START_PROJECT_FILES_UPLOAD_SUCCESS:
            return {
                ...state,
                uploadStatus: 'Files Uploaded and Project has been created!'
            }
        case START_PROJECT_FILES_UPLOAD_FAILED:
            return { ...state, uploadStatus: 'Upload Failed' }
        case START_PROJECT:
            return { ...state, text: 'CREATE A PROJECT' }
        case START_PROJECT_NAME_CHANGED:
            return { ...state, name: action.payload }
        case START_PROJECT_BUDGET_DETAILS_CHANGED:
            return { ...state, budgetDetails: action.payload }
        case START_PROJECT_CITY_CHANGED:
            return { ...state, city: action.payload }
        case START_PROJECT_SUPPLIES_NEEDED_CHANGED:
            return { ...state, suppliesNeeded: action.payload }
        case START_PROJECT_DESCRIPTION_CHANGED:
            return { ...state, description: action.payload }
        case START_PROJECT_ZIP_CODE_CHANGED:
            return { ...state, zipCode: action.payload }
        case START_PROJECT_VOLUNTEERS_CHANGED:
            return { ...state, volunteers: action.payload }
        case START_PROJECT_FREELANCERS_CHANGED:
            return { ...state, freelancers: action.payload }
        case START_PROJECT_START_DATE_CHANGED:
            return { ...state, startDate: action.payload }
        case START_PROJECT_END_DATE_CHANGED:
            return { ...state, endDate: action.payload }
        case START_PROJECT_BUDGET_CHANGED:
            return { ...state, budget: action.payload }
        case START_PROJECT_SUMMARY_CHANGED:
            return { ...state, summary: action.payload }
        case START_PROJECT_CHALLENGE_CHANGED:
            return { ...state, challenge: action.payload }
        case START_PROJECT_SOLUTION_CHANGED:
            return { ...state, solution: action.payload }
        case START_PROJECT_JUSTIFICATION_CHANGED:
            return { ...state, justification: action.payload }
        case START_PROJECT_COUNTRY_CHANGED:
            return { ...state, country: action.payload }
        case START_PROJECT_IMAGES_FILES_CHANGED:
            return { ...state, imagesFiles: action.payload }
        case START_PROJECT_DOCUMENTS_FILES_CHANGED:
            return { ...state, documentsFiles: action.payload }
        case START_PROJECT_FIELDS_EMPTY:
            return { ...state, text: 'ALL FIELDS REQUIRED' }
        case START_PROJECT_BUDGET_FORMAT:
            return { ...state, text: 'BUDGET FORMAT ERROR' }
        case START_PROJECT_STARTEND:
            return { ...state, text: 'END DATE MUST BE AFTER START DATE' }
        case START_PROJECT_VOLERR:
            return { ...state, text: 'VOLUNTEERS NUMBER FORMAT ERROR' }
        case START_PROJECT_FREEERR:
            return { ...state, text: 'VOLUNTEERS/FREELANCERS NUMBER FORMAT ERROR' }
        case START_PROJECT_NETWORK_ERROR:
            return { ...state, text: 'NETWORK ERROR' }
        case START_PROJECT_REQUEST_SUCCESS:
            return {
                ...state,
                name: '',
                description: '',
                zipCode: '',
                country: '',
                volunteers: '',
                interests: '',
                freelancers: '',
                startDate: '',
                endDate: '',
                budget: '',
                files: [],
                requestCompleted: true
            }
        case START_PROJECT_INTERESTS_CHANGED:
            return { ...state, interests: action.payload }
        case START_PROJECT_UNMOUNT:
            return {
                ...state,
                name: '',
                description: '',
                zipCode: '',
                volunteers: 0,
                freelancers: 0,
                interests: '',
                startDate: '',
                imagesFiles: [],
                documentsFiles: [],
                endDate: '',
                budget: '',
                requestCompleted: false,
                text: 'CREATE A PROJECT',
                uploadStatus: 'NOT_INITIATED',
                country: '',
                summary: '',
                challenge: '',
                solution: '',
                justification: '',
                budgetDetails: '',
                suppliesNeeded: '',
                city: '',

            }
        default:
            return state
    }
}