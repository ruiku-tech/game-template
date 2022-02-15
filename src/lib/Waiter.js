export default class Waiter{
  constructor(){
    this.listener=[]
    this.state=0
  }
  wait(fun){
    if(this.state===1){
      return fun()
    }
    this.listener.push(fun)
  }
  resolve(){
    this.state=1
    while(this.listener.length){
      let list=this.listener
      this.listener=[]
      for(let i=0,len=list.length;i<len;++i){
        list[i]()
      }
    }
  }
  reset(){
    this.state=0
  }
}