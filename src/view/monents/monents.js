import React, { Component } from "react"
import { Toast } from "antd-mobile"
import { connect } from "react-redux"
import InfiniteScroll from 'react-infinite-scroller';
import PostPanel from "./../../components/postpanel"
import { getPosting, getMorePosting } from "./../../redex/monents.redux"
const socialShare=window.socialShare
@connect(
  state => state,
  { getPosting, getMorePosting },
)
export default class Monents extends Component {

  constructor (props) {
    super(props)
    this.handleToPosting = this.handleToPosting.bind(this)
    this.handleGoBack = this.handleGoBack.bind(this)
    this.state={
      showCommentPanel:false,
      showSharePanel:false
    }
    
    this.commentRef = React.createRef();
  }

  componentDidMount () {
    this.props.getPosting(10)
  }

  handleToPosting () {
    this.props.history.push("/posting")
  }

  handleGoBack () {
    this.props.history.goBack()
  }

  onEndReached=()=>{
    console.log("onEndReached")
  }

  handleShowSharePanel=(data)=>{
    console.log(data)
    this.setState({
      showSharePanel:true
    })
    let $config = {
      url                 : "", // 网址，默认使用 window.location.href
      source              : '', // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
      title               : "data.title", // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
      origin              : '', // 分享 @ 相关 twitter 账号
      description         : "data.description", // 描述, 默认读取head标签：<meta name="description" content="" />
      image               : '', // 图片, 默认取网页中第一个img标签
      // sites               : ['qzone', 'qq', 'weibo','wechat', 'douban'], // 启用的站点
      disabled            : ['google', 'facebook', 'twitter'], // 禁用的站点
      wechatQrcodeTitle   : '微信扫一扫：分享', // 微信二维码提示文字
      wechatQrcodeHelper  : '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>'
    };
    socialShare('.social-share-cs',$config);
  }

  handleShowComment=async (data)=>{
    console.log(data)
    await this.setState({
      showCommentPanel:true
    })
    this.commentRef.focus()
    
  }

  render () {
    
    return (
      <div style={{ background: "#fff" }}>
        <div className='cu-bar bg-black search fixed-header'>
          <div className='action' onClick={this.handleGoBack}>
            <span className='cuIcon-back text-xxl'></span>
          </div>
          <div className='content'>
            朋友圈
          </div>
          <div className='action' onClick={this.handleToPosting}>
            <span className='cuIcon-camera text-xxl'></span>
          </div>
        </div>
        <div className='monents-container'>
          <div className='monents-userInfo'>
            <span className='monents-userInfo-name'>{this.props.user.userName}</span>
            <div className='monents-userInfo-avatar'>
              <img src={this.props.user.avatar} />
            </div>
          </div>
        </div>
        <InfiniteScroll
            pageStart={0}
            loadMore={this.onEndReached}
            hasMore={true}
            // loader={<div className="loader" key={0}>Loading ...</div>}
          >   
            {
              this.props.monents.postingList.length>0 && this.props.monents.postingList.map((item,index)=>{
                return (
                  <PostPanel 
                    data={item}
                    key={index} 
                    bindShareShow={(data)=>{this.handleShowSharePanel(data)}}
                    bindCommentShow={(data)=>{this.handleShowComment(data)}}
                  ></PostPanel>
                )
              })
            } 
            
        </InfiniteScroll>
        {
          this.state.showCommentPanel &&
          <div className='cu-bar input fixed-bottom'>
            <div className='action'>
              <span className='cuIcon-roundaddfill text-grey'></span>
            </div>
            <input 
              className='solid-bottom' 
              maxLength='300'
              cursor-spacing='10' 
              ref={(comment)=>this.commentRef=comment}
              onBlur={()=>{
                this.setState({
                  showCommentPanel:false
                })
              }}
            ></input>
            <div className='action'>
              <span className='cuIcon-emojifill text-grey'></span>
            </div>
            <button className='cu-btn bg-green shadow-blur'>
              发送
            </button>
          </div>
        }
        {
          this.state.showSharePanel && <div className="social-share-cs fixed-bottom"></div>
        }
      </div>
    )
  }
}
