import "@/styles/common.scss";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { lazyPlugin } from "@/directives";

import App from "./App.vue";
import router from "./router";

//引入全局组件组件
import { componentPlugin } from "@/components";
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(componentPlugin);
app.mount("#app");
app.use(lazyPlugin);
Vue.config.devtools = true;
