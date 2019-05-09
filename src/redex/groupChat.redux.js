import io from "socket.io-client"
import axios from "axios"

const socket = io("ws://127.0.0.1:8081")

const GROUP_MSG_LIST = "GROUP_MSG_LIST"
const GROUP_MSG_GET = "GROUP_MSG_GET"
const initState = {
  chatMsg: [],
}

export function groupchat (state = initState, action) {
  switch (action.type) {
    case GROUP_MSG_LIST:
      return { ...state, chatMsg: action.payload }
    case GROUP_MSG_GET:
      return { ...state, chatMsg: [...state.chatMsg, action.payload] }
    default:
      return state
  }
}

function groupMsgList (data) {
  return { type: GROUP_MSG_LIST, payload: data }
}

function groupMsgGet (data) {
  return { type: GROUP_MSG_GET, payload: data }
}

export function getGroupChatMsg () {
  return (dispatch) => {
    socket.on("groupChatMessage", function (data) {
      dispatch(groupMsgGet(data))
    })
  }
}

export function getGroupMsgList () {
  return (dispatch) => {
    axios.get("/user/getGroupMsgList").then(res => {
      if (res.status == 200 && res.data.code == 0) {
        console.log(res.data.data)
        dispatch(groupMsgList(res.data.data))
      }
    })
  }
}

export function sendGroupChatMsg (data) {
  return dispatch => {
    socket.emit("groupChat", data)
  }
}

export function sendAddGroup (data) {
  return dispatch => {
    socket.emit("somebodyJoin", data)
  }
}

export function getAddGroup () {
  return dispatch => {
    socket.on("getSomebodyJoin", function (data) {
      console.log(data)
    })
  }
}


