import React, { Component } from "react"
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
} from "antd-mobile"

const Item = List.Item
const Brief = Item.Brief
export default class Posting extends Component {

  constructor (props) {
    super(props)
    this.handlePosting = this.handlePosting.bind(this)
    this.handleOpenDrawer = this.handleOpenDrawer.bind(this)
    this.handleCloseDrawer = this.handleCloseDrawer.bind(this)
    this.state = {
      drawerModalShow: false,
      files: [],
      description: "",
      geolocationDisable: false,
      friends: [],
      loading: false,
    }
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

  }

  handleOpenDrawer () {
    this.setState({
      drawerModalShow: true,
    })
  }

  handleCloseDrawer () {
    this.setState({
      drawerModalShow: false,
      geolocationDisable: false,
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
  getLocation = () => {
    this.handleOpenDrawer()
    if (navigator.geolocation) {
      this.setState({ loading: true })
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
                thumb={<img style={{ width: 20, height: 20 }} src={require("./../../components/img/user-black.png")} />}
                onClick={() => {this.handleOpenDrawer()}}
                arrow="horizontal"
              >
                谁可以看
              </Item>
              <Item
                thumb={<img style={{ width: 20, height: 20 }} src={require("./../../components/img/@.png")} />}
                onClick={() => {this.handleOpenDrawer()}}
                arrow="horizontal"
              >
                提醒谁看
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

          {
            this.state.geolocationDisable &&
            <div className="DrawerWindow-box">
              <span style={{ color: "red" }}>获取失败，可能由于您非https网络，出于安全考虑，当前浏览器无法为您提供位置服务，所以无法正常使用geolocation API</span>
            </div>
          }

        </div>
      </div>

    )
  }
}
