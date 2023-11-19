<script setup>
import LayoutNav from "./components/LayoutNav.vue";
import LayoutHeader from "./components/LayoutHeader.vue";
import LayoutFooter from "./components/LayoutFooter.vue";
import LayoutFixed from "./components/LayoutFixed.vue";

//触发获取导航列表的action
import { useCategoryStore } from "@/stores/categoryStore";
import { onMounted } from "vue";
//通过实例对象调起action函数
const categoryStore = useCategoryStore();
onMounted(() => categoryStore.getCategory());
</script>

<template>
  <LayoutNav />
  <LayoutHeader />
  <!-- 给一个key 强制销毁重建 -->
  <RouterView :key="$route.fullPath" />
  <LayoutFooter />
  <LayoutFixed />
</template>
