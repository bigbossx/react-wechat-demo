import axios from 'axios'
import {Toast} from 'antd-mobile'
const RESIGTER_SUCCESS='RESIGTER_SUCCESS'
const ERROR_MSG='ERROR_MSG'
const LOGIN_SUCCESS='LOGIN_SUCCESS'
const LOAD_DATA='LOAD_DATA'
const LOGOUT='LOGOUT'
const EDIT_SUCCESS='EDIT_SUCCESS'
const initState={
    redirectTo:'',
    userName:'',
    msg:'',
    isAuth:''
}
export function user(state=initState,action){
    switch(action.type){
        case ERROR_MSG:
            return {...state,isAuth:false,msg:action.msg}
        case RESIGTER_SUCCESS:
            return {...state,msg:'',isAuth:false,redirectTo:'/login',...action.payload}
        case LOGIN_SUCCESS:
            return {...state,msg:'',isAuth:true,redirectTo:'/message',...action.payload}
        case LOAD_DATA:
            return {...state,...action.payload,redirectTo:state.redirectTo}
        case LOGOUT:
            return {...initState}
        case EDIT_SUCCESS:
            return {...state,...action.payload}
        default:
            return state
    }
}
function errorMsg(msg){
    return {type:ERROR_MSG,msg:msg}
}
function registerSuccess(data){
    return {type:RESIGTER_SUCCESS,payload:data}
}
function loginSuccess(data){
    return {type:LOGIN_SUCCESS,payload:data}
}
function editSuccess(obj){
    return {type:EDIT_SUCCESS,payload:obj}
}
export function loadUserInfo(userInfo){
    //console.log(userInfo)
    return {type:LOAD_DATA,payload:userInfo}
}

//logout的redux
export function logoutSubmit(){
    return {type:LOGOUT}
}
//提交登录的redux
export function login({userName,pwd}){
    if(!userName||!pwd){
        Toast.fail('请输入用户名与密码!', 1);
        return errorMsg('用命名与密码必须输入')
    }
    return dispatch=>{
        axios.post('/user/login',
            {pwd,userName}
        ).then((res)=>{
            if(res.status==200&&res.data.code==0){
                Toast.success('登录成功!', 1,()=>{
                    dispatch(loginSuccess(res.data.data))
                });
            }else{
                Toast.fail('用户名或密码错误!', 3);
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}
//提交修改
export function edit(avatar,sex,title,address,desc){
    return dispatch=>{
        axios.post('/user/edit',
            {avatar,sex,title,address,desc}
        ).then((res)=>{
            if(res.status==200&&res.data.code==0){
                Toast.success('已保存!', 1,()=>{
                    dispatch(editSuccess({avatar,sex,title,address,desc}))
                });
            }else{
                Toast.fail('保存失败，请重试!', 3);
                dispatch(errorMsg(res.data.data))
            }
        })
    }
}
//提交注册的redux
export function register({userName,pwd,repeatpwd}){
    if(!userName||!pwd){
        Toast.fail('请输入用户名与密码!', 1);
        return errorMsg('用命名与密码必须输入')
    }
    if(pwd!==repeatpwd){
        Toast.fail('密码输入不一致!', 1);
        return errorMsg('密码输入不一致')
    }
    return dispatch=>{
        axios.post('/user/register',
            {pwd,userName,repeatpwd}
        ).then((res)=>{
            if(res.status==200){
                if(res.data.code==0){
                    Toast.success('注册成功!', 1,()=>{  
                        dispatch(registerSuccess({pwd,userName}))
                    });
                }else{
                    Toast.fail('用户名已存在!', 3);
                }   
            }else{
                Toast.fail('注册异常，请重新操作!', 3);
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}