import {combineReducers} from 'redux';
// import {counter} from './counter.redux'
import {user} from './user.redux'
import {friends} from './friends.redux'
import {chat} from './chat.redux'
const reduxCombine=combineReducers({
    user,
    friends,
    chat
})
export default reduxCombine