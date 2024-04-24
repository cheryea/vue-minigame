import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";

// 전역 scss
require("./assets/css/reset.css");
require("./assets/css/index.css");

createApp(App).use(router).mount("#app");
