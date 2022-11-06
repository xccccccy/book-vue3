<template>
    <div class="app w-full" :style="{ background: setting.currentbjcolor }">
        <div id="box" :style="{ background: setting.currentskin[1] }"
            class="w-full sm:w-2/3 mb-0 sm:mb-12 mt-0 sm:mt-14 rounded-none sm:rounded-lg" v-loading="contentloading">
            <div class="bookbox" v-show="bookboxshow" :style="{ color: setting.currentskin[0] }">
                <div class="navigate">
                    <a @click="$router.push('/book')">主页</a>
                    <span>></span>
                    <a @click="$router.push('/book/' + book_id)">{{ name }}</a>
                    <span>></span>
                    <a>{{ catalogue_name }}</a>
                </div>
                <div class="content" :style="{
                    fontSize: setting.currentFontsize + 'rem',
                    color: setting.currentskin[0],
                    lineHeight: setting.currentlineheight,
                }" @click="getMouseXY($event)" ref="content">
                    <!-- 内容填充区 -->
                </div>
                <div id="control-catalogue">
                    <a class="next-content-btn" @click="jumpcontent(Number(content_id) - 1)">上一章</a>
                    <a class="catalogue" @click="$router.push('/book/' + book_id)">目录</a>
                    <a class="next-content-btn" @click="jumpcontent(Number(content_id) + 1)">下一章</a>
                </div>
            </div>
        </div>
        <div class="hidden sm:block tool-all">
            <div class="tool tool-left-bottom flex justify-evenly sm:block w-full sm:w-max">
                <div id="joinbookshelf" v-if="joinShelfBtnShow" @click="joinbookshelf" title="加入书架"
                    @mouseover="join_span_show = true" @mouseout="join_span_show = false">
                    <a href="javascript:void(0);">
                        <img src="@/assets/img/icon/join_bookshelf.svg" />
                        <span v-show="join_span_show">加入书架</span>
                    </a>
                </div>
                <div id="search" title="搜索" @mouseover="search_span_show = true" @mouseout="search_span_show = false">
                    <a href="javascript:void(0);">
                        <img src="@/assets/img/icon/search_file.svg" @click="searchbook()" />
                        <input v-show="search_span_show" v-model="search_string" placeholder="搜索"
                            @keyup.enter="searchbook()" />
                    </a>
                </div>
                <div id="home" title="主页" @mouseover="home_span_show = true" @mouseout="home_span_show = false">
                    <a @click="$router.push('/book')">
                        <img src="@/assets/img/icon/home2.svg" />
                        <span v-show="home_span_show">主页</span>
                    </a>
                </div>
                <div @click="showcatalogue" class="block sm:hidden">
                    <a href="javascript:void(0);">
                        <img src="@/assets/img/icon/list.svg" />
                    </a>
                </div>
            </div>
            <div class="tool tool-right-bottom hidden sm:flex sm:flex-col">
                <div class="go-top" @click="to_top">
                    <a href="javascript:void(0);">
                        <img src="@/assets/img/icon/top.svg" />
                    </a>
                </div>
                <div class="go-bottom" @click="to_bottom">
                    <a href="javascript:void(0);">
                        <img src="@/assets/img/icon/down.svg" />
                    </a>
                </div>
            </div>
            <div class="tool tool-right-top">
                <div>
                    <a title="设置" href="javascript:void(0);" @click="this.set_span_show = !this.set_span_show">
                        <img src="@/assets/img/icon/set.svg" />
                    </a>
                    <transition name="bounce">
                        <div class="child-setting fixed w-full right-0 top-40 sm:absolute sm:w-max sm:top-0 sm:right-16"
                            v-show="set_span_show">
                            <div>
                                <span>背景颜色:</span>
                                <span v-for="bjcolor in bjcolors" :key="bjcolor" :class="[
                                    'bj-color',
                                    { 'bj-color-selected': setting.currentbjcolor === bjcolor },
                                ]" :style="{ background: bjcolor }" @click="setbjcolor(bjcolor)"></span>
                            </div>
                            <div>
                                <span>字体大小:</span>
                                <span v-for="fontsize in fontsizes" :key="fontsize" :class="[
                                    'fontsize-select',
                                    { 'fontsize-selected': setting.currentFontsize === fontsize },
                                ]" :style="{ fontSize: fontsize + 'rem' }" @click="setfontsize(fontsize)">{{ fontsize
}}</span>
                                <span style="font-size: 1.25rem">|</span>
                                <span class="fontsize-select-jj" @click="setfontsize(-0.1)"
                                    onselectstart="() => {return false}">Aa-</span>
                                <span class="fontsize-show" style="margin: 0 .3rem"
                                    :style="{ fontSize: setting.currentFontsize + 'rem' }">{{ setting.currentFontsize
                                    }}</span>
                                <span class="fontsize-select-jj" @click="setfontsize(+0.1)"
                                    onselectstart="() => {return false}">Aa+</span>
                            </div>
                            <div id="skin-select">
                                <span>皮肤模式:</span>
                                <div class="skin-select" v-for="skin in skins" :key="skin[1]"
                                    :class="[{ 'skin-selected': setting.currentskin === skin }]" :style="{
                                        borderLeftColor: skin[0],
                                        borderBottomColor: skin[1],
                                    }" @click="setskin(skin)"></div>
                            </div>
                            <div>
                                <span>字行间距:</span>
                                <div class="flex flex-grow items-center justify-around">
                                    <span class="fontsize-select-jj" @click="setlineheight(-0.2)"
                                        onselectstart="() => {return false}">
                                        <span style="font-size: 1.5rem">-</span>
                                    </span>
                                    <span class="fontsize-show" style="margin: 0 .3rem">
                                        {{
                                                setting.currentlineheight
                                        }}
                                    </span>
                                    <span class="fontsize-select-jj" @click="setlineheight(+0.2)"
                                        onselectstart="() => {return false}">
                                        <span style="font-size: 1.5rem">+</span>
                                    </span>
                                </div>
                            </div>
                            <div>
                                <span class="w-1/2">
                                    预读:
                                    <div class="mx-8 inline-block">
                                        <el-switch v-model="setting.readahead" />
                                    </div>
                                </span>
                                <span v-if="setting.readahead" class="w-1/2">
                                    无限预读:
                                    <div class="mx-8 inline-block">
                                        <el-switch v-model="Infinitereadahead" />
                                    </div>
                                </span>
                            </div>
                        </div>
                    </transition>
                </div>
            </div>
            <div class="to-next-content-btn" v-if="false">
                <div>
                    <a :href="'/book/' + book_id + '/' + (Number(content_id) + 1)">
                        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="48" height="48" fill="white" fill-opacity="0.01" />
                            <path d="M41.9999 24H5.99992" stroke="#ffffff" stroke-width="4" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <path d="M30 12L42 24L30 36" stroke="#ffffff" stroke-width="4" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </a>
                </div>
            </div>
            <div class="tool tool-left-top" v-if="false">
                <div>
                    <a title="音乐" href="javascript:void(0);" @click="player_div_show = !player_div_show">
                        <img style="height: 0.9em; width: 0.9em" src="@/assets/img/icon/music.svg" />
                    </a>
                    <transition name="bounce">
                        <music-player v-show="player_div_show" ref="player" :fixed="true" :mini="false" :lrcType="0"
                            :listFolded="false" />
                    </transition>
                </div>
            </div>
        </div>
        <div class="catalogue-module left-0 sm:flex sm:left-0">
            <div class="catalogue-all relative max-w-full">
                <div class="catalogue-container">
                    <div>目录</div>
                    <div class="catalogue-list">
                        <div v-for="(catalogue, index) in catalogue_list" :key="index + 1"
                            @click="jumpcontent(index + 1)" :id="'catalogue_' + (index + 1)">{{ catalogue }}</div>
                    </div>
                </div>
                <div class="catalogue_location">
                    <a @click="tocontentid(content_id)">
                        <svg t="1648216386348" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="101090">
                            <path
                                d="M514.9184 931.7888a176.0256 176.0256 0 0 1-88.2688-23.6032c-159.3344-92.4672-279.5008-288.8704-279.5008-456.96 0-189.4912 150.3744-349.44 342.3232-364.1856 99.84-7.68 200.704 26.5728 276.6848 93.9008 74.3936 65.9456 117.6576 155.392 121.9072 251.904 7.936 182.016-106.2912 373.0432-284.3136 475.2896a178.5856 178.5856 0 0 1-88.832 23.6544z m2.3552-784.384c-7.68 0-15.36 0.3072-23.04 0.8704-160.1536 12.288-285.5936 145.3568-285.5936 302.9504 0 145.4592 109.312 322.816 248.8832 403.8144 35.3792 20.5312 79.6672 20.48 115.6096-0.1536 158.6176-91.136 260.5056-259.6352 253.5424-419.3792-3.4816-79.7184-39.424-153.8048-101.2736-208.5888-57.7024-51.2-132.5056-79.5136-208.128-79.5136z"
                                fill="#333333" p-id="101091" />
                            <path
                                d="M517.7856 456.192m-132.096 0a132.096 132.096 0 1 0 264.192 0 132.096 132.096 0 1 0-264.192 0Z"
                                fill="#F55C04" p-id="101092" />
                        </svg>
                    </a>
                </div>
            </div>
            <div class="catalogue-list-show">开</div>
        </div>

        <div v-show="mask_show" class="back-mask bg-slate-500 bg-opacity-20 sm:bg-transparent" @click="mask_click">
        </div>
    </div>
