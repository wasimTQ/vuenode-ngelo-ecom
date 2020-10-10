<template>
  <!-- <div
    class="fixed w-5/12 right-0 top-0 rounded-xl rounded-r-none bg-gradient-to-br from-green-700 via-green-600 to-green-400 h-screen z-50 p-16 text-pale"
  >-->
  <div v-if="products.length === 0">
    <h2 class="text-3xl">Nothing is in the cart</h2>
    <div class="relative mt-10">
      <!-- <button class="uppercase relative z-40 font-semibold text-4xl">
        <span class="relative z-40">Add products</span>
        <span
          class="absolute text-yellow-400 -mt-1 top-1 z-30 left-2 w-full text-left"
          >Add products</span
        >
      </button> -->
      <button
        @click="$emit('close-cart')"
        class="add uppercase relative z-40 font-semibold text-4xl"
      >
        Add products
      </button>
      <span
        class="dash absolute z-0 bottom-2 -mb-6 left-0 bg-red-500 w-40 h-4 duration-300 ea"
      ></span>
    </div>
  </div>
  <div v-else>
    <div
      class="flex justify-between items-center my-4"
      v-for="(product, index) in products"
      :key="product.id"
    >
      <div class="min-w-25">
        <h1 class="font-semibold mb-1">{{ product.prod_name }}</h1>
        <div class="flex justify-between items-center">
          <span
            class="bg-teal-800 text-white px-3 font-semibold text-base py-1 rounded-lg"
            >$ {{ product.price }}</span
          >
          <span class="text-lg text-right">{{ product.sub_category }}</span>
        </div>
      </div>
      <div
        class="bg-red-500 cursor-pointer text-white px-4 py-3 rounded-lg"
        @click="deleteInCart(index)"
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
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </div>
    </div>
  </div>
  <!-- <div
    class="fixed w-5/12 right-0 top-0 rounded-xl rounded-r-none bg-gradient-to-br from-yellow-800 via-yellow-700 to-yellow-600 h-screen z-50"
  ></div>-->
</template>

<script>
export default {
  props: {
    products: Array,
  },
  methods: {
    deleteInCart(i) {
      this.$emit("delete-product", i);
    },
  },
};
</script>

<style lang="scss" scoped>
.add {
  &:hover {
    ~ .dash {
      width: 16rem;
      left: 2rem;
    }
  }
}
</style>

