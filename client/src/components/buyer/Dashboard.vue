<template>
  <div>Dashboard</div>

  <div>
    <h2>Liked Products</h2>
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
    };
  },
  created() {
    axios
      .get(`/products/likedproducts/${this.store.state.userId}`)
      .then((res) => {
        this.productsLiked = res.data[0];
        console.log(this.productsLiked);
      });
  },
};
</script>