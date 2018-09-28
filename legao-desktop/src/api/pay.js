import request from "@/utils/request";

/**
 * 支付接口
 * http://192.168.1.30/api/cardinfo/payment?card_no=1&type=ali&shopid=2&price=1&userid=10&authcode=1111
 */
export function fetchPayment(query) {
  return request({
    url: "cardinfo/payment",
    method: "post",
    params: query
  });
}
