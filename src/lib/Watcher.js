export default class Watcher {
  constructor(){
    this.listener=[]
  }
  on(fun){
    let item = this.listener.find(item=>item.fun===fun)
    if(item) return
    this.listener.push({fun,always:true})
  }
  notify(arg){
    let i=0,len=this.listener.length
    while(i<len){
      let {fun,always} = this.listener[i];
      if(!always){
        this.listener.splice(i,1)
        --len
      }else{
        ++i
      }
      fun(arg)
    }
  }
  once(fun){
    this.listener.push({fun,always:false})
  }
  off(fun){
    let index = this.listener.findIndex(item=>item.fun===fun)
    if(index!==-1){
      this.listener.splice(index,1)
    }
  }
}