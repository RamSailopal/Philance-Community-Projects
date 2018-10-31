import {
    PROJECT_APPLICANT_DETAILS_GET_DETAILS,
} from '../actions/types'
import { hostname } from 'os';

const INITIAL_STATE = {
    name: '',
    status: '',
    message: '',
    applicationDate: '',
}

export default (state = INITIAL_STATE, action) => {

    switch(action.type) {
        case PROJECT_APPLICANT_DETAILS_GET_DETAILS:
        var a=hostname()
            return {...state,
                projectName:action.payload.project.projectName,
                projectDesc:action.payload.project.description,
                applicantRole:action.payload.role,
                name: action.payload.user.firstName+' '+action.payload.user.lastName,
                status: action.payload.status,
                message: action.payload.applicantMessage,
                applicationDate:new Date(action.payload.appliedDate).toDateString(),
                email:action.payload.user.email,
                phoneNumber:action.payload.user.phoneNumber,
                description:action.payload.user.description,
                imageUrl:a+action.payload.user.userProfileImageUrl,
            }
        default:
            return state
    }
}