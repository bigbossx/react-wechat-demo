import React from 'react'
import io from 'socket.io-client'
import axios from 'axios'
import {List,InputItem,Button, NavBar,Icon,Grid,Toast} from 'antd-mobile'
import {connect} from 'react-redux'
import {loadUserInfo} from './../redex/user.redux'
import {getMsgList,sendMsg,getMsg,readMsg} from './../redex/chat.redux'
const socket=io('ws://111.230.91.125:8081')
@connect(
    state=>state,
    {getMsgList,sendMsg,getMsg,readMsg,loadUserInfo}
)
export default class Chat extends React.Component{
    constructor(props){
        super(props)
        this.state={
            text:'',
            msg:[]
        }
        this.myRef = React.createRef();
    }
    componentWillMount(){
        if(!this.props.chat.chatMsg.length){
            this.props.getMsgList()
        }
    }
    componentDidMount(){
        if(!this.props.chat.chatMsg.length){
            //this.props.getMsgList()
            this.props.getMsg()
        }
        console.log(this.props)
        setTimeout(()=>{
            window.dispatchEvent(new Event('resize'))
        },0)
        // socket.on('getMsg',data=>{
        //     this.setState({
        //         msg:[...this.state.msg,data.text]
        //     })
        // })
        setTimeout(()=>{
            if(this.myRef&&this.myRef.current){
                window.scrollTo(0,this.myRef.current.clientHeight)
            }
        },1000)
        // window.scrollTo(0,this.myRef.current.clientHeight)
    }
    componentDidUpdate(){

        //console.log(this.myRef.current.clientHeight)
        setTimeout(()=>{
            window.scrollTo(0,this.myRef.current.clientHeight)
        },0)

    }
    componentWillUnmount(){
        const to=this.props.match.params.userName
        this.props.readMsg(to)
    }
    
    handleSubmit(){
        const from=this.props.user._id;
        const to=this.props.match.params.userName
        const msg=this.state.text
        this.props.sendMsg({from,to,msg})
        // socket.emit('sendMsg',{text:this.state.text})
        this.setState({
            text:'',
            showEmoji:false
        })
        
    }
    render(){
        const emoji='😁 😂 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😜 😝 😒 😓 😔 😰 😱 😳 😵 😡 😠 😲 😷 😖 😞 🍇 🍈 🍉 🍊 🍌 🍎 🍏 🍑 🍒 🍓 🍅 🍆 🌽 🍄 🌰 🍞 🍖 🍗 🍔 🍟 🍕 🍳 🍲 🍱 🍘 🍙 🍚 🍛 🍜 🍝 🍠 🍢 🍣 🍤 🍥 🍡 🍦 🍧 🍨 🍩 🍪 🎂 🍰 🍫 🍬 🍭 🍮 🍯 ☕ 🍵 🍶 🍷 🍸 🍹 🍺 🍻 🍴'.split(' ').filter(v=>v).map(v=>({text:v}))
        const me=this.props.match.params.userName
        const userInfo=this.props.chat.userInfo
        const Item=List.Item
        if(!userInfo[me]){
            return null
        }
        const currentChatId=[me,this.props.user._id].sort().join('_');
        const filterChatMsg=this.props.chat.chatMsg.filter(v=>v.chatId==currentChatId)
        return (
            <div id="chat-page">
                <NavBar 
                    mode="dark"
                    icon={<Icon type="left" />}
                    className="fixed-header"
                    onLeftClick={() =>{this.props.history.goBack()}}
                >{userInfo[me].name}</NavBar>
                <div style={{marginBottom:45,marginTop:45}} ref={this.myRef}>
                    {
                        filterChatMsg.sort((a,b)=>a.create_time-b.create_time).map(v=>{
                            return v.from==me?(
                                <List
                                    key={v._id}
                                >
                                    <Item
                                        multipleLine
                                        thumb={require(`./img/${userInfo[v.from].avatar}`)}
                                    >{v.content}</Item>
                                </List>
                            ):(
                                <List
                                    key={v._id}
                                >
                                    <Item
                                        multipleLine
                                        extra={<img src={require(`./img/${userInfo[v.from].avatar}`)} alt=""/>}
                                        className="chat-me"
                                    >{v.content}</Item>
                                </List>
                            )
                        })
                    }
                </div>
                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder=''
                            value={this.state.text}
                            onChange={v=>{
                                this.setState({
                                    text:v
                                })
                            }}
                            onVirtualKeyboardConfirm={()=>this.handleSubmit()}
                            extra={
                                <div className='emoji'>
                                    <span style={{marginRight:10,fontSize:20}}
                                        onClick={()=>{
                                            this.setState({
                                                showEmoji:!this.state.showEmoji
                                            })
                                            setTimeout(()=>{
                                                window.dispatchEvent(new Event('resize'))
                                            },0)
                                        }}
                                    >
                                        😊
                                    </span>
                                    {this.state.text==''?<Button disabled type="primary">发送</Button>:<Button onClick={()=>this.handleSubmit()} type="primary">发送</Button>}
                                </div>
                            }
                        >
                        </InputItem>
                    </List>
                    {
                        this.state.showEmoji?
                        <Grid
                            data={emoji}
                            columnNum={9}
                            carouselMaxRow={4}
                            isCarousel={true}
                            onClick={(el)=>{
                                this.setState({
                                    text:this.state.text+el.text
                                })
                            }}
                        />
                        :null
                    }
                </div>
            </div>
        )
    }
}