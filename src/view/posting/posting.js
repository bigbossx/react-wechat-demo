import React, { Component } from 'react'
import { Button } from 'antd-mobile'
export default class posting extends Component {

  constructor (props) {
    super(props)
    this.handlePosting = this.handlePosting.bind(this)
    this.state = {

    }
  }
  handlePosting () {}

  render () {
    return (
      <div style={{background: '#fff'}}>
        <div className='cu-bar search fixed-header'>
          <div className='action'>
            取消
          </div>
          <div className='content'>
          </div>
          <div className='action' onClick={this.handlePosting}>
            <Button style={{background: 'green',color: '#fff'}} size='small'>
              确定
            </Button>
          </div>
        </div>
      </div>
    )
  }
}
