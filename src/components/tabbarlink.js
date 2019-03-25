import React from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import './../index.css'
@withRouter
@connect(
    state=>state
)
export default class TabBarLink extends React.Component{
    static propTypes={
        data:PropTypes.array.isRequired
    }
    render(){
        const navList=this.props.data
        const {pathname}=this.props.location
        return(
            <TabBar
            >
                {
                    navList.map(v=>(
                        <TabBar.Item
                            badge={v.path=='/message'?this.props.chat.unread:v.path=='/friends'?this.props.friends.unreadrequest:0}
                            key={v.path}
                            title={v.text}
                            icon={{uri:require(`./../../public/images/${v.icon}.png`)}}
                            selectedIcon={{uri:require(`./../../public/images/${v.icon}-active.png`)}}
                            selected={pathname==v.path}
                            onPress={()=>{
                                this.props.history.push(v.path)
                            }}
                        ></TabBar.Item>
                    ))
                }
            </TabBar>
        )
    }
}