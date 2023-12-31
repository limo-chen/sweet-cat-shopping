//管理用户数据相关
import { defineStore } from "pinia";
import { loginAPI } from "@/apis/user";
import { ref } from "vue";
import { useCartStore } from "./cartStore";
import { margeCartAPI } from "@/apis/cart";
//接受两个参数，一个是模块名，一个是回调函数，返回值依然是一个方法useUserStore
export const useUserStore = defineStore(
  "user",
  () => {
    const cartStore = useCartStore();
    //1，定义管理用户数据的state
    const userInfo = ref([]);
    //2, 定义获取接口数据的action函数
    const getUserInfo = async ({ account, password }) => {
      const res = await loginAPI({ account, password });
      userInfo.value = res.result;

      //合并购物车的操作
      await margeCartAPI(
        cartStore.cartList.map((item) => {
          return {
            skuId: item.skuId,
            selected: item.selected,
            count: item.count,
          };
        })
      );
      cartStore.getNewCartList();
    };
    //退出时清除用户数据
    const clearUserInfo = () => {
      userInfo.value = {};
      //执行清除购物车的action函数
      cartStore.clearCart();
    };

    //3，以对象格式把state和action return出去
    return {
      userInfo,
      getUserInfo,
      clearUserInfo,
    };
  },
  {
    persist: true,
  }
);

// 接下来在组件中只需要触发getUserInfo，getUserInfo一触发，接口就调用了，接口调用了，数据就存在userInfo中了
