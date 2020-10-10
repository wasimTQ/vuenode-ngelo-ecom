<template>
  <div>
    <transition name="fadeInDown">
      <span
        v-if="compErr"
        class="fixed bg-red-400 top-2 pointer-events-none select-none text-white font-bold rounded-lg px-3 py-1 origin-bottom-left z-50"
        >Fill out all the fields before submit</span
      >
    </transition>
    <h1 class="dashboard-heading">Add Products</h1>
    <form
      @submit.prevent="addProduct"
      action
      class="pt-8 px-12"
      enctype="multipart/form-data"
    >
      <div class="grid grid-cols-2 gap-10">
        <div class="relative">
          <input
            v-model="productDetail.name"
            class="input"
            required
            type="text"
          />
          <label class="label" for>Product Name</label>
        </div>
        <div class="relative">
          <input
            v-model="productDetail.price"
            class="input"
            required
            type="text"
          />
          <label class="label" for>
            Product Price
            <span class="text-xs">(in dollar)</span>
          </label>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-10">
        <div class="relative">
          <select
            v-model="selectedCategoryIndex"
            required
            class="input appearance-none h-auto cursor-pointer"
            id
          >
            <option class="text-gray-300 bg-black-700" value="none" disabled>
              Select a category
            </option>
            <option
              class="bg-black-700 text-xl py-20 cursor-pointer"
              v-for="(category, index) in categories"
              :key="index"
              :value="index"
            >
              {{ category.title }}
            </option>
          </select>
          <!-- <input type="text" class="input cursor-pointer" @click="showCat = true" required />
          <ul v-if="showCat">
            <li v-for="(category, index) in categories" :key="index">{{}}</li>
          </ul>-->

          <label class="label" for>Category</label>
        </div>
        <div v-if="selectedCategoryIndex !== ''" class="relative">
          <select
            v-model="productDetail.selectedSubCategory"
            required
            class="input appearance-none h-auto cursor-pointer"
            id
          >
            <option value="none" disabled class="bg-black-700 text-gray-300">
              Select a sub-category
            </option>
            <option
              class="bg-black-700 text-xl py-20 cursor-pointer"
              v-for="(category, index) in categories[selectedCategoryIndex]
                .subnav"
              :key="index"
              :value="category.title"
            >
              {{ category.title }}
            </option>
          </select>
          <!-- <input type="text" :value="selectedCategory" class="input" /> -->
          <label class="label" for>Sub Category</label>
        </div>
      </div>
      <div class="relative grid min-w-full w-full">
        <textarea
          v-model="productDetail.description"
          class="input"
          rows="10"
          required
          type="text"
        />
        <label class="label" for>Description</label>
      </div>
      <div class="relative grid grid-cols-2 gap-x-10 min-w-full w-full">
        <div class="relative">
          <input
            class="input"
            v-model="addTags"
            @keyup="splitTags"
            rows="1"
            required
            type="text"
          />
          <label class="label" for>
            Tags
            <span class="uppercase text-xs font-medium md:inline sm:hidden"
              >(press dot, comma or enter to seperate)</span
            >
          </label>
          <transition name="fadeInDown">
            <div
              class="absolute bg-red-400 right-0 top-0 text-white font-normal rounded-lg px-3 py-1 origin-bottom-left"
              v-if="errTagMsg !== ''"
            >
              {{ errTagMsg }}
            </div>
          </transition>
        </div>
        <div class="relative">
          <transition name="fadeInDown">
            <span
              v-if="mainFileErr"
              class="absolute bg-red-400 bottom-5 pointer-events-none select-none text-white font-normal rounded-lg rounded-bl-none px-3 py-1 z-40 origin-bottom-left"
              >Main File need to be in .zip format</span
            >
          </transition>
          <input
            @change="onFileSelected"
            class="input file-input"
            ref="uploadMain"
            required
            type="file"
          />
          <button
            type="button"
            @click="$refs.uploadMain.click()"
            class="bg-secondary focus:outline-none relative z-10 text-violet border-2 border-violet text-lg font-semibold duration-100 rounded-lg px-8 py-4"
          >
            Pick file
          </button>

          <div
            class="tooltip absolute bg-green-400 text-violet rounded-lg px-3 py-1 origin-bottom-left rounded-bl-none z-40"
          >
            <span v-if="selectedMainFile !== null">{{
              selectedMainFile.name
            }}</span>
            <span v-else>Choose a file with .zip format</span>
          </div>
        </div>
        <div class="-mt-6 col-span-2 mb-4 flex flex-wrap max-w-full relative">
          <span
            class="select-none cursor-pointer mr-2 bg-violet text-secondary px-3 py-1 font-semibold rounded-full relative tags mb-2"
            v-for="(tag, index) in tags"
            :key="index"
            @click="showDel = true"
            @dblclick="deleteTag(index)"
            >{{ tag }}</span
          >
          <transition name="fadeInDown">
            <span
              v-if="showDel"
              class="absolute bg-gray-600 bottom-5 pointer-events-none select-none text-white font-normal rounded-lg px-3 py-1 origin-bottom-left"
              >Double click to DELETE</span
            >
          </transition>
        </div>
      </div>

      <div class="relative w-full min-w-full">
        <transition name="fadeInDown">
          <div
            class="absolute bg-red-400 text-white rounded-lg px-3 py-1 origin-bottom-left rounded-bl-none bottom-0 z-40"
            v-if="fileErr !== ''"
          >
            {{ fileErr }}
          </div>
        </transition>
        <div
          class="grid gap-3 border border-dashed border-opacity-75 border-pale border-separate min-h-25 grid-cols-4 relative items-center justify-items-center z-10 bg-black bg-opacity-50"
          @click="
            !imgClicked ? $refs.uploadPreview.click() : (imgClicked = false)
          "
        >
          <div
            class="absolute z-0 pointer-events-none select-none text-5xl opacity-75 previewtext"
          >
            <h2>Pick preview images</h2>
          </div>
          <transition name="fadeInDown">
            <span
              v-if="showDelImg"
              class="absolute bg-red-400 left-0 top-0 pointer-events-none select-none text-white font-normal rounded-lg px-3 py-1 origin-bottom-left z-40"
              >Double click to DELETE</span
            >
          </transition>
          <div
            v-for="(file, index) in selectedPreviewFiles"
            :key="index"
            @click="clickImg"
            @dblclick="delImage(index)"
            class="w-full h-64 border-violet border-dashed border rounded-lg flex justify-center p-2 relative z-30 object-cover"
          >
            <img :src="file" class="h-full object-cover rounded-lg" alt />
          </div>
        </div>
      </div>

      <div class="relative mt-4">
        <input
          class="input file-input"
          @change="previewUpload"
          ref="uploadPreview"
          required
          type="file"
        />
      </div>

      <h2 @click="addProduct" class="submit">
        <div class="ptf">
          <span class="hov">{{ buttonText }}</span>
          <span>{{ buttonText }}</span>
        </div>
      </h2>
    </form>
  </div>
