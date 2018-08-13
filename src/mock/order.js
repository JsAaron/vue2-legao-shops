import Mock from "mockjs";
import { param2Obj } from "@/utils";

const List = [];
const count = 100;

var temp = {
  shop: {
    id: "D23491390239E023423-120313",
    plat: "微信支付",
    unique: "0000000",
    img: "aaa.png",
    name: "狐狸喷气机:蝙蝠战车空中攻击",
    number: "749234-123-43-41"
  },
  buyer: {
    name: "张三",
    tel: "134879098767"
  },
  time: {
    data: "2018-09-09",
    time: "11:34:51"
  },
  meney: "329:00",
  state: "待发货"
};

for (let i = 1; i < count; i++) {
  var data = Object.assign({}, temp);
  data.id = i;
  List.push(Mock.mock(data));
}

export default {
  getList: config => {
    const { page = 1, limit = 20 } = param2Obj(config.url);

    let pageList = [];
    pageList = List.filter(function(item, index) {
      if (index < limit * page && index >= limit * (page - 1)) {
        return true;
      }
    });
    return { total: List.length, items: pageList };
  }
};
