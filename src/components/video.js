import React, { Component } from 'react'
import {connect} from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller';
import VideoSensor from './videoSenor'
import {fetchVideoData} from './../redex/video.redux'
import { ActivityIndicator } from "antd-mobile"

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



  render() {
    const {page,totalPage}=this.props.video
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
            <VideoSensor data={item} key={idx} />
          );
        });
    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={this.onEndReached}
        initialLoad={false}
        hasMore={page <= totalPage - 1}
        loader={
          <div className="loader" key={0}>
            <ActivityIndicator size="large" />
            <span style={{ marginTop: 10, color: "#bdc4ca" }}>加载中...</span>
          </div>
        }
      >
          {
            renderItems
          }
      </InfiniteScroll>
    );
  }
}
