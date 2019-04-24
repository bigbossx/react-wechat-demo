import React from "react"
import axios from "axios"
import { ImagePicker, List, Radio, Flex, WhiteSpace, InputItem, Button, WingBlank, NavBar, Icon } from "antd-mobile"
import { loadUserInfo, edit } from "./../redex/user.redux"
import { connect } from "react-redux"
import * as qiniu from "qiniu-js"

@connect(
  state => state.user,
  { loadUserInfo, edit },
)
export default class EditInfo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      files: [],
      showAddBtn: true,
      optionValue: 0,
      address: "",
      title: "",
      desc: "",
    }
  }

  componentDidMount () {
    // axios.get('/user/info').then((res)=>{
    //     if(res.status==200){
    //         console.log(res.data)
    //         if(res.data.code==0){
    //             //已登录
    //             this.props.loadUserInfo(res.data.data)
    //         }else{
    //             this.props.history.push('/login')
    //         }
    //     }
    // })
  }

  onFileChange = (files, type) => {
    console.log(files, type)
    if (type === "add") {
      axios.get("http://111.230.91.125:9000/api/uptoken").then((res) => {

        var domain = res.data.domain
        var token = res.data.uptoken
        var config = {
          useCdnDomain: true,
          disableStatisticsReport: false,
          retryCount: 6,
          region: qiniu.region.z0,
        }
        var putExtra = {
          fname: "",
          params: {},
          mimeType: null,
        }
        var key = new Date().getTime()
        var file = files[0].file
        console.log(file)
        var observable = qiniu.upload(file, key, token, putExtra, config)
        console.log(observable)
        var subscription = observable.subscribe((next) => {

        }, (error) => {
          console.log(error)
        }, () => {
          this.setState({
            files,
            showAddBtn: false,
          })
        })
      })
      return false
    }
    this.setState({
      files,
      showAddBtn: true,
    })
  }
  onOptionChange = (value) => {
    this.setState({
      optionValue: value,
    })
  }
  handleChange = (key, val) => {
    this.setState({
      [key]: val,
    })
  }
  handleSave = () => {
    // axios.post('/user/edit',{
    //     //avatar:this.state.files.length==0?this.props.avatar:this.state.files[0].url,
    //     avatar:this.props.avatar,
    //     sex:this.state.optionValue==0?'男':'女',
    //     title:this.state.title||this.props.title,
    //     address:this.state.address||this.props.address,
    //     desc:this.state.desc||this.props.desc,
    // }).then((res)=>{
    //     //todo
    // })
    const avatar = this.props.avatar
    const sex = this.state.optionValue == 0 ? "男" : "女"
    const title = this.state.title || this.props.title
    const address = this.state.address || this.props.address
    const desc = this.state.desc || this.props.desc
    this.props.edit(avatar, sex, title, address, desc)
  }

  render () {
    const RadioItem = Radio.RadioItem
    const data = [
      { value: 0, label: "男" },
      { value: 1, label: "女" },
    ]
    return this.props.userName != "" ?
      (
        <div id="edit">
          <NavBar
            mode="dark"
            icon={<Icon type="left" />}
            className="fixed-header"
            onLeftClick={() => { this.props.history.goBack() }}
          >修改资料</NavBar>
          <List renderHeader={() => "选择头像"} style={{ marginTop: 45 }}>
            <ImagePicker
              files={this.state.files}
              onChange={this.onFileChange}
              onImageClick={(index, fs) => console.log(index, fs)}
              selectable={this.state.showAddBtn}
            ></ImagePicker>
          </List>
          <List renderHeader={() => "性别"}>
            {data.map(i => (
              <RadioItem defaultChecked={0 === i.value} key={i.value} checked={this.state.optionValue === i.value}
                         onChange={() => this.onOptionChange(i.value)}>
                {i.label}
              </RadioItem>
            ))}
          </List>
          <List renderHeader={() => "个性签名"}>
            <InputItem
              placeholder={this.props.title}
              onChange={v => this.handleChange("title", v)}
            ></InputItem>
          </List>
          <List renderHeader={() => "地址"}>
            <InputItem
              placeholder={this.props.address}
              onChange={v => this.handleChange("address", v)}
            ></InputItem>
          </List>
          <List renderHeader={() => "备注"}>
            <InputItem
              placeholder={this.props.desc}
              onChange={v => this.handleChange("desc", v)}
            ></InputItem>
          </List>
          <WhiteSpace />
          <WhiteSpace />
          <WhiteSpace />
          <WingBlank>
            <Button type="primary" onClick={this.handleSave}>保存</Button>
          </WingBlank>
        </div>
      ) : null
  }
}
