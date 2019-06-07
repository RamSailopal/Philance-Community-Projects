import {
  PROJECT_TASK_DETAILS,
  PROJECT_TASK_DETAILS_DESCRIPTION_CHANGED,
  PROJECT_TASK_DETAILS_END_DATE_CHANGED,
  PROJECT_TASK_DETAILS_FIELDS_EMPTY,
  PROJECT_TASK_DETAILS_NAME_CHANGED,
  PROJECT_TASK_DETAILS_START_DATE_CHANGED,
  PROJECT_TASK_DETAILS_NETWORK_ERROR,
  PROJECT_TASK_DETAILS_REQUEST_SUCCESS,
  PROJECT_TASK_DETAILS_UNMOUNT,
  PROJECT_TASK_DETAILS_FILES_CHANGED,
  PROJECT_TASK_DETAILS_FILES_UPLOAD_FAILED,
  PROJECT_TASK_DETAILS_FILES_UPLOAD_SUCCESS,
  PROJECT_TASK_DETAILS_START_USER_SELECTED_CHANGED,
  PROJECT_TASK_DETAILS_PRIORITY_CHANGED,
  PROJECT_TASK_DETAILS_STATUS_CHANGED,
  PROJECT_TASK_DETAILS_UPDATE_REQUEST_SUCCESS,
  PROJECT_TASK_DETAILS_UPDATE_NETWORK_ERROR,
  PROJECT_TASK_DETAILS_ATTACHMENT_DELETED,
} from '../types'

import axios from 'axios'

import { hostname } from '../../../config'

export const textChanged = () => {
  return {
    type: PROJECT_TASK_DETAILS
  }
}


export const filesChanged = (text, callback) => {
  return dispatch => {
    dispatch({
      type: PROJECT_TASK_DETAILS_FILES_CHANGED,
      payload: text
    })
    callback ? callback() : null
  }
}

export const descriptionChanged = text => {
  return {
    type: PROJECT_TASK_DETAILS_DESCRIPTION_CHANGED,
    payload: text
  }
}

export const endDateChanged = text => {
  return {
    type: PROJECT_TASK_DETAILS_END_DATE_CHANGED,
    payload: text
  }
}

export const startDateChanged = text => {
  return {
    type: PROJECT_TASK_DETAILS_START_DATE_CHANGED,
    payload: text
  }
}


export const taskNameChanged = text => {
  return {
    type: PROJECT_TASK_DETAILS_NAME_CHANGED,
    payload: text
  }
}

export const taskStatusChanged = text => {
  return {
    type: PROJECT_TASK_DETAILS_STATUS_CHANGED,
    payload: text
  }
}

export const priorityChanged = text => {
  return {
    type: PROJECT_TASK_DETAILS_PRIORITY_CHANGED,
    payload: text
  }
}


export const userSelectedChanged = text => {
  return {
    type: PROJECT_TASK_DETAILS_START_USER_SELECTED_CHANGED,
    payload: text
  }
}

export const createProjectTask = ({
  name,
  description,
  startDate,
  endDate,
  userSelected,
  status,
  priority,
  projectId,
  userId
}, uploadCallback, loaderCallback) => {

  if (name === '') {
    loaderCallback(false)
    return {
      type: PROJECT_TASK_DETAILS_FIELDS_EMPTY
    }
  }

  if (startDate > endDate) {
    loaderCallback(false)
    return {
      type: PROJECT_TASK_DETAILS_FIELDS_EMPTY
    }
  }

  return dispatch => {
    dispatch({ type: PROJECT_TASK_DETAILS })
    axios.post(hostname() + `/philance/projects/${projectId}/tasks`, {
      projectId: projectId,
      taskName: name,
      description: description,
      assignedTo: userSelected,
      assignedBy: userId,
      status: status,
      startDate: startDate,
      endDate: endDate,
      priority: priority,
    }
    )
      .then(response => {
        if (response.status !== 200) {
          loaderCallback(false)
          return {
            type: PROJECT_TASK_DETAILS_NETWORK_ERROR
          }
        } else {
          loaderCallback(false)
          dispatch({
            type: PROJECT_TASK_DETAILS_REQUEST_SUCCESS
          })
          uploadCallback(projectId);
          // uploadCallback()
        }
      })
      .catch(error => {
        loaderCallback(false)

        return {
          type: PROJECT_TASK_DETAILS_NETWORK_ERROR
        }
      });
  }
}
export const updateTaskDetails = ({
  taskId,
  taskName,
  description,
  startDate,
  endDate,
  userSelected,
  status,
  priority,
  projectId,
  userId

}, loaderCallback) => {



  if (new Date(startDate) > new Date(endDate)) {
    loaderCallback(false)
    return {
      type: PROJECT_TASK_DETAILS_FIELDS_EMPTY
    }
  }

  else {

    return dispatch => {
      dispatch({ type: PROJECT_TASK_DETAILS })
      axios.put(hostname() + `/philance/projects/${projectId}/tasks/${taskId}`, {
        taskName: taskName,
        description: description,
        assignedTo: userSelected,
        assignedBy: userId,
        status: status,
        startDate: startDate,
        endDate: endDate,
        priority: priority,
      }
      )
        .then(response => {
          if (response.status !== 200) {
            loaderCallback({ response: response.data, flag: false })
            return {
              type: PROJECT_TASK_DETAILS_UPDATE_NETWORK_ERROR
            }
          } else {
            loaderCallback(false)

            dispatch({
              type: PROJECT_TASK_DETAILS_UPDATE_REQUEST_SUCCESS
            })
            // uploadCallback(projectId);
            // uploadCallback()
          }
        })
        .catch(error => {
          loaderCallback({ error, flag: false })

          return {
            type: PROJECT_TASK_DETAILS_UPDATE_NETWORK_ERROR
          }
        });
    }
  }
}

export const projectTasksUnmount = () => {
  return dispatch => {
    dispatch({
      type: PROJECT_TASK_DETAILS_UNMOUNT
    })
  }
}

export const deleteTaskAttachments = ({
  taskId, projectId, name
},
  callback) => {
  return dispatch => {
    name = name.split('/')[name.split('/').length - 1]
    axios.delete(hostname() + `/philance/projects/${projectId}/tasks/${taskId}/files/${name}`).then(() => {
      dispatch({
        type: PROJECT_TASK_DETAILS_ATTACHMENT_DELETED
      })
      callback()
    })
  }
}

export const uploadFiles = (metadata, files, callback) => {
  var axPromises = []
  if (!files) {
    return dispatch => {
      dispatch({
        type: PROJECT_TASK_DETAILS_FILES_UPLOAD_FAILED
      })
    }
  } else {
    return dispatch => {
      const url = hostname() + '/philance/files';
      for (var i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append('file', files[i])
        formData.append('param', JSON.stringify(metadata))
        const config = {
          headers: {
            'content-type': 'multipart/form-data'
          }
        }
        setTimeout(() => {
          axPromises[i] = axios.post(url, formData, config)
        }, 1000);
      }
      Promise.all(axPromises)
        .then(() => {
          dispatch({
            type: PROJECT_TASK_DETAILS_FILES_UPLOAD_SUCCESS
          })
          if (callback) {
            callback()
          }
        })
        .catch(() => {
          dispatch({
            type: PROJECT_TASK_DETAILS_FILES_UPLOAD_FAILED
          })

        })
    }
  }

}
