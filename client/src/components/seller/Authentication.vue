<template>
  <div
    class="h-full-screen rounded-lg bg-gray-100 flex flex-col justify-center items-center"
  >
    <h4 class="mb-16 -mt-10">
      <span>
        {{
          !registerAuth
            ? "Already have an account ?"
            : "Don't have an account ?"
        }}
      </span>
      <span
        class="ml-2 font-medium cursor-pointer border-b-2 border-gray-600"
        @click="toggleAuth"
        >{{ !registerAuth ? "Login" : "Register" }}</span
      >
    </h4>
    <h2 class="text-4xl -mt-8 font-semibold mb-16">
      {{ !registerAuth ? registerHeading : "Login to your Account" }}
    </h2>
    <form @submit="!registerAuth ? registerUser : loginUser">
      <div v-if="!registerAuth">
        <input
          class="input"
          v-model="userDetails.username"
          required
          type="text"
          name
        />
        <label class="label" for>Username</label>
      </div>
      <div>
        <input
          class="input"
          v-model="userDetails.email"
          required
          type="text"
          name
        />
        <label class="label" for>Email</label>
        <transition name="fadeInUp">
          <span
            class="absolute bottom-5 right-0 bg-red-500 px-5 py-2 rounded-lg text-white"
            v-if="emailExist && !registerAuth"
          >
            {{ emailExist }}.
            <span
              class="border-b-2 border-purple-600 pb-2 cursor-pointer"
              @click="registerAuth = true"
              >Try login</span
            >
          </span>
        </transition>
        <transition name="fadeInUp">
          <span
            class="absolute bottom-5 right-0 bg-red-500 px-5 py-2 rounded-lg text-white"
            v-if="notFound && registerAuth"
          >
            {{ notFound }}.
            <span
              class="border-b-2 border-purple-600 pb-2 cursor-pointer"
              @click="registerAuth = false"
              >Register Now</span
            >
          </span>
        </transition>
      </div>
      <div>
        <input
          class="input"
          v-model="userDetails.password"
          required
          type="password"
          name
        />
        <label class="label" for>Password</label>
        <transition name="fadeInUp">
          <span
            class="absolute bottom-5 right-0 bg-red-500 px-5 py-2 rounded-lg text-white"
            v-if="incPass && registerAuth"
            >{{ incPass }}.</span
          >
        </transition>
      </div>

      <div v-if="registerAuth" class="flex items-center mb-6 cursor-pointer">
        <span
          @click="loginBuyer = false"
          :class="{ 'opacity-50': loginBuyer }"
          class="text-lg"
          >Seller</span
        >
        <div
          :class="{ 'bg-red-200': loginBuyer }"
          @click="loginBuyer = !loginBuyer"
          class="relative mx-3 h-10 rounded-full w-20 bg-gray-300 flex items-center cursor-pointer"
        >
          <span
            :class="{ 'left-2 bg-red-400': loginBuyer }"
            class="relative top-0 left-0 mx-1 ml-2 h-8 w-8 rounded-full border-2 duration-200 ease-in-out bg-white border-gray-600"
          ></span>
        </div>
        <span
          :class="{ 'opacity-50': !loginBuyer }"
          @click="loginBuyer = true"
          class="text-lg"
          >Buyer</span
        >
      </div>

      <input
        type="submit"
        v-if="!registerAuth"
        @click.prevent="registerUser"
        class="text-lg focus:outline-none font-semibold uppercase bg-orange-500 border-2 border-orange-500 rounded-lg cursor-pointer duration-75 text-white px-4 py-4 tracking-wide hover:bg-transparent hover:text-orange-600 block w-full"
        value="Sign Up"
      />
      <input
        type="submit"
        v-else
        @click.prevent="loginUser"
        class="text-lg focus:outline-none font-semibold uppercase bg-orange-500 border-2 border-orange-500 rounded-lg cursor-pointer duration-75 text-white px-4 py-4 tracking-wide hover:bg-transparent hover:text-orange-600 block w-full"
        value="Sign In"
      />
    </form>
    <h3
      @click="buyerRegister"
      class="text-xl text-gray-800 mt-4 border-b-2 border-gray-500 cursor-pointer"
      v-if="registerAuth"
    >
      Register as buyer
    </h3>
  </div>
