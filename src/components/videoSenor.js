import React from 'react'
import VisibilitySensor from 'react-visibility-sensor'
import { Player} from 'video-react';
import "./../../node_modules/video-react/dist/video-react.css";
import { WhiteSpace,Card,Flex,Badge } from 'antd-mobile';
export default class VideoSenor extends React.Component{
    constructor(props){
        super(props)
        this.state={
            isVisible:false
        }
        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.onSensorChange=this.onSensorChange.bind(this)
    }
    onSensorChange(isVisible){
        if(isVisible){
            this.play()
            this.setState({
                isVisible:true
            })
        }else{
            this.pause()
            this.setState({
                isVisible:false
            })
        }
    }

    play() {
        console.log("paly")
        this.refs.player.play();
    }
    pause() {
        this.refs.player.pause();
    }
    render(){
        const {data}=this.props
        return (
            <VisibilitySensor 
                minTopValue={50}
                onChange={this.onSensorChange}
            >
              <div style={{position:"relative"}}>
                {
                    !this.state.isVisible?<div className="video-layout"></div>:null
                }
                <Card full>
                  <Card.Header
                    title={data.singer}
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
                      ref="player"
                      playsInline
                      poster={data.poster}
                      src={data.videoUrl}
                    >
                    </Player>
                    <WhiteSpace></WhiteSpace>
                    <span>{`${data.name.replace(/^\s+|\s+$/g,"")}`}</span>
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
        )
    }
}