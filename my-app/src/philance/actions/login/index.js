import {
    EMAIL_CHANGED,
    INVALID_CREDENTIALS,
    LOGIN_NETWORK_ERROR,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER,
    PASSWORD_EMPTY,
    EMAIL_EMPTY,
    FIELDS_EMPTY,
    USER_PROFILE_GET_USER_INFO,
} from '../types'

import axios from 'axios'

import {hostname} from '../../../config'

/**
 * The method recieves the text from password input field and updates the email key parameter in the redux store
 * @param {*} param0 Input is received in the form of text
 */

export const emailChanged = text => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    }
}

/**
 * The method recieves the text from password input field and updates the password key parameter in the redux store
 * @param {*} param0 Input is received in the form of text
 */

export const passwordChanged = text => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    }
}

/**
 * The method checks weather text in any of the input field is changed
 * @param {*} param0 No inputs received
 */

export const textChanged = () => {
    return {
        type: LOGIN_USER
    }
}

/**
 * Logins the user based on input criteria.
 *  All the fields must be filled
 * @param {*} param0 input object in the format { email, password }
 */

export const loginUser = ({email, password}) => {
    if(email === '' && password === '') 
        return {
            type: FIELDS_EMPTY
        }
    else if(email === '')
        return {
            type: EMAIL_EMPTY
        }
    else if(password === '')
        return {
            type: PASSWORD_EMPTY
        }
    return dispatch => {
        dispatch({type: LOGIN_USER})
        axios.post(hostname()+'/philance/users/login/', {
            email: email,
            password: password
        })
        .then(response=>{
            const status = response.status
            if(status===200){
                dispatch({
                    type: LOGIN_USER_SUCCESS,
                    payload: response.data,
                    email:email
                })
                    axios.post(hostname()+'/philance/users/search', {
                        email: email  
                    })
                    .then(response=>{
                        dispatch({
                            type: USER_PROFILE_GET_USER_INFO,
                            payload: response.data[0]
                        })
                    })
                    .catch(error=>
                        console.log(error)
                    )
            }
                dispatch({type: INVALID_CREDENTIALS})
        })
        .catch(error=>{
            const status = error.response.status
            if (status === 409)
                dispatch({type: INVALID_CREDENTIALS})
            else 
                dispatch({type: LOGIN_NETWORK_ERROR})
        });
    }   
}