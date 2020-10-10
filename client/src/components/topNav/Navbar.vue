<template>
  <div class="select-none fixed z-50 w-screen font-body text-base">
    <nav class="shadow-md flex items-center py-4 justify-around">
      <div class="text-xl text-pale font-bold">n-Gelo</div>
      <Search />

      <div class="relative" v-if="isLogin">
        <div
          @click="usrClick = !usrClick"
          class="flex cursor-pointer items-center text-pale"
        >
          <span>
            <svg
              class="w-8 h-8 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
          <span>
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </div>
        <transition name="fadeInDown">
          <div
            v-if="usrClick"
            class="absolute right-1 top-3 rounded-lg rounded-tr-none py-2 px-4 w-48 bg-gray-400"
          >
            <ul class="flex flex-col w-full justify-end items-center">
              <li class="text-lg">
                Welcome,
                <span class="font-semibold capitalize">{{ userName }}</span>
              </li>
              <hr class="mt-1 mb-4 w-2/3 border-gray-500" />
              <router-link
                :to="{ name: role + '_dashboard' }"
                tag="li"
                class="bg-red-500 text-pale py-2 px-3 mb-2 cursor-pointer"
                >Go to Dashboard</router-link
              >
              <li class="text-lg text-gray-800 cursor-pointer" @click="logout">
                Logout
              </li>
            </ul>
          </div>
        </transition>
      </div>

      <div v-if="!isLogin" class="flex justify-around">
        <button
          @click="openModal('login')"
          class="rounded-full font-semibold px-6 py-1 text-green-800 focus:outline-none bg-green-300"
        >
          Login
        </button>
        <button
          @click="openModal('register')"
          class="bg-green-400 border-transparent focus:outline-none rounded-full px-5 py-2 text-violet font-semibold ml-6 border-2 hover:text-green-400 hover:border-green-500 ease-in duration-75 hover:bg-transparent"
        >
          Become a Seller
        </button>
      </div>
    </nav>
    <!-- <BottomNav /> -->
  </div>
</template>

<script>
import { useStore } from "vuex";
import Search from "./SearchComponent";
export default {
  props: {
    islogin: Boolean,
  },
  components: {
    // BottomNav,
    Search,
  },
  data() {
    return {
      auth: false,
      usrClick: false,
      store: useStore(),
      userName: "",
      role: "",
    };
  },
  computed: {
    isLogin() {
      console.log("islogin", this.islogin);
      return this.islogin === null ? this.auth : this.islogin;
    },
  },
  watch: {
    islogin(val) {
      console.log(val);
    },
  },
  methods: {
    openModal(name) {
      this.$emit("modal", name);
    },
    checkAuth() {
      console.log("isauth", this.store.getters.isAuthenticated);
      this.auth = this.store.getters.isAuthenticated;
      this.userName = this.store.state.userName;
      this.role = this.store.state.role;
    },
    logout() {
      this.store.dispatch("logout");
      this.auth = false;
      this.$emit("loggedout");
    },
  },
  created() {
    this.checkAuth();
  },
};
</script>

<style scoped>
nav {
  background: rgb(15, 14, 14);
}
</style>
