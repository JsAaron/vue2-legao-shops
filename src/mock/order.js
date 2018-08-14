import Mock from "mockjs";
import { param2Obj } from "@/utils";

const List = [];
const count = 1000;

var temp = {
  orderId: "D23491390239E023423-120313", //订单ID
  transactionId: "0000000", //交易ID
  productId: "749234-123-43-41", //产品ID
  plat: "微信支付",
  image: "man.png",
  title: "狐狸喷气机:蝙蝠战车空中攻击", //标题
  cardType: "通用读库皇冠卡", //卡类型
  batch: "第二批", //租借批次
  username: "张三", //用户
  phone: "134879098767", //电话号码
  data: "2018-09-09", //交易日期
  time: "11:34:51", //交易时间
  meney: "329:00", //交易金额
  state: "待发货" //交易状态
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
