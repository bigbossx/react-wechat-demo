import React, { Component } from "react"
import Lightbox from "react-images"
import LazyLoad from "react-lazyload"
import { ActivityIndicator } from "antd-mobile"

export default class PostPanel extends Component {

  constructor (props) {
    super(props)
    this.state = {
      previewShow: false,
      previewImages: [],
      currentPreviewIndex: 0,
    }
  }

  handleClickImage = (index) => {
    let previewImages = this.props.data.imageLists.map(item => {
      return {
        src: item.url,
      }
    })
    this.setState({
      previewShow: true,
      previewImages: previewImages,
      currentPreviewIndex: index,
    })
  }
  gotoPrevLightboxImage = () => {
    this.setState({
      currentPreviewIndex: this.state.currentPreviewIndex - 1,
    })
  }

  gotoNextLightboxImage = () => {
    this.setState({
      currentPreviewIndex: this.state.currentPreviewIndex + 1,
    })
  }

  closeLightbox = () => {
    this.setState({
      previewShow: false,
    })
  }

  handleClickComment = (type, data) => {
    this.props.bindCommentShow(type, data)
  }

  handleClickShare = (data) => {
    this.props.bindShareShow(data)
  }

  handleClickLikeOrDislike = (postId) => {
    this.props.bindLikeOrDislike(postId)
  }

  render () {
    const { data, userInfo, index, length } = this.props
    const formatDate = (timeStamp) => {
      let date = new Date(timeStamp)
      let Y = date.getFullYear() + "-"
      let M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-"
      let D = (date.getDate() < 10 ? "0" + (date.getDate()) : date.getDate()) + " "
      let h = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":"
      let m = (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ":"
      let s = (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds())
      return Y + M + D + h + m + s
    }

    const renderImageComponent = (lists) => {
      let length = lists.length
      if (length === 1) {
        return (
          <div className='post-main-content-single'>
            {lists.map((item, index) => {
              return (
                <div className='post-main-content post-main-content-single__item' key={item._id}>
                  <LazyLoad placeholder={<ActivityIndicator size="large" />}>
                    <img src={item.url} onClick={() => {this.handleClickImage(index)}} />
                  </LazyLoad>
                </div>
              )
            })}
          </div>
        )
      } else if (length === 2 || length === 4) {
        return (
          <div className='post-main-content-double'>
            {lists.map((item, index) => {
              return (
                <div className='post-main-content post-main-content-double__item' key={item._id}>
                  <LazyLoad placeholder={<ActivityIndicator size="large" />}>
                    <img src={item.url} onClick={() => {this.handleClickImage(index)}} />
                  </LazyLoad>
                </div>
              )
            })}
          </div>
        )
      } else {
        return (
          <div className='post-main-content-three'>
            {lists.map((item, index) => {
              return (
                <div className='post-main-content post-main-content-three__item' key={item._id}>
                  <LazyLoad placeholder={<ActivityIndicator size="large" />}>
                    <img src={item.url} onClick={() => {this.handleClickImage(index)}} />
                  </LazyLoad>
                </div>
              )
            })}
          </div>
        )
      }
    }

    return (
      <div className='post-container' style={{ borderBottom: (index !== length - 1) ? "8px solid #f5f5f5" : "" }}>
        <div className='post-avatar'>
          <img src={data.userInfo[0] && data.userInfo[0].avatar || "http://pqgrbj9dn.bkt.clouddn.com/default.png"} />
        </div>
        <div className='post-main'>
          <div className='post-main-header'>
            <span
              className='post-main-header-username text-wechat text-bold text-xl'>{data.userInfo[0] && data.userInfo[0].userName || "未知"}</span>
            <i className='text-gray cuIcon-lock text-xl'></i>
          </div>
          <div className='post-main-description text-lg'>
            {data.description}
          </div>
          {renderImageComponent(data.imageLists)}
          <div className='post-other'>
            <span className='text-grey'>{formatDate(data.timeStamp)}</span>
            <div className='cu-tag bg-greyLight radius'>
              {
                JSON.stringify(data.likeUser).indexOf(userInfo._id) > -1 ?
                  <span className='cuIcon-likefill text-red text-lg'
                        onClick={() => {this.handleClickLikeOrDislike(data._id)}}></span> :
                  <span className='cuIcon-like text-lg'
                        onClick={() => {this.handleClickLikeOrDislike(data._id)}}></span>
              }

              <span className='cuIcon-comment text-lg'
                    onClick={() => {this.handleClickComment("comment", { id: data._id })}}
                    style={{ margin: "0 15px" }}></span>
              <span className='cuIcon-share text-lg' onClick={() => {this.handleClickShare("share")}}></span>
            </div>
          </div>
          <div className='post-commit bg-greyLight'>
            {
              data.likeUser.length > 0 &&
              <div className='like-container'>
                <span className='cuIcon-like text-wechat text-df' style={{ paddingRight: "5px" }}></span>
                {
                  data.likeUser.map((item, index) => {
                    return (
                      <span key={item.userId} className='text-wechat text-df text-bold'
                            style={{ paddingRight: "5px" }}>{item.userName}{data.likeUser.length - 1 !== index && ","}</span>
                    )
                  })
                }
              </div>
            }

            {
              data.comment.length > 0 &&
              <div className='commit-container text-df'>
                {
                  data.comment.map((item, index) => {

                    if (item.type === "comment") {
                      return (
                        <div className='commit-item' key={index} onClick={() => {
                          this.handleClickComment("reply", {
                            id: data._id,
                            replyId: item.commentId,
                            replyName: item.commentName,
                          })
                        }}>
                          <span className='text-wechat text-bold'>{item.commentName}</span>
                          <span>:{item.content}</span>
                        </div>
                      )
                    } else {
                      return (
                        <div className='commit-item' key={index} onClick={() => {
                          this.handleClickComment("reply", {
                            id: data._id,
                            replyId: item.commentId,
                            replyName: item.commentName,
                          })
                        }}>
                          <span className='text-wechat text-bold'>{item.commentName}</span>
                          <span>回复</span>
                          <span className='text-wechat text-bold'>{item.replyName}</span>
                          <span>:{item.content}</span>
                        </div>
                      )
                    }

                  })
                }
              </div>
            }
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
