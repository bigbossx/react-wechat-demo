import axios from 'axios'
import {Toast} from 'antd-mobile'
//action
const FETCH_DATA='FETCH_DATA'

//init state
const initState={
    videoList:[]
}

//reducer
export function video(state=initState,action){
    switch(action.type){
        case FETCH_DATA:
            return {...state,videoList:action.data}
        default:
            return state
    }
}
//action func
function fetchData(data){
    return {type:FETCH_DATA,data:data}
}

//提交修改
export function fetchVideoData(api,params){
    return dispatch=>{
        axios.get('/user/video').then((res)=>{
            console.log(res)
            if(res.status==200&&res.data.code==0){
                dispatch(fetchData(res.data.data))
            }else{
                Toast.fail('获取数据失败，请重试!', 3);
                // dispatch(errorMsg(res.data.data))
            }
        })
    }
}