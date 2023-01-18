<template>
    <div class="app w-full sm:w-3/4 2xl:w-2/3">
        <div class="book-list" v-if="bookshelf_show">
            <div class="list-title">
                <span>我的书架</span>
            </div>
            <el-row>
                <bookshelfbox v-for="book in bookshelf" :key="book.book_id" :book="book" @delBook="delbook">
                </bookshelfbox>
            </el-row>
        </div>
        <div class="book-list" v-if="bookbox_list_show">
            <div class="search-two">
                <el-input v-model="search_string" placeholder="搜索书籍。" class="input-with-select"
                    @keyup.enter="searchbook()" size="large">
                    <template #suffix>
                        <el-icon class="el-input__icon" @click="searchbook()">
                            <search />
                        </el-icon>
                    </template>
                </el-input>
            </div>
            <div class="list-title">
                <span v-html="search_info"></span>
            </div>
            <el-row class="type_show" v-loading="searchloading">
                <bookbox v-for="book in search_books" :key="book.book_id" :book="book"></bookbox>
            </el-row>
        </div>
        <div class="book-list shang-list" v-if="shang_show">
            <div class="shang flex-col xl:flex-row">
                <div>
                    <img src="@/assets/img/wx_shou.jpg" loading="lazy" class="shadow-2xl" />
                </div>
                <div>
                    <img src="@/assets/img/zfb_shou.jpg" loading="lazy" class="shadow-2xl" />
                </div>
                <div>
                    <img src="@/assets/img/wx_zan.jpg" loading="lazy" class="shadow-2xl" />
                </div>
            </div>
        </div>
        <!-- <Like></Like> -->
    </div>
</template>

<script>
import axios from "axios";
import $ from "jquery";
import { defineAsyncComponent, markRaw } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { getBookShelf, fromBookshelfDelBook, addBookToBookshelf } from './managebookshelf'
import Like from "../like.vue";
import { useHeaderStore } from '../../stores/header'
import CarbonBook from '~icons/carbon/book'
import CarbonSearch from '~icons/carbon/search'
import notoMoneyBag from '~icons/healthicons/money-bag-outline'

const Bookbox = defineAsyncComponent(() => import('./bookbox.vue'))
const Bookshelfbox = defineAsyncComponent(() => import('./bookshelfbox.vue'))

