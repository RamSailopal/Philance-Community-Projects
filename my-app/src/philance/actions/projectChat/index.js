import {
  PROJECT_CHAT_MESSAGE_UPDATE, PROJECT_CHAT_UNMOUNT,
} from '../types'

import axios from 'axios'

import { hostname } from '../../../config'

export const messageReceived = ({ messages, messageData }, callback) => {
  return dispatch => {
    messages.push(messageData)
    dispatch({
      type: PROJECT_CHAT_MESSAGE_UPDATE,
      payload: messages
    })
    callback ? callback() : null
  }
}
export const messageSent = ({ messages, messageData }, callback) => {

  return dispatch => {
    dispatch({
      type: PROJECT_CHAT_MESSAGE_UPDATE,
      payload: messages
    })
    callback ? callback() : null
  }
}
export const projectChatUnmount = () => {
  return dispatch => {
    dispatch({
      type: PROJECT_CHAT_UNMOUNT,
    })
  }
}