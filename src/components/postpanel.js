import React, { Component } from 'react'
import Lightbox from 'react-images'
import { Flex,ActionSheet } from 'antd-mobile'
export default class PostPanel extends Component {
  
  constructor(props){
    super(props)
    this.state={
      previewShow:false,
      previewImages:[],
      currentPreviewIndex:0,
    }
  }
  handleClickImage=(index)=>{
    let previewImages=this.props.data.imageLists.map(item=>{
      return {
        src:item.url
      }
    })
    this.setState({
      previewShow:true,
      previewImages:previewImages,
      currentPreviewIndex:index,
    })
  }
  gotoPrevLightboxImage=()=>{
    this.setState({
      currentPreviewIndex:this.state.currentPreviewIndex-1
    })
  }

  gotoNextLightboxImage=()=>{
    this.setState({
      currentPreviewIndex:this.state.currentPreviewIndex+1
    })
  }

  closeLightbox=()=>{
    this.setState({
      previewShow:false
    })
  }

  handleClickComment=()=>{
    this.props.bindCommentShow()
  }

  handleClickShare=(data)=>{
    this.props.bindShareShow(data)
  }

  render () {
    const {data} = this.props
    const formatDate=(timeStamp)=>{
      let date = new Date(timeStamp)
      let Y = date.getFullYear() + '-';
      let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
      let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
      let m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
      let s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
      return Y+M+D+h+m+s;
    }
    const renderImageComponent = (lists) => {
      let length = lists.length
      if (length === 1) {
        return (
          <div className='post-main-content-single'>
            {lists.map((item,index) => {
               return (
                 <div className='post-main-content post-main-content-single__item' key={item._id}>
                   <img src={item.url} onClick={()=>{this.handleClickImage(index)}}/>
                 </div>
               )
             })}
          </div>
        )
      }else if (length === 2 || length === 4) {
        return (
          <div className='post-main-content-double'>
            {lists.map((item,index) => {
               return (
                 <div className='post-main-content post-main-content-double__item' key={item._id}>
                   <img src={item.url} onClick={()=>{this.handleClickImage(index)}}/>
                 </div>
               )
             })}
          </div>
        )
      }else {
        return (
          <div className='post-main-content-three'>
            {lists.map((item,index) => {
               return (
                 <div className='post-main-content post-main-content-three__item' key={item._id}>
                   <img src={item.url} onClick={()=>{this.handleClickImage(index)}}/>
                 </div>
               )
             })}
          </div>
        )
      }
    }

    return (
      <div className='post-container'>
        <div className='post-avatar'>
          <img src={data.userInfo[0].avatar} />
        </div>
        <div className='post-main'>
          <div className='post-main-header'>
            <span className='post-main-header-username text-wechat text-bold text-xl text-Abc'>{data.userInfo[0].userName}</span>
            <i className='text-gray cuIcon-lock text-xl'></i>
          </div>
          <div className='post-main-description text-lg'>
            {data.description}
          </div>
          {renderImageComponent(data.imageLists)}
          <div className='post-other'>
            <span className='text-grey'>{formatDate(data.timeStamp)}</span>
            <div className='cu-tag bg-greyLight radius'>
              <span className='cuIcon-like text-lg'></span>
              <span className='cuIcon-comment text-lg' onClick={()=>{this.handleClickComment("comment")}} style={{margin:"0 15px"}}></span>
              <span className='cuIcon-share text-lg' onClick={()=>{this.handleClickShare("share")}}></span>
            </div>
          </div>
          <div className='post-commit bg-greyLight'>
            <div className='like-container'>
              <span className='cuIcon-like text-wechat text-df' style={{paddingRight: '5px'}}></span>
              <span className='text-wechat text-df text-bold' style={{paddingRight: '5px'}}>Vison_x,</span>
              <span className='text-wechat text-df text-bold' style={{paddingRight: '5px'}}>小辉,</span>
              <span className='text-wechat text-df text-bold' style={{paddingRight: '5px'}}>锐儿</span>
            </div>
            <div className='commit-container text-df'>
              <div className='commit-item'>
                <span className='text-wechat text-bold'>方小姐</span>
                <span>:我现在都没去买game of thrones 奥利奥特别版</span>
              </div>
              <div className='commit-item'>
                <span className='text-wechat text-bold'>陈文慧</span>
                <span>回复</span>
                <span className='text-wechat text-bold'>lyc</span>
                <span>:我现在都没去买game of thrones 奥利奥特别版</span>
              </div>
            </div>
          </div>
        </div>
        <Lightbox
          images={this.state.previewImages}
          isOpen={this.state.previewShow}
          backdropClosesModal={true}
          imageCountSeparator={" / "}
          currentImage={this.state.currentPreviewIndex}
          onClickPrev={this.gotoPrevLightboxImage}
          onClickNext={this.gotoNextLightboxImage}
          onClose={this.closeLightbox} 
        />
      </div>
    )
  }
}
