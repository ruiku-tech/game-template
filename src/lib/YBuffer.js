var iconv = require('iconv-lite');
const INTMAX=Math.pow(2,32);
class YBuffer{
    position;
    buffer;
    end;
    constructor(size){
        this.position=0;
        this.end=0;
    }
    pushBuffer(buffer){
        this.buffer=new Uint8Array(buffer);
        this.position=0;
        this.end=this.buffer.byteLength;
    }
    readByte(){
        let result=this.buffer[this.position] & 0xff;
        this.position++;
        return result;
    }
    readChar(){
      let buffer = Buffer.from(this.buffer.subarray(this.position,++this.position))
      let ret=buffer.readInt8(0)
      return ret
    }
    readShort(){
        let result=(this.buffer[this.position] & 0xff) 
            | (this.buffer[this.position+1] & 0xff)<<8;
        this.position+=2;
        return result;
    }
    readWord(){
      let buffer = Buffer.from(this.buffer.subarray(this.position,this.position+2))
      let ret=buffer.readInt16LE(0)
      this.position+=2;
      return ret
    }
    readInt(){
        let result=(this.buffer[this.position] & 0xff) 
        | (this.buffer[this.position+1] & 0xff)<<8
        | (this.buffer[this.position+2] & 0xff)<<16
        | (this.buffer[this.position+3] & 0xff)<<24;
        this.position+=4;
        return result;
    }
    readLong(){
        let low=this.readInt();
        let high=this.readInt();
        return (low >>> 0)+high*INTMAX;
    }
    readDouble(){
        let buf = this.buffer.subarray(this.position,this.position+8);
        let buffer=Buffer.from(buf);
        let result=buffer.readDoubleLE(0);
        this.position+=8;
        return result;
    }
    readFloat(){
        let buf = this.buffer.subarray(this.position,this.position+4);
        let buffer=Buffer.from(buf);
        let result=buffer.readFloatLE(0);
        this.position+=4;
        return result;
    }
    readString(){
        let i=this.position;
        while(this.buffer[i]!=0 && i<this.end){
            ++i;
        }
        let e=i;
        let buf=this.buffer.subarray(this.position,i);
        this.position=e+1;
        return iconv.decode(buf, 'GB18030');
    }
    readBytes(len){
        let result=Buffer.alloc(len);
        this.buffer.copy(result,0,this.position,this.position+len);
        this.position+=len;
        return result;
    }
    clear(){
        this.position=this.end=0;
        if(!this.buffer) return;
        this.buffer.fill(0,0,this.buffer.length);
    }
    get avilength(){
        return this.end-this.position;
    }
}
export default YBuffer;