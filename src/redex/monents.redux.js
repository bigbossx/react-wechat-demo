import axios from "axios"

const GET_POSTING = "GET_POSTING"
const GET_MORE_POSTING = "GET_MORE_POSTING"
const LIKE_OR_DISLIKE_POSTING = "LIKE_OR_DISLIKE_POSTING"
const COMMENT_POSTING = "COMMENT_POSTING"

const initState = {
  postingList: [],
  page: 1,
  totalPage: 0,
}

//reducer
export function monents (state = initState, action) {
  switch (action.type) {
    case GET_POSTING:
      return {
        ...state,
        postingList: action.payload.result,
        page: action.payload.page,
        totalPage: action.payload.totalPage,
      }
    case GET_MORE_POSTING:
      return {
        ...state,
        postingList: state.postingList.concat(action.payload.result),
        page: action.payload.page,
        totalPage: action.payload.totalPage,
      }
    case LIKE_OR_DISLIKE_POSTING:
      return {
        ...state,
        postingList: state.postingList.map((item) => {
          if (item._id === action.payload.id) {
            item.likeUser = action.payload.data.likeUser
          }
          return item
        }),
      }
    case COMMENT_POSTING:
      return {
        ...state,
        postingList: state.postingList.map((item) => {
          if (item._id === action.payload.id) {
            console.log("enter")
            item.comment = action.payload.data.comment
          }
          return item
        }),
      }
    default :
      return state
  }
}

//action creator
function getPostingAction (data) {
  // console.log(data)
  return { type: GET_POSTING, payload: data }
}

function getMorePostingAction (data) {
  return { type: GET_MORE_POSTING, payload: data }
}

function likeOrDislikePostingAction (id, data) {
  return {
    type: LIKE_OR_DISLIKE_POSTING,
    payload: {
      id,
      data,
    },
  }
}

function commentPostingAction (id, data) {
  return {
    type: COMMENT_POSTING,
    payload: {
      id,
      data,
    },
  }
}

export function commentPosting (id, commentData) {
  return dispatch => {
    console.log(id, commentData)
    axios.post("/user/commentPosting", {
      _id: id,
      commentData,
    }).then((res) => {
      if (res.status == 200 && res.data.code == 0) {
        dispatch(commentPostingAction(id, res.data.data))
      }
    })
  }
}

export function likeOrDislikePosting (id, userInfo) {
  return dispatch => {
    axios.post("/user/likeOrDislikePosting", {
      _id: id,
      userInfo,
    }).then((res) => {
      if (res.status == 200 && res.data.code == 0) {
        dispatch(likeOrDislikePostingAction(id, res.data.data))
      }
    })
  }
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
        // console.log(res.data)
        dispatch(getPostingAction(res.data.data))
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
        dispatch(getMorePostingAction(res.data.data))
      }
    })
  }
}
