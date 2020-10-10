<template>
  <div>
    <div
      @mousedown.prevent="down"
      @mouseleave="leave"
      @mouseup="up"
      @mousemove.prevent="move"
      class="flex scrolling-touch images"
      ref="slider"
    >
      <div class="mr-8" v-for="image in product.images" :key="image">
        <img :src="image" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: Object,
  },
  data() {
    return {
      isDown: false,
      startX: null,
      scrollLeft: null,
    };
  },
  methods: {
    down(e) {
      const slider = document.querySelector(".images");
      this.isDown = true;
      slider.classList.add("active");
      this.startX = e.pageX - slider.offsetLeft;
      this.scrollLeft = slider.scrollLeft;
    },
    leave() {
      const slider = document.querySelector(".images");
      this.isDown = false;
      slider.classList.remove("active");
    },
    up() {
      const slider = document.querySelector(".images");
      this.isDown = false;
      slider.classList.remove("active");
    },
    move(e) {
      const slider = document.querySelector(".images");
      if (!this.isDown) return;
      const x = e.pageX - slider.offsetLeft;
      // console.log(x, this.startX);
      const walk = x - this.startX;
      console.log("first ", slider.scrollLeft);
      slider.scrollLeft = this.scrollLeft - walk;
      console.log("last ", slider.scrollLeft);
    },
  },
};
</script>

<style lang="scss" scoped>
img {
  height: 400px;
  min-width: 600px;
  object-fit: cover;
}
.scrolling-touch {
  &.active {
    cursor: grabbing;
    cursor: -webkit-grabbing;
  }
}
</style>