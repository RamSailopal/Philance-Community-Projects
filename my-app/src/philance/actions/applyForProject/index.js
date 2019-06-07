import axios from 'axios'
import { notification } from 'antd'
import { hostname } from '../../../config'
import {
    APPLY_FOR_PROJECT_MESSAGE_CHANGED,
    APPLY_FOR_PROJECT_ROLE_CHANGED,
    APPLY_FOR_PROJECT_REMOVE_TOASTER,
    APPLY_FOR_PROJECT_UPDATE_SUCCESS,
    APPLY_FOR_PROJECT_ALREADY_APPLIED,
} from '../types'

export const removeToaster = () => {
    return {
        type: APPLY_FOR_PROJECT_REMOVE_TOASTER
    }
}

export const messageChanged = text => {
    return {
        type: APPLY_FOR_PROJECT_MESSAGE_CHANGED,
        payload: text
    }
}

export const roleChanged = text => {
    return {
        type: APPLY_FOR_PROJECT_ROLE_CHANGED,
        payload: text
    }
}

export const applyForProject = ({ userId, projectId, message, role }, loaderCallback, callback) => {
    return dispatch => {
        axios.post(hostname() + `/philance/projects/${projectId}/users`, {
            userId: userId,
            applicantMessage: message,
            role: role,
            type: ''
        })
            .then(
                response => {
                    loaderCallback(false)

                    dispatch({
                        type: APPLY_FOR_PROJECT_UPDATE_SUCCESS
                    })
                    notification.success({
                        message: 'Your application has been submitted. Thank You!',
                        duration: 5
                    });
                    callback()
                }
            )
            .catch(
                error => {
                    loaderCallback(false)
                    const status = error.response.status
                    if (status === 409) {
                        dispatch({
                            type: APPLY_FOR_PROJECT_ALREADY_APPLIED
                        })
                        notification.error({

                            message: 'You already applied for this project',
                            duration: 5

                        });
                    }
                }
            )
    }
}
