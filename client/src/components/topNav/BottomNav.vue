<template>
  <div class="fixed top-4 bg-black-700 z-40 flex justify-end w-full py-4 px-8">
    <div class="b-btn">
      <span>
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
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
      </span>
    </div>
    <div @click="$emit('cart-clicked')" class="b-btn relative">
      <span
        class="absolute right-0 -mt-2 top-0 bg-black text-green-400 w-6 h-6 rounded-full flex justify-center items-center"
        v-if="length > 0"
        >{{ length }}
      </span>
      <span>
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
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    length: Number,
  },
};
</script>

<style scoped>
.b-btn:hover {
  @apply bg-violet text-green-400;
}
</style>