</template>

<script>
import axios from "axios";
import $ from "jquery";
import MusicPlayer from "../MusicPlayer.vue";
import { List } from '@element-plus/icons-vue';
import { getBookShelf, addBookToBookshelf, updataBookShelf } from './managebookshelf'
import { useHeaderStore } from '../../stores/header'

export default {
    components: { List: List },
    name: "bookcontent",
    data() {
        return {
            bookboxshow: false,
            book_id: this.$route.params.book_id,
            content_id: this.$route.params.content_id,
            name: "书名",
            book_img_url: "",
            author: "作者",
            catalogue_name: "章节名称",
            next_catalogue_name: null,
            content: "内容",
            next_content: null,
            bookshelf: null,
            catalogue_list: null,
            search_span_show: false,
            join_span_show: false,
            home_span_show: false,
            set_span_show: false,
            fontsizes: [1, 1.2, 1.4, 1.6],
            bjcolors: [
                "#555",
                "#ddd",
                "#A7E0C6",
                "linear-gradient(to right top, #a88fb8, #a591c2, #a094cc, #9897d7, #8d9be1, #7ea5ec, #6baff4, #55b9fa, #43cafc, #44d9fa, #5be7f4, #7af4ec)",
                "linear-gradient(to right, #322e30, #3b363e, #3e414e, #3b4d5d, #335a66, #37666f, #3d7376, #467f7b)",
                "linear-gradient(to bottom, #bf7392, #b26a9e, #9a65ac, #7564ba, #2966c4)",
                "linear-gradient(to bottom, #1d1319, #261a25, #2e2333, #332c41, #363651, #443e5d, #544669, #654d74, #895274, #a65a6a, #b8685c, #bd7e4e)",
            ],
            skins: [
                ["#000", "rgba(255,255,255,0.7)"],
                ["#c2c2c2", "#2a2929"],
                ["#000", "rgba(187,227,187,0.83)"],
                ["#000000", "rgba(243,234,164,0.88)"],
                ["#000000", "rgba(229,188,188,0.79)"],
                ["#c2c2c2", "#4c4c4c"],
            ],
            setting: {
                'currentFontsize': 1.4,
                'currentbjcolor': "linear-gradient(to right top, #a88fb8, #a591c2, #a094cc, #9897d7, #8d9be1, #7ea5ec, #6baff4, #55b9fa, #43cafc, #44d9fa, #5be7f4, #7af4ec)",
                'currentskin': ["#000", "rgba(255,255,255,0.7)"],
                'currentlineheight': 1.8,
                'Infinitereadahead': true,
                'readahead': true,
            },
            player_setting: {
                default_player_type: true,
                server: "netease",
                type: "playlist",
                id: "2676066674",
            },
            player_div_show: false,
            contentloading: true,
            search_string: null,
            ismobile: false,
            header_show: false,
            self_mask_show: false,
            joinShelfBtnShow: true
        };
    },
    mounted() {
        this.initHeader();
        this.judgeismobile();
        this.monitorscorll();
        this.monitorkeydowm();
        this.initseting();
        this.initcontent();
        this.initcatalogue(1);
        this.initbookshelf();
        // this.$refs.player.initaudio(this.player_setting);
        this.to_top();
    },
    unmounted() {
        $(window).unbind('scroll');
        $(window).unbind('keydown');
        const headerStore = useHeaderStore()
        headerStore.resetHeader()
    },
    computed: {
        mask_show() {
            return this.set_span_show || this.self_mask_show;
        },
        Infinitereadahead: {
            get() {
                return this.setting.Infinitereadahead
            },
            set(newValue) {
                this.setting.Infinitereadahead = newValue;
            }
        },
    },
    watch: {
        Infinitereadahead(mode) {
            if (mode) {
                this.monitorscorll_next_content();
            } else {
                this.monitorscorll_next_content('unbind');
                if ($(".content-now").length <= 0) { return }
                let win_scroll_top = $(window).scrollTop()
                let now_content_offset_top = $(".content-now").offset().top;
                if ($(".content-old").length > 0) {
                    $(".content-old").remove()
                }
                if ($(".content-prenow").length > 0) {
                    $(".content-prenow").remove()
                }
                let new_content_offset_top = $(".content-now").offset().top;
                $("html,body").scrollTop(win_scroll_top - now_content_offset_top + new_content_offset_top);
            }
            this.setLocalStorageSet('Infinitereadahead');
        },
        'setting.readahead': {
            deep: true,
            handler(newValue) {
                this.setLocalStorageSet('readahead');
                if (newValue && !this.next_content) { this.getnextcontent(1); }
            },
        }
    },
    methods: {
        initHeader() {
            const headerStore = useHeaderStore()
            headerStore.$patch({
                headerSetting: {
                    userSetting: {
                        userLogHandle: this.userLog
                    },
                    darkmodeSetting: {
                        darkModeChangeHandle: this.darkModeChange
                    },
                    homeSetting: {
                        homeString: 'Home',
                        homeHref: '/book'
                    }
                }
            })
        },
        test() { },
        to_bottom() {
            $("html,body").animate(
                {
                    scrollTop: $(document).height(),
                },
                200
            );
        },
        to_top(height, time) {
            let _height = height || 0;
            let _time = time || 100;
            $("html,body").animate(
                {
                    scrollTop: _height,
                },
                _time
            );
        },
        joinbookshelf() {
            let book = {
                book_id: this.book_id,
                name: this.name,
                img_url: this.book_img_url,
                author: this.author,
                catalogue_id: this.content_id,
                catalogue_name: this.catalogue_name,
            };
            this.bookshelf = addBookToBookshelf(book);
        },
        setfontsize(fontsize) {
            if (fontsize > 0.7) {
                this.setting.currentFontsize = fontsize;
            } else {
                this.setting.currentFontsize += fontsize;
            }
            this.setting.currentFontsize = Number(this.setting.currentFontsize.toFixed(1));
            this.setLocalStorageSet('currentFontsize');

        },
        setlineheight(lineheight_) {
            this.setting.currentlineheight += lineheight_;
            this.setLocalStorageSet('currentlineheight');
        },
        setbjcolor(bjcolor) {
            this.setting.currentbjcolor = bjcolor;
            this.setLocalStorageSet('currentbjcolor');
        },
        setskin(skin) {
            this.setting.currentskin = skin;
            this.setLocalStorageSet('currentskin');
        },
        setLocalStorageSet(mode) {
            var setting_ = JSON.parse(localStorage.setting);
            if (mode != 'currentskin' && mode != 'currentbjcolor') {
                setting_[mode] = this.setting[mode];
            } else {
                let darkmode = $('html').hasClass('dark');
                if (darkmode) {
                    setting_['dark']['currentbjcolor'] = this.setting['currentbjcolor'];
                    setting_['dark']['currentskin'] = this.setting['currentskin'];
                } else {
                    setting_['light']['currentbjcolor'] = this.setting['currentbjcolor'];
                    setting_['light']['currentskin'] = this.setting['currentskin'];
                }
            }
            localStorage.setting = JSON.stringify(setting_);
        },
        monitorscorll() {
            this.monitorscorll_to_top_bottom();
            this.monitorscorll_next_content();
        },
        monitorscorll_to_top_bottom() {
            var bottom = true;
            var top = true;
            $(window).scroll(() => {
                let _stop = $(window).scrollTop();
                var h = $(document).height();
                var speed = 300;
                if (_stop < h * 0.83) {
                    if (bottom) {
                        bottom = false;
                        $(".go-bottom").fadeTo(speed, 1);
                    }
                } else if (!bottom) {
                    bottom = true;
                    $(".go-bottom").fadeTo(speed, 0);
                }
                if (_stop >= h * 0.1) {
                    if (top) {
                        top = false;
                        $(".go-top").fadeTo(speed, 1);
                    }
                } else if (!top) {
                    top = true;
                    $(".go-top").fadeTo(speed, 0);
                }
            });
        },
        monitorscorll_next_content(mode) {
            if (mode && mode == 'unbind') {
                $(window).unbind('scroll', fun_scorll_next);
                return
            }
            var winheight = $(window).height();
            var getContentHeight = true;
            var shouldSwitch = false;
            var now_content_offset_top = 0;
            var now_content_height = 0;
            var fun_scorll_next = () => {
                if (!this.setting.readahead || !this.Infinitereadahead) {
                    return
                }
                let win_scroll_top = $(window).scrollTop();
                if (getContentHeight && $(".content-now").length > 0) {
                    now_content_offset_top = $(".content-now").offset().top;
                    now_content_height = $(".content-now").height();
                    getContentHeight = false;
                }
                if (!getContentHeight && !shouldSwitch && this.next_content && ((win_scroll_top - now_content_offset_top) >= (now_content_height * 0.75 - winheight * 0.6))) {
                    // console.log(' should show next content .');
                    this.preAppendContent(this.next_content, this.next_catalogue_name);
                    shouldSwitch = true;
                    return;
                }
                if (shouldSwitch && ((win_scroll_top - now_content_offset_top) >= (now_content_height - winheight * 0.6))) {
                    // console.log("切换contentid后----将要获取下一章");
                    shouldSwitch = false;
                    this.$router.push("/book/" + this.book_id + "/" + (Number(this.content_id) + 1));
                    this.content_id = (Number(this.content_id) + 1);
                    this.catalogue_name = this.next_catalogue_name;
                    this.tocontentid(this.content_id, Number(this.content_id) - 1);
                    document.title = this.catalogue_name;
                    this.setNowContent();
                    let catalogue = { catalogue_id: this.content_id, catalogue_name: this.catalogue_name };
                    updataBookShelf(this.book_id, catalogue);
                    this.getnextcontent(1);
                    getContentHeight = true;
                    return;
                }
            };
            $(window).bind('scroll', fun_scorll_next);
        },
        monitorkeydowm() {
            document.onkeydown = (e) => {
                let key = window.event.keyCode;
                if (key == 39 && !this.search_span_show) {
                    // window.location.href = "/book/" + this.book_id + "/" + (Number(this.content_id) + 1);
                    this.jumpcontent(Number(this.content_id) + 1);
                } else if (key == 37 && !this.search_span_show) {
                    // window.location.href = "/book/" + this.book_id + "/" + (Number(this.content_id) - 1);
                    this.jumpcontent(Number(this.content_id) - 1);
                }
            };
        },
        initcontent(new_content_id, old_content_id) {
            if (new_content_id) {
                this.content_id = new_content_id;
            }
            if (this.setting.readahead && new_content_id && old_content_id && new_content_id == old_content_id + 1 && this.next_content) {
                // 如果是预读的
                this.content = this.next_content;
                this.catalogue_name = this.next_catalogue_name;
                this.setContent(this.content, this.catalogue_name);
                document.title = this.catalogue_name;
                let catalogue = { catalogue_id: this.content_id, catalogue_name: this.catalogue_name };
                updataBookShelf(this.book_id, catalogue);
                this.getnextcontent(1);
                if (this.setting.Infinitereadahead) {
                    this.monitorscorll_next_content('unbind');
                    this.monitorscorll_next_content();
                }
            } else {
                this.getnowcontent(1);
            }
        },
        getnowcontent(count) {
            this.contentloading = true;
            this.content = "正在加载。";
            axios
                .get("/api/content/" + this.book_id + "/" + this.content_id)
                .then((res) => {
                    this.bookboxshow = true;
                    this.contentloading = false;
                    this.content = res.data.content;
                    this.catalogue_name = res.data.catalogue_name;
                    this.setContent(this.content, this.catalogue_name);
                    document.title = this.catalogue_name;

                    let catalogue = { catalogue_id: this.content_id, catalogue_name: this.catalogue_name };
                    updataBookShelf(this.book_id, catalogue);

                    if (this.setting.readahead) {
                        this.getnextcontent(1);
                    }
                })
                .catch((err) => {
                    if (count == 3) {
                        ElNotification({ message: '请求失败！请刷新！', type: 'error', duration: 2500 });
                        console.log(err);
                    } else {
                        ElNotification({ message: '第' + (count + 1) + '请求中...', type: 'error', duration: 2500 });
                        console.log('第' + (count + 1) + '请求中...');
                        setTimeout(() => {
                            this.getnowcontent(count + 1);
                        }, 3000);
                    }
                });
        },
        getnextcontent(count) {
            this.next_content = null;
            this.next_catalogue_name = null;
            axios
                .get("/api/content/" + this.book_id + "/" + (Number(this.content_id) + 1))
                .then((res) => {
                    this.next_content = res.data.content;
                    this.next_catalogue_name = res.data.catalogue_name;
                    // ElNotification({ message: '预读下一章成功。', type: 'success', duration: 1800 });
                })
                .catch((err) => {
                    // 5秒之后重新get，重复三次，成功continue，失败就null
                    if (count == 3) {
                        console.log('get next error。', err);
                    } else {
                        console.log('第' + (count + 1) + '请求中...');
                        setTimeout(() => {
                            this.getnextcontent(count + 1);
                        }, 5000);
                    }
                });
        },
        initcatalogue(count) {
            axios
                .get("/api/bookinfo/" + this.book_id)
                .then((res) => {
                    this.name = res.data.book_name;
                    this.author = res.data.book_author;
                    this.book_img_url = res.data.book_img_url;
                    this.catalogue_list = res.data.catalogue_text_list;
                    setTimeout(() => {
                        this.tocontentid(this.content_id);
                    }, 300);
                })
                .catch((err) => {
                    if (count == 3) {
                        ElNotification({ message: '请求失败！请刷新！', type: 'error', duration: 2500 });
                        console.log(err);
                    } else {
                        setTimeout(() => {
                            this.initcatalogue(count + 1);
                        }, 3000);
                    }
                });
        },
        initseting() {
            var setting_ = JSON.parse(localStorage.setting);
            for (var key in setting_) {
                if (key != 'dark' && key != 'light') {
                    this.setting[key] = setting_[key];
                }
            }
            let darkmode = $('html').hasClass('dark');
            console.log(darkmode, $('html'), $('html').class);
            if (darkmode) {
                this.setting['currentbjcolor'] = setting_['dark']['currentbjcolor'];
                this.setting['currentskin'] = setting_['dark']['currentskin'];
            } else {
                this.setting['currentbjcolor'] = setting_['light']['currentbjcolor'];
                this.setting['currentskin'] = setting_['light']['currentskin'];
            }
        },
        initbookshelf() {
            getBookShelf().then((res) => {
                this.bookshelf = res;
                if (this.bookshelf[this.book_id]) {
                    this.joinShelfBtnShow = false;
                }
            })
        },
        jumpcontent(value) {
            this.$router.push("/book/" + this.book_id + "/" + value);
            this.tocontentid(value, this.content_id);
            this.initcontent(value, Number(this.content_id));
            this.to_top();
        },
        downcurmusic(url) {
            window.open(url);
        },
        tocontentid(newContentId, oldContentId) {
            if (!this.catalogue_list) {
                return
            }
            $(".catalogue-container").animate(
                {
                    scrollTop:
                        $("#catalogue_" + newContentId).offset().top -
                        $(window).height() / 2 +
                        $(".catalogue-container").scrollTop() - $(window).scrollTop(),
                },
                70
            );
            $("#catalogue_" + newContentId).css({ background: "#000000a8", color: "#FFF" });
            if (oldContentId) {
                $("#catalogue_" + oldContentId).css({ background: "none", color: "#000" });
            }
        },
        searchbook() {
            let s = this.search_string ? "/book?s=" + this.search_string : "/book";
            this.$router.push(s);
        },
        mask_click() {
            this.set_span_show = false;
            if (this.ismobile) {
                this.showtool();
                this.closecatalogue();
                this.self_mask_show = false;
            }
        },
        showtool() {
            if ($('.tool-all').hasClass('hidden')) {
                $('.tool-all').removeClass('hidden');
                this.header_show = true;
                this.self_mask_show = true;
            } else {
                $('.tool-all').addClass('hidden');
                this.header_show = false;
            }
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
                $('.tool-left-bottom').css({ "left": "0" })
            } else {
                this.header_show = true;
            }
        },
        nextpage() {
            $("html,body").animate(
                {
                    scrollTop: $('html,body').scrollTop() + $(window).height() * 0.9,
                },
                50
            );
        },
        prepage() {
            $("html,body").animate(
                {
                    scrollTop: $('html,body').scrollTop() - $(window).height() * 0.9,
                },
                50
            );
        },
        showcatalogue() {
            if ($('.catalogue-module').hasClass('catalogue-show')) {
                $('.catalogue-module').removeClass('catalogue-show');
                $('.catalogue-module').css({ "left": "calc(.5rem - 50%)" });
            } else {
                $('.catalogue-module').addClass('catalogue-show');
                $('.catalogue-module').css({ "left": "0" });
                this.self_mask_show = true;
            }
        },
        closecatalogue() {
            if ($('.catalogue-module').hasClass('catalogue-show')) {
                $('.catalogue-module').removeClass('catalogue-show');
                $('.catalogue-module').css({ "left": "calc(.5rem - 50%)" });
            }
        },
        setContent(content, catalogue_name) {
            $('.content').html('<div class="content-now"><div class="text-2xl p-3 tracking-widest text-center">' + catalogue_name + '</div><div class="py-3 px-3 sm:px-9">' + content + '</div></div>');
        },
        preAppendContent(content, catalogue_name) {
            $('.content').append('<div class="content-prenow"><div class="text-2xl p-3 tracking-widest text-center">' + catalogue_name + '</div><div class="py-3 px-3 sm:px-9">' + content + '</div></div>')
        },
        setNowContent() {
            if ($(".content-now").length > 0) {
                $(".content-now").addClass('content-old');
                $(".content-now").removeClass('content-now');
            }
            if ($(".content-prenow").length > 0) {
                $(".content-prenow").addClass('content-now');
                $(".content-prenow").removeClass('content-prenow');
            }
        },
        userLog(mode) {
            if (mode == 'login') {
                getBookShelf().then((res) => {
                    this.bookshelf = res;
                });
            }
        },
        getMouseXY(e) {
            if (!this.ismobile) return
            let s_height = window.innerHeight;
            let c_width = this.$refs.content.clientWidth
            let x = e.offsetX
            let y = e.y
            if (y >= s_height / 3 * 2 || x >= c_width / 3 * 2) {
                this.nextpage();
            } else if (y <= s_height / 3 || x <= c_width / 3) {
                this.prepage();
            } else {
                this.showtool();
            }
        },
        darkModeChange() {
            this.initseting();
        }
    },
};
</script>

<style scoped>
@import "../../assets/css/content.css";

.app {
    overflow: hidden;
    display: flex;
    justify-content: center;
}

#search input {
    background: none;
    border: none;
    border-bottom: 1px solid #000;
    margin: 0.2em 0.75rem;
    font-size: 1.3rem;
    vertical-align: middle;
    color: #000;
    max-width: 10rem;
}

#search input::-webkit-input-placeholder {
    color: #00000099;
}

#search input:focus {
    outline: none;
}

.bounce-enter-active {
    animation: bounce-in 0.2s;
}

.bounce-leave-active {
    animation: bounce-in 0.2s reverse;
}

@keyframes bounce-in {
    0% {
        opacity: 0;
        -webkit-transform: translateY(-20px);
        -ms-transform: translateY(-20px);
        transform: translateY(-20px);
    }

    100% {
        opacity: 1;
        -webkit-transform: translateY(0);
        -ms-transform: translateY(0);
        transform: translateY(0);
    }
}

.back-mask {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 1;
}
</style>
