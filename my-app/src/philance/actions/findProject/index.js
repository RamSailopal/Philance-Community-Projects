import {
  FIND_PROJECT_TEXT_CHANGED,
  FIND_PROJECT_LOCATION_CHANGED,
  FIND_PROJECT_RESOURCE_CHANGED,
  FIND_PROJECT_PROJECT_STATUS_CHANGED,
  FIND_PROJECT_IMPACT_CATEGORIES_CHANGED,
  FIND_PROJECT_COUNTRY_CHANGED,
  FIND_PROJECT_KEYWORD_CHANGED,
  FIND_PROJECT_PUBLIC_REQUEST_SUCCESS,
  FIND_PROJECT_UNMOUNT,
  FIND_PROJECT_PUBLIC_NETWORK_ERROR,
  FIND_PROJECT_NETWORK_ERROR,
  FIND_PROJECT_REQUEST_SUCCESS,
} from '../types'
import axios from 'axios'

import {
  hostname
} from '../../../config'

export const textChanged = () => {
  return {
    type: FIND_PROJECT_TEXT_CHANGED
  }
}

export const locationChanged = text => {
  return {
    type: FIND_PROJECT_LOCATION_CHANGED,
    payload: text
  }
}

export const resourceChanged = text => {
  return {
    type: FIND_PROJECT_RESOURCE_CHANGED,
    payload: text
  }
}

export const projectStatusChanged = text => {
  return {
    type: FIND_PROJECT_PROJECT_STATUS_CHANGED,
    payload: text
  }
}

export const impactCategoriesChanged = text => {
  return {
    type: FIND_PROJECT_IMPACT_CATEGORIES_CHANGED,
    payload: text
  }
}

export const countryChanged = text => {
  return {
    type: FIND_PROJECT_COUNTRY_CHANGED,
    payload: text
  }
}

export const keywordChanged = text => {
  return {
    type: FIND_PROJECT_KEYWORD_CHANGED,
    payload: text
  }
}


export const findProjects = ({
  impactCategories,
  zipCode,
  country,
  keyword,
  projectStatus,
  resourceType,
  activePage, pageSize
}, loaderCallback) => {
  var freelancers = false
  var volunteers = false
  switch (resourceType) {
    case 'Needs Volunteers':
      {
        volunteers = true
        freelancers = false
        break;
      }
    case 'Needs Freelancers':
      {
        volunteers = false
        freelancers = true
        break;
      }
    case 'Any':
      {
        volunteers = true
        freelancers = true
        break;
      }
    default:
  }
  return dispatch => {
    dispatch({
      type: 'START_PROJECT'
    })


    // const page = 1;
    // const pageSize = 3;
    const obd = "DESC"
    axios.post(hostname() + '/philance/projects/search', { obd, activePage, pageSize })
      .then(response => {
        loaderCallback(false)
        if (response.status !== 200) {
          return {
            type: FIND_PROJECT_NETWORK_ERROR
          }
        } else {
          dispatch({
            type: FIND_PROJECT_REQUEST_SUCCESS,
            payload: response.data.respProjects,
            totalPages: response.data.totalPages
          })
        }
      })
      .catch(error => {
        loaderCallback(false)
        return {
          type: FIND_PROJECT_NETWORK_ERROR
        }
      });
  }
}
export const getPublicPageProjects = () => {
  return dispatch => {
    axios.post(hostname() + '/philance/projects/search?l=3&obd=DESC')
      .then(response => {
        if (response.status !== 200) {
          return {
            type: FIND_PROJECT_PUBLIC_NETWORK_ERROR
          }
        } else {
          dispatch({
            type: FIND_PROJECT_PUBLIC_REQUEST_SUCCESS,
            payload: response.data.respProjects
          })
        }
      })
      .catch(error => {
        return {
          type: FIND_PROJECT_PUBLIC_NETWORK_ERROR
        }
      });
  }
}
export const recentProjects = () => {

  return dispatch => {
    axios.post(hostname() + '/philance/projects/recentProject')
      .then(response => {
        if (response.status !== 200) {

          return {
            type: 'RECENT_PROJECTS_NETWORK_ERROR'
          }
        } else {
          dispatch({
            type: 'RECENT_PROJECTS_REQUEST_SUCCESS',
            payload: response.data.recentProjects
          })
        }
      })
      .catch(error => {
        return {
          type: 'RECENT_PROJECTS_NETWORK_ERROR'
        }
      });
  }
}

export const findProjectUnmount = () => {
  return dispatch => {
    dispatch({
      type: FIND_PROJECT_UNMOUNT
    })
  }
}


export const findProjectsUnmount = () => {
  return dispatch => {
    dispatch({
      type: FIND_PROJECT_UNMOUNT
    })
  }
}