</template>

<script>
import axios from "../../axios-auth";
import { reactive, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
// import { useRouter } from "vue-router";
// import useVuelidate from "@vuelidate/core";
// import { required, email } from "@vuelidate/validators";
export default {
  props: ["authchosen"],

  setup(props, { emit }) {
    // const router = useRouter();
    const store = useStore();

    const emailExist = ref("");
    const notFound = ref("");
    const incPass = ref("");
    const registerAuth = ref(false);
    const guestRegister = ref(false);
    const registerAs = ref("seller");
    const registerHeading = ref("Become a seller");

    const buyerRegister = () => {
      guestRegister.value = true;
      registerAs.value = "buyer";
      registerAuth.value = false;
      registerHeading.value = "Become a buyer";
    };

    const toggleAuth = () => {
      registerAuth.value = !registerAuth.value;
    };

    const loginBuyer = ref(false);
    const toggleLogin = () => {
      loginBuyer.value = !loginBuyer.value;
    };
    watch(loginBuyer, (val) => {
      if (!val) {
        userDetails.role = "seller";
      } else {
        userDetails.role = "buyer";
      }
    });

    const userDetails = reactive({
      username: "",
      email: "",
      password: "",
      role: "seller",
    });

    let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    watch(
      () => userDetails.email,
      (val) => {
        if (val.match(pattern)) {
          console.log("patter matched");
        }
      }
    );

    watch(emailExist, (val) => {
      if (val) {
        setTimeout(() => {
          emailExist.value = "";
        }, 2500);
      }
    });
    watch(notFound, (val) => {
      if (val) {
        setTimeout(() => {
          notFound.value = "";
        }, 2500);
      }
    });
    watch(incPass, (val) => {
      if (val) {
        setTimeout(() => {
          incPass.value = "";
        }, 2500);
      }
    });

    const registerUser = () => {
      userDetails.role = registerAs.value;
      axios
        .post(`/user/register`, {
          userDetails,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.isUser) {
            emailExist.value = res.data.msg;
          } else if (res.status === 200) {
            registerAuth.value = true;
          }
          loginUser();
        })
        .catch((err) => console.log(err));
    };
    const loginUser = () => {
      console.log(userDetails.role);
      axios
        .post(`/user/login`, {
          userDetails,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.isUser === false) {
            notFound.value = res.data.msg;
            return;
          } else if (res.data.isPassword === false) {
            incPass.value = res.data.msg;
            return;
          }
          store.dispatch("authUser", res.data);
          emit("userlogged");

          console.log(store.state.token);
        })
        .catch((err) => console.log(err));
    };

    onMounted(() => {
      if (props.authchosen === "register") {
        registerAuth.value = false;
      } else {
        registerAuth.value = true;
      }
    });

    return {
      registerAuth,
      userDetails,
      toggleAuth,
      registerUser,
      loginUser,
      emailExist,
      notFound,
      incPass,
      registerHeading,
      guestRegister,
      buyerRegister,
      toggleLogin,
      loginBuyer,
    };
  },
};
</script>

<style>
.fadeInUp-enter-from,
.fadeInUp-leave-to {
  transform: translateY(15px);
  opacity: 0;
}

.fadeInUp-enter-active,
.fadeInUp-leave-active {
  transition: all 0.5s ease;
}

form > div {
  position: relative;
}

.label {
  top: 1rem;
  left: 1.5rem;
}

.input:valid + .label {
  top: -1rem;
  left: 0;
  font-size: 1rem;
}
.h-full-screen {
  height: 95vh;
  width: 70vw;
  max-width: 80vw;
}
.left-1-5 {
  left: 1.5rem;
}
</style>
