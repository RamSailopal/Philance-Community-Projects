import {
    createStore,
    applyMiddleware
} from 'redux'
import Immutable from 'immutable'
import reducers  from '../reducers'
import ReduxThunk from 'redux-thunk'
import { setUserLoggedIn, refreshAuthToken, getUserInfo, forceLogout } from '../actions/userProfile';
import { getCommonInfo } from '../actions/common';
import { getLocal } from '../helpers/helper';

const initialState = Immutable.fromJS({})

const store = createStore(
    reducers,
    initialState,
    applyMiddleware(ReduxThunk)
)
if(localStorage.getItem('auth')){
    var authToken =localStorage.getItem('auth');
    var userId=getLocal('userid')
    var email=getLocal('email')
    store.dispatch(setUserLoggedIn())
    var refreshToken =localStorage.getItem('refresh');
    store.dispatch(refreshAuthToken({authToken,refreshToken,userId:userId},({tokenrecieved})=>{
        if(!tokenrecieved){
            store.dispatch(forceLogout())
        }else{
            store.dispatch(getUserInfo(email,()=>{
              store.dispatch(setUserLoggedIn(userId))
            store.dispatch(getCommonInfo())
            }))
        }
      }))
}
export default store