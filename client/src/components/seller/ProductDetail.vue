<template>
  <div>
    <!-- <div class="relative w-4/12 rounded-lg shadow items-start overflow-hidden">
      <Slider :images="images[index]" />
    </div>-->

    <div class="w-6/12 my-4 flex flex-col justify-evenly">
      <div>
        <span class="text-sm text-gray-600 uppercase">Created At: {{product.created_at}}</span>
        <h1 class="font-semibold capitalize mb-2">{{product.prod_name}}</h1>
        <p>{{product.description}} some other Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error fugit quia officia possimus perferendis aspernatur temporibus laudantium molestiae cum sapiente?</p>
      </div>
      <div class="mt-2 flex gap-4">
        <div v-for="item in tags[index]" :key="item">
          <span class="px-3 py-1 rounded-full bg-violet">{{item}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Slider from "./Slider";
export default {
  components: {
    // Slider,
  },
  props: {
    product: Object,
    index: Number,
    images: Array,
  },
};
</script>