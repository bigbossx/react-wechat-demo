import React, { Component } from 'react'
import { NavBar, Toast } from 'antd-mobile'
import PostPanel from './../../components/postpanel'
export default class Monents extends Component {
  render () {
    return (
      <div style={{background: '#fff'}}>
        <div class='cu-bar bg-black search'>
          <div class='action'>
            <span class='cuIcon-back text-xxl'></span>
          </div>
          <div class='content'>
            ColorUI
          </div>
          <div class='action'>
            <span class='cuIcon-camera text-xxl'></span>
          </div>
        </div>
        <div className='monents-container'>
          <div className='monents-userInfo'>
            <span className='monents-userInfo-name'>Vision_X</span>
            <div className='monents-userInfo-avatar'>
              <img src='https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg' />
            </div>
          </div>
        </div>
        <PostPanel></PostPanel>
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
