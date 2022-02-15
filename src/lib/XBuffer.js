var iconv = require('iconv-lite');
const INTMAX=Math.pow(2,32);
class XBuffer{
    position;
    buffer;
    length;
    constructor(size){
        this.position=this.length=0;
        this.buffer=Buffer.alloc(size);
    }
    setPosition(pos){
        this.position=pos;
        if(this.position>this.length) this.length=this.position;
    }
    writeByte(v){
        this.buffer.fill(v & 0xff,this.position,this.position+1);
        ++this.position;
        if(this.position>this.length) this.length=this.position;
        //this.buffer.writeInt8(v,this.position);
        //this.position++;
    }
    writeShort(v){
        this.buffer.fill(v & 0xff,this.position,this.position+1);
        ++this.position;
        this.buffer.fill((v >> 8) & 0xff,this.position,this.position+1);
        ++this.position;
        if(this.position>this.length) this.length=this.position;
        //this.buffer.writeInt16LE(v,this.position);
        //this.position+=2;
    }
    writeInt(v){
        this.buffer.fill(v & 0xff,this.position,this.position+1);
        ++this.position;
        this.buffer.fill((v >> 8) & 0xff,this.position,this.position+1);
        ++this.position;
        this.buffer.fill((v >> 16) & 0xff,this.position,this.position+1);
        ++this.position;
        this.buffer.fill((v >> 24) & 0xff,this.position,this.position+1);
        ++this.position;
        if(this.position>this.length) this.length=this.position;
        /*this.buffer.writeInt32LE(v,this.position);
        this.position+=4;*/
    }
    writeLong(v){
        this.buffer.fill(v & 0xff,this.position,this.position+1);
        ++this.position;
        this.buffer.fill((v >> 8) & 0xff,this.position,this.position+1);
        ++this.position;
        this.buffer.fill((v >> 16) & 0xff,this.position,this.position+1);
        ++this.position;
        this.buffer.fill((v >> 24) & 0xff,this.position,this.position+1);
        ++this.position;
        let high=Math.floor(v/INTMAX);
        this.buffer.fill(high & 0xff,this.position,this.position+1);
        ++this.position;
        this.buffer.fill((high >> 8) & 0xff,this.position,this.position+1);
        ++this.position;
        this.buffer.fill((high >> 16) & 0xff,this.position,this.position+1);
        ++this.position;
        this.buffer.fill((high >> 24) & 0xff,this.position,this.position+1);
        ++this.position;
        if(this.position>this.length) this.length=this.position;
        /*this.buffer.writeBigInt64LE(v,this.position);
        this.position+=8;*/
    }
    writeDouble(v){
        this.buffer.writeDoubleLE(v,this.position);
        this.position+=8;
        if(this.position>this.length) this.length=this.position;
    }
    writeFloat(v){
        this.buffer.writeFloatLE(v,this.position);
        this.position+=4;
        if(this.position>this.length) this.length=this.position;
    }
    writeString(v){
        let buf = iconv.encode(v, 'GB18030');
        this.buffer.fill(buf,this.position,this.position+buf.length);
        this.position+=buf.length+1;
        if(this.position>this.length) this.length=this.position;
    }
    writeLenString(v,len){
        let buf = iconv.encode(v, 'GB18030');
        this.buffer.fill(buf,this.position,this.position+len);
        this.position+=len;
        if(this.position>this.length) this.length=this.position;
    }
    clear(){
        this.buffer.fill(0,0,this.buffer.length);
        this.position=this.length=0;
    }
    writeBytes(v){
        this.buffer.fill(v,this.position,this.position+v.length);
        this.position+=v.length;
        if(this.position>this.length) this.length=this.position;
    }
    export(){
        let data=Buffer.from(this.buffer.subarray(0,this.length));
        this.clear();
        return data;
    }
}
export default XBuffer;