//封装分类数据相关的代码
import { ref, onMounted } from "vue";
import { getCategoryAPI } from "@/apis/category";
import { onBeforeRouteUpdate } from "vue-router";
import { useRoute } from "vue-router";
export function useCategory() {
  //获取初始数据
  const categoryData = ref({});
  const route = useRoute();
  //这里的id默认给route.params.id
  const getCategory = async (id = route.params.id) => {
    const res = await getCategoryAPI(id);
    categoryData.value = res.result;
  };
  onMounted(() => getCategory());
  onBeforeRouteUpdate((to) => {
    getCategory(to.params.id);
  });
  return { categoryData };
}