</template>

<script>
import JSZip from "jszip";
import axios from "../../axios-auth";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      router: useRouter(),
      store: useStore(),
      buttonText: "Add Product",
      productDetail: {
        name: null,
        price: null,
        selectedCategory: null,
        selectedSubCategory: null,
        description: null,
        tags: "",
        previewFiles: [],
        mainFile: null,
      },
      showDel: false,
      showDelImg: false,
      imgClicked: false,
      errTagMsg: "",
      fileErr: "",
      mainFileErr: false,
      selectedMainFile: null,
      compErr: false,
      filesInMain: [],
      selectedPreviewFiles: [],
      selectedCategoryIndex: "",
      addTags: "",
      tags: [],
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
  watch: {
    selectedCategoryIndex(val) {
      if (val !== "") {
        this.productDetail.selectedCategory = this.categories[val].title;
      }
    },
    compErr(val) {
      if (val === true) {
        setTimeout(() => {
          this.compErr = false;
        }, 2500);
      }
    },
    showDel(val) {
      if (val === true) {
        setTimeout(() => {
          this.showDel = false;
        }, 1500);
      }
    },
    mainFileErr(val) {
      if (val === true) {
        setTimeout(() => {
          this.mainFileErr = false;
        }, 1500);
      }
    },
    showDelImg(val) {
      if (val === true) {
        setTimeout(() => {
          this.showDelImg = false;
        }, 1500);
      }
    },
    errTagMsg(val) {
      if (val !== "") {
        setTimeout(() => {
          this.errTagMsg = "";
        }, 1500);
      }
    },
    fileErr(val) {
      if (val !== "") {
        setTimeout(() => {
          this.fileErr = "";
        }, 1500);
      }
    },
  },
  methods: {
    addProduct() {
      console.log(this.productDetail);
      this.productDetail.tags = this.tags;

      if (
        !this.productDetail.name ||
        !this.productDetail.price ||
        !this.productDetail.selectedCategory ||
        !this.productDetail.selectedSubCategory ||
        !this.productDetail.tags ||
        !this.productDetail.description
      ) {
        this.compErr = true;
        return;
      }
      this.productDetail.mainFile = this.selectedMainFile.name;
      let formData = new FormData();
      formData.append("files", this.selectedMainFile);
      this.productDetail.previewFiles.forEach((file) => {
        console.log(file);
        formData.append("files", file);
      });

      const productDetail = JSON.stringify(this.productDetail);
      formData.append("productDetail", productDetail);
      formData.append("filesInMain", JSON.stringify(this.filesInMain));
      formData.append("id", JSON.stringify(this.store.state.userId));
      this.buttonText = "Adding ......";
      // console.log(productDetail);
      axios({
        method: "POST",
        url: "/products/add",
        data: formData,

        config: {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      })
        .then((res) => {
          console.log(res);
          if (res) {
            this.buttonText = "Add Product";
            this.productDetail.name = this.productDetail.selectedCategory = this.productDetail.selectedSubCategory = this.productDetail.description = this.productDetail.price = this.tags = this.selectedMainFile = null;
            this.selectedPreviewFiles = [];
            this.selectedCategoryIndex = "";
          }
        })
        .catch((err) => console.log(err));
    },
    clickImg() {
      this.imgClicked = true;
      this.showDelImg = true;
    },
    splitTags(val) {
      // this.productDetail.tags += val.key;
      if (val.key === "," || val.key === "." || val.key === "Enter") {
        const addTags = this.addTags.split("");
        if (this.tags.length > 15) {
          this.errTagMsg = "Only 15 Tags allowed";
          return;
        }
        if (addTags.length < 3) {
          this.addTags = "";
          this.errTagMsg = "Tag need to be at-least 2 characters";
          return;
        }
        addTags.pop();
        this.tags.push(addTags.join(""));
        this.addTags = "";
        console.log(this.tags.length);
      }
    },
    deleteTag(index) {
      this.tags.splice(index, 1);
    },
    delImage(index) {
      this.selectedPreviewFiles.splice(index, 1);
    },
    onFileSelected(e) {
      const file = e.target.files[0];
      const regEx = /\w.zip/;
      if (!regEx.test(file.name)) {
        this.mainFileErr = true;
        return;
      }

      // console.log(file.name);
      const filename = file.name.replace(".zip", "");
      JSZip.loadAsync(file).then((zip) => {
        console.log(zip);
        zip.forEach((file) => {
          this.filesInMain.push(file.replace(filename, ""));
        });
      });

      this.selectedMainFile = file;
    },
    previewUpload(e) {
      const file = e.target.files;
      const fileSize = file[0].size / 1000;
      if (file && file[0]) {
        if (this.selectedPreviewFiles.length > 3) {
          this.fileErr = "Only 4 files are allowed";
          return;
        }
        if (fileSize > 250) {
          this.fileErr = "File size must be less than 250KB";
          console.log(this.fileErr);
          return;
        }
        this.productDetail.previewFiles.push(file[0]);
        let reader = new FileReader();
        reader.onload = () => {
          const previewFile = reader.result;
          this.selectedPreviewFiles.push(previewFile);
        };
        reader.readAsDataURL(file[0]);
        console.log(this.selectedPreviewFiles.length);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.previewtext {
  mix-blend-mode: inherit;
}
textarea > .mb-3 {
  margin-bottom: 0rem !important;
}
.file-input {
  display: none;
}
.input {
  width: 100%;
}
/* form > div > div {
  position: relative;
} */
.label {
  left: 1.5rem;
}
.input {
  @apply bg-black-700 bg-opacity-25 border-black border-opacity-50;
}
.label {
  @apply bg-black-700 text-gray-300;
}
.input:valid + .label > span {
  display: none;
}
.tooltip {
  opacity: 0;
  top: -0.75rem;
  pointer-events: none;
  user-select: none;
  transition: all 0.25s ease-in;
}
.tooltip-tag {
  opacity: 0;
  /* top: -0.5rem;
  pointer-events: none;
  user-select: none;
  transition: all 0.25s ease-in; */
}
.relative > button:hover + .tooltip {
  opacity: 1;
}

.submit {
  font-size: 2rem;
  line-height: 4.2rem;
  font-weight: 700;
  position: relative;

  z-index: 12;
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.165, 0.84, 0.44, 1);
  @apply bg-violet border-2 border-violet text-secondary rounded-lg px-12 py-2 max-w-xs;
  &:hover {
    @apply bg-secondary;
    span {
      &:nth-child(1),
      &:nth-child(2) {
        transform: translateY(-52px);
      }
    }
  }

  .ptf {
    margin-bottom: 8px;
    height: 60px;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    justify-items: center;
    span {
      position: absolute;
      transition: all 0.3s cubic-bezier(0.445, 0.05, 0.55, 0.95);

      &:nth-child(2) {
        @apply text-violet;
        top: 50px;
      }
    }
  }
}
</style>
