import FrameDefine from './FrameDefine'
import conn from './conn'
class BaseGame {
  constructor() {
    this.gameid = 0;
    this.isInited = false;
  }
  register(options) {
    this.options = options;
  }
  join() {
    conn.joinGame(this);
  }
  exit() {
    conn.exitGame(this);
    this.isJoin = false;
  }
  send(data) {
    conn.send(data);
  }
  getMsgId() {
    return conn.getMsgId();
  }
  request(obj) {
    obj.gameid=this.gameid
    conn.request(obj);
  }
  shareCache(msgid) {
    let cache = conn.cache;
    cache.writeByte(FrameDefine.LGS_CS_CMD.LGS_CS_GAME);
    cache.writeInt(msgid);
    cache.writeByte(this.gameid);
    return cache;
  }
  onJoinGame() {
    this.isJoin = true;
  }
  onLeaveGame() {

  }
  onData(buffer, msgid) {

  }
  onDisconnect() {

  }
}
export default BaseGame;