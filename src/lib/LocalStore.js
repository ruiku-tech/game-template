export default {
    app:"",
    userkey:"",
    init(app){
      this.app=app;
    },
    setUser(userkey){
      this.userkey=userkey
    },
    getItem(key){
        return localStorage.getItem(this.app+this.userkey+"-"+key);
    },
    setItem(key,value){
        localStorage.setItem(this.app+this.userkey+"-"+key,value);
    },
    removeItem(key){
        localStorage.removeItem(this.app+this.userkey+"-"+key);
    },
    gset(key,value){
      localStorage.setItem(this.app+"-"+key,value);
    },
    gget(key){
      return localStorage.getItem(this.app+"-"+key);
    }
}