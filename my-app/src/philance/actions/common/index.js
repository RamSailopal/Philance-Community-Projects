import axios from "axios";
import {hostname} from '../../../config'
import {
    INTERESTS_ARRIVED
} from '../types'

/**
 * The method recieves the Common lookups from the API, and stores them in in the redux store
 */

export const getCommonInfo=()=>{
    return dispatch=>{
        let skills=[]
        axios.get(hostname() + '/philance/lookups/Interests')
    .then( async (response) => {
        await response.data.commonLookups.forEach((element) => {
        skills.push({key:element.meaning, value: element.meaning, text: element.meaning})
      })
      dispatch({type:INTERESTS_ARRIVED,payload:skills})
    })
    .catch( (error) => {
        console.log(error)
    })
    }
}