import {
  START_PROJECT,
  START_PROJECT_BUDGET_CHANGED,
  START_PROJECT_DESCRIPTION_CHANGED,
  START_PROJECT_END_DATE_CHANGED,
  START_PROJECT_FIELDS_EMPTY,
  START_PROJECT_FREELANCERS_CHANGED,
  START_PROJECT_NAME_CHANGED,
  START_PROJECT_START_DATE_CHANGED,
  START_PROJECT_VOLUNTEERS_CHANGED,
  START_PROJECT_ZIP_CODE_CHANGED,
  START_PROJECT_NETWORK_ERROR,
  START_PROJECT_REQUEST_SUCCESS,
  START_PROJECT_UNMOUNT,
  START_PROJECT_BUDGET_DETAILS_CHANGED,
  START_PROJECT_CITY_CHANGED,
  START_PROJECT_FILES_UPLOAD_FAILED,
  START_PROJECT_FILES_UPLOAD_SUCCESS,
  START_PROJECT_COUNTRY_CHANGED,
  START_PROJECT_INTERESTS_CHANGED,
  START_PROJECT_BUDGET_FORMAT,
  START_PROJECT_STARTEND,
  START_PROJECT_VOLERR,
  START_PROJECT_FREEERR,
  START_PROJECT_SUMMARY_CHANGED,
  START_PROJECT_CHALLENGE_CHANGED,
  START_PROJECT_SOLUTION_CHANGED,
  START_PROJECT_JUSTIFICATION_CHANGED,
  START_PROJECT_DOCUMENTS_FILES_CHANGED,
  START_PROJECT_IMAGES_FILES_CHANGED,
  START_PROJECT_SUPPLIES_NEEDED_CHANGED,
  START_PROJECT_RESOURCES_REQUIRED_ERROR
} from '../types'

import axios from 'axios'

import {
  hostname
} from '../../../config'

export const textChanged = () => {
  return {
    type: START_PROJECT
  }
}

export const budgetChanged = text => {
  return {
    type: START_PROJECT_BUDGET_CHANGED,
    payload: text
  }
}

export const imagesFilesChanged = (files, callback) => {
  return dispatch => {
    dispatch({
      type: START_PROJECT_IMAGES_FILES_CHANGED,
      payload: files
    })
    callback ? callback() : null
  }
}
export const documentsFilesChanged = (files, callback) => {
  return dispatch => {
    dispatch({
      type: START_PROJECT_DOCUMENTS_FILES_CHANGED,
      payload: files
    })
    callback ? callback() : null
  }
}

export const descriptionChanged = text => {
  return {
    type: START_PROJECT_DESCRIPTION_CHANGED,
    payload: text
  }
}


export const endDateChanged = text => {
  return {
    type: START_PROJECT_END_DATE_CHANGED,
    payload: text
  }
}

export const freelancersChanged = text => {
  return {
    type: START_PROJECT_FREELANCERS_CHANGED,
    payload: text
  }
}

export const projectNameChanged = text => {
  return {
    type: START_PROJECT_NAME_CHANGED,
    payload: text
  }
}

export const countryChanged = text => {
  return {
    type: START_PROJECT_COUNTRY_CHANGED,
    payload: text
  }
}

export const startDateChanged = text => {
  return {
    type: START_PROJECT_START_DATE_CHANGED,
    payload: text
  }
}

export const volunteersChanged = text => {
  return {
    type: START_PROJECT_VOLUNTEERS_CHANGED,
    payload: text
  }
}

export const zipCodeChanged = text => {
  return {
    type: START_PROJECT_ZIP_CODE_CHANGED,
    payload: text
  }
}

