<template>
  <div>

  <!-- <div
    class="fixed w-5/12 right-0 top-0 rounded-xl rounded-r-none bg-gradient-to-br from-green-700 via-green-600 to-green-400 h-screen z-50 p-16 text-pale"
  >-->

  <transition name="scaleUp">
    <div
      class="absolute  bottom-5 mb-5 rounded-br-none right-2 w-10/12 text-right text-white bg-red-500 px-5 py-2 rounded-xl origin-bottom-right"
      v-if="authenticationErr"
    >
      <h2 class="text-lg">
        You need to be authenticated in order to buy products.
        <span class="border-b-2 inline-block">Login Now</span>
      </h2>
    </div>
  </transition>
  <div v-if="products.length === 0">
    <h2 class="text-3xl">Nothing is in the cart</h2>
    <div>
      <img class="transform-flip" src="@/assets/nothing_found.webp" alt="">
    </div>
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
        class="add uppercase relative bg-black-700 px-5 py-2 z-40 font-semibold text-3xl"
      >
        Add products
      </button>
      <!-- <span
        class="dash absolute z-0 bottom-2 -mb-6 left-0 bg-red-500 w-40 h-4 duration-300 ea"
      ></span> -->
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
            class="bg-green-800 text-white px-3 font-semibold text-base py-1 rounded-lg"
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
    <button
      v-if="!isCheckout"
      @click="pay"
      class="fixed bottom-2 right-2 text-2xl uppercase px-5 py-3 bg-black text-green-300"
    >
      Checkout
    </button>

    <div v-show="isCheckout" class="mt-8">
      <div class="bg-gray-200 px-4 py-2 card-element text-white" ref="card"></div>
      <button
        class="bg-blue-700 mt-4 px-4 py-2 rounded-lg"
        @click="submitPayment"
      >
        Purchase
      </button>
    </div>
  </div>

  <!-- <div
    class="fixed w-5/12 right-0 top-0 rounded-xl rounded-r-none bg-gradient-to-br from-yellow-800 via-yellow-700 to-yellow-600 h-screen z-50"
  ></div>-->
  </div>
</template>

<script>
import axios from "../axios-auth";
import { useStore } from "vuex";

var stripe = window.Stripe(
  "pk_test_51HduWsKsRbt0ZWXinIbpKzoELnMhVziyUp8M63ekxEe4v0OtjhE8F1gv8x3JNfXHulTl0FGjy2epZSpGz9QDlE6i00893ADCke"
);
var elements = stripe.elements();
var cardElement = undefined;

export default {
  props: {
    products: Array,
  },
  data() {
    return {
      client_secret: "",
      isCheckout: false,
      isAuthenticated: false,
      authenticationErr: false,
      token: null,
      charge: null,
      loading: false,
      complete: false,
      amount: 0,
      publishableKey:
        "pk_test_51HduWsKsRbt0ZWXinIbpKzoELnMhVziyUp8M63ekxEe4v0OtjhE8F1gv8x3JNfXHulTl0FGjy2epZSpGz9QDlE6i00893ADCke",
    };
  },
  watch: {
    authenticationErr(val) {
      if (val === true) {
        setTimeout(() => {
          this.authenticationErr = false;
        }, 2500);
      }
    },
  },

  created() {
    const store = useStore();
    this.isAuthenticated = store.getters.isAuthenticated;
    const productsInCart = store.state.productsInCart;
    if(productsInCart !== null){
      productsInCart.forEach(
      (product) => (this.amount += product.price)
    );
    }
  },
  methods: {
    createCardForm() {
      let card = document.querySelector('.card-element')
      cardElement = elements.create("card");
      console.log(card);
      cardElement.mount(card);
      cardElement.on("change", (e) => (this.complete = e.complete));
    },
    async submitPayment() {
      let paymentIntent;
      const result = await stripe.handleCardPayment(
        this.client_secret,
        cardElement,
        {
          payment_method_data: {},
        }
      );

      paymentIntent = result.paymentIntent;

      console.log(paymentIntent);

      if(paymentIntent){
        console.log('Payment Succeed');
        let userId = localStorage.getItem('userId')
        let productList = localStorage.getItem('products')
        let data = {userId, productList}
        axios.post("/products/sold", data)
            .then(res => {
              if(res.data){
                localStorage.removeItem('products')
                setTimeout(() => {
                  window.location.reload()
                }, 1000);
              }
            })
      }

      if (result.error) {
        console.log(result.error.message);
      }
    },
    async pay() {
      if (!this.isAuthenticated) {
        this.authenticationErr = true;
        return;
      }
      let charge = { amount: this.amount };
      const response = await axios.post("/products/secret", charge);

      this.client_secret = response.data.client_secret;
      console.log(this.client_secret);
      this.isCheckout = true;
      this.createCardForm();
    },
    deleteInCart(i) {
      this.$emit("delete-product", i);
    },
    async checkout() {
      // if (! this.isAuthenticated) {
      //   this.authenticationErr = true
      //   return;
      // }

      this.isCheckout = true;
      // const response = await axios.post("/products/create-checkout-session", {
      //   products: this.products,
      // });
      // console.log(stripe);

      // console.log(response.data);

      // // function openInNewTab(url) {
      // //   var win = window.open(url, "_blank");
      // //   win.focus();
      // // }
      // const result = await stripe.redirectToCheckout({
      //   sessionId: response.data.id,
      // });

      // console.log(result);

      // if (result.error) {
      //   console.log(result.error.message);
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
.scaleUp-enter-from,
.scaleUp-leave-to {
  transform-origin: bottom right;
  transform: scale(0);
}

.scaleUp-enter-active,
.scaleUp-leave-active {
  transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.add {
  &:hover {
    ~ .dash {
      width: 16rem;
      left: 2rem;
    }
  }
}
#stripe-card-element,
#stripe-exp-element,
#card-exp {
  color: white !important;
}

.transform-flip{
  transform: scaleX(-1);
}
</style>

