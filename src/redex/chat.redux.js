import io from 'socket.io-client'
import axios from 'axios'
const socket=io('ws://127.0.0.1:8081')

const MSG_LIST='MSG_LIST'
const MSG_GET='MSG_GET'
const MSG_READ='MSG_READ'
const RESET='RESET'
const initState={
    chatMsg:[],
    userInfo:{},
    unread:0
}
export function chat(state=initState,action){
    switch(action.type){
        case RESET:
            return {...initState}
        case MSG_LIST:
            return {...state,userInfo:action.payload.userInfo,chatMsg:action.payload.msgs,unread:action.payload.msgs.filter(v=>!v.read&&v.to==action.payload.toId).length}
        case MSG_GET:
            const n=action.payload.to==action.toId?1:0
            return  {...state,chatMsg:[...state.chatMsg,action.payload],unread:state.unread+n}
        case MSG_READ:
            return {...state,chatMsg:state.chatMsg.map(v=>({...v,read:v.from==action.payload.from?true:v.read})),unread:state.unread-action.payload.num<0?0:state.unread-action.payload.num}
        default:
            return state
    }
}

function msgList(msgs,userInfo,toId){
    return {type:MSG_LIST,payload:{msgs,userInfo,toId}}
}
function msgGet(msg,toId){
    return {type:MSG_GET,payload:msg,toId}
}
function msgRead({from,to,num}){
    return {type:MSG_READ,payload:{from,to,num}}
}
export function reset(){
    return {type:RESET}
}
export function getMsg(){
    return (dispatch,getState)=>{
        socket.on('getMsg',function(data){
            const toId=getState().user._id
            dispatch(msgGet(data,toId))
        })
    }
}

export function sendMsg({from,to,msg}){
    return dispatch=>{
        socket.emit('sendMsg',{from,to,msg})
    }
}
export function readMsg(from){
    return (dispatch,getState)=>{
        axios.post('/user/readmsg',{
            from
        }).then(res=>{
            if(res.status==200&&res.data.code==0){
                const userId=getState().user._id
                dispatch(msgRead({from,userId,num:res.data.data}))
            }
        })
    }
}
export function getMsgList(){
    return (dispatch,getState)=>{
        axios.get('/user/getmsglist').then(res=>{
            if(res.status==200&&res.data.code==0){
                const toId=getState().user._id
                dispatch(msgList(res.data.data,res.data.userInfo,toId))
            }
        })
    }
}
