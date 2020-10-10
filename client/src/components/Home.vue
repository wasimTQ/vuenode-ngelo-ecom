<template>
  <div class="relative bg-black-700 select-none">
    <!-- <div
      id="overlay"
      @click="modalOpen = !modalOpen"
      v-if="modalOpen"
      class="h-screen w-screen bg-black fixed z-10 bg-opacity-75"
    ></div> -->

    <Navbar
      class="z-40"
      @loggedout="loggedIn = null"
      @modal="openModal"
      :islogin="loggedIn"
    />
    <BottomNav :length="inCart.length" @cart-clicked="showCart = true" />

    <div
      class="h-screen fixed w-full bg-black-700 z-50 opacity-75"
      @click="showCart = modalOpen = detComp = false"
      v-if="showCart || modalOpen || detComp"
    ></div>

    <transition name="slidein">
      <div
        class="fixed w-6/12 right-0 top-0 rounded-xl rounded-r-none bg-gradient-to-br from-teal-700 via-teal-500 to-teal-400 h-screen z-50 p-16"
        v-if="showCart"
      >
        <Cart
          @close-cart="showCart = false"
          @delete-product="deleteInCart"
          :products="inCart"
          id="cart"
        />
      </div>
    </transition>
    <div
      class="font-body pointer-events-none w-screen justify-center py-4 rounded-lg border-none fixed z-more px-48"
    >
      <transition name="fadeInDown" appear mode="out-in">
        <Register
          class="pointer-events-auto"
          :authchosen="chosen"
          @userlogged="loggedIn = true"
          v-if="modalOpen"
        />
      </transition>
    </div>
    <div
      class="min-h-screen text-pale px-8 gap-8 pt-48 bg-opacity-100 bg-black-700 flex relative z-30"
    >
      <div
        class="w-1/3 my-3 relative"
        v-for="(product, index) in products"
        :key="product.id"
      >
        <transition name="scaleUp">
          <span
            v-if="showMsg && index == showMsgIndex"
            class="absolute top-0 -mt-5 left-0 bg-red-500 text-secondary px-4 py-2 m-3 rounded-full rounded-bl-none shadow-sm z-40"
            >Double click on the image to open it</span
          >
        </transition>
        <div class="rounded-lg overflow-hidden min-h-25 h-40 relative">
          <div
            :class="{
              'px-4 py-4': product.isInCart,
              'px-5 py-2': !product.isInCart,
            }"
            class="absolute right-0 top-0 bg-yellow-500 text-black-700 cursor-pointer px-5 z-40 py-2 m-2 rounded-lg cartSvg"
            ref="cartSvg"
            @click="addToCart(product, index)"
          >
            <svg
              v-if="!product.isInCart"
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
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <svg
              v-else
              class="w-6 h-6 text-white"
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
              />
            </svg>
          </div>
          <Slider
            @img-clicked="showErr(index)"
            @show-detail="showDetail(index)"
            :images="images[index]"
          />
        </div>
        <div class="my-3 flex justify-between items-center">
          <h2
            @click="showDetail(index)"
            class="font-semibold max-w-xs text-xl capitalize cursor-pointer"
          >
            {{ product.prod_name }}
          </h2>
          <span
            class="bg-black font-bold bg-opacity-25 text-green-400 px-4 py-1 text-lg rounded-lg"
            >$ {{ product.price }}</span
          >
        </div>
        <div>
          <span>
            <small>by</small>
            {{ product.name }}
            <small>in</small>
            {{ product.sub_category }}
          </span>
        </div>
      </div>
    </div>
    <div class="h-screen w-full bg-black-700"></div>

    <transition name="scaleIn">
      <div
        v-if="detComp"
        class="fixed z-50 rounded-lg py-8 px-16 bg-gray-300 detcomp overflow-scroll overflow-x-hidden"
      >
        <DetailComponent
          @show-login="openModal('login')"
          @close-detail="detComp = false"
          @add-cart="addCart"
          :product="selectedProduct"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import Navbar from "@/components/topNav/Navbar";
import BottomNav from "@/components/topNav/BottomNav";

import Register from "@/components/seller/Authentication";
import DetailComponent from "./DetailComponent";
import Cart from "./Cart";
import Slider from "./extras/Slider";
import axios from "../axios-auth";

import { useStore } from "vuex";

import { gsap, Power3 } from "gsap";

