<template>
  <div id="root" class="font-body">
    <router-view />
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  created() {
    const store = useStore();
    store.dispatch("tryAutoLogin");
    console.log(store.state.userId);
  },
};
</script>

