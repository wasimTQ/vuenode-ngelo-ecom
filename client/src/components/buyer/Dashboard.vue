<template>
<div>
    <h1 class="dashboard-heading">Dashboard</h1>

  <div class="flex gap-x-4">
    <div class="mt-8 w-7/12">
    <h2>Products bought</h2>
    <div class="w-24 rounded-full mb-4 h-p5 bg-green-500"></div>

    <div class="flex justify-between items-center bg-black bg-opacity-50 p-5 my-2 rounded-lg" v-for="(item, index) in bought" :key="item.id">
      <img class="w-32 h-32" :src="boughtProductImages[index]" alt="">
      <div>
        <h3 class="text-lg capitalize">{{ item.prod_name }}</h3>
      </div>
      <div>
        <a :href="'../../../static/'+item.main_file" download class="bg-red-500 font-semibold rounded-lg px-5 py-3">Download</a>
      </div>
    </div>
  </div>

  <div class="mt-8 w-5/12"> 
    <h2>Liked Products</h2>
    <div class="w-24 rounded-full h-p5 mb-4 bg-green-500"></div>

    <div class="mt-4 bg-black bg-opacity-25 rounded-lg p-5 grid gap-x-4 overflow-scroll overflow-x-hidden  grid-cols-1 h-large">
      <div class="my-4"  v-for="(item, index) in productsLiked" :key="item.id">
        <img class="h-56 object-cover" :src="likedProductImages[index]" alt="">
        <h3 class="capitalize text-lg mt-2 mb-2">{{ item.prod_name }}</h3>
        <span class="bg-black-700 rounded-lg px-4 py-2">$ {{item.price}} </span>
      </div>

    </div>
  </div>
  </div>
</div>
</template>

<script>
import axios from "../../axios-auth";
import { useStore } from "vuex";

export default {
  data() {
    return {
      store: useStore(),
      productsLiked: [],
      likedProductImages: [],
      bought: [],
      boughtProductImages: []
    };
  },
  created() {
    this.productsBought()
    this.likedProducts()
  },
  methods: {
    productsBought(){
      axios
      .get(`/products/bought/${this.store.state.userId}`)
      .then((res) => {
        this.bought = res.data[0];
        this.bought.forEach(prod=>{
          let pic = require("../../../static/" + prod.preview_images[0]);
          this.boughtProductImages.push(pic)
        })
      });
    },
    likedProducts() {
      axios
      .get(`/products/likedproducts/${this.store.state.userId}`)
      .then((res) => {
        this.productsLiked = res.data[0];
        let pics = []


        this.productsLiked.forEach((product) => {
            
              let pic = require("../../../static/" + product.preview_images[0]);
              pics.push(pic);

          });
          this.likedProductImages = pics
        console.log(this.productsLiked);
      });
    },

  },
};
</script>

<style lang="scss" scoped>
.h-p5{
  height: .15rem;
}
</style>