export const startProject = ({

  name,
  description,
  volunteers,
  freelancers,
  zipCode,
  country,
  interests,
  startDate,
  endDate,
  budget,
  userId,
  files,
  summary,
  challenge,
  solution,
  justification,
  budgetDetails,
  city,
  suppliesNeeded


}, uploadCallback, loaderCallback) => {
  if (freelancers === null || freelancers === "") {
    freelancers = 0
  }
  if (volunteers === null || volunteers === "") {
    volunteers = 0
  }
  var projectDetails = []
  var interestsArray = interests
  for (var i = 0; i < interestsArray.length; i++) {
    projectDetails.push({
      "detailType": "IMPACT_CATEGORY",
      "name": interestsArray[i],
      "certificationReq": "NO",
      "certificationLink": "",
      "attribute1": "",
      "attribute2": "",
      "attribute3": "",
      "attribute4": "",
      "attribute5": ""
    })
  }
  return dispatch => {
    dispatch({
      type: START_PROJECT
    })
    axios.post(hostname() + '/philance/projects/', {
      projectName: name,
      description: description,
      zipCode: zipCode,
      country: country,
      volunteers: volunteers,
      freelancers: freelancers,
      estimatedBudget: budget,
      startDate: startDate,
      interests: interests,
      endDate: endDate,
      userId: userId,
      files: files,
      summary: summary,
      challenge: challenge,
      solution: solution,
      justification: justification,
      "projectDetails": projectDetails,
      budgetDetails: budgetDetails,
      city: city,
      suppliesNeeded: suppliesNeeded

    })
      .then(response => {
        if (response.status !== 200) {

          loaderCallback(false)
          return {
            type: START_PROJECT_NETWORK_ERROR
          }
        } else {
          loaderCallback(false)
          uploadCallback(response.data.project[0].projectId);
        }
      })
      .catch(error => {
        loaderCallback(false)

        return {
          type: START_PROJECT_NETWORK_ERROR
        }
      });
  }
}
export const startProjectSuccess = () => {
  return {
    type: START_PROJECT_REQUEST_SUCCESS
  }
}
export const startProjectUnmount = () => {
  return dispatch => {
    dispatch({
      type: START_PROJECT_UNMOUNT
    })
  }
}
export const interestschanged = text => {
  return {
    type: START_PROJECT_INTERESTS_CHANGED,
    payload: text
  }
}
export const projectSummaryChanged = text => {
  return {
    type: START_PROJECT_SUMMARY_CHANGED,
    payload: text
  }
}
export const projectChallengeChanged = text => {
  return {
    type: START_PROJECT_CHALLENGE_CHANGED,
    payload: text
  }
}
export const projectSolutionChanged = text => {
  return {
    type: START_PROJECT_SOLUTION_CHANGED,
    payload: text
  }
}
export const projectSuppliesNeededChange = text => {
  return {
    type: START_PROJECT_SUPPLIES_NEEDED_CHANGED,
    payload: text
  }
}
export const budgetDetailsChange = text => {
  return {
    type: START_PROJECT_BUDGET_DETAILS_CHANGED,
    payload: text
  }
}
export const cityChange = text => {
  return {
    type: START_PROJECT_CITY_CHANGED,
    payload: text
  }
}

export const projectJustificationChange = text => {
  return {
    type: START_PROJECT_JUSTIFICATION_CHANGED,
    payload: text
  }
}
export const uploadFiles = (metadata, files, callback) => {
  if (Array.from(files).length == 0) {
    callback()
    return {
      type: START_PROJECT_FILES_UPLOAD_FAILED
    }
  }
  if (!files) {
    return dispatch => {
      dispatch({
        type: START_PROJECT_FILES_UPLOAD_FAILED
      })
    }
  } else {
    return dispatch => {
      const url = hostname() + '/philance/files';
      const uploaders = Array.from(files).map((file, index) => {


        const formData = new FormData();
        formData.append('file', files[index])
        if (index == 0 && metadata.attachmentType == 'image' && metadata.uploadType == "startProjectFiles") {
          metadata['setDefaultImage'] = true
        }
        formData.append('param', JSON.stringify(metadata))
        const config = {
          onUploadProgress: function (progressEvent) {
            var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          },
          headers: {
            'content-type': 'multipart/form-data'
          }
        }
        return axios.post(url, formData, config).then(() => {
          // alert('done')
        })
      })
      axios.all(uploaders)
        .then(() => {
          dispatch({
            type: START_PROJECT_FILES_UPLOAD_SUCCESS
          })
          if (callback) {
            setTimeout(() => {
              callback()
              return {}
            }, 2500);
          }
        })
        .catch(() => {
          dispatch({
            type: START_PROJECT_FILES_UPLOAD_FAILED
          })
          if (callback) {
            callback()
          }
        })
    }
  }
}

export const uploadLinks = (links, projectId, callback) => {
  return dispatch => {
    let filteredLinks = links.filter(link => link.link)

    if (filteredLinks.length == 0) {
      callback()
      dispatch({
        type: 'START_PROJECT_LINKS_UPLOAD_FAILED'
      })
      return
    }
    filteredLinks.map((link, index) => {
      link['projectId'] = projectId
      if (index == (filteredLinks.length - 1)) {
        const url = hostname() + '/philance/files/links';
        axios.post(url, {
          links: filteredLinks
        }).then((resp) => {
          dispatch({
            type: 'START_PROJECT_LINKS_UPLOAD_SUCCESS'
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