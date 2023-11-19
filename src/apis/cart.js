//封装购物车相关接口
import request from "@/utils/http";
//加入购物车接口
export const insetCartAIP = ({ skuId, count }) => {
  return request({
    url: "/member/cart",
    methods: "POST",
    data: { skuId, count },
  });
};
//获取最新的购物车列表
export const findNewCartListAPI = () => {
  return request({
    url: "/member/cart",
  });
};
