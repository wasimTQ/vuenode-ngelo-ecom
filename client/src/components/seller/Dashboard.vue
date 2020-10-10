<template>
  <div>
    <h1 class="dashboard-heading">Dashboard</h1>

    <div class>
      <div
        class="flex my-5 gap-10 py-4 px-12 min-h-25 bg-black rounded-lg shadow-inner bg-opacity-25"
        v-for="(product, index) in products"
        :key="product.id"
      >
        <div
          class="relative h-64 w-4/12 rounded-lg shadow items-start overflow-hidden"
        >
          <Slider :images="images[index]" />
        </div>

        <div class="w-6/12 my-4 flex flex-col justify-between">
          <div>
            <span class="text-xs text-gray-600 uppercase"
              >Created At: {{ product.created_at }}</span
            >
            <div class="flex items-center font-semibold justify-between mb-2">
              <h1 class="capitalize">{{ product.prod_name }}</h1>
              <span class="bg-black-700 px-3 py-1 rounded-lg text-green-400"
                >$ {{ product.price }}</span
              >
            </div>
            <p>
              {{ product.description }} Lorem ipsum dolor, sit amet consectetur
              adipisicing elit. Error fugit quia officia possimus perferendis
              aspernatur temporib?
            </p>
          </div>
          <div class="text-xs flex flex-wrap gap-x-4 gap-y-2">
            <div v-for="item in product.tags" :key="item">
              <span class="px-3 py-1 rounded-full bg-violet">{{ item }}</span>
            </div>
          </div>
        </div>

        <div class="w-2/12 flex flex-col items-center justify-center gap-y-5">
          <button class="primary">Edit</button>
          <button
            @click="deleteModal(product.id)"
            class="text-red-500 flex justify-between items-center"
          >
            <span>
              <svg
                class="w-4 h-4 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </span>
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="showModal"
    class="fixed top-0 bg-black-700 bg-opacity-75 w-full h-screen z-40"
  ></div>
  <transition name="scaleUp">
    <div
      v-if="showModal"
      class="fixed rounded-lg z-50 py-6 px-12 w-1/2 bg-blue-200 text-black-700 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <h2 class="text-blue-800 font-semibold">
        Why are you deleting this product?
      </h2>
      <hr class="bg-blue-400 my-3 w-1/3" />
      <ul>
        <li>
          If it doesn't bring you traffic and sales,
          <span class="font-semibold"
            >Improve your SEO and just wait a bit more</span
          >
        </li>
        <li>
          If you are having a problem,
          <span class="font-semibold">Contact Us</span>
        </li>
      </ul>
      <div class="mt-6 text-right">
        <button
          @click="showModal = false"
          class="bg-blue-600 mr-4 text-white px-4 py-2"
        >
          No, I don't want to delete it
        </button>
        <button
          @click="deleteProduct"
          class="bg-red-200 px-4 py-2 text-red-500"
        >
          Sure, Delete it
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
import Slider from "../extras/Slider";
import axios from "../../axios-auth";
import { useStore } from "vuex";

export default {
  components: {
    Slider,
  },
  data() {
    return {
      store: useStore(),
      showModal: false,
      productToDelete: null,
      products: [],
      images: [],
    };
  },
  methods: {
    fetchProductsByUserId() {
      let id = this.store.state.userId;
      let pics = [];
      axios
        .get(`/products/${id}`)
        .then((res) => {
          console.log(res);
          this.products = res.data;
          this.products.forEach((product) => {
            product.preview_images.forEach((img) => {
              let pic = require("../../../static/" + img);
              pics.push(pic);
            });
            this.images.push(pics);
            pics = [];
          });
        })
        .catch((err) => console.log(err));
    },
    deleteModal(i) {
      this.showModal = true;
      this.productToDelete = i;
      console.log(this.productToDelete);
    },
    deleteProduct() {
      axios.delete(`/products/delete/${this.productToDelete}`).then((res) => {
        console.log(res);
        if (res.data) {
          this.showModal = false;
          this.fetchProductsByUserId();
        }
      });
    },
  },
  mounted() {
    this.fetchProductsByUserId();
  },
};
</script>

<style lang="scss" scoped>
.flex {
  button {
    @apply uppercase;
    &.primary {
      @apply bg-green-400 text-black-700 font-bold text-lg py-2 rounded-lg px-5;
    }
  }
}
.shadow-md {
  box-shadow: 0px 3px 3px rgba($color: #dbdbdb, $alpha: 0.1),
    inset 0px 1px -3px rgba($color: #000000, $alpha: 0.5);
}

.scaleUp-enter-from,
.scaleUp-leave-to {
  transform: scale(0.1);
  opacity: 0;
  // width: 0;
  // height: 0;
}

.scaleUp-enter-active,
.scaleUp-leave-active {
  transform-origin: center;
  transition: all 0.5s ease;
}
</style>

