import { createApp } from "vue";
import "./style.css";
import * as VueRouter from "vue-router";
import routes from "./router/route.ts";
import App from "./App.vue";

const app = createApp(App);

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

app.use(router);
app.mount("#app");
