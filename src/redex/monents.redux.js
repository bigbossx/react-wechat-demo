import axios from "axios"
import { getAddRequestList } from "./friends.redux"

const GET_POSTING = "GET_POSTING"
const GET_MORE_POSTING = "GET_MORE_POSTING"

const initState = {
  postingList: [],
}

//reducer
export function monents (state = initState, action) {
  switch (action.type) {
    case GET_POSTING:
      return { ...state, postingList: action.payload }
    case GET_MORE_POSTING:
      return { ...state, postingList: this.state.postingList.concat(action.payload) }
    default :
      return state
  }
}

//action creator
function getPostingAction (data) {
  return { type: GET_POSTING, payload: data }
}

function getMorePostingAction (data) {
  return { type: GET_MORE_POSTING, payload: data }
}

export function getPosting (pageNumber) {
  return dispatch => {
    axios.get("/user/getPosting", {
      params: {
        page: 1,
        pageNumber,
      },
    }).then((res) => {
      if (res.status == 200 && res.data.code == 0) {
        dispatch(getPostingAction())
      }
    })
  }
}

export function getMorePosting (page, pageNumber) {
  return dispatch => {
    axios.get("/user/getPosting", {
      params: {
        page,
        pageNumber,
      },
    }).then((res) => {
      if (res.status == 200 && res.data.code == 0) {
        dispatch(getMorePostingAction())
      }
    })
  }
}
