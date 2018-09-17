import request from "@/utils/request";

export function getCardList() {
  return request({
    url: "/card/getlist",
    method: "post"
  });
}
