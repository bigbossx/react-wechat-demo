import React, { Component } from "react"
import { connect } from "react-redux"
import {
  sendAddGroup,
  getAddGroup,
  sendGroupChatMsg,
  getGroupChatMsg,
  getGroupMsgList,
} from "./../redex/groupChat.redux"
import { Button, Checkbox, Grid, Icon, InputItem, List, Modal, NavBar, Popover } from "antd-mobile"
const CheckboxItem = Checkbox.CheckboxItem
@connect(
  state => state,
  { sendAddGroup, getAddGroup, sendGroupChatMsg, getGroupChatMsg, getGroupMsgList },
)
class GroupChat extends Component {

  constructor (props) {
    super(props)
    this.state = {
      text: "",
      msg: [],
      showOptions: [
        { key: 0, label: "显示用户昵称", checked: true },
        { key: 1, label: "显示发送日期", checked: false },
      ],
      popoverVisible: false,
      showEmoji: false,
    }
    this.myRef = React.createRef()
  }

  componentDidMount () {
    if (!this.props.groupchat.chatMsg.length) {
      this.props.getGroupMsgList()
      this.props.getGroupChatMsg()
    }
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"))
    }, 0)

    setTimeout(() => {
      if (this.myRef && this.myRef.current) {
        window.scrollTo(0, this.myRef.current.clientHeight)
      }
    }, 1000)
    // this.props.sendAddGroup({ userName, _id, avatar })
    // this.props.getAddGroup()

  }

  componentDidUpdate () {
    setTimeout(() => {
      if (this.myRef.current) {
        window.scrollTo(0, this.myRef.current.clientHeight)
      }
    }, 1000)
  }

  optionsChange = (key) => {
    this.state.showOptions[key].checked = !this.state.showOptions[key].checked
    this.setState({
      showOptions: this.state.showOptions,
    })
  }
  onSelect = () => {
    this.setState({
      popoverVisible: false,
    })
  }

  handleSubmit () {
    const {userName,_id,avatar}=this.props.user
    this.props.sendGroupChatMsg({
      content:this.state.text,
      contentType:"text",
      userName,
      userId:_id,
      groupId:"vision-group-chat-1",
      avatar
    })
    this.setState({
      text: "",
      showEmoji: false,
    })

  }

  render () {
    const emoji = "😁 😂 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😜 😝 😒 😓 😔 😰 😱 😳 😵 😡 😠 😲 😷 😖 😞 🍇 🍈 🍉 🍊 🍌 🍎 🍏 🍑 🍒 🍓 🍅 🍆 🌽 🍄 🌰 🍞 🍖 🍗 🍔 🍟 🍕 🍳 🍲 🍱 🍘 🍙 🍚 🍛 🍜 🍝 🍠 🍢 🍣 🍤 🍥 🍡 🍦 🍧 🍨 🍩 🍪 🎂 🍰 🍫 🍬 🍭 🍮 🍯 ☕ 🍵 🍶 🍷 🍸 🍹 🍺 🍻 🍴".split(" ").filter(v => v).map(v => ({ text: v }))

    const { user, groupchat } = this.props
    const formatTimeStamp=(timeStamp)=>{
      return new Date(timeStamp).toLocaleDateString()+" "+new Date(timeStamp).toLocaleTimeString()
    }
    return (
      <div id="chat-page">
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          className="fixed-header"
          onLeftClick={() => {
            this.props.history.goBack()
          }}
          rightContent={
            <Popover mask
                     overlayClassName="fortest"
                     overlayStyle={{ color: "currentColor", position: "fixed" }}
                     visible={this.state.popoverVisible}
                     overlay={[
                       ...this.state.showOptions.map(item => {
                         return (
                           <CheckboxItem key={item.key} checked={item.checked}
                                         onChange={() => this.optionsChange(item.key)}>
                             {item.label}
                           </CheckboxItem>
                         )
                       }),
                     ]}
                     align={{
                       overflow: { adjustY: 0, adjustX: 0 },
                       offset: [-10, 0],
                     }}
                     onSelect={this.onSelect}
            >
              <div style={{
                height: "100%",
                padding: "0 15px",
                marginRight: "-15px",
                display: "flex",
                alignItems: "center",
              }}
              >
                <Icon type="ellipsis" />
              </div>
            </Popover>
          }
        >群聊室1</NavBar>
        <div style={{ marginBottom: 45, marginTop: 45 }} ref={this.myRef}>
          {
            groupchat.chatMsg.length > 0 && groupchat.chatMsg.map(v => {
              return v.userId !== user._id ? (
                <div className="chat-container" key={v.create_time}>
                  <div className="chat-main">
                    <div className="chat-avatar">
                      <img src={v.avatar||"http://pqgrbj9dn.bkt.clouddn.com/robot.png"} />
                    </div>
                    <div className="chat-content main-other">
                      {
                        this.state.showOptions[0].checked &&
                        <span className="text-xs text-gray">{v.userName}</span>
                      }

                      <div className="message-content triangle-left bg-other">
                        <span className="text-df">{v.content}</span>
                      </div>
                    </div>
                  </div>
                  {
                    this.state.showOptions[1].checked &&
                    <div className="chat-date text-xs">{formatTimeStamp(v.create_time)}</div>
                  }
                </div>

              ) : (
                <div className="chat-container chat-self" key={v.create_time}>
                  <div className="chat-main">
                    <div className="chat-content main-self">
                      {
                        this.state.showOptions[0].checked &&
                        <span className="text-xs text-gray">{user.userName}</span>
                      }

                      <div className="message-content triangle-right bg-self">
                        <span className="text-df">{v.content}</span>
                      </div>
                    </div>
                    <div className="chat-avatar">
                      <img src={v.avatar || "http://pqgrbj9dn.bkt.clouddn.com/default.png"} />
                    </div>
                  </div>
                  {
                    this.state.showOptions[1].checked &&
                    <div className="chat-date text-xs">{formatTimeStamp(v.create_time)}</div>
                  }
                </div>
              )
            })
          }
        </div>
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder=''
              value={this.state.text}
              onChange={v => {
                this.setState({
                  text: v,
                })
              }}
              onFocus={() => {
                this.setState({
                  showEmoji: false,
                })
              }}
              onKeyPress={(e) => {
                if (e.charCode === 13) {
                  this.handleSubmit()
                }
              }}
              extra={
                <div className='emoji'>
                                    <span style={{ marginRight: 10, fontSize: 20 }}
                                          onClick={() => {
                                            this.setState({
                                              showEmoji: !this.state.showEmoji,
                                            })
                                            setTimeout(() => {
                                              window.dispatchEvent(new Event("resize"))
                                            }, 0)
                                          }}
                                    >
                                        😊
                                    </span>
                  {this.state.text == "" ? <Button disabled type="primary">发送</Button> : <Button
                    onClick={() => this.handleSubmit()} type="primary">发送</Button>}
                </div>
              }
            >
            </InputItem>
          </List>
          {
            this.state.showEmoji ?
              <Grid
                data={emoji}
                columnNum={9}
                carouselMaxRow={4}
                isCarousel={true}
                onClick={(el) => {
                  this.setState({
                    text: this.state.text + el.text,
                  })
                }}
              />
              : null
          }
        </div>
      </div>
    )
  }
}

export default GroupChat
