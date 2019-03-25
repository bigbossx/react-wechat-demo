import React from 'react'
import Logo from '../../components/logo'
import {List,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {register} from '../../redex/user.redux'
@connect(
    state=>state.user,
    {register}
)
export default class Register extends React.Component{
    constructor(props){
        super(props)
        this.state={
            userName:'',
            pwd:'',
            repeatpwd:''
        }

        this.handleRegister=this.handleRegister.bind(this)
    }
    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }
    handleRegister(){
        this.props.register(this.state)
    }
    render(){
        return (
            <div>
                {
                    this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null
                }
                <Logo></Logo>
                <WingBlank>
                    <List>
                        <InputItem
                            onChange={v=>this.handleChange('userName',v)}
                        >用户名</InputItem>
                        <InputItem
                            type="password"
                            onChange={v=>this.handleChange('pwd',v)}
                        >密码</InputItem>
                        <InputItem
                            type="password"
                            onChange={v=>this.handleChange('repeatpwd',v)}
                        >确认密码</InputItem>
                    </List>
                    <WhiteSpace />
                    <WhiteSpace />
                    <WhiteSpace />
                    <Button type="primary" onClick={this.handleRegister}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}