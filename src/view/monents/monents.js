import React, { Component } from "react"
import { Toast } from "antd-mobile"
import { connect } from "react-redux"
import InfiniteScroll from 'react-infinite-scroller';
import PostPanel from "./../../components/postpanel"
import { getPosting, getMorePosting } from "./../../redex/monents.redux"

@connect(
  state => state,
  { getPosting, getMorePosting },
)
export default class Monents extends Component {

  constructor (props) {
    super(props)
    this.handleToPosting = this.handleToPosting.bind(this)
    this.handleGoBack = this.handleGoBack.bind(this)
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
                <PostPanel data={item} key={index}></PostPanel>
              )
            })
          } 
          
      </InfiniteScroll>
        <div className='cu-bar input'>
          <div className='action'>
            <span className='cuIcon-roundaddfill text-grey'></span>
          </div>
          <input className='solid-bottom' maxLength='300' cursor-spacing='10'></input>
          <div className='action'>
            <span className='cuIcon-emojifill text-grey'></span>
          </div>
          <button className='cu-btn bg-green shadow-blur'>
            发送
          </button>
        </div>
      </div>
    )
  }
}
