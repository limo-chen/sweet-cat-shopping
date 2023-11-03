import "@/styles/common.scss";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { getCotegory } from "@/apis/testAPI";
getCotegory().then((res) => {
  console.log(res);
});
const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
