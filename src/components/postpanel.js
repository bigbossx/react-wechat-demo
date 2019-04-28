import React, { Component } from 'react'
import { Flex } from 'antd-mobile'
export default class PostPanel extends Component {

  render () {
    // console.log('postpanel', this.props.data)
    const {data} = this.props

    const renderImageComponent = (lists) => {
      let length = lists.length
      if (length === 1) {
        return (
          <div className='post-main-content-single'>
            {lists.map(item => {
               return (
                 <div className='post-main-content post-main-content-single__item' key={item._id}>
                   <img src={item.url} />
                 </div>
               )
             })}
          </div>
        )
      }else if (length === 2 || length === 4) {
        return (
          <div className='post-main-content-double'>
            {lists.map((item) => {
               return (
                 <div className='post-main-content post-main-content-double__item' key={item._id}>
                   <img src={item.url} />
                 </div>
               )
             })}
          </div>
        )
      }else {
        return (
          <div className='post-main-content-three'>
            {lists.map(item => {
               return (
                 <div className='post-main-content post-main-content-three__item' key={item._id}>
                   <img src={item.url} />
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
            <span className='text-grey'>{data.timeStamp}</span>
            <div className='cu-tag bg-greyLight radius'>
              <span className='cuIcon-more text-blue text-lg'></span>
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
      </div>
    )
  }
}
