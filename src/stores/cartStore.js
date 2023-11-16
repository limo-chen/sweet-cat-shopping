//封装购物车模块
import { defineStore } from "pinia";
import { ref } from "vue";

//第一个参数是模块名cart，第二是回调函数，编写state和action
export const useCartStore = defineStore(
  "cart",
  () => {
    //定义state，-cartList
    const cartList = ref([]);
    //定义操作cartList的方法-addCart
    const addCart = (goods) => {
      //添加购物车操作
      //已添加过 count+1
      //没有添加过 直接push
      //思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
      const item = cartList.value.find((item) => goods.skuId === item.skuId);
      if (item) {
        //找到了
        item.count++;
      } else {
        //没找到就给当前的list，push一个goods
        cartList.value.push(goods);
      }
    };
    return {
      cartList,
      addCart,
    };
  },
  {
    persist: true,
  }
);
