import axios from 'axios'

import {hostname} from '../../../config'
import {MY_CANDIDATE_GET_REVIEW, MY_CANDIDATE_STORE_REVIEW, CANDIDATE_STATUS_RESPONSE, MY_CANDIDATE_CHANGE_RESPONSE} from '../types'

export const getProjectCandidateReviewList =(id,callback)=> {
    return dispatch=> {
        axios.get(hostname()+`/philance/projects/${id}/users/`)
        .then(
            response=>{
                dispatch({
                    type: MY_CANDIDATE_GET_REVIEW,
                    payload: response.data.Candidates,
                    length: response.data.Candidates.length
                })
                callback()
            }
        ).catch(()=>{
            callback()
        })
    }
}


export const updateCandidateStatusForProjectApplication =({
    projectId,applicantId,startDate,endDate,role,type,status,userId
},callback)=>{
    return dispatch=> {
        axios.put(hostname()+`/philance/projects/${projectId}/users/`,{
            projectTeam:[{
                applicantId:applicantId,
                startDate:startDate,
                endDate:endDate,
                role:role,
                type:type,
                status:status,
                userId:userId
            }]
        })
        .then(
            response=>{
                callback(false)
                dispatch({
                    type: CANDIDATE_STATUS_RESPONSE,
                    payload: response.data,
                })
            }
        )
    }
}

export const storeCandidateReview = (list) => {
    return dispatch => {
        dispatch({
            type: MY_CANDIDATE_STORE_REVIEW,
            payload: list
        })
    }
}

export const changeResponseStatus =(response,key,status)=> {
    response[key].status=status;
    
    return dispatch=> {
        dispatch({
            type: MY_CANDIDATE_CHANGE_RESPONSE,
            payload: response
        })
    }
}