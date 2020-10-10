import { createStore } from "vuex";
// Wed Sep 16 2020 14:12:01 GMT+0530 (India Standard Time)
// import axios from "./axios-auth";
// import globalAxios from "axios";
// import router from "./router";

import router from "./router";

export default createStore({
  state: {
    token: null,
    userId: null,
    userName: null,
    role: null,
    productsInCart: [],
  },
  getters: {
    user: (state) => state.user,
    isAuthenticated: (state) => state.userId !== null,
    inCart: (state) => state.productsInCart,
  },
  mutations: {
    authUser(state, data) {
      state.token = data.token;
      state.userId = data.id;
      state.userName = data.name;
      state.role = data.role;
      console.log(state);
    },
    clearAuth(state) {
      state.token = null;
      state.userId = null;
      localStorage.removeItem("token");
      localStorage.removeItem("expirationDate");
      localStorage.removeItem("userId");
      localStorage.removeItem("fullDate");
      localStorage.removeItem("role");
      localStorage.removeItem("userName");
      router.replace({ name: "home" });
      console.log(state);
    },
    addToCart(state, products) {
      localStorage.setItem("products", JSON.stringify(products));
      state.productsInCart = products;
    },
    getFromCart(state) {
      const products = JSON.parse(localStorage.getItem("products"));
      state.productsInCart = products;
    },
  },
  actions: {
    setLogoutTimer({ commit }) {
      const expirationDate = +localStorage.getItem("expirationDate");
      const now = new Date().getTime();
      console.log(now, expirationDate);
      console.log(expirationDate - now);

      setTimeout(() => {
        console.log("logging out");
        commit("clearAuth");
      }, expirationDate - now);
    },
    authUser({ commit, dispatch }, data) {
      commit("authUser", {
        token: data.token,
        id: data.userExist.id,
        name: data.userExist.name,
        role: data.userExist.role,
      });
      localStorage.setItem("userId", data.userExist.id);
      localStorage.setItem("userName", data.userExist.name);
      localStorage.setItem("role", data.userExist.role);
      const now = new Date();
      const expirationDate = now.getTime() + data.expiresIn * 1000;
      const fulldate = new Date(expirationDate);
      localStorage.setItem("token", data.token);
      localStorage.setItem("expirationDate", expirationDate);
      localStorage.setItem("fullDate", fulldate);
      dispatch("setLogoutTimer");

      if (data.userExist.role === "seller") {
        router.push({ name: "seller_dashboard" });
      } else {
        router.push({ name: "buyer_dashboard" });
      }
    },
    tryAutoLogin({ commit, dispatch }) {
      console.log("trying autologin");
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const expirationDate = +localStorage.getItem("expirationDate");
      // const expTime = expirationDate.getTime();
      const now = new Date().getTime();
      console.log(now);
      if (now >= expirationDate) {
        console.log("entering");
        commit("clearAuth");
        return;
      }
      dispatch("setLogoutTimer");

      const userId = localStorage.getItem("userId");
      const userName = localStorage.getItem("userName");
      const userRole = localStorage.getItem("role");
      commit("authUser", {
        token: token,
        id: userId,
        role: userRole,
        name: userName,
      });
    },
    logout({ commit }) {
      console.log("logging out");

      commit("clearAuth");
    },
  },
});
