import axios from 'axios'
//action
const FETCH_DATA='FETCH_DATA'

//init state
const initState={
    
}

//reducer
export function videoList(state=initState,action){
    switch(action.type){
        case FETCH_DATA:
            return {...state,isAuth:false,msg:action.msg}
        
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
        axios.get('http://gank.io/api/data/%E4%BC%91%E6%81%AF%E8%A7%86%E9%A2%91/10/1').then((res)=>{
            console.log(res)
            if(res.status==200&&res.data.code==0){
                // dispatch(fetchData(res.data))
            }else{
                // Toast.fail('获取失败，请重试!', 3);
                // dispatch(errorMsg(res.data.data))
            }
        })
    }
}