<template>
  <div>
    <div
      class="fixed h-screen m-0 p-0 flex flex-col w-1/12 bg-secondary justify-evenly justify-items-center items-center top-0 left-0 shadow-inner"
    >
      <Sidebar />
    </div>
    <div
      class="overflow-x-hidden px-6 py-4 ml-auto w-11/12 bg-black-700 text-pale min-h-screen h-full"
    >
      <!-- <div class="text-xl font-bold justify-items-center px-64">n-Gelo</div> -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Sidebar from "./Sidebar";
export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      auth: false,
      usrClick: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.input {
  @apply bg-black-700 bg-opacity-25 border-black;
}
.label {
  @apply bg-black-700 text-gray-300;
}
.bg-black {
  background: rgb(15, 14, 14);
}
</style>

