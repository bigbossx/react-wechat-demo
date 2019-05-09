import React from 'react'
import {NavBar,Popover, Icon,Toast} from 'antd-mobile'
import {connect} from 'react-redux'
import {Switch,Route} from 'react-router-dom'
import Friends from './../../components/friends'
import Me from './../../components/me'
import Message from './../../components/message'
import Video from './../../components/video'
import './.././../index.css'
import TabBarLink from './../../components/tabbarlink'
import {getMsgList,getMsg} from './../../redex/chat.redux'
import {getAddRequest,getAddRequestList} from './../../redex/friends.redux'
const Item = Popover.Item;
const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt="" />;
@connect(
    state=>state,
    {getMsgList,getMsg,getAddRequest,getAddRequestList}
)
export default class Home extends React.Component{
    constructor(props){
        super(props)
        this.state={
            visible: false,
        }
    }
    componentDidMount(){
        if(!this.props.chat.chatMsg.length){
            this.props.getMsgList()
            this.props.getMsg()
            //console.log('我执行了home的getmsg')
        }
        if(!this.props.friends.friendsList.length){
            this.props.getAddRequestList()
            this.props.getAddRequest()
            //console.log('我执行了home的getaddreq')
        }
    }
    onSelect = (opt) => {
        // console.log(opt.props.value);
        this.setState({
            visible: false,
            selected: opt.props.value,
        });
        Toast.show(opt.props.value)
    };
    handleVisibleChange = (visible) => {
        this.setState({
            visible,
        });
    };
    render(){
        const {pathname}=this.props.location
        const user= this.props.user
        const navList=[
            {
                path:'/message',
                text:'消息',
                icon:'msg',
                title:'消息列表',
                component:Message
            },
            {
                path:'/video',
                text:'视频',
                icon:'video',
                title:'联系人',
                component:Video
            },
            {
                path:'/friends',
                text:'联系人',
                icon:'friends',
                title:'联系人',
                component:Friends
            },
            {
                path:'/me',
                text:'我',
                icon:'me',
                title:'个人中心',
                component:Me
            }
        ]
        return (
            <div>
                <NavBar
                    mode="dark"
                    className='fixed-header'
                    rightContent={
                        <Popover mask
                          overlayClassName="fortest"
                          overlayStyle={{ color: 'currentColor' }}
                          visible={this.state.visible}
                          overlay={[
                            (<Item key="4" value="scan" icon={myImg('tOtXhkIWzwotgGSeptou')} data-seed="logId">Scan</Item>),
                            (<Item key="5" value="special" icon={myImg('PKAgAqZWJVNwKsAJSmXd')} style={{ whiteSpace: 'nowrap' }}>My Qrcode</Item>),
                            (<Item key="6" value="button ct" icon={myImg('uQIYTFeRrjPELImDRrPt')}>
                              <span style={{ marginRight: 5 }}>Help</span>
                            </Item>),
                          ]}
                          align={{
                            overflow: { adjustY: 0, adjustX: 0 },
                            offset: [-10, 0],
                          }}
                          onVisibleChange={this.handleVisibleChange}
                          onSelect={this.onSelect}
                        >
                          <div style={{
                            height: '100%',
                            padding: '0 15px',
                            marginRight: '-15px',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                          >
                            <Icon type="ellipsis" />
                          </div>
                        </Popover>
                    }
                >{navList.find(v=>v.path==pathname).title}</NavBar>
                <div style={{marginTop:45,marginBottom:50}}>
                    <Switch>
                        {
                            navList.map(v=>(
                                <Route key={v.path} path={v.path} component={v.component}></Route>
                            ))
                        }
                    </Switch>
                </div>
                <TabBarLink data={navList} ></TabBarLink>
            </div>
        )
    }
}
