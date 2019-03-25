import React from 'react'
import Logo from '../../components/logo'
import {List,InputItem,WingBlank,WhiteSpace,Button,NoticeBar,Icon} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login} from '../../redex/user.redux'
@connect(
    state=>state.user,
    {login}
)
export default class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            userName:'',
            pwd:''
        }
        this.handleLogin=this.handleLogin.bind(this)
        this.register=this.register.bind(this)
    }
    register(){
        this.props.history.push('/register')
    }
    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }
    handleLogin(){
        console.log("enter")
        this.props.login(this.state)
    }
    keyPressEnter=(e)=>{
        if(e.keyCode === 13){
            this.handleLogin()
        }
    }
    render(){
        return (
            <div>
                {
                    (this.props.redirectTo&&this.props.redirectTo!='/login')?<Redirect to={this.props.redirectTo}/>:null
                }
                <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
                    Notice: vx-chat正在开发中，觉得程序异常?多刷新几次呗!欢迎大家给我反馈Issue，可以直接微信留言，或者在我的sf社区账号https://segmentfault.com/u/visionm。Thanks！
                </NoticeBar>
                <Logo></Logo>
                <WingBlank>
                    <List>
                        <InputItem
                            onChange={v=>this.handleChange('userName',v)}
                        >用户名</InputItem>
                        <InputItem 
                            type="password"
                            onChange={v=>this.handleChange('pwd',v)}
                            onKeyDown={this.keyPressEnter}
                            // onPressEnter={this.handleLogin}
                        >密码</InputItem>
                    </List>
                    <WhiteSpace />
                    <WhiteSpace />
                    <WhiteSpace />
                    <Button type="primary" onClick={this.handleLogin}>登录</Button>
                    <WhiteSpace />
                    <Button type="" onClick={this.register}>立即注册</Button>
                </WingBlank>
            </div>
        )
    }
}