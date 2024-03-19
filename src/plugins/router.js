import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/user.js";
function auth(to, from) {
  const auth = useAuthStore();
  if (!auth.user) {
    return "/";
  }
}
const routes = [
  {
    path: "/",
    name: "MainPage",
    component: () => import("@/views/MainPage.vue"),
  },
  {
    path: "/profile",
    name: "UserProfile",
    beforeEnter: auth,
    component: () => import("@/views/UserProfile.vue"),
  },
  {
    path: "/infopage/:info",
    name: "infopage",
    component: () => import("@/views/OtherInformation.vue"),
  },
  {
    path: "/lottery/:type",
    name: "lottery",
    beforeEnter: auth,
    component: () => import("@/views/Lottery.vue"),
  },
  {
    path: "/lotto/",
    name: "lotto",
    beforeEnter: auth,
    component: () => import("@/views/LotteryDashboard.vue"),
  },
  {
    path: "/sabong/:type",
    name: "sabong",
    beforeEnter: auth,
    component: () => import("@/views/Sabong.vue"),
  },
  {
    path: "/test",
    name: "test",
    component: () => import("@/views/Test.vue"),
  },
  { path: "/:pathMatch(.*)", component: import("@/views/NotFound404.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
