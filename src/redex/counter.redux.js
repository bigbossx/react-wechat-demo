const ADD_NUM='ADD_NUM'
const MINS_NUM='MINS_NUM'

//reducer
export function counter(state=0,action){
    switch (action.type){
      case ADD_NUM:
        return state+1
      case MINS_NUM:
        return state-1
      default :
        return state=10
    }
}
//action creator
export function add(){
    return {
        type:'ADD_NUM'
    }
}
export function del(){
    return {
        type:'MINS_NUM'
    }
}
export function addAsync(){
    return dispatch=>{
        setTimeout(()=>{
            dispatch(add())
        },2000)
    }
}