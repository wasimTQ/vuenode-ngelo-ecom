<template>
  <div
    class="relative z-30 flex mx-16 bg-gray-800 rounded-full md:w-1/2 px-6 justify-between items-center"
  >
    <div
      @click="toggleCategories"
      class="select-none flex items-center z-20 justify-items-center justify-center text-pale w-3/12 h-6 cursor-pointer"
    >
      <span>Categories</span>
      <span>
        <svg
          class="w-4 h-4 ml-2"
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
    </div>
    <transition name="fadeInDown" appear>
      <div v-if="catClicked" class="absolute left-0 top-0">
        <ul
          class="select-none flex justify-around mt-12 z-0 rounded-lg bg-gray-200 px-10 py-4"
        >
          <li
            class="flex flex-col relative"
            v-for="(category, index) in categories"
            :key="index"
          >
            <div class="flex items-center">
              <h2 class="font-semibold text-base">{{ category.title }}</h2>
            </div>
            <Dropdown v-if="category.subnav" :list="category" />
          </li>
        </ul>
      </div>
    </transition>
    <input
      type="text"
      class="bg-gray-100 w-8/12 outline-none text-gray-700 py-2 px-8 rounded-full"
      name
      placeholder="Search for products"
      id
    />
    <div
      class="w-1/12 text-pale flex justify-center justify-items-center cursor-pointer"
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
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  </div>
</template>

<script>
import Dropdown from "./Dropdown";

export default {
  name: "app",
  components: {
    Dropdown,
  },
  data() {
    return {
      catClicked: false,
      categories: [
        {
          title: "Web or Mobile code templates",
          subnav: [
            { title: "Mobile templates" },
            { title: "Wordpress" },
            { title: "Webflow" },
            { title: "SPA" },
          ],
        },
        {
          title: "Graphics and UI kits",
          subnav: [
            { title: "Figma UI kits" },
            { title: "Sketch UI kits" },
            { title: "Illustrations" },
            { title: "Logo and Business Card templates" },
            { title: "Others" },
          ],
        },
      ],
    };
  },
  methods: {
    entered(index) {
      this.categories.forEach((item, i) => {
        if (index != i) {
          item.open = true;
        } else {
          item.open = true;
        }
      });
    },
    toggleCategories() {
      this.catClicked = !this.catClicked;
      this.categories.forEach((item) => {
        item.open = false;
      });
    },
  },
};
</script>

<style>
.fadeInDown-enter-active,
.fadeInDown-leave-active {
  transition: all 0.25s ease;
}
.fadeInDown-enter-from,
.fadeInDown-leave-to {
  transform: translateY(-25px);
  opacity: 0;
}
</style>
