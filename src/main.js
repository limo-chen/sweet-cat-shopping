import "@/styles/common.scss";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { lazyPlugin } from "@/directives";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";

//引入全局组件组件
import { componentPlugin } from "@/components";
const app = createApp(App);
const pinia = createPinia();
console.log(pinia);
//注册持久化插件
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);
app.use(componentPlugin);
app.mount("#app");
app.use(lazyPlugin);
// Vue.config.devtools = true;
