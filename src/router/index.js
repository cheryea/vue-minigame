import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/pages/HomeView.vue";
import ResponseCheck from "@/pages/ResponseCheck.vue";
import NumberBaseball from "@/pages/NumberBaseball.vue";

const routes = [
  {
    path: "/",
    component: HomeView,
  },
  {
    path: "/responsecheck",
    name: "반응속도테스트",
    component: ResponseCheck,
  },
  {
    path: "/numberbaseball",
    name: "숫자야구",
    component: NumberBaseball,
  },
];

const router = createRouter({
  history: createWebHistory("/vue-minigame/"),
  routes,
});

export default router;
