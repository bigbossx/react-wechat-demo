import React, { Component } from 'react'
import { Flex } from 'antd-mobile'
export default class PostPanel extends Component {

  render () {
    let data = ['https://tokyo.cdn.xiyanghui.com/b6cd94b2aad635dc1de82c1818109e02-0-small'
    ]
    let data1 = ['https://tokyo.cdn.xiyanghui.com/67ebdf86cd227e7b313fc62a80d5f424-0-small',
      'https://tokyo.cdn.xiyanghui.com/70cd8ceaf8927642a013096f9e140d92-0-small',
      'https://tokyo.cdn.xiyanghui.com/70cd8ceaf8927642a013096f9e140d92-1-small',
      'https://tokyo.cdn.xiyanghui.com/70cd8ceaf8927642a013096f9e140d92-2-small',
      'https://tokyo.cdn.xiyanghui.com/70cd8ceaf8927642a013096f9e140d92-3-small'
    ]
    let data2 = ['https://tokyo.cdn.xiyanghui.com/14c1889c9e7f3a6ff6087b1623431cb8-0-small',
      'https://tokyo.cdn.xiyanghui.com/14c1889c9e7f3a6ff6087b1623431cb8-1-small',
      'https://tokyo.cdn.xiyanghui.com/14c1889c9e7f3a6ff6087b1623431cb8-2-small',
      'https://tokyo.cdn.xiyanghui.com/0f7b6a31974a0700e7e90672b515c686-1-small',
      'https://tokyo.cdn.xiyanghui.com/9eb9e2c12c400270e603e96dc561df0d-0-small'
    ]
    const renderPostComponent = (data) => {
      return singlePost(data, 'single')
    }
    const singlePost = (data, _className) => {
      return (
        <div className={`post-main-content-${_className}`}>
          {data.map(item => {
             return (
               <div className={_className}>
                 <img src={item} />
               </div>
             )
           })}
        </div>
      )
    }

    return (
      <div className='post-container'>
        <div className='post-avatar'>
          <img src='https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg' />
        </div>
        <div className='post-main'>
          <div className='post-main-header'>
            <span className='post-main-header-username text-wechat text-bold text-xl text-Abc'>vision</span>
            <i className='text-gray cuIcon-lock text-xl'></i>
          </div>
          <div className='post-main-description text-lg'>
            提供了 40+ 基础组件、覆盖各类场景，组件特性丰富、满足各种功能需求。在不损失功能的基础上，尽量保证了单个组件的体积最小、性能最优。
          </div>
          <div className='post-main-content-single'>
            <div className='post-main-content post-main-content-single__item'>
              <img src='https://tokyo.cdn.xiyanghui.com/b6cd94b2aad635dc1de82c1818109e02-0-small' />
            </div>
          </div>
          <div className='post-main-content-double'>
            <div className='post-main-content post-main-content-double__item'>
              <img src='https://tokyo.cdn.xiyanghui.com/b6cd94b2aad635dc1de82c1818109e02-0-small' />
            </div>
            <div className='post-main-content post-main-content-double__item'>
              <img src='https://tokyo.cdn.xiyanghui.com/b6cd94b2aad635dc1de82c1818109e02-0-small' />
            </div>
          </div>
          <div className='post-main-content-three'>
            <div className='post-main-content post-main-content-three__item'>
              <img src='https://tokyo.cdn.xiyanghui.com/b6cd94b2aad635dc1de82c1818109e02-0-small' />
            </div>
            <div className='post-main-content post-main-content-three__item'>
              <img src='https://tokyo.cdn.xiyanghui.com/b6cd94b2aad635dc1de82c1818109e02-0-small' />
            </div>
            <div className='post-main-content post-main-content-three__item'>
              <img src='https://tokyo.cdn.xiyanghui.com/b6cd94b2aad635dc1de82c1818109e02-0-small' />
            </div>
          </div>
          <div className='post-main-content-double'>
            <div className='post-main-content post-main-content-double__item'>
              <img src='https://tokyo.cdn.xiyanghui.com/b6cd94b2aad635dc1de82c1818109e02-0-small' />
            </div>
            <div className='post-main-content post-main-content-double__item'>
              <img src='https://tokyo.cdn.xiyanghui.com/b6cd94b2aad635dc1de82c1818109e02-0-small' />
            </div>
            <div className='post-main-content post-main-content-double__item'>
              <img src='https://tokyo.cdn.xiyanghui.com/b6cd94b2aad635dc1de82c1818109e02-0-small' />
            </div>
            <div className='post-main-content post-main-content-double__item'>
              <img src='https://tokyo.cdn.xiyanghui.com/b6cd94b2aad635dc1de82c1818109e02-0-small' />
            </div>
          </div>
          <div className='post-other'>
            <span className='text-grey'>14分钟前</span>
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
