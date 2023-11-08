//封装banner轮播图相关的代码
import { ref, onMounted } from "vue";
import { getBannerAPI } from "@/apis/home";
export function useBanner() {
  const bannerList = ref([]);
  const getBanner = async () => {
    const res = await getBannerAPI({
      distributionSite: "2",
    });
    bannerList.value = res.result;
  };
  onMounted(() => getBanner());
  //函数内部把组件中需要用到的数据或者方法return出去
  return { bannerList };
}
