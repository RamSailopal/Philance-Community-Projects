import {
    USER_PROFILE_FIELDS_EMPTY,
    USER_PROFILE_TEXT_CHANGED,
    USER_PROFILE_COUNTRY_CHANGED,
    USER_PROFILE_DESCRIPTION_CHANGED,
    USER_PROFILE_EMAIL_CHANGED,
    USER_PROFILE_PASSWORD_CHANGED,
    USER_PROFILE_POSTAL_CODE_CHANGED,
    USER_PROFILE_CONTACT_CHANGED,
    USER_PROFILE_INTERESTS_CHANGED,
    USER_PROFILE_NAME_CHANGED,
    USER_PROFILE_ORGANIZATION_CHANGED,
    USER_PROFILE_TITLE_CHANGED,
    USER_PROFILE_UPDATE_SUCCESS,
    USER_PROFILE_UPDATE_UNMOUNT,
    USER_PROFILE_UPDATE_TOGGLE_PHONE,
    USER_PROFILE_UPDATE_TOGGLE_EMAIL,
    USER_PROFILE_GET_USER_INFO,
    LOGOUT_USER,
    USER_PROFILE_USER_IMAGE_CHANGED_FOR_PREVIEW,
    USER_PROFILE_USER_IMAGE_CHANGED_AFTER_UPLOAD,
    USER_PROFILE_USER_IMAGE_CHANGED_WAS_CHANGED,
    UPLOAD_STARTED,
    PROFILE_IMAGE_UPLOAD_SUCCESS,
    USER_PROFILE_NOTIFICATIONS_CALLED
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
    imageRefresh:false,
    toggleEmail: false,
    togglePhone: false,
    notifications:[]
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_PROFILE_USER_IMAGE_CHANGED_FOR_PREVIEW:
            return { ...state, userImageFile: action.payload, userImageUrl: 'blob'+URL.createObjectURL(action.payload).toString().split('blob')[1] }
        case USER_PROFILE_USER_IMAGE_CHANGED_AFTER_UPLOAD:
            return { ...state, userImageUrl: action.payload }
        case USER_PROFILE_USER_IMAGE_CHANGED_WAS_CHANGED:
            return { ...state, imageRefresh:true }
        case USER_PROFILE_TEXT_CHANGED:
            return { ...state, text: 'SAVE CHANGES' }
        case USER_PROFILE_FIELDS_EMPTY:
            return { ...state, text: 'ALL FIELDS ARE REQUIRED' }
        case USER_PROFILE_PASSWORD_CHANGED:
            return { ...state, password: action.payload }
        case USER_PROFILE_COUNTRY_CHANGED:
            return { ...state, country: action.payload }
        case USER_PROFILE_INTERESTS_CHANGED:
            return { ...state, interests: action.payload }
        case USER_PROFILE_DESCRIPTION_CHANGED:
            return { ...state, description: action.payload }
        case USER_PROFILE_EMAIL_CHANGED:
            return { ...state, email: action.payload }
        case USER_PROFILE_POSTAL_CODE_CHANGED:
            return { ...state, postalCode: action.payload }
        case USER_PROFILE_CONTACT_CHANGED:
            return { ...state, contact: action.payload }
        case USER_PROFILE_NAME_CHANGED:
            return { ...state, name: action.payload }
        case USER_PROFILE_TITLE_CHANGED:
            return { ...state, title: action.payload }
        case USER_PROFILE_ORGANIZATION_CHANGED:
            return { ...state, organization: action.payload }
        case USER_PROFILE_UPDATE_SUCCESS:
            return { ...state, update: true }
        case USER_PROFILE_NOTIFICATIONS_CALLED:
            return { ...state, notifications: action.payload }
        case USER_PROFILE_UPDATE_TOGGLE_EMAIL:
            return { ...state, toggleEmail: !action.payload }
        case USER_PROFILE_UPDATE_TOGGLE_PHONE:
            return { ...state, togglePhone: !action.payload }
        case USER_PROFILE_UPDATE_UNMOUNT:
            return { ...state, update: false}
        case 'USER_PROFILE_IMAGE_REFRESH_NOT_REQUIRED':
            return { ...state, imageRefresh:false}
        case PROFILE_IMAGE_UPLOAD_SUCCESS:
            return { ...state, displayImage: true }
        case UPLOAD_STARTED:
            return { ...state, displayImage: false }
        case USER_PROFILE_GET_USER_INFO:
            const a=hostname();
            const inter=action.payload.interests?action.payload.interests.split(','):null
            return {
                ...state,
                email: action.payload.email,
                name: action.payload.fname + ' ' + action.payload.lname,
                title: action.payload.title,
                organization: action.payload.organization,
                description: action.payload.description,
                interests:inter,
                userId: action.payload.user_id,
                userImageUrl:action.payload.user_profile_image_url?a+ action.payload.user_profile_image_url:null,
                contact: action.payload.ph_number,
                postalCode: action.payload.zip_code,
                country: action.payload.country,
                // toggleEmail: action.payload.toggleEmail,
                // togglePhone: action.payload.togglePhone
            }
        case LOGOUT_USER:
            return {
                ...state,
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
                userImageUrl:null

            }
        default:
            return state
    }
}