export default {
  components: {
    Register,
    Navbar,
    BottomNav,
    Slider,
    DetailComponent,
    Cart,
  },
  data() {
    return {
      store: useStore(),
      selectedProduct: {},
      detComp: false,
      showMsg: false,
      showCart: false,
      showMsgIndex: 0,
      modalOpen: false,
      chosen: "",
      loggedIn: null,
      products: [],
      images: [],
      tags: [],
      inCart: [],
      cartIndex: [],
    };
  },
  watch: {
    showMsg(val) {
      if (val === true) {
        setTimeout(() => {
          this.showMsg = false;
        }, 2000);
      }
    },
    detComp(val) {
      const body = document.querySelector("body");
      if (val === true) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflowY = "scroll";
      }
    },
  },
  computed: {
    inCartStyle(i) {
      return {
        background: this.products[i].isInCart ? "#68d391" : "#ecc94b",
        "border-radius": this.products[i].isInCart ? "50%" : "0",
      };
    },
  },
  created() {
    this.fetchAllProducts();
    this.store.commit("getFromCart");
    this.store.getters.inCart === null
      ? (this.inCart = [])
      : (this.inCart = this.store.getters.inCart);
    console.log(this.inCart);
  },
  updated() {
    console.log("updated");
    const cartSvg = document.querySelectorAll(".cartSvg");
    // console.log("updated: ", cartSvg);
    // console.log(this.cartIndex);
    this.cartIndex.forEach((i) => {
      cartSvg[i].style.backgroundColor = "#68d391";
      cartSvg[i].style.pointerEvents = "none";
      cartSvg[i].style.padding = ".5rem";
      cartSvg[i].style.borderRadius = "50%";
    });
  },
  methods: {
    showDetail(i) {
      this.products[i].images = this.images[i];
      this.selectedProduct = this.products[i];
      this.selectedProduct.index = i;
      this.detComp = true;
    },
    showErr(i) {
      this.showMsg = true;
      this.showMsgIndex = i;
    },
    checkCart() {
      this.inCart.forEach((i) => {
        console.log(i.index);
        let index = i.index;
        this.products[index].isInCart = true;
        this.cartIndex.push(index);
      });
    },
    deleteInCart(ind) {
      const cartSvg = document.querySelectorAll(".cartSvg");
      let i = this.inCart[ind].index;
      this.inCart.splice(ind, 1);
      console.log(i);

      this.products[i].isInCart = false;
      const indexInCart = this.cartIndex.indexOf(i);
      this.cartIndex.splice(indexInCart, 1);
      console.log("single cart svg: ", cartSvg[i]);
      cartSvg[i].style.backgroundColor = "#ecc94b";
      cartSvg[i].style.pointerEvents = "auto";
      cartSvg[i].style.padding = ".5rem";
      cartSvg[i].style.paddingLeft = "1.25rem";
      cartSvg[i].style.paddingRight = "1.25rem";
      cartSvg[i].style.borderRadius = ".5rem";

      this.store.commit("addToCart", this.inCart);
      console.log(this.inCart);
    },
    addToCart(product, i) {
      const cartSvg = document.querySelectorAll(".cartSvg");
      gsap.to(cartSvg[i], 0.35, {
        // paddingTop: "1.25rem",
        // paddingBottom: "1.25rem",
        padding: ".5rem",
        backgroundColor: "#68d391",
        borderRadius: "50%",
        ease: Power3.easeInOut,
        onComplete: function () {
          cartSvg[i].style.pointerEvents = "none";
        },
      });
      console.log(cartSvg);
      setTimeout(() => {
        this.addCart(product, i);
      }, 300);
    },
    addCart(product, i) {
      if (this.products[i].isInCart) return;
      this.inCart.push(product);
      this.products[i].isInCart = true;
      this.products[i].index = i;
      this.cartIndex.push(i);

      this.store.commit("addToCart", this.inCart);
    },
    fetchAllProducts() {
      let pics = [];
      axios
        .get(`/products`)
        .then((res) => {
          this.products = res.data[0];
          this.products.forEach((product) => {
            product.preview_images.forEach((img) => {
              let pic = require("../../static/" + img);
              pics.push(pic);
            });
            this.images.push(pics);
            pics = [];
          });
          this.checkCart();
        })
        .catch((err) => console.log(err));
    },
    openModal(name) {
      console.log("opening modal ", name);
      this.chosen = name;
      console.log(name);
      this.modalOpen = true;
      if (name === "register") {
        this.registerModal = true;
        this.loginModal = false;
      } else {
        this.loginModal = true;
        this.registerModal = false;
      }
    },
    changeModal(name) {
      if (name === "login") {
        this.registerModal = false;
        this.loginModal = true;
      } else {
        this.registerModal = true;
        this.loginModal = false;
      }
    },
  },
};
</script>

<style scoped lang='scss'>
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  width: 15px;
  border: 1px solid rgb(218, 208, 208);
  border-radius: 5px;
  // box-shadow: inset 0 0 1.5px 1px rgba($color: #000000, $alpha: 0.6);
}
::-webkit-scrollbar-thumb {
  border-radius: 30px;
  width: 20px;
  background: linear-gradient(45deg, rgb(17, 16, 16), black);
}
.detcomp {
  width: 90vw;
  height: 90vh;
  top: 50%;
  left: 50%;
  transform-origin: center;
  transform: translate(-50%, -50%);
}
.fadeInDown-enter-from,
.fadeInDown-leave-to {
  transform: translateY(-150px);
  opacity: 0;
}

.fadeInDown-enter-active,
.fadeInDown-leave-active {
  transition: all 0.5s ease;
}
.scaleUp-enter-from,
.scaleUp-leave-to {
  transform-origin: bottom left;
  transform: scale(0);
}

.scaleUp-enter-active,
.scaleUp-leave-active {
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.slidein-enter-active,
.slidein-leave-active {
  transition: transform 0.5s ease;
}
.slidein-enter,
.slidein-enter-from,
.slidein-leave-to {
  transform: translateX(800px);
}
.scaleIn-enter-from,
.scaleIn-leave-to {
  width: 0;
  height: 0;
}

.scaleIn-enter-active,
.scaleIn-leave-active {
  transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.h-40 {
  height: 45vh;
}
.z-more {
  z-index: 1000;
}
</style>
