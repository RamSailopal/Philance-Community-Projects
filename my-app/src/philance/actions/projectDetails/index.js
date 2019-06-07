import axios from 'axios'

import { hostname } from '../../../config'
import {
  PROJECT_DETAILS_GET_DETAILS,
  PROJECT_DETAILS_BUDGET_CHANGED,
  PROJECT_DETAILS_BUDGETDETAILS_CHANGED,
  PROJECT_DETAILS_SUPPLIESNEEDED_CHANGED,
  PROJECT_DETAILS_SUMMARY_CHANGED,
  PROJECT_DETAILS_CHALLENGE_CHANGED,
  PROJECT_DETAILS_SOLUTION_CHANGED,
  PROJECT_DETAILS_JUSTIFICATION_CHANGED,
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
  PROJECT_DETAILS_CLEAR_FILES,
  PROJECT_DETAILS_BUDGET_FORMAT,
  PROJECT_DETAILS_STARTEND,
  PROJECT_DETAILS_VOLERR,
  PROJECT_DETAILS_FREEERR,
  PROJECT_DETAILS_FIELDS_EMPTY,
  PROJECT_DETAILS_UPDATES_CHANGED,
  PROJECT_DETAILS_GET_UPDATES_RECEIVED,
  PROJECT_DETAILS_IMAGES_FILES_CHANGED,
  PROJECT_DETAILS_DOCUMENTS_FILES_CHANGED,
  PROJECT_DETAILS_CITY_CHANGED,
  EDIT_PROJECT_UNMOUNT,
  PROJECT_DETAILS_UPDATES_DELETED,
  PROJECT_DETAILS_UPDATES_NOT_DELETED,
  PROJECT_DETAILS_PLAY_BUTTON_CHANGED
} from '../types'


export const imagesFilesChanged = (files, callback) => {
  return dispatch => {
    dispatch({
      type: PROJECT_DETAILS_IMAGES_FILES_CHANGED,
      payload: files
    })
    callback ? callback() : null
  }
}
export const documentsFilesChanged = (files, callback) => {
  return dispatch => {
    dispatch({
      type: PROJECT_DETAILS_DOCUMENTS_FILES_CHANGED,
      payload: files
    })
    callback ? callback() : null
  }
}

