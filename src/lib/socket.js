import YBuffer from "./YBuffer";
class Sokect {
  constructor(onmessage, onverify, onclose, onreconnect) {
    this.onMessage = onmessage;
    this.websocket = null;
    this.isOver = false;
    this.onClose = onclose;
    this.onVerify = onverify;
    this.onTrigerReconnect = onreconnect;
    this.buffer = new YBuffer(1024 * 50);
    this.retryDelay = 100;
  }
  connect(url) {
    let that = this;
    this.url = url;
    this.websocket = new WebSocket(url);
    this.websocket.binaryType = "arraybuffer";
    this.websocket.onopen = function (evt) {
      that.retryDelay = 100;
      that.onVerify();
    };
    this.websocket.onclose = function (evt) {
      if (that.onClose) that.onClose();
      that.buffer.clear();
      if (that.isOver) {
        that.websocket = null;
      } else {
        setTimeout(() => { that.reconnect(); }, that.retryDelay);
        that.retryDelay *= 2;
        if (that.retryDelay > 5000) that.retryDelay = 5000;
        that.websocket = null;
      }
    };
    this.websocket.onmessage = function (evt) {
      let data = evt.data;
      that.buffer.pushBuffer(data);
      that.onMessage(that.buffer);
    };
    this.websocket.onerror = function (evt) {

    };
  }
  send(data) {
    if (this.websocket && this.websocket.readyState == WebSocket.OPEN) {
      this.websocket.send(data);
      return true;
    }
    return false;
  }
  close() {
    this.isOver = true;
    this.websocket.close();
  }
  reconnect() {
    if (this.onTrigerReconnect)
      this.onTrigerReconnect();
    else
      console.log("与服务器重连");
    this.connect(this.url);
  }
}
export default Sokect;