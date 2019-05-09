import React from "react"
import axios from "axios"
import { List, InputItem, Button, NavBar, Icon, Grid, Toast, Modal, Popover, Checkbox } from "antd-mobile"
import { connect } from "react-redux"
import { loadUserInfo } from "./../redex/user.redux"

const CheckboxItem = Checkbox.CheckboxItem
@connect(
  state => state,
  { loadUserInfo },
)
export default class ChatWithRobot extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      text: "",
      robotChatMsg: [],
      popoverVisible: false,
      showOptions: [
        { key: 0, label: "显示用户昵称", checked: true },
        { key: 1, label: "显示发送日期", checked: false },
      ],
      showEmoji: false,
    }
    this.myRef = React.createRef()
  }

  componentWillMount () {

  }

  componentDidMount () {
    let localData = this.getLocalStorage()
    if (!localData) {
      this.setState({
        robotChatMsg: this.state.robotChatMsg.concat({
          message: "你好呀！",
          from: "robot",
          timestamp: new Date().getTime(),
          date: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
        }),
      })
    } else {
      this.setState({
        robotChatMsg: localData,
      })
    }

    setTimeout(() => {
      window.dispatchEvent(new Event("resize"))
    }, 0)

    setTimeout(() => {
      console.log(this.myRef)
      if (this.myRef && this.myRef.current) {
        window.scrollTo(0, this.myRef.current.clientHeight)
      }
    }, 1000)
  }

  componentDidUpdate () {

    setTimeout(() => {
      if (this.myRef.current) {
        window.scrollTo(0, this.myRef.current.clientHeight)
      }
    }, 1000)

  }

  componentWillUnmount () {

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
    let ask = {
      message: this.state.text,
      from: "user",
      timestamp: new Date().getTime(),
      date: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
    }
    this.setState({
      robotChatMsg: this.state.robotChatMsg.concat(ask),
      showEmoji: false,
    })
    axios.post("/openapi/api", {
      key: "79055f1135cb42a9b175bf658cf46089",
      info: this.state.text,
      userid: "123456",
    }).then(res => {
      if (res.data.code === 100000) {
        let result = {
          message: res.data.text,
          from: "robot",
          timestamp: new Date().getTime(),
          date: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
        }
        this.setState({
          robotChatMsg: this.state.robotChatMsg.concat(result),
          text: "",
        })
      }
    })

  }

  setLocalStorage = (data) => {
    window.localStorage.setItem("chat", JSON.stringify(data))
  }
  getLocalStorage = () => {
    return JSON.parse(window.localStorage.getItem("chat"))
  }

  render () {
    const emoji = "😁 😂 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😜 😝 😒 😓 😔 😰 😱 😳 😵 😡 😠 😲 😷 😖 😞 🍇 🍈 🍉 🍊 🍌 🍎 🍏 🍑 🍒 🍓 🍅 🍆 🌽 🍄 🌰 🍞 🍖 🍗 🍔 🍟 🍕 🍳 🍲 🍱 🍘 🍙 🍚 🍛 🍜 🍝 🍠 🍢 🍣 🍤 🍥 🍡 🍦 🍧 🍨 🍩 🍪 🎂 🍰 🍫 🍬 🍭 🍮 🍯 ☕ 🍵 🍶 🍷 🍸 🍹 🍺 🍻 🍴".split(" ").filter(v => v).map(v => ({ text: v }))

    let { user } = this.props

    return (
      <div id="chat-page">
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          className="fixed-header"
          onLeftClick={() => {
            Modal.alert("提示", "是否将聊天加入本地缓存？", [
              { text: "算了", onPress: () => this.props.history.goBack() },
              {
                text: "好的", onPress: () => {
                  this.setLocalStorage(this.state.robotChatMsg)
                  this.props.history.goBack()
                },
              },
            ])
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
        >Vision_X的小宝贝</NavBar>
        <div style={{ marginBottom: 45, marginTop: 45 }} ref={this.myRef}>
          <div className="chat-tip">
            <span className="cuIcon-warnfill text-red text-xs"></span>
            <span className="text-white text-xs">此聊天不会加入数据库哟</span>
          </div>
          {
            this.state.robotChatMsg.length > 0 && this.state.robotChatMsg.map(v => {
              return v.from === "robot" ? (
                <div className="chat-container" key={v.timestamp}>
                  <div className="chat-main">
                    <div className="chat-avatar">
                      <img src={"http://pqgrbj9dn.bkt.clouddn.com/robot.png"} />
                    </div>
                    <div className="chat-content main-other">
                      {
                        this.state.showOptions[0].checked &&
                        <span className="text-xs text-gray">Vision_X的小宝贝</span>
                      }

                      <div className="message-content triangle-left bg-other">
                        <span className="text-df">{v.message}</span>
                      </div>
                    </div>
                  </div>
                  {
                    this.state.showOptions[1].checked &&
                    <div className="chat-date text-xs">{v.date}</div>
                  }
                </div>

              ) : (
                <div className="chat-container chat-self" key={v.timestamp}>
                  <div className="chat-main">
                    <div className="chat-content main-self">
                      {
                        this.state.showOptions[0].checked &&
                        <span className="text-xs text-gray">{user.userName}</span>
                      }

                      <div className="message-content triangle-right bg-self">
                        <span className="text-df">{v.message}</span>
                      </div>
                    </div>
                    <div className="chat-avatar">
                      <img src={user.avatar || "http://pqgrbj9dn.bkt.clouddn.com/default.png"} />
                    </div>
                  </div>
                  {
                    this.state.showOptions[1].checked &&
                    <div className="chat-date text-xs">{v.date}</div>
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
