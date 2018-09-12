import Mock from "mockjs";
import { param2Obj } from "@/utils";

const List = [];
const count = 1000;

var temp = {
  id: 1,
  typeId: 345,
  cardType: "大王卡",
  name: "王小虎",
  poductId: "76849-01-01-02",
  productName:
    "喷气机：蝙蝠战车空运攻击喷气机：蝙蝠战车空运攻击喷气机：蝙蝠战车空运攻击",
  shopName: "喜盈门",
  integrity: "完整",
  inventory: "已借出"
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
