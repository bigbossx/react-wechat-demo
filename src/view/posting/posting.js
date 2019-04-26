import React, { Component } from "react"
import axios from "axios"
import { connect } from "react-redux"
import {
  Button,
  ImagePicker,
  WhiteSpace,
  TextareaItem,
  List,
  ActivityIndicator,
  Toast,
  Badge,
  Modal,
  Checkbox,
} from "antd-mobile"
import { getFriendsList } from "../../redex/friends.redux"

const CheckboxItem = Checkbox.CheckboxItem
const Item = List.Item
const Brief = Item.Brief
@connect(
  state => state,
  { getFriendsList },
)
export default class Posting extends Component {

  constructor (props) {
    super(props)
    this.handlePosting = this.handlePosting.bind(this)
    this.handleCloseDrawer = this.handleCloseDrawer.bind(this)
    this.state = {
      drawerModalShow: false,
      files: [],
      description: "",
      geolocationDisable: false,
      geolocation: "",
      loading: false,
      canSeeUser: [],
      callUser: [],
      canSeeUserShow: false,
      callUserShow: false,
    }
  }

  componentDidMount () {
    this.props.getFriendsList()
  }

  randomSelectedImage = (number) => {
    let gallery = [
      {
        url: "https://h1.ioliu.cn/bing/FireIce_ZH-CN2924097132_1920x1080.jpg",
      },
      {
        url: "https://h1.ioliu.cn/bing/RainforestMoss_ZH-CN2878951870_1920x1080.jpg",
      },
      {
        url: "https://h1.ioliu.cn/bing/CasaBatllo_ZH-CN2826447794_1920x1080.jpg",
      },
      {
        url: "https://h1.ioliu.cn/bing/BistiBadlands_ZH-CN5428677883_1920x1080.jpg",
      },
      {
        url: "https://h1.ioliu.cn/bing/BigWindDay_ZH-CN1837859776_1920x1080.jpg",
      },
      {
        url: "https://h1.ioliu.cn/bing/BesenheideBDJ_ZH-CN2139380821_1920x1080.jpg",
      },
      {
        url: "https://h1.ioliu.cn/bing/Paepalanthus_ZH-CN2626725103_1920x1080.jpg",
      },
      {
        url: "https://h1.ioliu.cn/bing/CoveSpires_ZH-CN2680932006_1920x1080.jpg",
      },
      {
        url: "https://h1.ioliu.cn/bing/HopeValley_ZH-CN2208363231_1920x1080.jpg",
      },
      {
        url: "https://h1.ioliu.cn/bing/GOTPath_ZH-CN1955635212_1920x1080.jpg",
      },
      {
        url: "https://h1.ioliu.cn/bing/MischiefCubs_ZH-CN5217361502_1920x1080.jpg",
      },
      {
        url: "https://h1.ioliu.cn/bing/EiffelBelow_ZH-CN5149009072_1920x1080.jpg",
      },
      {
        url: "https://h1.ioliu.cn/bing/EarthHourNYC_ZH-CN5111448023_1920x1080.jpg",
      },
      {
        url: "https://h1.ioliu.cn/bing/CoveSpires_ZH-CN2680932006_1920x1080.jpg",
      },
      {
        url: "https://h1.ioliu.cn/bing/AurovilleIndia_ZH-CN4983141175_1920x1080.jpg",
      },
      {
        url: "https://h1.ioliu.cn/bing/SakuraFes_ZH-CN1341601988_1920x1080.jpg",
      },
      {
        url: "https://h1.ioliu.cn/bing/AthensNight_ZH-CN1280970241_1920x1080.jpg",
      },
      {
        url: "https://h1.ioliu.cn/bing/HolePunchClouds_ZH-CN1184083504_1920x1080.jpg",
      },
      {
        url: "https://h1.ioliu.cn/bing/TashkurganGrasslands_ZH-CN1141881683_1920x1080.jpg",
      },
      {
        url: "https://h1.ioliu.cn/bing/springequinox_ZH-CN1099430476_1920x1080.jpg",
      },
    ]
    this.setState({
      files: gallery.sort(() => 0.5 - Math.random()).slice(0, number),
    })
  }

  handlePosting () {
    console.log(this.state)
    axios.post("/user/posting", {
      description: this.state.description,
      canSeeUser: this.state.canSeeUser,
      callUser: this.state.callUser,
      geolocation: this.state.geolocation,
      imageLists: this.state.files,
    }).then(res => {
      if(res.code===0){
        Toast.success("success")
      }
    })
  }

  handleCloseDrawer () {
    this.setState({
      drawerModalShow: false,
      geolocationDisable: false,
      canSeeUserShow: false,
      callUserShow: false,
    })
  }

  onFileChange = (files) => {
    this.setState({
      files: files.length <= 9 ? files : files.slice(0, 9),
    })
  }
  onInputChange = (event) => {
    this.setState({
      description: event,
    })
  }
  onCheckedChange = (userId) => {
    if (this.state.canSeeUserShow) {
      this.setState({
        canSeeUser: [...new Set([...this.state.canSeeUserShow, userId])],
      })
    } else {
      this.setState({
        callUser: [...new Set([...this.state.callUser, userId])],
      })
    }
  }
  getLocation = () => {
    if (navigator.geolocation) {
      this.setState({ loading: true, drawerModalShow: true })
      navigator.geolocation.getCurrentPosition(this.showPosition, this.showError)
    } else {
      Toast.fail("获取失败", 2)
      console.log("该浏览器不支持获取地理位置。")
    }
  }

