import React from 'react'
import axios from 'axios'
import io from 'socket.io-client'

import {SearchBar,NavBar,Icon,Card,WhiteSpace,ActionSheet,List,Button,Toast} from 'antd-mobile'
import {connect} from 'react-redux'
import {sendAddRequest,getAddRequest,getAddRequestList,ignoreRequest,agreeRequest,getFriendsList} from './../redex/friends.redux'
const socket=io('ws://111.230.91.125:8081')
@connect(
    state=>state,
    {sendAddRequest,getAddRequest,getAddRequestList,ignoreRequest,agreeRequest,getFriendsList}
)
export default class Search extends React.Component{
    constructor(props){
        super(props)
        this.state={
            value:'',
            resultList:[],
            showNoResult:false,
            showTip:true
        }
    }
    componentDidMount(){
        if(!this.props.user.userName){
            Toast.offline('请登录!!!', 1);
            this.props.history.push('/login')
            return
       }
        if(!this.props.friends.requestList.length){
            this.props.getAddRequestList()
        }
        if(!this.props.friends.friendsList.length){
            this.props.getFriendsList()
        }
        console.log(this.props)
    }
    onChange= (value) => {
        this.setState({ value });
    };
    handleCancel=()=>{
        this.setState({
            value:'' ,
            showNoResult:false,
            resultList:[],
            showTip:true
        });
    }
    handleSubmit=()=>{
        let param={
            searchValue:this.state.value
        }
        axios.get('/user/search',{
            params:param
        }).then((res)=>{
            //todo
            if(res.data.data.length>0){
                this.setState({
                    showTip:false,
                    resultList:res.data.data
                })
            }else{
                this.setState({
                    showTip:false,
                    showNoResult:true
                })
            }         
        })
    }
    showActionSheet = (v) => {
        const BUTTONS = ['添加好友', '关闭'];
        const BUTTONS1 = ['发起聊天', '关闭'];
        let sign=false
        this.props.friends.friendsList.forEach(k => {
            if(k.userId==v._id){
                sign=true
            }
        });
        if(sign){
            ActionSheet.showActionSheetWithOptions({
                options: BUTTONS1,
                cancelButtonIndex: BUTTONS1.length - 1,
                destructiveButtonIndex: BUTTONS1.length - 2,
                maskClosable: true,
                'data-seed': 'logId'
            },
                (buttonIndex) => {
                if(BUTTONS1[buttonIndex]=='发起聊天'){
                    this.props.history.push(`/chat/${v._id}`)
                }
            });
        }else{
            ActionSheet.showActionSheetWithOptions({
                options: BUTTONS,
                destructiveButtonIndex: BUTTONS.length - 2,
                maskClosable: true,
                'data-seed': 'logId'
              },
              (buttonIndex) => {
                if(BUTTONS[buttonIndex]=='添加好友'){
                  //todo
                  const userId=this.props.user._id
                  // console.log('添加好友')
                  // console.log(this.props)
                  // console.log(userId)
                  // console.log(v._id)
                  socket.emit('sendAddRequest',{
                      userId,//由谁发起的请求
                      to:v._id,
                      avatar:v.avatar,
                      userName:v.userName,
                      myName:this.props.user.userName,
                      myAvatar:this.props.user.avatar
                  })
                  Toast.success('请求已发送!', 1,()=>{
                      this.setState({
                          value:''
                      })
                  });
                  //this.props.sendAddRequest(userId,v._id,v.avatar,v.userName)
              }
              });
        }
    }
    handleIgnore=(v)=>{
        this.props.ignoreRequest(v.userId)
    }
    handleAgree=(v)=>{
        this.props.agreeRequest(v.userId)
    }
    render(){
        const Header=Card.Header
        const Body=Card.Body
        const Item = List.Item;
        const Brief = Item.Brief;
        return (
            <div>
                <NavBar 
                        mode="dark"
                        icon={<Icon type="left" />}
                        className="fixed-header"
                        onLeftClick={() =>{this.props.history.goBack()}}
                >添加朋友</NavBar>
                <SearchBar
                    value={this.state.value}
                    placeholder="Search" 
                    maxLength={8} 
                    style={{marginTop:45}}
                    onSubmit={()=>{this.handleSubmit()}}
                    onChange={this.onChange}
                    onCancel={this.handleCancel}
                />
                <WhiteSpace/>
                <WhiteSpace/>
                {this.state.showTip?<div className='tip'>Tip:暂时只支持用户名检索哟</div>:null}
                {this.state.showNoResult?<div className='tip'>没有找到相关用户哟</div>:null}
                {
                        this.state.resultList.length>0&&!this.state.showNoResult&&this.state.value?this.state.resultList.map((v)=>(
                            <div key={v._id}>
                                <Card key={v._id}
                                    onClick={()=>{this.showActionSheet(v);}}
                                >
                                    <Header
                                        title={v.userName}
                                        thumb={require(`./img/${v.avatar}`)}
                                        extra={v.sex}
                                    ></Header>
                                    <Body>个性签名:{v.title}</Body>
                                </Card>
                            <WhiteSpace/>
                            </div>
                        )):null
                    }
                <div className='my-title' style={{marginTop:50}}>新的朋友</div>
                {
                    this.props.friends.requestList.length?this.props.friends.requestList.filter(v=>v.from!=this.props.user._id).sort((a,b)=>b.create_time-a.create_time).map((v,index)=>(
                        <div key={index} className='operate-list'>
                            <List 
                                
                            >
                                <Item multipleLine 
                                    //thumb={require(`./img/${v.avatar}`)}
                                    extra={
                                        v.ignore?<div className="operate"><Button type="" disabled>已忽略</Button></div>:
                                        v.agree?<div className="operate"><Button type="primary" disabled>已同意</Button></div>:
                                        <div className="operate">
                                            <Button type="primary" style={{marginRight:10}} onClick={()=>{this.handleAgree(v)}}>同意</Button>
                                            <Button type="" onClick={()=>{this.handleIgnore(v)}}>忽略</Button>
                                        </div>
                                    }
                                >
                                {v.userName}<Brief>加个好友呗！</Brief>
                                </Item>
                            </List>
                            <WhiteSpace/>
                        </div>
                    )):<div className='tip'>暂无好友请求</div>
                }
            </div>
        )
    }
}