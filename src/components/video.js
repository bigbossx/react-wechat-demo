import React, { Component } from 'react'
import {connect} from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller';
import VisibilitySensor from 'react-infinite-scroller'
import { Player } from 'video-react';
import "./../../node_modules/video-react/dist/video-react.css";
import {fetchVideoData} from './../redex/video.redux'
@connect(
  state=>state,
  {fetchVideoData}
)
export default class video extends Component {
   constructor(props) {
    super(props);

    this.state = {
      dataSource:[
        {
          user:"@岁月荏苒一过往",
          avatar:"https://p9-dy.bytecdn.cn/aweme/100x100/4a7a001c167000502591.jpeg",
          title:"时间真的教会了我们很多东西，也拿走了我们很多东西",
          videoUrl:"https://vd.yinyuetai.com/hc.yinyuetai.com/uploads/videos/common/CB6D01683C65F20CB607C603020F8FC9.mp4?sc=0698f9502e68b21b&br=777&vid=3341816&aid=215&area=ML&vst=0",
          cover:"https://p1.pstatp.com/large/12f71000b84ca58697e68.jpg"
        },
        {
          user:"@岁月荏苒一过往",
          avatar:"https://p9-dy.bytecdn.cn/aweme/100x100/4a7a001c167000502591.jpeg",
          title:"时间真的教会了我们很多东西，也拿走了我们很多东西",
          videoUrl:"https://vd.yinyuetai.com/hc.yinyuetai.com/uploads/videos/common/CB6D01683C65F20CB607C603020F8FC9.mp4",
          cover:"https://img1.c.yinyuetai.com/video/mv/190114/0/-M-82f78a2be6447ad5185c602932f6e1b8_240x135.jpg"
        }
      ],
      isLoading: true,
    };
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
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    setTimeout(() => {
    }, 1000);
  }

  render() {
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
        this.state.dataSource.map((item, idx) => {
          renderItems.push(
            <Player
              key={idx}
              playsInline
              poster={item.poster}
              src={item.videoUrl}
            />
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