export default {
    name: "book",
    data() {
        return {
            search_string: '',
            bookshelf_show: true,
            bookbox_list_show: false,
            search_data: null,
            search_books: null,
            search_info: "暂无搜索...",
            bookshelf: null,
            shang_show: false,
            searchloading: false,
            ismobile: false,
        };
    },
    watch: {
    },
    computed: {
    },
    mounted() {
        this.initHeader();
        this.initLocalStorage();
        this.initSearchUrl();
        this.initBookShelf();
        this.judgeismobile();
        document.title = "My Book";
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
                    headerSettings:
                        [
                            {
                                type: 'search',
                                placeholder: "搜索书籍。",
                                clickHandle: this.searchbook
                            },
                            {
                                type: 'common',
                                // headerString: '搜索',
                                iconSetting: markRaw(CarbonSearch),
                                clickHandle: this.back_search
                            },
                            {
                                type: 'common',
                                // headerString: '书架',
                                iconSetting: markRaw(CarbonBook),
                                clickHandle: this.backbookshelf
                            },
                            {
                                type: 'common',
                                // headerString: 'Shǎng',
                                iconSetting: markRaw(notoMoneyBag),
                                clickHandle: this.shangqian,
                                style: "font-weight: 500; color: #CD9D02"
                            }
                        ],
                    userSetting: {
                        userLogHandle: this.userLog
                    }
                }
            })
        },
        initBookShelf() {
            this.bookshelf = JSON.parse(localStorage.bookshelf);
            getBookShelf().then((res) => {
                this.bookshelf = res;
                if (!Object.keys(this.bookshelf).length) {
                    this.bookshelf_show = false;
                }
            });
        },
        searchbook(s) {
            let search_s = s || this.search_string;
            this.searchloading = true;
            this.search_info = "正在搜索中...";
            this.bookshelf_show = false;
            this.bookbox_list_show = true;
            this.$router.push("/book?s=" + search_s);
            axios
                .post("/api/book/search", {
                    search_string: search_s,
                })
                .then((res) => {
                    this.searchloading = false;
                    (document.title = "'" + search_s + "'" + "的搜索结果"),
                        (this.search_books = res.data.data);
                    if (this.search_books.length) {
                        this.search_info =
                            '😁 搜索到与"<b>' +
                            search_s +
                            '</b>"相关的书籍，共' +
                            this.search_books.length +
                            "本。（最多显示100本）";
                    } else {
                        this.search_info =
                            '😭 暂未找到与"<b>' + search_s + '</b>"相关的书籍。';
                    }
                })
                .catch((err) => {
                    this.searchloading = true;
                    ElNotification({ message: '请求失败！请刷新！', type: 'error', duration: 0 });
                    console.log(err);
                });
        },
        backbookshelf() {
            if (!this.bookshelf_show) {
                this.closealldiv();
            }
            this.bookshelf_show = !this.bookshelf_show;
        },
        back_search() {
            if (!this.bookbox_list_show) {
                this.closealldiv();
            }
            this.bookbox_list_show = !this.bookbox_list_show;
        },
        delbook(book_id) {
            this.bookshelf = fromBookshelfDelBook(book_id);
        },
        shangqian() {
            if (!this.shang_show) {
                this.closealldiv();
            }
            this.shang_show = !this.shang_show;
        },
        closealldiv() {
            this.bookshelf_show = false;
            this.bookbox_list_show = false;
            this.shang_show = false;
        },
        judgeismobile() {
            var ua = navigator.userAgent;
            var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
                isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
                isAndroid = ua.match(/(Android)\s+([\d.]+)/),
                isMobile = isIphone || isAndroid;
            //判断
            if (isMobile) {
                this.ismobile = true;
            }
        },
        initSearchUrl() {
            let newurl = location.href;
            if (newurl.indexOf('?') != -1) {
                let s = decodeURI(newurl.split("=")[1]);
                this.searchbook(s);
            }
        },
        initLocalStorage() {
            let LSversion = '1.02'
            if (!localStorage.LSversion || localStorage.LSversion != LSversion) {
                localStorage.clear();
                localStorage.LSversion = LSversion;
            } else {
                return
            }
            if (!localStorage.bookshelf) {
                localStorage.bookshelf = "{}";
            }
            let InfiniteReadaheadSet = { "preContentShow": true, "nextContentShowed": false, "isSwitched": false, "nowContentSelecter": "now", "ifShouldLoadNext": false };
            if (!localStorage.InfiniteReadaheadSet) {
                localStorage.InfiniteReadaheadSet = JSON.stringify(InfiniteReadaheadSet);
            }
            let setting = {
                'currentFontsize': 1.4,
                'light': {
                    'currentbjcolor': "linear-gradient(to right, #322e30, #3b363e, #3e414e, #3b4d5d, #335a66, #37666f, #3d7376, #467f7b)",
                    'currentskin': ["#000", "rgba(255,255,255,0.7)"]
                },
                'dark': {
                    'currentbjcolor': "linear-gradient(to right, #322e30, #3b363e, #3e414e, #3b4d5d, #335a66, #37666f, #3d7376, #467f7b)",
                    'currentskin': ["#000", "rgba(255,255,255,0.7)"]
                },
                'currentlineheight': 1.8,
                'Infinitereadahead': false,
                'readahead': true,
            }
            if (!localStorage.setting) {
                localStorage.setting = JSON.stringify(setting);
            }
            if (!localStorage.darkmode) {
                localStorage.darkmode = 'auto';
            }
        },
        userLog(mode) {
            if (mode == 'login') {
                getBookShelf().then((res) => {
                    this.bookshelf = res;
                    if (!this.bookshelf_show) {
                        this.closealldiv();
                        this.bookshelf_show = true;
                    }
                });
            } else {
                getBookShelf().then((res) => {
                    this.bookshelf = res;
                });
            }
        },
        test() {
        },
    },
    components: {
        bookbox: Bookbox,
        bookshelfbox: Bookshelfbox,
        Search: Search,
        Like
    }
};
</script>

<style scoped>
@import "../../assets/css/book.css";

.input-with-select {
    /* opacity: 0.8; */
    color: #000;
}

.el-input__icon {
    color: #4642c5;
    font-size: 1.3rem;
}

.search-two {
    margin: 1rem auto;
}

.search-two .el-input__icon {
    font-size: 1.5rem;
    cursor: pointer;
}
</style>
