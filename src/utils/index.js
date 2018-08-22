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
  { value: -1, label: "送还清点" },
  { value: 0, label: "可租借" },
  { value: 1, label: "门店展示" },
  { value: 2, label: "门店拼装" }
];

//产品状态,完整性
export const productStatus = [
  { value: 1, label: "新品" },
  { value: 0, label: "二手" },
  { value: -1, label: "残缺" }
];

//存储状态
export const inventoryStatus = [
  { value: -2, label: "门店收货" },
  { value: -1, label: "已借出" },
  { value: 0, label: "清点中" },
  { value: 1, label: "在仓库" },
  { value: -9, label: "已出库" }
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
 * 转化存储状态
 * (-2:门店收货,-1:已借出,0:清点中,1:在仓库)
 */
export function transformInventoryStatus(status) {
  return matchStatus(inventoryStatus, status);
}
