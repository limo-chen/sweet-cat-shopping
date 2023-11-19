//封装购物车模块
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useUserStore } from "./userStore";
import { insetCartAIP, findNewCartListAPI, deleteCartAPI } from "@/apis/cart";

//第一个参数是模块名cart，第二是回调函数，编写state和action
export const useCartStore = defineStore(
  "cart",
  () => {
    const userStore = useUserStore();
    const isLogin = computed(() => userStore.userInfo.token);

    //定义state，-cartList
    const cartList = ref([]);

    //定义操作cartList的方法-addCart
    const addCart = async (goods) => {
      const { skuId, count } = goods;
      if (isLogin.value) {
        //登录之后的加入购物车逻辑
        //1, 调用insetCartAIP
        await insetCartAIP({ skuId, count });
        getNewCartList();
      } else {
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
      }
    };
    //获取最新购物车列表action
    const getNewCartList = async () => {
      //2，获取最新的购物车列表
      const res = await findNewCartListAPI();
      //用获取到的最新的覆盖本地购物车列表
      cartList.value = res.result;
    };

    //删除购物车
    const delCart = async (skuId) => {
      if (isLogin.value) {
        //调用接口实现接口购物车的删除功能
        await deleteCartAPI([skuId]);
        getNewCartList();
      } else {
        //思路：1，找到要删除项的下标值-splice findIndex用来拿到下标值
        //2，使用数组的过滤方法 -filter
        const idx = cartList.value.findIndex((item) => skuId === item.skuId);
        cartList.value.splice(idx, 1);
      }
    };

    //清除购物车
    const clearCart = () => {
      cartList.value = [];
    };

    //单选功能
    const singleCheck = (skuId, selected) => {
      //通过skuId找到要修改的哪一项，然后把他的selected修改为传过来的selected
      const item = cartList.value.find((item) => item.skuId === skuId);
      item.selected = selected;
    };

    //是否全选 所有项都为true，他才为true
    const isAll = computed(() => cartList.value.every((item) => item.selected));

    //全选功能
    const allCheck = (selected) => {
      //把cartList中的每一项的selected都设置为当前的全选框状态，遍历cartList
      //把item.selected的selected都设置为我们传入的selected
      cartList.value.forEach((item) => (item.selected = selected));
    };

    //计算属性
    //1，总的数量 所有项的count之和
    const allCount = computed(() =>
      cartList.value.reduce((a, c) => a + c.count, 0)
    );
    //2，总价 所有项的count*price之和
    const allPrice = computed(() =>
      cartList.value.reduce((a, c) => a + c.count * c.price, 0)
    );

    //3,已选择数量  先过滤再做累加运算 filter返回的依然是数组，还可以链式调用reduce
    const selectedCount = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((a, c) => a + c.count, 0)
    );

    //4，已选择商品加钱合计
    const selectedPrice = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((a, c) => a + c.count * c.price, 0)
    );

    return {
      selectedCount,
      selectedPrice,
      cartList,
      addCart,
      delCart,
      clearCart,
      allCount,
      allPrice,
      singleCheck,
      isAll,
      allCheck,
    };
  },
  {
    persist: true,
  }
);
