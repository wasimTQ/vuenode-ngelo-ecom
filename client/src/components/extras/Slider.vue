<template>
  <!-- <div v-for="(item) in images" :key="item"> -->
  <!-- <img ref="img" class="absolute h-64 w-full object-cover" :src="item" alt /> -->
  <div class="relative h-full z-10">
    <button
      class="button focus:outline-none"
      v-if="images.length > 1"
      @click="back"
    >
      &#10094;
    </button>
    <transition name="slide" @before-enter="beforeEnter">
      <img
        ref="img"
        @click="emitClick"
        @dblclick="emitShowDetails"
        class="h-full object-center bg-center w-full object-cover image"
        :src="currentImg"
        alt
      />
    </transition>
    <button
      class="button focus:outline-none"
      v-if="images.length > 1"
      @click="next"
    >
      &#10095;
    </button>
    <div
      v-if="images.length > 1"
      class="absolute blend bottom-0 z-50 w-full flex items-center justify-center h-10"
    >
      <span
        :class="{ 'h-4 w-4': calculate == i }"
        class="mx-4 bg-secondary bg-opacity-75 cursor-pointer h-2 w-2 rounded-full"
        v-for="i in images.length"
        :key="i"
        @click="jumpImg(i)"
      ></span>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import { TimelineLite, gsap } from "gsap";
export default {
  props: {
    images: Array,
  },
  data() {
    return {
      currIndex: 0,
      calculate: 1,
      tween: new TimelineLite(),
    };
  },
  computed: {
    currentImg() {
      return this.images[Math.abs(this.currIndex) % this.images.length];
    },
  },
  methods: {
    beforeEnter() {
      gsap.to(".image", 0.4, { x: 100 });
    },
    emitClick() {
      this.$emit("img-clicked");
    },
    emitShowDetails() {
      this.$emit("show-detail");
    },
    next() {
      this.jumpAnim();
      this.currIndex += 1;
      this.calcPosition();
    },
    back() {
      this.jumpAnim();
      this.currIndex -= 1;
      this.calcPosition();
    },
    jumpAnim() {
      const img = this.$refs.img;
      gsap.to(img, 0.2, {
        scale: 0.75,
      });
      gsap.to(img, 0.2, {
        scale: 1,
        // onComplete: function () {
        //   this.currIndex += 1;
        // },
      });
    },
    jumpImg(i) {
      this.currIndex = i - 1;
      this.calcPosition();
    },
    calcPosition() {
      this.calculate = (Math.abs(this.currIndex) % this.images.length) + 1;
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  @apply absolute text-black-700  w-10 h-10 duration-200 ease-out rounded-full top-1/2 z-40;
  &:hover {
    @apply bg-black-700 text-pale bg-opacity-100 transform scale-125;
  }
  &:nth-child(1) {
    left: -0.5rem;
  }
  right: -0.5rem;
}
.blend {
  mix-blend-mode: exclusion;
}
</style>
