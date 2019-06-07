import {
  PROJECT_TASKS,
  PROJECT_TASKS_DESCRIPTION_CHANGED,
  PROJECT_TASKS_END_DATE_CHANGED,
  PROJECT_TASKS_FIELDS_EMPTY,
  PROJECT_TASKS_NAME_CHANGED,
  PROJECT_TASKS_START_DATE_CHANGED,
  PROJECT_TASKS_NETWORK_ERROR,
  PROJECT_TASKS_REQUEST_SUCCESS,
  PROJECT_TASKS_FILES_CHANGED,
  PROJECT_TASKS_FILES_UPLOAD_FAILED,
  PROJECT_TASKS_FILES_UPLOAD_SUCCESS,
  PROJECT_TASKS_START_USER_SELECTED_CHANGED,
  PROJECT_TASKS_PRIORITY_CHANGED,
  PROJECT_TASKS_STATUS_CHANGED,
  TASK_DETAILS_SET_DETAILS,
  CREATE_PROJECT_TASKS_UNMOUNT,
} from '../types'

import axios from 'axios'

import { hostname } from '../../../config'

export const textChanged = () => {
  return {
    type: PROJECT_TASKS
  }
}


export const filesChanged = (text, callback) => {

  return dispatch => {
    dispatch({
      type: PROJECT_TASKS_FILES_CHANGED,
      payload: text
    })
    callback ? callback() : null
  }
}

export const descriptionChanged = text => {
  return {
    type: PROJECT_TASKS_DESCRIPTION_CHANGED,
    payload: text
  }
}

export const endDateChanged = text => {
  return {
    type: PROJECT_TASKS_END_DATE_CHANGED,
    payload: text
  }
}

export const startDateChanged = text => {
  return {
    type: PROJECT_TASKS_START_DATE_CHANGED,
    payload: text
  }
}


export const taskNameChanged = text => {
  return {
    type: PROJECT_TASKS_NAME_CHANGED,
    payload: text
  }
}

export const taskStatusChanged = text => {
  return {
    type: PROJECT_TASKS_STATUS_CHANGED,
    payload: text
  }
}

export const priorityChanged = text => {
  return {
    type: PROJECT_TASKS_PRIORITY_CHANGED,
    payload: text
  }
}


export const userSelectedChanged = text => {
  return {
    type: PROJECT_TASKS_START_USER_SELECTED_CHANGED,
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
      type: PROJECT_TASKS_FIELDS_EMPTY
    }
  }

  if (startDate > endDate) {
    loaderCallback(false)
    return {
      type: PROJECT_TASKS_FIELDS_EMPTY
    }
  }


  return dispatch => {
    dispatch({ type: PROJECT_TASKS })
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
            type: PROJECT_TASKS_NETWORK_ERROR
          }
        } else {
          loaderCallback(false)
          dispatch({
            type: PROJECT_TASKS_REQUEST_SUCCESS
          })
          uploadCallback({
            projectId,
            taskId: response.data.taskId
          });
          // uploadCallback()
        }
      })
      .catch(error => {
        loaderCallback(false)
        console.log(error);
        return {
          type: PROJECT_TASKS_NETWORK_ERROR
        }
      });
  }
}
export const createProjectTasksUnmount = () => {
  return dispatch => {
    dispatch({
      type: CREATE_PROJECT_TASKS_UNMOUNT
    })
  }
}
export const uploadFiles = (metadata, files, callback) => {
  var axPromises = []
  if (!files) {
    return dispatch => {
      dispatch({
        type: PROJECT_TASKS_FILES_UPLOAD_FAILED
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
            type: PROJECT_TASKS_FILES_UPLOAD_SUCCESS
          })
          if (callback) {
            callback()
          }
        })
        .catch(() => {
          dispatch({
            type: PROJECT_TASKS_FILES_UPLOAD_FAILED
          })

        })
    }
  }

}
export const setTaskDetails = (tasks, id, callback) => {



  var task = {}
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId == id) {
      task = tasks[i]
    }
  }
  // task=tasks.map((value)=>{
  //   console.log(value,id);
  //   console.log(value.taskId==id);
  //   if(value.taskId==id){

  //     return value
  //   }
  // })
  callback ? callback() : null
  return {
    type: TASK_DETAILS_SET_DETAILS,
    payload: task
  }
}