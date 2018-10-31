import {
    PROJECT_DETAILS_GET_DETAILS,
    PROJECT_DETAILS_CHANGED,
    PROJECT_DETAILS_BUDGET_CHANGED,
    PROJECT_DETAILS_DESCRIPTION_CHANGED,
    PROJECT_DETAILS_FREELANCERS_CHANGED,
    PROJECT_DETAILS_NAME_CHANGED,
    PROJECT_DETAILS_COUNTRY_CHANGED,
    PROJECT_DETAILS_START_DATE_CHANGED,
    PROJECT_DETAILS_ZIP_CODE_CHANGED,
    PROJECT_DETAILS_VOLUNTEERS_CHANGED,
    PROJECT_DETAILS_END_DATE_CHANGED,
    PROJECT_DETAILS_STATUS_CHANGED,
    PROJECT_DETAILS_UPDATE_SUCESS,
    PROJECT_DETAILS_REMOVE_TOASTER,
    PROJECT_DETAILS_ID_STORED,
    PROJECT_DETAILS_INTERESTS_CHANGED,
    LOGOUT_USER,
    PROJECT_DETAILS_FILES_CHANGED,
    PROJECT_DETAILS_CLEAR_FILES
} from '../actions/types'

const INITIAL_STATE = {
    name: '',
    status: '',
    description: '',
    zipCode: '',
    country: '',
    startDate: '',
    endDate: '',
    budget: '',
    interests: '',
    volunteers: '',
    freelancers: '',
    toast: false,
    id: '',
    createdBy: '',
    projectAttachments: [],
    projectTasks: [],
    files: [],
    projectTeam:[],
    chatGroup:[],
}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case PROJECT_DETAILS_BUDGET_CHANGED:
            return { ...state,
                budget: action.payload
            }

        case PROJECT_DETAILS_CLEAR_FILES:
            return { ...state,
                files:[]
            }

        case PROJECT_DETAILS_DESCRIPTION_CHANGED:
            return { ...state,
                description: action.payload
            }

        case PROJECT_DETAILS_FREELANCERS_CHANGED:
            return { ...state,
                freelancers: action.payload
            }

        case PROJECT_DETAILS_NAME_CHANGED:
            return { ...state,
                name: action.payload
            }

        case PROJECT_DETAILS_COUNTRY_CHANGED:
            return { ...state,
                country: action.payload
            }

        case PROJECT_DETAILS_START_DATE_CHANGED:
            return { ...state,
                startDate: action.payload
            }

        case PROJECT_DETAILS_ZIP_CODE_CHANGED:
            return { ...state,
                zipCode: action.payload
            }

        case PROJECT_DETAILS_VOLUNTEERS_CHANGED:
            return { ...state,
                volunteers: action.payload
            }

        case PROJECT_DETAILS_END_DATE_CHANGED:
            return { ...state,
                endDate: action.payload
            }

        case PROJECT_DETAILS_STATUS_CHANGED:
            return { ...state,
                status: action.payload
            }

        case PROJECT_DETAILS_FILES_CHANGED:
            return { ...state,
                files: action.payload
            }

        case PROJECT_DETAILS_UPDATE_SUCESS:
            return { ...state,
                toast: true
            }

        case PROJECT_DETAILS_REMOVE_TOASTER:
            return { ...state,
                toast: false
            }

        case PROJECT_DETAILS_ID_STORED:
            return { ...state,
                id: action.payload
            }

        case PROJECT_DETAILS_INTERESTS_CHANGED:
            return { ...state,
                interests: action.payload
            }

        case PROJECT_DETAILS_GET_DETAILS:
            return {
                ...state,
                name: action.payload.projectName,
                status: action.payload.status,
                description: action.payload.description,
                zipCode: action.payload.zipCode,
                country: action.payload.country,
                startDate: action.payload.startDate,
                endDate: action.payload.endDate,
                budget: action.payload.estimatedBudget,
                volunteers: action.payload.volunteers,
                freelancers: action.payload.freelancers,
                createdBy: action.payload.createdBy,
                interests: action.interests,
                projectAttachments: action.payload.project_attachments,
                projectTeam: action.payload.project_teams,
                projectTasks: action.payload.project_tasks,
                chatGroup: action.payload.chatGroup
            }

        case PROJECT_DETAILS_CHANGED:
            return {
                ...state
            }
        case LOGOUT_USER:
            return {
                name: '',
                status: '',
                description: '',
                zipCode: '',
                country: '',
                startDate: '',
                endDate: '',
                budget: '',
                interests: '',
                volunteers: '',
                freelancers: '',
                toast: false,
                id: '',
                createdBy: '',
                interests:[],
                projectAttachments:[],
                projectTeam:[],
                projectTasks:[],
                chatGroup:[],
            }

        default:
            return state
    }
}