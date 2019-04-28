import { combineReducers } from 'redux'
// import {counter} from './counter.redux'
import { user } from './user.redux'
import { friends } from './friends.redux'
import { chat } from './chat.redux'
import { video } from './video.redux'
import { monents } from './monents.redux'
const reduxCombine = combineReducers({
  user,
  friends,
  chat,
  video,
monents})
export default reduxCombine
