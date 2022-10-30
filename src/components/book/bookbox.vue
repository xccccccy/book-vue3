<template>
  <el-col
    :md="24"
    :lg="11"
    class="dark-transition border-2 border-white border-opacity-50 shadow-2xl dark:shadow-none dark:border-0 dark:border-opacity-0 bg-white dark:bg-slate-800 rounded-md backdrop-filter bg-opacity-50 dark:bg-opacity-50 mb-4 mr-4"
  >
    <el-row
      class="bookbox"
      @mouseenter="bottom_bar_hover = true"
      @mouseleave="bottom_bar_hover = false"
      @click="$router.push('/book/' + book.book_id)"
    >
      <el-col class="bookimg" :span="7">
          <img :src="book.img_url" :alt="book.name" loading="lazy" />
      </el-col>
      <el-col class="bookinfo" :span="16">
        <div class="bookname">
          <span>{{ book.name }}</span>
        </div>
        <div class="author">作者：{{ book.author }}</div>
        <div class="resume">{{ book.resume }}</div>
      </el-col>
    </el-row>
    <div
      class="h-0.5 bg-gradient-to-r from-yellow-500 via-pink-500 to-cyan-500"
      :class="{ 'w-full': bottom_bar_hover, 'w-0': !bottom_bar_hover }"
      style="transition: width 0.1s ease-in-out 0s;"
    ></div>
  </el-col>
</template>

<script>
export default {
  name: "bookbox",
  props: ["book"],
  data() {
    return {
      bottom_bar_hover: false,
    }
  },
  methods: {
    select_book(book_id) {
      console.log(book_id);
    },
  },
};
</script>

<style scoped>
.bookbox {
  animation: fadeInDown 0.5s;
  height: 100%;
  cursor: pointer;
}

.bookbox > div {
  padding: 0.3rem;
}
.bookimg {
  align-self: center;
}
.bookimg img {
  border: none;
  border-radius: 5px;
  width: 100%;
  aspect-ratio: 3 / 4;
}

.bookinfo {
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.resume {
  line-height: 2;
  padding-top: 0.8rem;
  display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    text-overflow: -o-ellipsis-lastline;
    text-overflow: ellipsis;
    word-break: break-word;
    -webkit-line-clamp: 2;
}
.bookname span {
  font-size: 1.5rem;
}
</style>
