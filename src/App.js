import React, { Component } from 'react';
import logo from './logo.svg';
import {createStore} from 'redux'
import {connect} from 'react-redux'
import {Button} from 'antd-mobile'
import {add,del,addAsync} from './redex/counter.redux'
import './App.css';
//示例计数器
// function counter(state=0,action){
//   switch (action.type){
//     case 'add':
//       return state+1
//     case 'del':
//       return state-1
//     default :
//       return state=10
//   }
// }
// const store=createStore(counter)
// function listener(){
//   const current=store.getState();
//   console.log(`当前counter值为${current}`)
// }
// store.subscribe(listener)
// store.dispatch({type:'add'})
// store.dispatch({type:'del'})


//使用@修饰器，使connect的写法更加简洁
// const mapStateToProps= (state) =>{
//   return {num:state}
// }
// const actionCreators={add,del,addAsync}
// App=connect()(App)
@connect(
  state=>({num:state}),//你要什么属性添加到props里
  {add,del,addAsync}//你要什么方法添加到props里面，自动dispatch
)
class App extends Component {
  render() {
    const add=this.props.add
    const mins=this.props.del
    const addAsync=this.props.addAsync
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          <h1>现在number为{this.props.num}</h1>
          <button onClick={add}>add</button>
          <button onClick={mins}>mins</button>
          <Button type="primary" onClick={addAsync}>laytime 2s</Button>
        </div>
      </div>
    );
  }
}

export default App;
