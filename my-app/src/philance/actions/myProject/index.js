import axios from 'axios'

import {
    hostname
} from '../../../config'
import {
    MY_PROJECT_GET_PROJECTS,
    MY_PROJECT_STORE_PROJECTS
} from '../types'

export const myProject = ({ id, activePage, pageSize }, callback) => {

    return dispatch => {
        axios.post(hostname() + `/philance/users/projects/${id}/projects`, { activePage, pageSize })
            .then(
                response => {

                    dispatch({
                        type: MY_PROJECT_GET_PROJECTS,
                        payload: response.data._projs,
                        totalPages: response.data.totalPages
                    })
                    callback()
                }
            )
    }
}

export const storeList = (list) => {
    return dispatch => {
        dispatch({
            type: MY_PROJECT_STORE_PROJECTS,
            payload: list
        })
    }
}