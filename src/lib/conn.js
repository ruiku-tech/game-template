import Socket from './socket'
import FrameDefine from './FrameDefine'
import globalData from './globalData'
import XBuffer from "./XBuffer";
import LocalStore from './LocalStore';
let conn = {};
let reqlist = [];
let reqdict = {};
let timer = 0;
let _games = {};
let _isLogin = false;
let _cache = new XBuffer(1024 * 5);
let _userid, _password, _plateid;
let _connectCallBack = null;
let _errCallback = null;
let _loginCallback = null;
conn.socket = new Socket(onMessage, onVerify, onClose, onReconnect);

function onMessage(buffer) {
  let cmd = buffer.readByte();
  let msgid = buffer.readInt();
  let result = null;
  switch (cmd) {
    case FrameDefine.LGS_SC_CMD.LGS_SC_LOGIN:
      {
        if (buffer.avilength >= 4)
          buffer.readInt();
        let err = buffer.avilength > 0 ? buffer.readByte() : 0;
        if (err != 0) {
          console.log("登录失败");
          //登录失败
          return;
        }
        globalData.readLogin(buffer);
        console.log("登录成功" + globalData.userData.name);
        LocalStore.setUser(globalData.userData.userid)
        _loginCallback && _loginCallback()
        onLogin();
      }
      break;
    case FrameDefine.LGS_SC_CMD.LGS_SC_LOGOUT:
      {
        _isLogin = false;
      }
      break;
    case FrameDefine.LGS_SC_CMD.LGS_SC_JOINGAME:
      {
        let gameid = buffer.readByte();
        let err = buffer.readByte();
        if (err != 0) {
          console.log("加入游戏" + gameid + "失败:" + err);
        } else {
          let game = _games[gameid];
          if (game)
            game.onJoinGame();
          
          onJoinGame(gameid)
        }
      }
      break;
    case FrameDefine.LGS_SC_CMD.LGS_SC_LEAVEGAME:
      {
        let gameid = buffer.readByte();
        console.log("退出游戏" + gameid);
        let err = buffer.readByte();
        let game = _games[gameid];
        if (game) {
          delete _games[game.gameid];
          game.onLeaveGame();
        }
      }
      break;
    case FrameDefine.LGS_SC_CMD.LGS_SC_GAME:
      {
        let gameid = buffer.readByte();
        let game = _games[gameid];
        if (game)
          result = game.onData(buffer,msgid);
      }
      break;
    case FrameDefine.LGS_SC_CMD.LGS_SC_MEXCHANGE:
      {

      }
      break;
    case FrameDefine.LGS_SC_CMD.LGS_SC_MC:
      {
        let type = buffer.readByte();
        let money = buffer.readDouble();
        if (type == 0) {
          globalData.userData.money = money;
        } else if (type == 3) {
          globalData.userData.testmoney = money;
        }
      }
      break;
  }
  let obj = reqdict[msgid];
  if (obj) {
    let index = reqlist.indexOf(msgid);
    if (index != -1)
      reqlist.splice(index, 1);
    if (obj.success != null)
      obj.success(result);
    delete reqdict[msgid];
  }
}
function onVerify() {
  loginReq();
  if (_connectCallBack != null)
    _connectCallBack();
  _connectCallBack = null;
}
function onClose() {
  _isLogin = false;
  if (_errCallback != null)
    _errCallback();
  let gameArr = Object.values(_games);
  for (let i = 0; i < gameArr.length; ++i) {
    if (gameArr[i].onDisconnect)
      gameArr[i].onDisconnect();
  }
}
function onReconnect() {

}
function update() {
  timer = Date.now();
  while (reqlist.length > 0) {
    let msgid = reqlist[0];
    let obj = reqdict[msgid];
    if (timer - obj.time > 3000) {
      delete reqdict[msgid];
      reqlist.shift();
      if (obj.failed != null)
        obj.failed();
    } else {
      break;
    }
  }
}

conn.init = function (url, userid, password, plateid, onConnected, onError,onLogin) {
  conn.socket.connect(url);
  _userid = userid;
  _password = password;
  _plateid = plateid;
  _connectCallBack = onConnected;
  _errCallback = onError;
  _loginCallback = onLogin
  timer = Date.now();
  setInterval(update, 100);
}

conn.send = function (data) {
  conn.socket.send(data);
}
conn.request = function (obj) {
  reqlist.push(obj.msgid);
  reqdict[obj.msgid] = obj;
  obj.time = timer;
  conn.socket.send(obj.data);
}

conn.joinGame = function (game) {
  if (_games[game.gameid]) {
    //!!!!!!!!游戏已经加入，重复加入
    return;
  }
  _games[game.gameid] = game;
  if (_isLogin) {
    joinGameReq(game.gameid);   //登录游戏id
  }
}
conn.exitGame = function (game) {
  if (game.isJoin) {
    exitGameReq(game.gameid);
  }
}
var MSGID = 0;
conn.getMsgId = function () {
  return ++MSGID;
}

conn.cache = _cache;

function loginReq() {
  _cache.writeByte(FrameDefine.LGS_CS_CMD.LGS_CS_LOGIN);
  _cache.writeInt(0);
  _cache.writeInt(_userid);
  _cache.writeLenString(_password, 32);
  _cache.writeShort(_plateid);
  _cache.writeShort(0);
  _cache.writeInt(0);
  _cache.writeDouble(0);
  _cache.writeDouble(0);
  _cache.writeShort(0);
  _cache.writeShort(1);
  conn.socket.send(_cache.buffer.subarray(0, _cache.length));
  _cache.clear();
}
function joinGameReq(gameid) {
  let msgid = conn.getMsgId();
  _cache.writeByte(FrameDefine.LGS_CS_CMD.LGS_CS_JOINGAME);
  _cache.writeInt(msgid);
  _cache.writeByte(gameid);
  let data = _cache.export();
  _cache.clear();
  conn.request({
    msgid,
    data,
    failed: joinGameReq.bind(null, gameid)
  });
}
function exitGameReq(gameid) {
  let msgid = conn.getMsgId();
  _cache.writeByte(FrameDefine.LGS_CS_CMD.LGS_CS_LEAVEGAME);
  _cache.writeInt(msgid);
  _cache.writeByte(gameid);
  _cache.writeByte(0);
  let data = _cache.export();
  _cache.clear();

  conn.request({
    msgid,
    data,
    failed: function () {
      let game = _games[gameid];
      if (game) {
        delete _games[game.gameid];
        game.onLeaveGame();
      }
    }
  });
}

function onLogin() {
  let len = reqlist.length;
  for (let i = 0; i < len; ++i) {
    let obj = reqdict[reqlist[i]];
    if(!obj.gameid)
      conn.socket.send(obj.data); //重发
  }
  _isLogin = true;
  let gameArr = Object.values(_games);
  for (let i = 0; i < gameArr.length; ++i) {
    joinGameReq(gameArr[i].gameid);
  }
}

function onJoinGame(gameid){
  let len = reqlist.length;
  for (let i = 0; i < len; ++i) {
    let obj = reqdict[reqlist[i]];
    if(obj.gameid===gameid)
      conn.socket.send(obj.data); //重发
  }
}
export default conn;