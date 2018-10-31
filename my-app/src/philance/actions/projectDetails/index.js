import axios from 'axios'

import {hostname} from '../../../config'
import {
    PROJECT_DETAILS_GET_DETAILS,
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
    PROJECT_APPLICANT_DETAILS_GET_DETAILS,
    PROJECT_DETAILS_FILES_CHANGED,
    PROJECT_DETAILS_CLEAR_FILES
} from '../types'

export const removeToaster =()=> {
    return {
        type: PROJECT_DETAILS_REMOVE_TOASTER
    }
}

export const budgetChanged = text => {
    return {
        type: PROJECT_DETAILS_BUDGET_CHANGED,
        payload: text
    }
  }
  
  export const descriptionChanged = text => {
    return {
        type: PROJECT_DETAILS_DESCRIPTION_CHANGED,
        payload: text
    }
  }
  
  export const endDateChanged = text => {
    return {
        type: PROJECT_DETAILS_END_DATE_CHANGED,
        payload: text
    }
  }
  
  export const freelancersChanged = text => {
    return {
        type: PROJECT_DETAILS_FREELANCERS_CHANGED,
        payload: text
    }
  }
  
  export const projectNameChanged = text => {
    return {
        type: PROJECT_DETAILS_NAME_CHANGED,
        payload: text
    }
  }
  
  export const countryChanged = text => {
    return {
        type: PROJECT_DETAILS_COUNTRY_CHANGED,
        payload: text
    }
  }
  
  export const startDateChanged = text => {
    return {
        type: PROJECT_DETAILS_START_DATE_CHANGED,
        payload: text
    }
  }
  
  export const volunteersChanged = text => {
    return {
        type: PROJECT_DETAILS_VOLUNTEERS_CHANGED,
        payload: text
    }
  }
  
  export const zipCodeChanged = text => {
    return {
        type: PROJECT_DETAILS_ZIP_CODE_CHANGED,
        payload: text
    }
  }

  export const statusChanged = text => {
    return {
        type: PROJECT_DETAILS_STATUS_CHANGED,
        payload: text
    }
  }

  export const idStored =(id)=> {
    return {
        type: PROJECT_DETAILS_ID_STORED,
        payload: id
    }
  }

  export const interestsChanged  = text => {
      return {
        type: PROJECT_DETAILS_INTERESTS_CHANGED,
        payload: text
      }
  }
  export const clearFiles  = text => {
      return {
        type: PROJECT_DETAILS_CLEAR_FILES,
        payload: text
      }
  }
  export const filesChanged = (text, callback) => {
    return dispatch => {
      dispatch({
        type: PROJECT_DETAILS_FILES_CHANGED,
        payload: text
      })
      callback ? callback() : null
    }
  }
  
export const updateProject =({name, status, zipCode, interests, country, description, volunteers, freelancers, budget, startDate, endDate, id, userId},loaderCallback)=> {
    let impactCategories = []
    interests.map((element, prop)=>{
    return(
        impactCategories.push({  
            detailType: "IMPACT_CATEGORY",
            name: element,
            certificationReq: "NO",
            certificationLink: "",
            attribute1 : "",
            attribute2 : "",
            attribute3 : "",
            attribute4 : "",
            attribute5 : ""
        })
    );
    })

    return dispatch => {
        axios.put(hostname()+`/philance/projects/${id}`, {
            projectName : name,
            description : description,
            zipCode: zipCode,
            location : "Sample Location",
            volunteers : volunteers,
            freelancers : freelancers,
            estimatedBudget : budget,
            lastUpdatedBy: userId, 
            startDate : startDate,
            endDate : endDate,
            country: country,
            status: status,
            projectDetails: impactCategories
        })
        .then(
            response=> {
                loaderCallback(false)
                console.log(response)
                dispatch({type: PROJECT_DETAILS_UPDATE_SUCESS})
            }
        )
        .catch(
            error=> {
                loaderCallback(false)
                console.log(error)
            }
        )
    }
}

export const getProjectById =({id}, loaderCallback)=> {
    return dispatch=> {
        let arr = [], interests = [];
        axios.get(hostname()+`/philance/projects/${id}`)
        .then(response=>{
            console.log(response)
            arr = response.data.project[0].project_details;
            for (let index = 0; index < arr.length; index++) {
                const element = arr[index];
                interests.push(element.name)
            }
            dispatch({
                type: PROJECT_DETAILS_GET_DETAILS,
                payload: response.data.project[0],
                interests:interests
            })
            loaderCallback(false)
        })
        .catch(err=>{
        loaderCallback(false)
        console.log(err)
        })
    }
}

export const getApplicantForProject =({projectId,userId}, loaderCallback)=> {
    return dispatch=> {
        axios.get(hostname()+`/philance/projects/${projectId}/users/${userId}`)
        .then(response=>{
            dispatch({
                type: PROJECT_APPLICANT_DETAILS_GET_DETAILS,
                payload: response.data
            })
            loaderCallback(false)
        })
        .catch(err=>{
        loaderCallback(false)
        console.log(err)
        })
    }
}
export const deleteProjectAttachment =({filename,projectId},callback)=> {
    return dispatch=> {
        // filename=filename.split('/')[filename.split('/').length-1]
        axios.delete(hostname()+`${filename}`)
        .then(response=>{
            callback()
            // dispatch({
            //     type: PROJECT_APPLICANT_DETAILS_GET_DETAILS,
            //     payload: response.data
            // })
            // loaderCallback(false)
        })
        .catch(err=>{
        // loaderCallback(false)
        console.log(err)
        })
    }
}