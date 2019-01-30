import {
    ANY_PROFILE_GET_USER_INFO, LOGOUT_USER
} from '../actions/types'
import { hostname } from '../../config';

const INITIAL_STATE = {
    contact: '',
    email: '',
    name: '',
    password: '',
    title: '',
    organization: '',
    country: '',
    postalCode: '',
    description: '',
    interests: '',
    text: 'SAVE CHANGES',
    update: false,
    interestsArrived: true,
    userId: '',
    displayImage:true,
    imageRefresh:false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ANY_PROFILE_GET_USER_INFO:
        const a=hostname();
        return {
            ...state,
            email: action.payload.email,
            name: action.payload.firstName + ' ' + action.payload.lastName,
            title: action.payload.title,
            organization: action.payload.organization,
            description: action.payload.description,
            interests: action.payload.interests,
            userId: action.payload.userId,
            userImageUrl:action.payload.userProfileImageUrl?a+ action.payload.userProfileImageUrl:null,
            contact: action.payload.phoneNumber,
            postalCode: action.payload.zipCode,
            country: action.payload.country
        }
        case LOGOUT_USER:
        return{
            contact: '',
            email: '',
            name: '',
            password: '',
            title: '',
            organization: '',
            country: '',
            postalCode: '',
            description: '',
            interests: '',
            text: 'SAVE CHANGES',
            update: false,
            interestsArrived: true,
            userId: '',
            displayImage:true,
            imageRefresh:false
        }
        default:
            return state
    }
}