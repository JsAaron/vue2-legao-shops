import Mock from "mockjs";
import { param2Obj } from "@/utils";

const List = [];
const count = 1000;

var temp = {
  username: "张三", //用户
  phone: "134879098767", //电话号码
  cardType: "通用读库皇冠卡", //卡类型
  startTime: "2018-09-09", //开始时间
  endTime: "2019-09-09", //结束时间
  status: "无效卡" //交易状态
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
