//获取轮播图的接口函数
import httpInstance from "@/utils/http";

export function getBannerAPI() {
  return httpInstance({
    url: "/home/banner",
  });
}

//获取新鲜好物
export const findNewAPI = () => {
  return httpInstance({
    url: "/home/new",
  });
};
