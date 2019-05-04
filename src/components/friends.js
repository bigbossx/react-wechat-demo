import React from "react"
import axios from "axios"
import { Card, WhiteSpace, WingBlank, List, Toast, ActionSheet, Button, Badge, Modal } from "antd-mobile"
import { connect } from "react-redux"
import { getFriendsList, getAddRequest, getAddRequestList, ignoreRequest, delfriend } from "../redex/friends.redux"

const isIPhone = new RegExp("\\biPhone\\b|\\biPod\\b", "i").test(window.navigator.userAgent)
let wrapProps
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault(),
  }
}
@connect(
  state => state,
  { getFriendsList, getAddRequest, getAddRequestList, ignoreRequest, delfriend },
)

export default class Friends extends React.Component {
  constructor (props) {
    super(props)

  }

  componentWillMount () {
    this.props.getFriendsList()
  }

  componentDidMount () {

  }

  showActionSheet = (v) => {
    const BUTTONS = ["发起聊天", "删除好友", "关闭"]
    ActionSheet.showActionSheetWithOptions({
        options: BUTTONS,
        cancelButtonIndex: BUTTONS.length - 1,
        destructiveButtonIndex: BUTTONS.length - 2,
        maskClosable: true,
        "data-seed": "logId",
      },
      (buttonIndex) => {
        if (BUTTONS[buttonIndex] == "发起聊天") {
          this.props.history.push(`/chat/${v.userId}`)
        }
        if (BUTTONS[buttonIndex] == "删除好友") {
          //todo
          //console.log(v)
          const alert = Modal.alert
          alert("删除好友", "确认删除吗?", [
            { text: "取消", onPress: () => console.log("cancel") },
            {
              text: "确认",
              onPress: () => {
                this.props.delfriend(v.userId)
              },
            },
          ])
        }
      })
  }

  render () {
    const Header = Card.Header
    const Body = Card.Body
    const Item = List.Item
    const Brief = Item.Brief
    return (
      <div>
        <List>
          <Item
            thumb={require(`./img/moments.png`)}
            arrow="horizontal"
            onClick={() => {this.props.history.push("/monents")}}
          >
            朋友圈
          </Item>
          <Item
            thumb={require(`./img/add.png`)}
            arrow="horizontal"
            extra={<Badge text={this.props.friends.unreadrequest}></Badge>}
            onClick={() => {this.props.history.push("/search")}}
          >新的朋友</Item>
          <Item
            thumb={require(`./img/group-chat.png`)}
            arrow="horizontal"
            onClick={() => {Toast.info("敬请期待", 2)}}
          >
            群聊
          </Item>
          <Item
            thumb={require(`./img/tag.png`)}
            onClick={() => {Toast.info("敬请期待", 2)}}
          >
            标签
          </Item>
        </List>

        <div className='my-title'>你的好友</div>
        <WhiteSpace />
        {
          this.props.friends.friendsList.length ? this.props.friends.friendsList.sort((a, b) => b.create_time - a.create_time).map((v) => (
            <div key={v._id}>
              <List key={v._id}
                    onClick={() => {this.showActionSheet(v)}}
              >
                <Item
                  thumb={v.avatar}
                >{v.userName}</Item>
              </List>
              <WhiteSpace />
            </div>
          )) : <div className='tip'>暂无好友，去添加一个吧</div>
        }
        <WingBlank>


        </WingBlank>
      </div>
    )
  }
}
