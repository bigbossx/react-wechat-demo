import React from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'
@connect(
    state=>state
)
export default class Message extends React.Component{
    render(){
        const Item=List.Item;
        const Brief=Item.Brief
        const msgGroup={}
        this.props.chat.chatMsg.forEach(v => {
            msgGroup[v.chatId]=msgGroup[v.chatId]||[]
            msgGroup[v.chatId].push(v)
        });
        let chatList=[]
        for(let i in msgGroup){
            chatList.push(msgGroup[i])
        }
        //console.log(chatList)
        chatList.sort((a,b)=>{
            return b[b.length-1].create_time-a[a.length-1].create_time
        })
        const userId=this.props.user._id
        return (
            <div>
                <List>
                    <Item
                      thumb={require(`./img/robot.png`)}
                      key={"robot"}
                      onClick={()=>{
                          this.props.history.push(`/robot`)
                      }}
                    >
                        Vision_X的小宝贝
                        <Brief>{"你好"}</Brief>
                    </Item>
                    {
                        chatList.map((v)=>{
                            v.sort((a,b)=>a.create_time-b.create_time)
                            const targetId=v[0].from==userId?v[0].to:v[0].from
                            const unreadNum=v.filter((v)=>!v.read&&v.to==this.props.user._id).length
                            // console.log(unreadNum)
                            return(
                                <Item
                                    extra={<Badge text={unreadNum}></Badge>}
                                    thumb={`${this.props.chat.userInfo[targetId].avatar}`}
                                    key={v[v.length-1]._id}
                                    onClick={()=>{
                                        this.props.history.push(`/chat/${targetId}`)
                                    }}
                                >
                                    {this.props.chat.userInfo[targetId].name}
                                    <Brief>{v[v.length-1].content}</Brief>
                                </Item>
                            )

                        })
                    }
                </List>
            </div>
        )
    }
}
