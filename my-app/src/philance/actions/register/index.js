import {
    ALREADY_REGISTER,
    FIELDS_EMPTY,
    INVALID_EMAIL,
    LOGIN_USER_SUCCESS,
    NETWORK_ERROR,
    REGISTER_EMAIL_CHANGED,
    REGISTER_FIRST_NAME_CHANGED,
    REGISTER_LAST_NAME_CHANGED,
    REGISTER_PASSWORD_CHANGED,
    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    REMOVE_REGISTER_TOAST,
    WEAK_PASSWORD,
    USER_PROFILE_GET_USER_INFO
} from '../types'

import axios from 'axios'

import {hostname} from '../../../config'

/**
 * The method recieves the text from password input field and updates the first name key parameter in the redux store
 * @param {*} param0 Input is received in the form of text
 */

export const firstNameChanged = text => {
    return {
        type: REGISTER_FIRST_NAME_CHANGED,
        payload: text
    }
}

/**
 * The method recieves the text from password input field and updates the last name key parameter in the redux store
 * @param {*} param0 Input is received in the form of text
 */

export const lastNameChanged = text => {
    return {
        type: REGISTER_LAST_NAME_CHANGED,
        payload: text
    }
}

/**
 * The method recieves the text from password input field and updates the email key parameter in the redux store
 * @param {*} param0 Input is received in the form of text
 */

export const emailChanged = text => {
    return {
        type: REGISTER_EMAIL_CHANGED,
        payload: text
    }
}

/**
 * The method recieves the text from password input field and updates the password key parameter in the redux store
 * @param {*} param0 Input is received in the form of text
 */

export const passwordChanged = text => {
    return {
        type: REGISTER_PASSWORD_CHANGED,
        payload: text
    }
}

/**
 * The method checks weather text in any of the input field is changed
 * @param {*} param0 no inputs received
 */

export const textChanged = () => {
    return {
        type: REGISTER_USER
    }
}

/**
 * The method removes the Welcome text from the private home page after its unmounting 
 * @param {*} param0 no inputs received
 */

export const registerToast = () => {
    return {
        type: REMOVE_REGISTER_TOAST
    }
}

/**
 * Registers the user based on input criteria.
 *  The method makes sure it validates the email 
 *  Password should have more than 6 characters
 *  All the fields must be filled
 * @param {*} param0 input object in the format { firstName, lastName, email, password }
 */

export const registerUser = ({ firstName, lastName, email, password }) => 
{
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if(email === '' || password === '' || firstName === '' || lastName === '' ) 
        return {
            type: FIELDS_EMPTY
        }
    else if (reg.test(email) === false) {
        return {
            type: INVALID_EMAIL
        }
    }

    else if (password.length<6) {
        return {
            type: WEAK_PASSWORD
        }
    }

    else {
        return dispatch => {
            dispatch({type: REGISTER_USER})
            axios.post(hostname()+'/philance/users/', {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
            })
            .then(response=>
                {
                    dispatch({
                        type: REGISTER_USER_SUCCESS,
                        payload: response.data
                    })
                        axios.post(hostname()+'/philance/users/login/', {
                            email: email,
                            password: password
                        }
                    )
                    .then((loginResponse)=>
                            {
                                dispatch({
                                    type: LOGIN_USER_SUCCESS,
                                    payload: loginResponse.data,
                                    email:email
                                })
                                dispatch({
                                    type: USER_PROFILE_GET_USER_INFO,
                                    payload: {
                                        fname:firstName,
                                        lname:lastName,
                                        email: email
                                    }
                                })
                            }
                        )
                }
                
            )
            .catch(error=>{
                if(error.response.status==null){
                const status = error.response.status
                if (status === 409)
                    dispatch({type: ALREADY_REGISTER})
                else if (status === 500)
                    dispatch({type: INVALID_EMAIL})
                else 
                    dispatch({type: NETWORK_ERROR})
                }else{
                    console.log('ss',typeof(error.response.status))
                    const status = error.response.status
                    if (status === 409)
                        dispatch({type: ALREADY_REGISTER})
                    else if (status === 500)
                        dispatch({type: INVALID_EMAIL})
                    else 
                        dispatch({type: NETWORK_ERROR})
                }
            });
        }
    }
}
