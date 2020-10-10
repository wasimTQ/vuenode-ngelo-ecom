<template>
  <div class="select-none opacity-0 relative">
    <div
      @click="closeDetail"
      class="fixed top-0 cursor-pointer left-0 bg-blue-500 text-gray-200 px-3 py-1"
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
          d="M15 19l-7-7 7-7"
        ></path>
      </svg>
    </div>
    <!-- <div class="fixed top-0 right-0 z-50">
      <button class="bg-green-600 text-pale px-4 py-2">Live Preview</button>
    </div> -->
    <!-- <swiper
      tag="div"
      class="flex"
      :slides-per-view="3"
      :space-between="50"
      virtual
    >
      <swiper-slide class="w-full" v-for="image in product.images" :key="image">
        <img :src="image" alt="" />
      </swiper-slide>
    </swiper> -->
    <div
      :style="listLength"
      class="flex scrolling-touch select-none images"
      ref="slider"
    >
      <div
        :style="listPosition"
        class="mr-8 w-full duration-300 ease-in-out mb-5"
        v-for="image in product.images"
        :key="image"
      >
        <!-- <div
        class="w-full h-64"
        :style="{ 'background-image': 'url(' + image + ')' }"
      ></div> -->
        <SwipeCard :image="image" />
      </div>
    </div>
    <div class="flex items-center">
      <div>
        <button class="bg-black-700 text-lg text-pale px-4 py-2">
          Live Preview
        </button>
      </div>
      <span class="text-sm opacity-75 text-gray-900 ml-3"
        >by <small class="font-semibold text-base">{{ product.name }}</small> in
        <small class="font-semibold text-base">{{
          product.sub_category
        }}</small>
      </span>
    </div>

    <div class="flex justify-between mt-2">
      <div class="w-2/3">
        <div class="flex items-center justify-between">
          <h1 class="text-3xl font-semibold">{{ product.prod_name }}</h1>
          <h3
            class="text-green-600 h-10 text-lg flex items-center bg-gray-400 rounded-lg px-3 font-semibold"
          >
            $ {{ product.price }}
          </h3>
        </div>

        <p class="text-lg mt-1">{{ product.description }}</p>
      </div>
      <div class="w-1/3 flex justify-end items-start relative">
        <transition name="scaleIn">
          <div
            v-if="showLoginMsg"
            @click="showLogin"
            class="absolute w-full z-50 bottom-5 origin-bottom-right right-0 transform -translate-x-1/2 -translate-y-5 text-black cursor-pointer flex items-center rounded-xl rounded-br-none bg-red-400 px-5 py-3"
          >
            <span class="text-lg">{{ showLoginMsg }}</span>
            <span v-if="isLoginMsg"
              ><svg
                class="w-6 rounded-full h-6 p-1 bg-green-300 transform rotate-180 ml-"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                ></path></svg
            ></span>
          </div>
        </transition>
        <div
          @click="like"
          :class="{ 'bg-gray-400': !liked, 'bg-red-300': liked }"
          class="h-12 w-12 text-gray-800 flex flex-col justify-center items-center rounded-lg rounded-r-none cursor-pointer relative"
        >
          <svg
            class="w-6 h-6"
            :fill="fillcolor"
            :stroke="strokecolor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            ></path>
          </svg>
          <span
            v-if="likeCount > 0"
            class="text-sm absolute top-0 left-0 transform -translate-y-2 -translate-x-2 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-black"
            >{{ likeCount }}
          </span>
        </div>
        <button
          @click="addCart"
          :style="inCart"
          class="flex px-5 py-3 items-center btn w-1/2 justify-center"
        >
          <span
            ><svg
              v-if="!product.isInCart"
              class="w-6 h-6 mr-2 cart-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <svg
              v-else
              class="w-6 h-6 text-white mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              /></svg
          ></span>
          <span ref="text" v-if="!product.isInCart">Add to cart</span>
          <span v-else class="text-green-100 bg-red">In Cart</span>
        </button>
      </div>
    </div>
    <div v-for="file in product.containing_files" :key="file">
      {{ file }}
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import SwipeCard from "./SwipeCard";
import { TimelineMax, Power2 } from "gsap";
import axios from "../axios-auth";

