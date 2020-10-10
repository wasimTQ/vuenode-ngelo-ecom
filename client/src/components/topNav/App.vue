<template>
  <div>
    <Navbar />
    <div
      class="h-screen mx-auto grid grid-cols-3 pt-40 justify-items-center bg-gray-200"
    >
      <div v-for="item in products" :key="item.id">
        <h1>{{ item.prod_name }}</h1>
        <p>{{ item.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "./components/topNav/Navbar";
export default {
  data() {
    return {
      products: [],
    };
  },
  components: {
    Navbar,
  },
  methods: {
    fetch() {
      axios
        .get("http://localhost:3000/api/products")
        .then((res) => {
          this.products = res.data;
        })
        .catch((err) => console.log(err));
    },
  },
  created() {
    this.fetch();
  },
};
</script>
