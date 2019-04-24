import axios from 'axios'
import io from 'socket.io-client'
const socket=io('ws://127.0.0.1:8081')
const FRIEND_LIST='FRIEND_LIST'
const REQUEST_GET='REQUEST_GET'
const REQUEST_LIST='REQUEST_LIST'
const initState={
    friendsList:[],
    requestList:[],
    unreadrequest:0
}

export function friends(state=initState,action){
    switch(action.type){
        case FRIEND_LIST:
            return {...state,friendsList:action.payload.filter((v)=>v.agree)}
        case REQUEST_GET:
            return {...state,requestList:[...state.requestList,action.payload],unreadrequest:state.unreadrequest+1}
        case REQUEST_LIST:
            return  {...state,requestList:action.payload.filter((v)=>v.from!=action.id),unreadrequest:action.payload.filter(v=>!v.unread&&v.from!=action.id).length}
        default:
            return state
    }
}
function requestGet(data,id){
    return {type:REQUEST_GET,payload:data,id}
}
function friendsListAction(data){
    return {type:FRIEND_LIST,payload:data}
}
function requestListAction(data,id){
    return {type:REQUEST_LIST,payload:data,id}
}
export function delfriend(data){
    return dispatch=>{
        axios.post('/user/delfriend',{
            friendId:data
        }).then((res)=>{
            if(res.status==200&&res.data.code==0){
                //todo
                dispatch(getFriendsList())
            }
        })
    }
}
export function getAddRequest(){
    return (dispatch,getState)=>{
        socket.on('getAddRequest',function(data){
            const id=getState().user._id
            console.log(data)
            const {userId,to,myAvatar,myName,create_time}=data
            if(id!=userId){
                dispatch(requestGet({userId,to,avatar:myAvatar,userName:myName,create_time},id))
            }
        })
    }
}
export function getAddRequestList(){
    return (dispatch,getState)=>{
        //console.log('我执行了')
        axios.get('/user/friendslist').then((res)=>{
            if(res.status==200&&res.data.code==0){
                const id=getState().user._id
                dispatch(requestListAction(res.data.data,id))
            }
        })
    }
}
export function sendAddRequest({from,to}){
    return dispatch=>{
        socket.emit('sendAddRequest',{from,to})
    }
}
export function getFriendsList(){
    return dispatch=>{
        axios.get('/user/friendslist').then((res)=>{
            if(res.status==200&&res.data.code==0){
                dispatch(friendsListAction(res.data.data))
            }
        })
    }
}
export function ignoreRequest(id){
    return dispatch=>{
        axios.post('/user/ignorerequest',{
            friendsId:id
        }).then((res)=>{
            if(res.status==200&&res.data.code==0){
                //dispatch(ignoreAction(res.data.data))
                dispatch(getAddRequestList())
            }
        })
    }
}
export function agreeRequest(id){
    return dispatch=>{
        axios.post('/user/agreerequest',{
            friendsId:id
        }).then((res)=>{
            if(res.status==200&&res.data.code==0){
                //dispatch(ignoreAction(res.data.data))
                dispatch(getAddRequestList())
            }
        })
    }
}
