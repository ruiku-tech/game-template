let obj = {
  userData: { money: 0.00, testmoney: 0.00, userid: 0, name: "", sex: 0, head: 0, level: 1 },
  roomid: 0, theme: "", net: { state: "" }, 
  rates: null
};

obj.readLogin = function (buffer) {
  let size = buffer.readShort();
  let userid = buffer.readInt();
  let sex = buffer.readByte();
  let auth = buffer.readByte();
  let authtemp = buffer.readByte();
  let head = buffer.readByte();
  let level = buffer.readByte();
  let money = buffer.readDouble();
  let daibi = buffer.readDouble();
  let drawablemoney = buffer.readDouble();
  //测试币
  let testmoney = buffer.readDouble();
  let cexp = buffer.readLong();
  let earns = buffer.readLong();
  let state = buffer.readLong();
  let follows = buffer.readInt();
  let fans = buffer.readInt();
  let nfid = buffer.readByte();
  let videocount = buffer.readInt();
  let picturecount = buffer.readInt();
  let dynamiccount = buffer.readInt();
  let guildid = buffer.readInt();
  let platid = buffer.readShort();
  let did = buffer.readShort();
  let locate = buffer.readInt();
  let lon = buffer.readDouble();
  let lat = buffer.readDouble();
  let geo = buffer.readLong();
  let height = buffer.readShort();
  let weight = buffer.readShort();
  let city = buffer.readShort();
  let regtime = buffer.readLong();
  let viptime = buffer.readLong();
  let advid = buffer.readInt();
  let advcount = buffer.readInt();
  let advreward = buffer.readDouble();
  let cfg = buffer.readInt();
  let tag = buffer.readInt();
  buffer.position += 3 * 2;//3个价格，直接过去
  buffer.position += 8 + 2 + 1 + 8 + 3 * 2 + 4 + 4 + 2 + 2;
  let gameid = buffer.readByte();
  let items = buffer.readByte();
  let pos = buffer.position + items * 5;
  buffer.position = pos;
  let extra = buffer.readShort();
  let name = buffer.readString();
  obj.userData.money = money;
  obj.userData.testmoney = testmoney;
  obj.userData.userid = userid;
  obj.userData.sex = sex;
  obj.userData.head = head;
  obj.userData.level = level;
  obj.userData.name = name;
}

export default obj;