import {
    USER_AUTHENTICATION_REFRESH_TOKENS,
    USER_PROFILE_TEXT_CHANGED,
    USER_PROFILE_FIELDS_EMPTY,
    USER_PROFILE_COUNTRY_CHANGED,
    USER_PROFILE_NAME_CHANGED,
    USER_PROFILE_ORGANIZATION_CHANGED,
    USER_PROFILE_TITLE_CHANGED,
    USER_PROFILE_DESCRIPTION_CHANGED,
    USER_PROFILE_EMAIL_CHANGED,
    USER_PROFILE_PASSWORD_CHANGED,
    USER_PROFILE_POSTAL_CODE_CHANGED,
    USER_PROFILE_INTERESTS_CHANGED,
    USER_PROFILE_CONTACT_CHANGED,
    USER_PROFILE_UPDATE_SUCCESS,
    USER_PROFILE_UPDATE_UNMOUNT,
    USER_PROFILE_GET_USER_INFO,
    USER_PROFILE_USER_IMAGE_CHANGED_FOR_PREVIEW,
    USER_PROFILE_USER_IMAGE_CHANGED_AFTER_UPLOAD,
    USER_PROFILE_USER_IMAGE_CHANGED_WAS_CHANGED,
    PROFILE_IMAGE_UPLOAD_SUCCESS,
    UNSELECT_FILES,
    USER_PROFILE_IMAGE_UPLOAD_FAILED,
    ANY_PROFILE_GET_USER_INFO,
    USER_PROFILE_NOTIFICATIONS_CALLED,
    LOGOUT_USER,
    SET_USER_LOGGED_IN,
    USER_PROFILE_GET_SETTINGS_INFO,
    USER_PROFILE_UPDATE_SETTINGS_INFO
} from '../types'

import axios from 'axios'

import {hostname} from '../../../config'

export const textChanged = (image) => {
    return {
        type: USER_PROFILE_TEXT_CHANGED,
        payload: image
    }
}

export const profileImageChange = (file) => {
    return {
        type: USER_PROFILE_USER_IMAGE_CHANGED_FOR_PREVIEW,
        payload: file
    }
}

export const emailChanged = text => {
    return {
        type: USER_PROFILE_EMAIL_CHANGED,
        payload: text
    }
}

export const nameChanged = text => {
    return {
        type: USER_PROFILE_NAME_CHANGED,
        payload: text
    }
}

export const oraganizationChanged = text => {
    return {
        type: USER_PROFILE_ORGANIZATION_CHANGED,
        payload: text
    }
}

export const titleChanged = text => {
    return {
        type: USER_PROFILE_TITLE_CHANGED,
        payload: text
    }
}

export const contactChanged = text => {
    return {
        type: USER_PROFILE_CONTACT_CHANGED,
        payload: text
    }
}

export const descriptionChanged = text => {
    return {
        type: USER_PROFILE_DESCRIPTION_CHANGED,
        payload: text
    }
}

export const postalCodeChanged = text => {
    return {
        type: USER_PROFILE_POSTAL_CODE_CHANGED,
        payload: text
    }
}

export const countryChanged = text => {
    return {
        type: USER_PROFILE_COUNTRY_CHANGED,
        payload: text
    }
}

export const passwordChanged = text => {
    return {
        type: USER_PROFILE_PASSWORD_CHANGED,
        payload: text
    }
}

export const interestschanged = text => {
    return {
        type: USER_PROFILE_INTERESTS_CHANGED,
        payload: text
    }
}

export const settingsUpdate = ({settings,userId}) => {
    var params={}
    if(settings.notificationSettings.emailNotifications===true){
        params['emailNotifications']='YES'
    }
    if(settings.notificationSettings.emailNotifications===false){
        params['emailNotifications']='NO'
    }
    if(settings.notificationSettings.textNotifications===true){
        params['textNotifications']='YES'
    }
    if(settings.notificationSettings.textNotifications===false){
        params['textNotifications']='NO'
    }
    return dispatch=>{
        axios.put(hostname()+`/philance/users/${userId}/settings`,params).then((resp)=>{
            
            if(resp){
                dispatch({
                    type:USER_PROFILE_UPDATE_SETTINGS_INFO,
                    payload:resp.data.userSettings
                })
            }else{
                dispatch({
                    type:'nothing'
                })
            }
        })
    }
};


export const updateUnmount = text => {
    return {
        type: USER_PROFILE_UPDATE_UNMOUNT
    }
}

export const getUserSettings = ({userId}) => {
    return dispatch=>{
        axios.get(hostname()+`/philance/users/${userId}/settings`).then((response)=>{
            
            dispatch({
                type:USER_PROFILE_GET_SETTINGS_INFO,
                payload:response.data.userSettings
            })
        }).catch((err)=>{
            console.log(err);
            
        })
    }
}

