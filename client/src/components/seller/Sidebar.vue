<template>
  <span class="dashboard-sidemenu">
    <router-link
      exact
      tag="div"
      class="dashboard-sidemenu-icons"
      exact-active-class="active"
      to="/seller"
    >
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
        />
      </svg>
    </router-link>
    <span class="dashboard-sidemenu-items">Dashboard</span>
  </span>

  <span class="dashboard-sidemenu">
    <router-link
      exact
      tag="div"
      class="dashboard-sidemenu-icons"
      exact-active-class="active"
      to="/seller/addproduct"
    >
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
    </router-link>
    <span class="dashboard-sidemenu-items">Add products</span>
  </span>
  <span class="dashboard-sidemenu">
    <router-link
      exact
      tag="div"
      class="dashboard-sidemenu-icons"
      exact-active-class="active"
      to="/seller/settings"
    >
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    </router-link>
    <span class="dashboard-sidemenu-items">Settings</span>
  </span>
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
</template>

<script>
import { useStore } from "vuex";
export default {
  data() {
    return {
      store: useStore(),
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