export default {
  props: {
    product: Object,
  },
  components: {
    SwipeCard,
  },
  data() {
    return {
      store: useStore(),
      likeCount: 0,
      currentIndex: 0,
      fillcolor: "none",
      strokecolor: "currentColor",
      liked: false,
      isDown: false,
      showLoginMsg: "",
      isLoginMsg: false,
      touch: {
        startX: 0,
        endX: 0,
      },
    };
  },
  watch: {
    showLoginMsg(val) {
      if (val) {
        setTimeout(() => {
          this.showLoginMsg = "";
        }, 2500);
      }
    },
  },
  computed: {
    inCart() {
      return {
        background: this.product.isInCart ? "#68d391" : "#ecc94b",
        // "border-radius": this.product.isInCart ? "50%" : "0",
      };
    },
    listLength() {
      console.log("length ", this.product.images.length * 70);

      if (this.product.images.length > 1) {
        return { width: this.product.images.length * 70 + "%" };
      } else {
        return {
          width: 90 + "%",
          "margin-left": "4rem",
          // "margin-right": "2rem",
        };
      }
    },
    listPosition() {
      console.log(this.currentIndex);
      return { transform: `translateX(-${this.currentIndex * 80}%)` };
    },
  },
  methods: {
    like() {
      console.log(this.store.getters.isAuthenticated);
      if (!this.store.getters.isAuthenticated) {
        console.log("no id");
        this.showLoginMsg = "Login to your account to like this product";
        this.isLoginMsg = true;
        return;
      } else if (this.store.state.userName === this.product.name) {
        this.showLoginMsg = `You can't like your own product`;
        this.isLoginMsg = false;
        return;
      }

      let liked = {
        productId: this.product.id,
        userId: +this.store.state.userId,
      };
      if (!this.liked) {
        axios
          .post("/products/like", {
            liked,
          })
          .then((res) => {
            if (res.data) {
              this.getLikes();
            }
          });
      } else {
        const userId = this.store.state.userId;
        axios
          .delete(`/products/deletelike/${this.product.id}/${userId}`)
          .then((res) => {
            console.log(res.data);
            this.fillcolor = "none";
            this.strokecolor = "currentColor";
            this.liked = false;
            this.getLikes();
          });
      }
    },
    showLogin() {
      this.closeDetail();
      this.$emit("show-login");
    },
    addCart() {
      console.log(this.product);
      const { text } = this.$refs;
      const tl = new TimelineMax();
      tl.to(".btn", 0.4, {
        ease: Power2.easeInOut,
        backgroundColor: "#68d391",
      })
        .to(text, 0.2, {
          opacity: 0,
        })
        .to(".cart-icon", 0.1, {
          ease: Power2.easeInOut,
          x: 25,
          opacity: 0,
        });
      setTimeout(() => {
        this.$emit("add-cart", this.product, this.product.index);
      }, 800);
    },
    nextIndex() {
      if (this.currentIndex < this.product.images.length - 1)
        this.currentIndex++;
    },
    prevIndex() {
      if (this.currentIndex > 0) this.currentIndex--;
    },
    touchstart(e) {
      console.log("startin");
      console.log(e.clientY);
      if (e.clientY > 450) return;
      this.touch.startX = e.clientX;
      this.touch.endX = 0;
      console.log("starting: ", this.touch);
      this.isDown = true;
    },
    touchmove(e) {
      if (!this.isDown) return;
      this.touch.endX = e.clientX;
      console.log("moving", this.touch);
      this.touchend();
    },
    touchend() {
      if (
        !this.touch.endX ||
        Math.abs(this.touch.endX - this.touch.startX) < 20
      )
        return;
      if (this.touch.endX < this.touch.startX) this.nextIndex();
      else this.prevIndex();
      this.isDown = false;
    },
    closeDetail() {
      this.$emit("close-detail");
    },
    getLikes() {
      const userId = this.store.state.userId;
      axios
        .get(`/products/getlikes/${this.product.id}/${userId}`)
        .then((res) => {
          console.log(res.data);
          this.likeCount = res.data.likesCount[0][0].count;
          let likedUserId;
          if (!res.data.userLikes[0][0]) return;
          likedUserId = res.data.userLikes[0][0].user_id;
          console.log(likedUserId, userId);
          if (likedUserId === +userId) {
            console.log("same user");
            this.fillcolor = "#e53e3e";
            this.strokecolor = "#e53e3e";
            this.liked = true;
          }
        });
    },
  },
  mounted() {
    console.log("main el ", this.$el);
    setTimeout(() => {
      const body = document.querySelector(".opacity-0");
      body.style.opacity = "1";
    }, 300);
    console.log(
      `Product length: ${this.product.images.length} Index: ${this.currentIndex}`
    );
    this.$el.addEventListener("click", () => console.log("clicked"));
    this.$el.addEventListener("mousedown", (event) => this.touchstart(event));
    this.$el.addEventListener("mousemove", (event) => this.touchmove(event));
    this.$el.addEventListener("mouseleave", () => this.touchend());
    this.$el.addEventListener("mouseup", () => {
      this.isDown = false;
    });
    this.getLikes();
  },
  beforeUnmount() {
    const body = document.querySelector(".opacity-0");
    body.style.opacity = "0";
  },
};
</script>

<style lang="scss" scoped>
.scaleIn-enter-from,
.scaleIn-leave-to {
  opacity: 0;
}

.scaleIn-enter-active,
.scaleIn-leave-active {
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.h-10 {
  height: 2.25rem;
}
.w-110 {
  width: 120%;
}
img {
  height: 300px;
  min-width: 600px;
  object-fit: cover;
}
.scrolling-touch {
  cursor: grabbing;
  cursor: -webkit-grabbing;
}
</style>
