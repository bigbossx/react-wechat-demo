import React from "react"
import axios from "axios"
import { List, InputItem, Button, NavBar, Icon, Grid, Toast } from "antd-mobile"
import { connect } from "react-redux"
import { loadUserInfo } from "./../redex/user.redux"

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
    }
    this.myRef = React.createRef()
  }

  componentWillMount () {

  }

  componentDidMount () {
    this.setState({
      robotChatMsg: this.state.robotChatMsg.concat({
        message: "你好呀！",
        from: "robot",
        timestamp: new Date().getTime(),
        date:`${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
      }),
    })
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

  handleSubmit () {
    let ask = {
      message: this.state.text,
      from: "user",
      timestamp: new Date().getTime(),
      date:`${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
    }
    this.setState({
      robotChatMsg: this.state.robotChatMsg.concat(ask),
      showEmoji:false
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
          date:`${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
        }
        this.setState({
          robotChatMsg: this.state.robotChatMsg.concat(result),
          text: "",
        })
      }
    })

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
          onLeftClick={() => {this.props.history.goBack()}}
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
                      <img src={"https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg"}/>
                    </div>
                    <div className="chat-content triangle-left bg-other">
                      <span className="text-df">{v.message}</span>
                    </div>
                  </div>
                  <div className="chat-date text-xs">{v.date}</div>
                </div>

              ) : (
                <div className="chat-container chat-self" key={v.timestamp}>
                  <div className="chat-main main-self">
                    <div className="chat-content triangle-right bg-self">
                      <span className="text-df">{v.message}</span>
                    </div>
                    <div className="chat-avatar">
                      <img src={"https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg"}/>
                    </div>
                  </div>
                  <div className="chat-date text-xs">{v.date}</div>
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
              onFocus={()=>{
                this.setState({
                  showEmoji:false
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
