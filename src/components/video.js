import React, { Component } from 'react'
import {connect} from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller';
import VisibilitySensor from 'react-visibility-sensor'
import { Player } from 'video-react';
import "./../../node_modules/video-react/dist/video-react.css";
import {fetchVideoData} from './../redex/video.redux'
import { WhiteSpace,Card,Flex,Badge } from 'antd-mobile';
@connect(
  state=>state,
  {fetchVideoData}
)
export default class video extends Component {
   constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
    this.onSensorChange=this.onSensorChange.bind(this)
  }

  componentDidMount() {
    // you can scroll to the specified position
    // setTimeout(() => this.lv.scrollTo(0, 120), 800);

    // simulate initial Ajax
    this.props.fetchVideoData()
  }

  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.dataSource !== this.props.dataSource) {
  //     this.setState({
  //     });
  //   }
  // }

  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    console.log("onEndReached")
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    setTimeout(() => {
    }, 1000);
  }

  onSensorChange(isVisible){
    console.log(isVisible)
  }

  render() {
    console.log(this.props)
    const {videoList}=this.props.video
    const separator = (index) => (
      <div
        key={index}
        style={{
          backgroundColor: '#F5F5F9',
          height: 8,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    );
    var renderItems = [];
        videoList.map((item, idx) => {
          renderItems.push(
            <VisibilitySensor 
              key={idx}
              onChange={this.onSensorChange}
              
            >
              <div>
                <Card full>
                  <Card.Header
                    title={item.singer}
                    // thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                    extra={<Badge text={Math.random()>0.5?'MV':"音悦台"} style={{
                      padding: '3px 13px',
                      backgroundColor: '#fff',
                      borderRadius: 15,
                      color: '#f19736',
                      border: '1px solid #f19736',
                    }}/>}
                  />
                  <Card.Body>
                    <Player
                      key={idx}
                      playsInline
                      poster={item.poster}
                      src={item.videoUrl}
                    />
                    <WhiteSpace></WhiteSpace>
                    <span>{`—${item.name.replace(/^\s+|\s+$/g,"")}`}</span>
                  </Card.Body>
                  <Card.Footer content="" extra={
                    <Flex justify="between" style={{margin:"10px 0px"}}>
                      <img style={{width:20}} src={require('./img/like-black.png')}/>
                      <img style={{width:20}} src={require('./img/message-black.png')}/>
                      <img style={{width:20}} src={require('./img/more.png')}/>
                    </Flex>
                  } 
                  />
                </Card>  
                <WhiteSpace></WhiteSpace>
              </div>
            </VisibilitySensor>
          );
        });
    return (
      <InfiniteScroll
          pageStart={0}
          loadMore={this.onEndReached}
          hasMore={true}
          loader={<div className="loader" key={0}>Loading ...</div>}
      >
          {
            renderItems
          }
      </InfiniteScroll>
    );
  }
}
