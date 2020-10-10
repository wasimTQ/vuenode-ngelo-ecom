import { createRouter, createWebHistory } from "vue-router";
// import { useStore } from "vuex";

// const store = useStore();
import store from "./store";

import Home from "./components/Home.vue";

import MainView from "./components/seller/MainView.vue";
import Dashboard from "./components/seller/Dashboard.vue";
import AddProduct from "./components/seller/AddProduct.vue";
import Settings from "./components/seller/Settings.vue";

import BuyerMainView from "./components/buyer/MainView.vue";
import BuyerDashboard from "./components/buyer/Dashboard.vue";

const routerHistory = createWebHistory();

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/seller",
      component: MainView,
      default: Dashboard,
      children: [
        {
          path: "",
          name: "seller_dashboard",
          component: Dashboard,
        },
        {
          path: "addproduct",
          name: "addproduct",
          component: AddProduct,
        },
        {
          path: "settings",
          name: "settings",
          component: Settings,
        },
      ],
      beforeEnter(to, from, next) {
        if (store.state.token && store.state.role === "seller") {
          console.log("going next");
          next();
        } else {
          console.log("cannot going");
          next("/");
        }
      },
    },
    {
      path: "/buyer",
      component: BuyerMainView,
      default: BuyerDashboard,
      children: [
        {
          path: "",
          name: "buyer_dashboard",
          component: BuyerDashboard,
        },
      ],
      beforeEnter(to, from, next) {
        if (store.state.token && store.state.role === "buyer") {
          console.log("going next");
          next();
        } else {
          console.log("cannot going");
          next("/");
        }
      },
    },
  ],
});

export default router;
