import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import 'nprogress/nprogress.css'
import 'antd-mobile/dist/antd-mobile.css'
import './index.css'
import './style/main.css'
import './style/icon.css'
import App from './App'
import { Provider } from 'react-redux'
import reduxCombine from './redex/index.redux'
// import {counter} from './redex/counter.redux'
import { BrowserRouter, Route, Redirect, Switch, Router } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'
import './config'
import Login from './view/login/login'
import Register from './view/register/register'
import Home from './view/home/home'
import Userinfo from './components/uerinfo'
import Chat from './components/chat'
import EditInfo from './components/editinfo'
import Search from './components/search'
import Posting from './view/posting/posting'
import Monents from './view/monents/monents'
import createHistory from 'history/createHashHistory'
import NoMatch from './components/nomatch'
const history = createHistory()
const store = createStore(reduxCombine, applyMiddleware(thunk))
ReactDOM.render(
  (
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Userinfo></Userinfo>
        <Switch>
          <Route exact path='/' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/chat/:userName' component={Chat}></Route>
          <Route path='/editinfo' component={EditInfo}></Route>
          <Route path='/search' component={Search}></Route>
          <Route path='/posting' component={Posting}></Route>
          <Route path='/video' component={Home}></Route>
          <Route path='/message' component={Home}></Route>
          <Route path='/friends' component={Home}></Route>
          <Route path='/me' component={Home}></Route>
          <Route path='/monents' component={Monents}></Route>
          <Route component={NoMatch}></Route>
        </Switch>
      </div>
    </Router>
  </Provider>
  ),
  document.getElementById('root')
)
registerServiceWorker()
