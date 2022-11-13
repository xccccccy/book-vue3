<template>
  <div :style="{ background: backimg }" class="w-full bookinfo-back z-0">
    <div id="app">
      <div id="box" v-loading="!bookboxshow"
        class="w-full sm:w-2/3 mt-0 sm:mt-16 pt-12 sm:pt-0 mb-0 sm:mb-12 bg-white dark:bg-zinc-900 dark-transition">
        <div class="bookbox">
          <div class="bookimg">
            <a @click="$router.push('/book/' + book.book_id)" class="cursor-pointer">
              <img :src="book.book_img_url" :alt="book.book_name" />
            </a>
          </div>
          <div class="bookinfo">
            <div class="bookname">
              <a @click="$router.push('/book/' + book.book_id)" class="cursor-pointer">{{ book.book_name }}</a>
            </div>
            <div class="author">作者：{{ book.book_author }}</div>
            <div class="resume">{{ book.book_resume }}</div>
            <div class="bookdo">
              <el-row>
                <el-button color="#626aef" plain size="large" auto-insert-space v-if="joinShelfBtnShow"
                  @click="joinbookshelf">加入书架</el-button>
                <el-button color="#626aef" plain size="large" auto-insert-space v-if="continueread_show"
                  @click="$router.push('/book/' + book.book_id + '/' + continueread_catalogue_id)">继续阅读</el-button>
              </el-row>
            </div>
          </div>
        </div>
        <div class="h-0.5 bg-gradient-to-r from-yellow-500 via-pink-500 to-cyan-500 w-full"></div>
        <div class="book-catalogue-list">
          <cataloguebox v-for="(catalogue_text, index) in book.catalogue_text_list" :key="index"
            :id="'catalogue_' + Number(index + 1)" :catalogue_text="catalogue_text" :index="index"
            :catalogue_href="book.catalogue_href_list[index]" :book_id="book.book_id"></cataloguebox>
        </div>
      </div>
    </div>
    <div class="catalogue_location">
      <a @click="tocontentid('#catalogue_' + continueread_catalogue_id)">
        <svg t="1648216386348" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="101090">
          <path
            d="M514.9184 931.7888a176.0256 176.0256 0 0 1-88.2688-23.6032c-159.3344-92.4672-279.5008-288.8704-279.5008-456.96 0-189.4912 150.3744-349.44 342.3232-364.1856 99.84-7.68 200.704 26.5728 276.6848 93.9008 74.3936 65.9456 117.6576 155.392 121.9072 251.904 7.936 182.016-106.2912 373.0432-284.3136 475.2896a178.5856 178.5856 0 0 1-88.832 23.6544z m2.3552-784.384c-7.68 0-15.36 0.3072-23.04 0.8704-160.1536 12.288-285.5936 145.3568-285.5936 302.9504 0 145.4592 109.312 322.816 248.8832 403.8144 35.3792 20.5312 79.6672 20.48 115.6096-0.1536 158.6176-91.136 260.5056-259.6352 253.5424-419.3792-3.4816-79.7184-39.424-153.8048-101.2736-208.5888-57.7024-51.2-132.5056-79.5136-208.128-79.5136z"
            fill="#333333" p-id="101091" />
          <path d="M517.7856 456.192m-132.096 0a132.096 132.096 0 1 0 264.192 0 132.096 132.096 0 1 0-264.192 0Z"
            fill="#F55C04" p-id="101092" />
        </svg>
      </a>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import $ from "jquery";
import { defineAsyncComponent } from 'vue'
import { getBookShelf, addBookToBookshelf } from './managebookshelf'
import { useHeaderStore } from '../../stores/header'

const cataloguebox = defineAsyncComponent(() => import('./cataloguebox.vue'))

export default {
  name: "bookinfo",
  data() {
    return {
      bookboxshow: false,
      book: {
        book_id: this.$route.params.book_id,
        book_name: "书籍名称",
        book_author: "某某某",
        book_resume: "简介",
        book_img_url: null,
        catalogue_text_list: null,
        catalogue_href_list: null,
      },
      continueread_catalogue_id: 1,
      continueread_show: false,
      joinShelfBtnShow: true,
      backimg: "url('/rain.jpeg') center center / cover fixed no-repeat",
    };
  },
  mounted() {
    this.initHeader();
    this.initCatalogue();
    this.initBookShelf();
    $("html,body").scrollTop(0);
  },
  unmounted() {
    const headerStore = useHeaderStore()
    headerStore.resetHeader()
  },
  methods: {
    initHeader() {
      const headerStore = useHeaderStore()
      headerStore.$patch({
        headerSetting: {
          userSetting: {
            userLogHandle: this.userLog
          },
          homeSetting: {
            homeString: 'Home',
            homeHref: '/book'
          }
        }
      })
    },
    initCatalogue() {
      axios
        .get("/api/bookinfo/" + this.book.book_id)
        .then((res) => {
          this.bookboxshow = true;
          this.book = res.data;
          document.title = this.book.book_name;
          this.backimg = "url(" + res.data.book_img_url + ") center center / cover fixed no-repeat";
        })
        .catch((err) => {
          ElNotification({ message: '请求失败！请刷新！', type: 'error', duration: 2000 });
          console.log(err);
        });
    },
    initBookShelf() {
      getBookShelf().then((res) => {
        if (res[this.book.book_id]) {
          this.continueread_show = true;
          this.joinShelfBtnShow = false;
          this.continueread_catalogue_id = res[this.book.book_id]["catalogue_id"];
        } else {
          this.continueread_show = false;
          this.joinShelfBtnShow = true;
        }
      })
    },
    joinbookshelf() {
      let book = {
        book_id: this.book.book_id,
        name: this.book.book_name,
        img_url: this.book.book_img_url,
        author: this.book.book_author,
        catalogue_id: 1,
        catalogue_name: this.book.catalogue_text_list[0],
      }
      addBookToBookshelf(book);
    },
    tocontentid(_selecter) {
      $("html,body").animate(
        {
          scrollTop: $(_selecter).offset().top - $(window).height() / 2,
        },
        70
      );
      $(_selecter).css({ background: "#000000b8" });
      $(_selecter + " a").css({ color: "#FFF" });
    },
    userLog(mode) {
      if (mode == 'login') {
        this.initBookShelf();
      }
    }
  },
  components: {
    cataloguebox
  },
};
</script>

<style scoped>
@import "../../assets/css/bookinfo.css";

.bookinfo {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.bookinfo-back::before {
  content: "";
  position: absolute;
  left: 0px;
  top: 0px;
  backdrop-filter: blur(45px) brightness(95%);
  height: 100%;
  width: 100%;
  z-index: -1;
}
</style>
