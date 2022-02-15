class TimeCounter{
    constructor(gamer,data,formatFun){
        this.gamer=gamer;
        this.data=data;
        this.lastSecond=0;
        this.timer=0;
        this.formatFun=formatFun;
        this.timer=setInterval(this.update.bind(this), 100);
    }
    update(){
        if(!this.gamer.isInited) return;
        let leftSecond = Math.floor((this.gamer.endtime - Date.now()) / 1000);
        if (this.lastSecond == leftSecond) return;
        if(this.lastSecond==0 && leftSecond<=0) return;
        this.lastSecond = leftSecond;
        if (this.lastSecond < 0){
            this.lastSecond=0;
        };
        let munites = Math.floor(this.lastSecond / 60);
        let seconds = this.lastSecond % 60;
        this.data.game.time =
        (munites < 10 ? "0" + munites : munites) +
        ":" +
        (seconds < 10 ? "0" + seconds : seconds);
        if(this.formatFun){
            this.formatFun(this.lastSecond,this.data.game.time);
        }
    }
    clear(){
        clearInterval(this.timer);
        this.timer=0;
        this.gamer=null;
        this.data=null;
    }
}
export default TimeCounter;