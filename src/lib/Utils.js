function RandomSelect(options,count){
    let result=[];
    while(count>0){
        --count;
        let r=Math.floor(Math.random()*options.length);
        result.push(options[r]);
        options.splice(r,1);
    }
    return result;
}
/**
 * 将毫秒时间戳转换为 yy-MM-dd格式
 * @param {Date} time number 时间戳
 * @param {String} char string 间隔字符如:-
 * @returns string 返回字符串
 */
 function date2yymmdd(time,char){
    let month=time.getMonth()+1;
    let day=time.getDate();
    return time.getFullYear()+char+(month<10?"0"+month:month)+char+(day<10?"0"+day:day);
}
/**
 * 将毫秒时间戳转换为 yy-MM-dd hh:mm:ss格式
 * @param {Date} time number 时间戳
 * @param {String} char1 string 第一个间隔字符如:"-"
 * @param {String} char2 string 第二个间隔字符如:":"
 * @returns string 返回字符串
 */
 function date2datetime(time,char1,char2){
    let month=time.getMonth()+1;
    let day=time.getDate();
    let hours=time.getHours();
    let minutes=time.getMinutes();
    let second=time.getSeconds();
    return time.getFullYear()+char1+(month<10?"0"+month:month)+char1
    +(day<10?"0"+day:day)+" "+(hours<10?"0"+hours:hours)+char2
    +(minutes<10?"0"+minutes:minutes)+char2+(second<10?"0"+second:second);
}
function date2mmdd(time,char){
  let month=time.getMonth()+1;
  let day=time.getDate();
  return (month<10?"0"+month:month)+char+(day<10?"0"+day:day);
}
function date2HM(time,char){
  let h=time.getHours()
  let m=time.getMinutes()
  return `${h<10?"0"+h:h}${char}${m<10?"0"+m:m}`
}
function formatNumber(v){
	if(v<10000) return v;
	if(v<10000000) return v/1000+"K";
	return v/1000000+"M";
}
function stringformat(fmt,values){
    for(let i=values.length-1;i>=0;--i){
        let reg = new RegExp("%"+i,'g');
        fmt=fmt.replace(reg,values[i]);
    }
    return fmt;
}
function getQuery(variable) {
	let index = window.location.href.indexOf("?");
	if (index == -1) return "";
	var query = window.location.href.substring(1 + index);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
	  var pair = vars[i].split("=");
	  if (pair[0] == variable) {
		return pair[1];
	  }
	}
	return "";
}
function layoutBox(box,column){
    if(!box) return false;
  let boxWidth=box.offsetWidth;
  if(!boxWidth) return false;
  let boxHeight=box.offsetHeight;
  if(!boxHeight) return false;
  let count=box.childNodes.length;
  if(count<1) return false;
  let w=box.childNodes[0].offsetWidth,h=box.childNodes[0].offsetHeight;
  if(!w || !h) return false;
  let spx=(boxWidth-w*column)/(column+1);
  let rows=Math.floor((count-1)/column)+1;
  let spy=(boxHeight-h*rows)/(rows+1);
  for(let i=0;i<count;++i){
    let item=box.childNodes[i];
    let x=i%column;
    let y=Math.floor(i/column);
    item.style.left=Math.floor(spx+(spx+w)*x)+"px";
    item.style.top=Math.floor(spy+(spy+h)*y)+"px";
  }
  return true;
}
/**
 * 转换数值为显示方式
 * @param {Number} v 
 * @param {*} cfg 
 */
 function displayNumber(v,cfg){
    if(v<cfg.rate) return v;
    let temp=v/cfg.rate,index=0;
    while(temp>cfg.rate){
        temp/=cfg.rate;
        ++index;
    }
    if((temp*10)%1==0)
        return temp+cfg.units[index];
    return temp.toFixed(2)+cfg.units[index];
}
function randomInt(min,max,count){
    let range=max-min;
    let pool=[],result=[];
    for(let i=0;i<range;++i)
        pool.push(i);
    for(let i=0;i<count;++i){
        let v=Math.floor(Math.random()*range);
        result.push(pool[v]+min);
        --range;
        pool.splice(v,1);
    }
    return result;
}
function freezeArray(arr){
    for(let i=0,len=arr.length;i<len;++i){
        arr[i]=Object.freeze(arr[i]);
    }
    return arr;
}
const offsetGMT = new Date().getTimezoneOffset()
function time2zone(time,zone){
  return time-(offsetGMT+zone*60)*60*1000
}
function combineFilter(pipe,fun){
  if(!pipe) return fun
  return function(...args){
    if(pipe(...args)) return true
    return fun(...args)
  }
}
export default {
    RandomSelect,formatNumber,stringformat,
	getQuery,date2yymmdd,date2datetime,layoutBox
    ,displayNumber,randomInt,freezeArray,time2zone
    ,date2HM,date2mmdd,combineFilter
}