export const removeToaster = () => {
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

export const editProjectUnmount = () => {
  return dispatch => {
    dispatch({
      type: EDIT_PROJECT_UNMOUNT
    })
  }
}
export const descriptionChanged = text => {
  return {
    type: PROJECT_DETAILS_SUMMARY_CHANGED,
    payload: text
  }
}
export const projectSummaryChanged = text => {

  return {
    type: PROJECT_DETAILS_SUMMARY_CHANGED,
    payload: text
  }
}
export const projectChallengeChanged = text => {

  return {
    type: PROJECT_DETAILS_CHALLENGE_CHANGED,
    payload: text
  }
}
export const projectSolutionChanged = text => {
  return {
    type: PROJECT_DETAILS_SOLUTION_CHANGED,
    payload: text
  }
}
export const projectJustificationChange = text => {
  return {
    type: PROJECT_DETAILS_JUSTIFICATION_CHANGED,
    payload: text
  }
}
export const budgetDetailsChange = text => {
  return {
    type: PROJECT_DETAILS_BUDGETDETAILS_CHANGED,
    payload: text
  }
}
export const projectSuppliesNeededChange = text => {
  return {
    type: PROJECT_DETAILS_SUPPLIESNEEDED_CHANGED,
    payload: text
  }
}
projectSuppliesNeededChange
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
export const playButtonChange = text => {
  return {
    type: PROJECT_DETAILS_PLAY_BUTTON_CHANGED,
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
export const cityChanged = text => {
  return {
    type: PROJECT_DETAILS_CITY_CHANGED,
    payload: text
  }
}

export const statusChanged = text => {

  return {
    type: PROJECT_DETAILS_STATUS_CHANGED,
    payload: text
  }
}

export const idStored = (id) => {
  return {
    type: PROJECT_DETAILS_ID_STORED,
    payload: id
  }
}

export const interestsChanged = text => {

  return {
    type: PROJECT_DETAILS_INTERESTS_CHANGED,
    payload: text
  }
}

export const projectUpdatesChanged = text => {
  return {
    type: PROJECT_DETAILS_UPDATES_CHANGED,
    payload: text
  }
}

export const clearFiles = text => {
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

export const updateProject = ({ name, status, zipCode, interests, country, description, volunteers, freelancers, budget, startDate, endDate, id, userId, projectSummary, projectChallenge, projectSolution, projectJustification, budgetDetails,
  city, suppliesNeeded }, loaderCallback, loaderCallback2) => {

  if (name === '' || description === '' || zipCode === '' || country === '' || interests === '') {
    loaderCallback(false)
    return {
      type: PROJECT_DETAILS_FIELDS_EMPTY
    }
  }

  if (!freelancers.match('^[0-9]{1,3}$') && !volunteers.match('^[0-9]{1,3}$')) {
    loaderCallback(false)
    return {
      type: PROJECT_DETAILS_FREEERR
    }
  }

  if (startDate === "") {
    loaderCallback(false)
    return {
      type: PROJECT_DETAILS_FIELDS_EMPTY
    }
  }

  if (endDate === "") {
    loaderCallback(false)
    return {
      type: PROJECT_DETAILS_FIELDS_EMPTY
    }
  }

  if (new Date(endDate) < new Date(startDate)) {
    loaderCallback(false)
    return {
      type: PROJECT_DETAILS_STARTEND
    }
  }

  let impactCategories = []
  interests.map((element, prop) => {
    return (
      impactCategories.push({
        detailType: "IMPACT_CATEGORY",
        name: element,
        certificationReq: "NO",
        certificationLink: "",
        attribute1: "",
        attribute2: "",
        attribute3: "",
        attribute4: "",
        attribute5: ""
      })
    );
  })

  return dispatch => {
    axios.put(hostname() + `/philance/projects/${id}`, {
      projectName: name,
      projectSummary: projectSummary,
      projectChallenge: projectChallenge,
      projectSolution: projectSolution,
      projectJustification: projectJustification,
      zipCode: zipCode,
      location: "Sample Location",
      volunteers: volunteers,
      freelancers: freelancers,
      estimatedBudget: budget,
      lastUpdatedBy: userId,
      startDate: startDate,
      endDate: endDate,
      country: country,
      status: status,
      projectDetails: impactCategories,
      budgetDetails: budgetDetails,
      suppliesNeeded: suppliesNeeded,
      city: city,
    })
      .then(
        response => {
          loaderCallback(false)
          loaderCallback2(false)
          dispatch({ type: PROJECT_DETAILS_UPDATE_SUCESS })
        }
      )
      .catch(
        error => {
          loaderCallback(false)
          loaderCallback2(false)

        }
      )
  }
}

export const updateProjectExclusive = (fields, metadata, loaderCallback) => {

  let reducedObject = Object.keys(fields).filter(field => {
    if (fields[field]) {
      return true
    }
    return false
  }).reduce((obj, key) => {
    obj[key] = fields[key];
    return obj;
  }, {});

  return dispatch => {
    axios.put(hostname() + `/philance/projects/${metadata.id}?exclusiveUpdate=true`, { fields: reducedObject })
      .then(
        response => {
          loaderCallback(false)
          dispatch({ type: PROJECT_DETAILS_UPDATE_SUCESS })
        }
      )
      .catch(
        error => {
          loaderCallback(false)

        }
      )
  }
}

export const getProjectById = ({ id }, loaderCallback) => {

  return dispatch => {
    let arr = [], interests = [];
    axios.get(hostname() + `/philance/projects/${id}`)
      .then(response => {
        arr = response.data.project[0].project_details;
        for (let index = 0; index < arr.length; index++) {
          const element = arr[index];
          interests.push(element.name)
        }
        dispatch({
          type: PROJECT_DETAILS_GET_DETAILS,
          payload: response.data.project[0],
          interests: interests
        })
        loaderCallback(false)
      })
      .catch(err => {
        loaderCallback(false)

      })
  }
}

export const getApplicantForProject = ({ projectId, userId }, loaderCallback) => {
  return dispatch => {
    axios.get(hostname() + `/philance/projects/${projectId}/users/${userId}`)
      .then(response => {
        dispatch({
          type: PROJECT_APPLICANT_DETAILS_GET_DETAILS,
          payload: response.data
        })
        loaderCallback(false)
      })
      .catch(err => {
        loaderCallback(false)

      })
  }
}
export const deleteProjectAttachment = ({ filename, projectId }, callback) => {
  return dispatch => {

    // filename=filename.split('/')[filename.split('/').length-1]
    axios.delete(hostname() + `${filename}`)
      .then(response => {
        callback()
        // dispatch({
        //     type: PROJECT_APPLICANT_DETAILS_GET_DETAILS,
        //     payload: response.data
        // })
        // loaderCallback(false)
      })
      .catch(err => {
        // loaderCallback(false)
        console.log(err)
      })
  }
}
export const createProjectUpdates = (body, callback) => {
  return dispatch => {

    axios.post(hostname() + '/philance/projects/updates', body).then((resp) => {
      callback(true)
      dispatch({
        type: 'PROJECT_DETAILS_UPDATES_CREATED'
      })
    }).catch((err) => {

      callback(false)
      dispatch({
        type: 'PROJECT_DETAILS_UPDATES_NOT_CREATED'
      })
    })
  }
}

export const deleteProjectUpdates = (body, callback) => {

  return dispatch => {
    axios.delete(hostname() + `/philance/projects/updates/${body.projectId}/${body.updateId}`, { body: body }).then((resp) => {
      callback(true)
      dispatch({
        type: 'PROJECT_DETAILS_UPDATES_DELETED'
      })
    }).catch((err) => {

      callback(false)
      dispatch({
        type: 'PROJECT_DETAILS_UPDATES_NOT_DELETED'
      })
    })
  }
}
export const getProjectUpdates = (projectId, activePage, pageSize) => {

  return dispatch => {
    axios.post(hostname() + '/philance/projects/updates/p=' + projectId, { activePage, pageSize }).then((resp) => {

      dispatch(
        {
          type: PROJECT_DETAILS_GET_UPDATES_RECEIVED,
          payload: resp.data.updates,
          totalPages: resp.data.totalPages,
        }
      )
    }).catch((err) => {
      dispatch(
        {
          type: 'PROJECT_DETAILS_GET_UPDATES_NOT_RECEIVED',
        }
      )
    })
  }
}

export const setProjectDefaultImage = ({ imageUri, projectId }, callback) => {
  return dispatch => {
    axios.put(hostname() + `/philance/projects/${projectId}/changeDefaultImage`, { imageUri })
  }
}

export const editUploadLinks = (links, projectId, callback) => {


  return dispatch => {
    function isValid(value) {
      if (value.id) { return value }
      else {
        return value.attachmentPath
      }
    }
    let filteredLinks = links.filter(
      isValid)
    if (filteredLinks.length == 0) {
      callback()
      dispatch({
        type: 'EDIT_PROJECT_LINKS_UPLOAD_FAILED'
      })
      return
    }
    filteredLinks.map((link, index) => {
      if (index == (filteredLinks.length - 1)) {
        const url = hostname() + '/philance/files/links';
        axios.put(url, {
          links: filteredLinks
        }).then((resp) => {
          dispatch({
            type: 'EDIT_PROJECT_LINKS_UPLOAD_SUCCESS'
          })
          if (callback) {
            callback()
          }
        }).catch((err) => {

          if (callback) {
            callback()
          }
        })
      }
    })
  }

}