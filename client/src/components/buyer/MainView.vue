<template>
  <div>
    <div
      class="fixed w-screen m-0 px-8 py-3 gap-8 flex-col bg-secondary top-0 left-0 shadow-inner"
    >
    <div class="flex w-full justify-between">
      <router-link to="/">
      <h1 class="flex ">n-gelo</h1>
    </router-link>
     <span class="dashboard-sidemenu">
    <svg
      @click="logout"
      class="w-6 h-6 dashboard-sidemenu-icons"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
      />
    </svg>
    <span class="dashboard-sidemenu-items">Log out</span>
  </span>
    </div>
    </div>
    <div
      class="overflow-hidden px-6 py-4 ml-auto w-full bg-black-700 text-pale min-h-screen h-full"
    >
      <!-- <div class="text-xl font-bold justify-items-center px-64">n-Gelo</div> -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      auth: false,
      usrClick: false,
    };
  },
  methods: {
    logout() {
      this.store.dispatch("logout");
    },
  },
};
</script>

<style lang="scss" scoped>

.bg-black {
  background: rgb(15, 14, 14);
}

.dashboard-sidemenu-items {
  /* display: none; */
  mix-blend-mode: difference;
  opacity: 0;
  transition: all 0.5s ease;
}

.dashboard-sidemenu-icons {
  &.active {
    @apply text-secondary bg-violet scale-150;
  }
}

.dashboard-sidemenu-icons:hover + .dashboard-sidemenu-items {
  /* display: block; */
  opacity: 1;
}
</style>