export const getUserInfo =(email,callback)=> {
    return dispatch =>
        axios.post(hostname()+'/philance/users/search', {
            email: email  
        })
        .then(response=>{
            dispatch({
                type: USER_PROFILE_GET_USER_INFO,
                payload: response.data[0]
            })
            callback()
        })
        .catch(error=>
            console.log(error)
        )
}
export const setUserLoggedIn = (userId) => {
    return{
        type:SET_USER_LOGGED_IN,
        payload:userId
    }
}
export const getUserById =(id,authToken)=> {
    return dispatch =>
        axios.get(hostname()+`/philance/users/${id}`, {
            headers:{
                authorization: authToken,
            }
            })
        .then(response=>{
            dispatch({
                type: ANY_PROFILE_GET_USER_INFO,
                payload: response.data.user[0]
            })
            
        })
        .catch(error=>
            console.log(error)
        )
}

export const updateProfile = ({ name, email, password, contact, country, postalCode, description, organization, title, interests, currentEmail, userId }) => {
    if(email === ''
    || name === '' 
    
) {
    return {
        type: USER_PROFILE_FIELDS_EMPTY
    }
}
else {return dispatch => {
    var intr=interests?interests.toString():null
        axios.put(hostname()+'/philance/users/1', {
            firstName: name.split(" ")[0],
            lastName: name.split(" ")[1],
            email: email,
            password: password,
            contact: contact,
            postalCode: postalCode,
            country: country,
            description: description,
            title: title,
            organization: organization,
            interests: intr,
            currentEmail: currentEmail,
            userId:userId
         })
            .then(response=>{
                dispatch({type: USER_PROFILE_UPDATE_SUCCESS})
            }
            )
            .catch(error=>{
                console.log(error)
            });
    }}
}

/**
 * The following method is called to upload files to the server. Reference url is returned
 * @param {*} param0 Tells what type of upload is this.
 */

export const uploadFiles = (metadata, files) => {
    
    if(!files){
        return dispatch=>{
            dispatch({
                type:USER_PROFILE_IMAGE_UPLOAD_FAILED
            })
        }
    }else{
        return dispatch => {
            dispatch({
                type:'UPLOAD_STARTED'
            })
            const url = hostname() + '/philance/files';
            const formData = new FormData();
            formData.append('file', files)
            formData.append('param', JSON.stringify(metadata))
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            axios.post(url, formData, config)
                .then((response) => {
                    dispatch({
                        type: PROFILE_IMAGE_UPLOAD_SUCCESS
                    })
                    dispatch({
                        type: UNSELECT_FILES
                    })
                    dispatch({
                        type: USER_PROFILE_USER_IMAGE_CHANGED_WAS_CHANGED
                    })
                })
                .catch(() => {
                    dispatch({
                        type: USER_PROFILE_IMAGE_UPLOAD_FAILED
                    })
    
                })
        }
    }

}

export const getUserProfileImage=(userId)=>{
    return dispatch =>{
        axios.get(`${hostname()}/philance/users/image/${userId}`).then((image)=>{
            dispatch( {
                type: USER_PROFILE_USER_IMAGE_CHANGED_AFTER_UPLOAD,
                payload: `${hostname()}/philance/users/image/${userId}`
            })
            dispatch({
                type: 'USER_PROFILE_IMAGE_REFRESH_NOT_REQUIRED',
                
            })
        })
    }

}

export const logout=({userId,authToken,refreshToken})=>{
    return dispatch =>{
        localStorage.removeItem('auth')
        localStorage.removeItem('refresh')
        axios.get(`${hostname()}/philance/users/${userId}/logout`,{
            headers:{
                authorization:authToken
            }
        }).then((response)=>{
            dispatch({
                type: LOGOUT_USER
            })
        })
    }
}
export const forceLogout=()=>{
    return dispatch =>{
        localStorage.removeItem('auth')
        localStorage.removeItem('refresh')
            dispatch({
                type: LOGOUT_USER
            })

    }
}


export const getNotifications=(userId,currentNotifications)=>{
    return dispatch =>{
        axios.get(`${hostname()}/philance/users/notifications/${userId}`).then((response)=>{
            if(currentNotifications!==response.data){
                response.data.map((notification, key)=>{
                    response.data[key]={
                        ...notification,
                        creationDate:new Date(notification.creationDate).toLocaleTimeString('en-US')+' '+new Date(notification.creationDate).toDateString('en-US')
                    }
                })
                dispatch( {
                    type: USER_PROFILE_NOTIFICATIONS_CALLED,
                    payload: response.data
                })
            }
        })
    }

}
export const refreshAuthToken=({userId,authToken,refreshToken},callback)=>{
    
    return dispatch =>{
        axios.get(`${hostname()}/philance/users/${userId}/refresh`,{
                headers: {
                    authorization: authToken,
                    refreshtoken: refreshToken
                }
        }).then((response,err)=>{
            
            dispatch( {
                type: USER_AUTHENTICATION_REFRESH_TOKENS,
                payload: response.data
            })
            callback?callback({tokenrecieved:true}):null
            
        }).catch((err)=>{
            callback?callback({tokenrecieved:false}):null
        })
    }

}