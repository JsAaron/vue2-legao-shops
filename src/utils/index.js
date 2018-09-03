export function param2Obj(url) {
  const search = url.split("?")[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
}

//扩展状态(-1:送还清点0:可租借,1:门店展示,2:门店拼装)(1:2:分拣,3:4:清洗)
export const extStatus = [
  // { value: -1, label: "送还清点" },
  { value: 0, label: "可租借" },
  { value: 1, label: "门店展示" },
  { value: 2, label: "门店拼装" }
];

//产品完整性状态
export const productStatus = [
  { value: 1, label: "新品" },
  { value: 0, label: "二手" },
  { value: -1, label: "残缺" }
];

//会员状态
export const memberStatus = [
  { value: 2, label: "财务己审" },
  { value: 1, label: "资料己核" },
  { value: -1, label: "无效" },
  { value: "other", label: "未知" }
];

/**
 * 匹配状态
 */
function matchStatus(items, value) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].value == value) {
      return items[i].label;
    }
  }
}

/**
 * 会员状态状态
 * @param} status
 */
export function transformMemberStatuss(status) {
  return matchStatus(memberStatus, status);
}

/**
 * 扩张状态
 * @param} status
 */
export function transformExtStatus(status) {
  return matchStatus(extStatus, status);
}

/**
 * 转化门店状态
 * 是否新品(1:新品,0:二手,-1:残缺)
 */
export function transformProductStatus(status) {
  return matchStatus(productStatus, status);
}

/**
 * 一级 flag
 * 二级 extflag
 */
export const inventoryStatus = [
  {
    label: "清点中",
    value: 0,
    children: [
      { label: "分拣收货", value: 1 },
      { label: "分拣完成", value: 2 },
      { label: "清洗收货", value: 3 },
      { label: "清洗完成", value: 4 }
    ]
  },
  {
    label: "在仓库",
    value: 1,
    children: [
      { label: "会员归还", value: -1 },
      { label: "可租借", value: 0 },
      { label: "门店展示", value: 1 },
      { label: "门店拼装", value: 2 }
    ]
  },
  { label: "已借出", value: -1 },
  // { label: "已出库", value: -9 },
  { label: "发回总部", value: -2 },
  { label: "进货确认", value: 2 }
];

/**
 * 库存状态处理，比较麻烦
 */
function getStockExtState($flag, $extflag) {
  if ($flag == 1) {
    //在仓库
    switch ($extflag) {
      case -1:
        return "会员归还";
        break;
      case 0:
        return "可租借";
        break;
      case 1:
        return "门店展示";
        break;
      case 2:
        return "门店拼装";
        break;
      default:
        return "未知";
        break;
    }
  } else if ($flag == 0) {
    //清点中
    switch ($extflag) {
      case 1:
        return "分拣收货";
        break;
      case 2:
        return "分拣完成";
        break;
      case 3:
        return "清洗收货";
        break;
      case 4:
        return "清洗完成";
        break;
      default:
        return "未知";
        break;
    }
  }
}

function getStockState($flag, $extflag) {
  switch ($flag) {
    case -9:
      return "己出库";
    case -2:
      return "发回总部";
    case -1:
      return "已借出";
    case 0:
      return "清点中-" + getStockExtState($flag, $extflag);
    case 1:
      return "在仓库-" + getStockExtState($flag, $extflag);
    case 2:
      return "进货确认";
    default:
      return "未知";
  }
}

/**
 * 转化库存状态
 * @param {d} flag
 * @param {*} extflag
 */
export function transformInventoryStatus(flag, extflag) {
  return getStockState(Number(flag), Number(extflag));
}