  showPosition = (position) => {
    Toast.success(`纬度: ${position.coords.latitude} 经度:${position.coords.longitude}`)
  }

  showError = (error) => {
    this.setState({
      geolocationDisable: true,
      loading: false,
    })
    Toast.fail("获取失败", 2)
    console.log(error)
  }

  render () {
    const friendsList = this.props.friends.friendsList
    return (
      <div>
        <div className={`DrawerPage ${this.state.drawerModalShow && "show"}`}>
          <div className='cu-bar search fixed-header bg-white'>
            <div className='action' onClick={() => {this.props.history.goBack()}}>
              取消
            </div>
            <div className='content'>
            </div>
            <div className='action' onClick={this.handlePosting}>
              <Button style={{ background: "green", color: "#fff", overflow: "hidden" }} size='small'>
                发表
              </Button>
            </div>
          </div>
          <div style={{ padding: "0 10px", height: "80vh", overflow: "scroll" }}>
            <TextareaItem
              placeholder="这一刻的想法..."
              clear
              count={1000}
              onChange={this.onInputChange}
              rows={4}
            />
            <Badge text="随机选图"
                   style={{
                     marginLeft: 12,
                     padding: "0 3px",
                     backgroundColor: "#fff",
                     borderRadius: 2,
                     color: "#f19736",
                     border: "1px solid #f19736",
                   }}
                   onClick={() => Modal.prompt("随机选图", "直接确定将重置选择(最多随机9张)", [
                     { text: "取消" },
                     {
                       text: "确定", onPress: value => {
                         if (value <= 9) {
                           this.randomSelectedImage(value)
                         }
                       },
                     },
                   ], "default")}
            ></Badge>
            <ImagePicker
              length={3}
              files={this.state.files}
              onChange={this.onFileChange}
              multiple={true}
              onImageClick={(index, fs) => console.log(index, fs)}
              selectable={this.state.files.length < 9}
            ></ImagePicker>
            <WhiteSpace></WhiteSpace>
            <List>
              <Item
                thumb={<img style={{ width: 20, height: 20 }} src={require("./../../components/img/local.png")} />}
                arrow="horizontal"
                onClick={() => {this.getLocation()}}
              >所在位置</Item>
              <Item
                thumb={<img style={{ width: 20, height: 20 }}
                            src={this.state.canSeeUser.length > 0 ? require("./../../components/img/user-active.png") : require("./../../components/img/user-black.png")} />}
                onClick={() => {
                  this.setState({
                    canSeeUserShow: true,
                    drawerModalShow: true,
                  })
                }}
                extra={<span
                  style={{ color: "#8df710" }}>{this.state.canSeeUser.length > 0 && this.state.canSeeUser.length}</span>}
                arrow="horizontal"
              >
                {
                  this.state.canSeeUser.length > 0 ?
                    <span style={{ color: "#8df710" }}>谁可以看</span> : "谁可以看"
                }
              </Item>
              <Item
                thumb={<img style={{ width: 20, height: 20 }}
                            src={this.state.callUser.length > 0 ? require("./../../components/img/@-active.png") : require("./../../components/img/@.png")} />}
                onClick={() => {
                  this.setState({
                    callUserShow: true,
                    drawerModalShow: true,
                  })
                }}
                extra={<span
                  style={{ color: "#8df710" }}>{this.state.callUser.length > 0 && this.state.callUser.length}</span>}
                arrow="horizontal"
              >
                {
                  this.state.callUser.length > 0 ?
                    <span style={{ color: "#8df710" }}>提醒谁看</span> : "提醒谁看"
                }
              </Item>
            </List>
          </div>
        </div>

        <div className={`DrawerClose ${this.state.drawerModalShow && "show"}`} onClick={this.handleCloseDrawer}>
          <span className="cuIcon-pullright"></span>
        </div>
        <div className={`DrawerWindow ${this.state.drawerModalShow && "show"}`}>
          {
            this.state.loading && <div className="loading-container">
              <ActivityIndicator size="large" />
            </div>
          }

          <div className="DrawerWindow-box">
            {
              this.state.geolocationDisable &&
              <span style={{ color: "red", margin: 10, display: "inline-block" }}>获取失败，可能由于您非https网络，出于安全考虑，当前浏览器无法为您提供位置服务，所以无法正常使用geolocation API</span>
            }
            {
              (this.state.callUserShow || this.state.canSeeUserShow && friendsList.length > 0) && friendsList.map((item) => {
                return (
                  <List key={item._id}
                  >
                    <CheckboxItem
                      onChange={() => this.onCheckedChange(item._id)}
                    >
                      <img style={{ borderRadius: 3, marginRight: 5 }}
                           src={"http://pqgrbj9dn.bkt.clouddn.com/04cbe76439caffdc13a79a7ee27a5d25.jpg"} />
                      {item.userName}
                    </CheckboxItem>
                  </List>
                )
              })
            }
          </div>
        </div>
      </div>

    )
  }
}
