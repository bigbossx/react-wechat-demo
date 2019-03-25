import React from 'react'
import axios from 'axios'
import {Result,WhiteSpace,List,Button,WingBlank,Modal} from 'antd-mobile'
import {connect} from 'react-redux'
import browserCookies from 'browser-cookies'
import {logoutSubmit} from './../redex/user.redux'
import {reset} from './../redex/chat.redux'
import {Redirect} from 'react-router-dom'
@connect(
    state=>state.user,
    {logoutSubmit,reset}
)
export default class Me extends React.Component{
    constructor(props){
        super(props)
        this.logout=this.logout.bind(this)
    }

    logout(){
        const alert=Modal.alert;
        alert('退出登录', '确认退出吗?', [
            { text: '取消', onPress: () => console.log('cancel') },
            {
              text: '确认',
              onPress: () =>{
                browserCookies.erase('userId')
                this.props.logoutSubmit()
                this.props.reset()
                this.props.history.push('/login');
              }
            },
          ])
    }
    edit=()=>{
        this.props.history.push('/editinfo');
    }
    render(){
        const Item = List.Item;
        const Brief=Item.Brief;
        return this.props.userName? (
            <div>
                <Result
                    img={<img style={{width:70}} src={require(`./img/${this.props.avatar}`)} alt=''/>}
                    title={this.props.userName}
                    message={`Chat号:  ${this.props._id}`}
                />
                <WhiteSpace />
                <List>
                    <Item extra={this.props.sex}>性别</Item>
                    <Item 
                        wrap
                        multipleLine
                    >   
                        个性签名
                        {<Brief>{this.props.title}</Brief>}
                    </Item>
                    <Item 
                        wrap
                        multipleLine
                    >   
                        地址
                        {<Brief>{this.props.address}</Brief>}
                    </Item>
                    <Item extra={this.props.desc==''?'暂无备注':this.props.desc}>备注</Item>
                </List>
                <WhiteSpace/>
                <WingBlank>
                    <Button type="primary" onClick={this.edit}>修改资料</Button>
                    <WhiteSpace/>
                    <Button type="warning" onClick={this.logout}>退出登录</Button>
                </WingBlank>
            </div>
        ): null
    }
}