import React from 'react'
import {NavBar,Toast} from 'antd-mobile'
import {connect} from 'react-redux'
import {Switch,Route} from 'react-router-dom'
import Friends from './../../components/friends'
import Me from './../../components/me'
import Message from './../../components/message'
import Video from './../../components/video'
import './.././../index.css'
import TabBarLink from './../../components/tabbarlink'
import {getMsgList,getMsg} from './../../redex/chat.redux'
import {getAddRequest,getAddRequestList} from './../../redex/friends.redux'

@connect(
    state=>state,
    {getMsgList,getMsg,getAddRequest,getAddRequestList}
)
export default class Home extends React.Component{
    componentDidMount(){
        if(!this.props.user.userName){
             Toast.offline('请登录!!!', 1);
             this.props.history.push('/login')
             return
        }
        if(!this.props.chat.chatMsg.length){
            this.props.getMsgList()
            this.props.getMsg()
            //console.log('我执行了home的getmsg')
        }
        if(!this.props.friends.friendsList.length){
            this.props.getAddRequestList()
            this.props.getAddRequest()
            //console.log('我执行了home的getaddreq')
        }
        console.log(this.props)
    }
    render(){
        const {pathname}=this.props.location
        const user= this.props.user
        const navList=[
            {
                path:'/message',
                text:'消息',
                icon:'msg',
                title:'消息列表',
                component:Message
            },
            {
                path:'/video',
                text:'视频',
                icon:'video',
                title:'联系人',
                component:Video
            },
            {
                path:'/friends',
                text:'联系人',
                icon:'friends',
                title:'联系人',
                component:Friends
            },
            {
                path:'/me',
                text:'我',
                icon:'me',
                title:'个人中心',
                component:Me
            }
        ]
        return (
            <div>
                <NavBar mode="dark" className='fixed-header'>{navList.find(v=>v.path==pathname).title}</NavBar>
                <div style={{marginTop:45,marginBottom:50}}>
                    <Switch>
                        {
                            navList.map(v=>(
                                <Route key={v.path} path={v.path} component={v.component}></Route>
                            ))
                        }
                    </Switch>
                </div>
                <TabBarLink data={navList} ></TabBarLink>
            </div>
        )
    }
}