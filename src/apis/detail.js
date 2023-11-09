//获取轮播图的接口函数
import request from "@/utils/http";

export function getDetail(id) {
  return request({
    url: "/goods",
    params: {
      id,
    },
  });
}
