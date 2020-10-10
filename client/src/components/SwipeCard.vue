<template>
  <div class="relative z-40">
    <img
      class="w-full object-center h-auto object-cover rounded-lg"
      :src="image"
      alt=""
    />
    <div class="bg-transparent h-full w-full absolute top-0 left-0"></div>
  </div>
</template>

<script>
export default {
  props: {
    image: String,
  },
  mounted() {
    console.log(this.$el);
  },
};
</script>

<style lang="scss" scoped>
img {
  height: 410px;
  min-width: 600px;
}
</style>