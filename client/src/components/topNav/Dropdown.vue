<template>
  <ul class="rounded-lg bg-gray-200 px-4 py-3 w-1/5">
    <li
      class="flex items-center cursor-pointer mt-2 flex-wrap hover:text-blue-600 duration-150"
      v-for="(category, index) in list.subnav"
      :key="index"
    >
      <span>{{ category.title }}</span>
      <span v-if="category.subnav">
        <svg
          class="w-4 h-4 ml-2 -rotate-90"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </span>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Dropdown",
  props: ["list"],
};
</script>

<style scoped>
ul {
  width: 300px;
}
</style>