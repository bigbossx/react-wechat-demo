import React, { Component } from "react"
import { Button, ImagePicker, WhiteSpace, TextareaItem, List, ActivityIndicator, Toast } from "antd-mobile"

const Item = List.Item
const Brief = Item.Brief
export default class posting extends Component {

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
      friends:[],
      loading:false
    }
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
      this.setState({loading:true})
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
      loading:false
    })
    Toast.fail("获取失败", 2)
    console.log(error)
  }

  render () {
    return (
      <div>
        <div className={`DrawerPage ${this.state.drawerModalShow && "show"}`}>
          <div className='cu-bar search fixed-header bg-white'>
            <div className='action' onClick={()=>{this.props.history.goBack()}}>
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
              <span style={{color:"red"}}>获取失败，可能由于您非https网络，出于安全考虑，当前浏览器无法为您提供位置服务，所以无法正常使用geolocation API</span>
            </div>
          }

        </div>
      </div>

    )
  }
}
