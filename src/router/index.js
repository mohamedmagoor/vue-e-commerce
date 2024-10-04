import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/products/:category",
    name: "products-category",
    component: () => import("@/views/ProductsCategory"),
  },
  {
    path: "/products/product-details/:productId",
    name: "product-details",
    component: () => import("@/views/ProductDetails"),
  },
  {
    path: "/cart-page",
    name: "cart-page",
    component: () => import("@/views/CartPage"),
  },
  {
    path: "/check-out",
    name: "check-out",
    component: () => import("@/views/CheckOut"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
