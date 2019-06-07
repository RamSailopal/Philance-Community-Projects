import axios from 'axios'

import { hostname } from '../../../config'
export const submitContact = ({ firstName, lastName, email, message }, loaderCallback, callback) => {
    return dispatch => {
        axios.post(hostname() + `/philance/projects/contact`, {
            firstName: firstName, lastName: lastName, email: email, message: message
        })
            .then(
                response => {
                    loaderCallback(false)

                    if (callback) {
                        callback();
                    }

                }
            )
            .catch(
                error => {
                    loaderCallback(false)
                    const status = error.response.status

                }
            )
    }
}
