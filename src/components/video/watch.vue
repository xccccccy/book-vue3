<template>
    <div class="app w-full lg:w-9/12 pt-12 sm:pt-16 text-left pb-14">
        <Background></Background>
        <!-- <iframe width="100%" style="height: 50vh; width:100%;" allowTransparency="true" frameborder="0" scrolling="no"
                            allowfullscreen="true"
                            src="https://api.okjx.cc:3389/jx.php?url=https://v.qq.com/x/cover/mzc002007rb113r/p0044l78gj3.html"
                            autoPlay=true></iframe> -->
        <!-- <iframe style="height: 50vh; width:100%;"
            src="https://jx.xmflv.com/?url=https://v.qq.com/x/cover/mzc002002064ykw/p0044njv2yq.html"></iframe> -->
        <!-- <iframe style="height: 50vh; width:100%;"
            src="https://okjx.cc/?url=https://v.qq.com/x/cover/mzc002002064ykw/p0044njv2yq.html&a=32nb42"></iframe> -->
        <!-- <iframe style="height: 50vh; width:100%;"
            src="https://jx.m3u8.tv/jiexi/?url=https://v.qq.com/x/cover/i4d7psclvhc4q0o.html"></iframe> -->
        <div class="main">
            <div v-show="showing == 'search'">
                <div class="search-two">
                    <el-input v-model="search_string" placeholder="搜索电影、剧集、人物，或者输入其他视频网站地址进行解析"
                        class="input-with-select dark:bg-slate-900 dark:bg-opacity-30 rounded-md"
                        @keyup.enter="searchVideo()" size="large">
                        <template #suffix>
                            <el-icon class="el-input__icon" @click="searchVideo()" v-show="!JX_show">
                                <Search />
                            </el-icon>
                            <div v-show="JX_show">
                                <el-select v-model="currentJXUrl" class="m-2 w-32" placeholder="Select" size="default">
                                    <el-option v-for="(value, key) in JXUrlDict" :key="key" :label="key"
                                        :value="value" />
                                </el-select>
                                <ElButton @click="searchVideo()">解析</ElButton>
                            </div>
                        </template>
                    </el-input>
                </div>
                <div>
                    <div class="border border-l-8 border-l-green-400 p-4">可以搜索影视资源，或者输入网址进行解析播放。</div>
                </div>
                <div class="list-title flex">
                    <span v-html="search_info"></span>
                    <div class="flex cursor-pointer ml-auto items-center" @click="togglePanel">
                        <span>播放器</span>
                        <ArrowRight class="h-4 px-2" />
                    </div>
                </div>
                <div v-show="videoList.length > 0">
                    <div class="flex items-start">
                        <div class="rounded-lg border dark:border-slate-700 overflow-hidden shadow-lg hidden sm:block"
                            style="width: 27%; min-width: 260px;">
                            <h3 class="p-5 bg-sky-500 text-white dark:bg-slate-700 font-semibold text-xl">搜索结果</h3>
                            <ul class="py-2 type bg-white dark:bg-slate-900">
                                <li :class="{ activateli : searchTypeActivateType == key}" class="cursor-pointer"
                                    v-for="(value, key) in searchType" :key="key" @click="selectType(key)">
                                    <div class="flex justify-between items-center">
                                        <span>{{ key }}</span>
                                        <div
                                            class="px-3 font-medium text-sm bg-slate-100 dark:bg-slate-200 text-stone-900 rounded-md">
                                            {{ value }}</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="ml-6 w-full">
                            <VideoItem v-for="video in filterVideoList" :key="video.id" :item="video"
                                @selectVideo="selectVideo">
                            </VideoItem>
                        </div>
                    </div>
                </div>
                <div class="hidden">
                    <ElInput v-model="test"></ElInput>
                    <ElButton @click="test2">解析</ElButton>
                    <ElButton @click="test3">换源</ElButton>
                </div>
            </div>
            <div v-show="showing == 'player'">
                <div class="flex w-full">
                    <div class="flex-auto">
                        <!-- player 一列 -->
                        <div class="flex mb-4 items-center">
                            <div @click="togglePanel" class="flex items-center cursor-pointer pr-2">
                                <ArrowLeft class="h-4 px-2" />
                                <span> 返回 </span>
                            </div>
                            <el-divider direction="vertical" />
                            <div class="pl-2">
                                <h3> {{ options.name }}</h3>
                            </div>
                        </div>
                        <div class="mb-3 mr-6 ml-1 sm:ml-0 shadow-xl">
                            <video-player :src="options.src" :poster="options.poster" controls :loop="true"
                                :volume="0.6" :muted="options.muted"
                                class="demo-player w-auto h-auto vjs-big-play-centered" @mounted="handleMounted" />
                        </div>
                        <div class="">
                            <div class="flex flex-wrap">
                                <div v-for="(serie, index) in series_bottom.slice(0, maxShowNum)" :key="serie.name"
                                    @click="changeVideo(index)"
                                    class="border border-violet-300 border-opacity-50 dark:border-opacity-60 dark:border-violet-500 rounded px-6 py-1 mx-2 mt-3 bg-indigo-200 bg-opacity-30 dark:bg-indigo-800 dark:bg-opacity-40 cursor-pointer text-lg flex justify-center"
                                    :class="{ ww: series_bottom.length > (maxShowNum + 1) / 2 }">
                                    {{ series_bottom.length > (maxShowNum + 1) / 2 ? String(index + 1) : serie.name }}
                                </div>
                                <div v-show="series_bottom.length > maxShowNum">
                                    <div @click="changeVideo(0)"
                                        class="border border-violet-300 border-opacity-50 dark:border-opacity-60 dark:border-violet-500 rounded px-6 py-1 mx-2 mt-3 bg-indigo-200 bg-opacity-30 dark:bg-indigo-800 dark:bg-opacity-40 cursor-pointer text-lg flex justify-center">
                                        ...
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="hidden sm:block" style="max-width: 21rem;min-width: 19rem;">
                        <!-- 剧集列表 -->
                        <div v-show="seriesShow" class="mt-10">
                            <SeriesItem :item="seriesItem" @selectVideoSeries="selectVideoSeries"></SeriesItem>
                        </div>
                        <!-- 播放列表 -->
                        <div class="">
                            <div class="my-2">播放列表</div>
                            <MovieItem v-for="movie in videoList.slice(0, 10)" :key="movie.cover" :item="movie"
                                @selectVideo="selectVideo"></MovieItem>
                        </div>
                    </div>
                </div>
                <div v-if="false">
                    <div class="recommend-list">
                        <RecommendedItem v-for="movie in recommendList" :key="movie.cover" :item="movie">
                        </RecommendedItem>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
  
<script setup>
import { ref, reactive, onMounted, shallowRef, onUnmounted } from 'vue'
import { VideoPlayer } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
import { ArrowLeft, ArrowRight, Search } from '@element-plus/icons-vue'
import VideoItem from './VideoItem.vue'
import SeriesItem from './seriesItem.vue'
import axios from "axios";
import { useHeaderStore } from '../../stores/header'

import MovieItem from './MovieItem.vue'
import RecommendedItem from './Recommended.vue'
import DATA from './data'
import { computed } from '@vue/reactivity'



const showing = ref('search')

const togglePanel = () => {
    pauseVideo()
    if (showing.value == 'search') {
        showing.value = 'player'
        setTimeout(() => {
            document.getElementsByClassName('demo-player')[0].scrollIntoView({ block: "center" });
        }, 10)
    } else {
        showing.value = 'search'
    }
}

// player
const player = shallowRef()
const options = reactive({
    autoplay: false,
    controls: false,
    muted: false,
    poster: '/1.jpg',
    volume: 0.1,
    src: '',
    name: 'something'
})
const videoList = ref([])

const filterVideoList = computed(() =>
    videoList.value.filter((item) =>
        searchTypeActivateType.value == "all" ||
        item.type == searchTypeActivateType.value
    )
)

const handleMounted = (payload) => {
    player.value = payload.player
}

const pauseVideo = () => {
    setTimeout(() => {
        player.value?.pause()
    }, 20)
}

const playVideo = () => {
    setTimeout(() => {
        player.value?.play()
    }, 20)
    setTimeout(() => {
        document.getElementsByClassName('demo-player')[0].scrollIntoView({ block: "center" });
    }, 10)
}

const recommendList = [DATA[2], DATA[4], DATA[1], DATA[0]]

// search
const search_string = ref('')
const search_info = ref('暂无搜索。')
const searchVideo = (s) => {
    let search_s = s || search_string.value;
    if (search_s.includes("http")) {
        jumpJX(search_s)
        return
    }
    if (search_s == "" || !search_s) {
        ElNotification({ title: '搜索不能为空。', type: 'warning', duration: 1600 });
        return
    };
    axios.post("/videoapi/search", {
        's': search_s
    }).then((res) => {
        console.log(res);
        videoList.value = res.data.videos;
        search_info.value = videoList.value.length ? "搜索到" + String(videoList.value.length) + "条相关资源" : '暂无资源'
        let types = {}
        res.data.videos.forEach(item => {
            types[item.type] ? types[item.type] += 1 : types[item.type] = 1;
        });
        searchType.value = types;
    }).catch((err) => {
        console.log(err)
    }).finally(() => {
        searchTypeActivateType.value = "all";
    })
}
const JX_show = computed(() => {
    return search_string.value.includes("http")
})
const JXUrlDict = ref({
    "m3u8": "https://jx.m3u8.tv/jiexi/?url=",
    "okjx": "https://okjx.cc/?url=",
    "虾米": "https://jx.xmflv.com/?url="
})
const currentJXUrl = ref('https://okjx.cc/?url=')
const jumpJX = (url) => {
    window.open(currentJXUrl.value + url, "_blank");
}

const searchType = ref({
    "电影": 166,
    "剧集": 26,
    "综艺": 828,
    "动漫": 720,
    "电视剧": 8969
})
const searchTypeActivateType = ref("all");
const selectType = (type) => {
    type == searchTypeActivateType.value ? searchTypeActivateType.value = "all" : searchTypeActivateType.value = type;
}

// 剧集列表 series_right
const seriesItem = ref({});
const seriesShow = computed(() => {
    return Object.keys(seriesItem.value).length > 0
})

// videoItem select func
const selectVideo = (item) => {
    options.src = item.currentUrl;
    options.name = item.currentName;
    options.poster = item.pic;
    showing.value = 'player'
    seriesItem.value = item.url.split('#').length > 1 ? item : {};
    setTimeout(() => {
        document.getElementsByClassName('demo-player')[0].scrollIntoView({ block: "center" });
    }, 10)
}

// SeriesItem 剧集列表 select func
const selectVideoSeries = (item) => {
    options.src = item.url;
    options.name = item.name;
    options.poster = item.pic;
    showing.value = 'player'
    playVideo()
}

// series_bottom
const series_bottom = computed(() => {
    let _series = []
    if (Object.keys(seriesItem.value).length == 0) { return _series }
    seriesItem.value.url.split('#').forEach(movieUrl => {
        let serie = {};
        serie.name = movieUrl.split('$')[0];
        serie.url = movieUrl.split('$')[1];
        _series.push(serie)
    });
    return _series
})

const maxShowNum = ref(100);

const test = ref('')
const test2 = (url) => {
    let _url = url || test.value;
    window.open('https://okjx.cc/?url=' + _url, "_blank");
}
const test3 = () => {
    options.src = test.value;
}
const headerStore = useHeaderStore();
headerStore.$patch({
    headerSetting: {
        headerSettings: [
            {
                type: 'search',
                placeholder: "搜索。",
                clickHandle: searchVideo
            }
        ]
    }
})
onMounted(() => {
    headerStore.$patch({});
})

</script>
  
<style scoped>
.demo-player {
    aspect-ratio: 5 / 3;
}

.example-player {
    position: relative;
    height: 410px;
    background-color: #000;
    font-weight: normal;
}

.movie-detail {
    padding-top: 20px;
    color: rgba(0, 0, 0, .65);
}

.movie-detail .date {
    font-size: 14px;
}

.movie-detail .desc {
    font-size: 13px;
    padding: 10px 20px 10px 0;
}

.movie-detail .btn-wrap {
    padding-right: 20px;
    text-align: right;
}

.play-list h2 {
    font-size: 18px;
    color: rgba(0, 0, 0, .85);
    padding-bottom: 10px;
}

.recommend-list {
    margin-top: 40px;
    padding-top: 40px;
    padding-bottom: 40px;
    border-top: 1px solid #ddd;
}

.recommend-list:after {
    content: '';
    display: block;
    clear: both;
}

.main>div {
    min-height: 80vh;
    width: 100%;
}

.search-two {
    margin: 1rem auto;
}

.search-two .el-input__icon {
    font-size: 1.5rem;
    cursor: pointer;
}

.input-with-select {
    opacity: 0.9;
    color: #000;
}

.el-input__icon {
    color: #4642c5;
    font-size: 1.3rem;
}

.list-title {
    font-size: 1.3rem;
    padding: .7rem 1%;
    text-align: left;
    font-weight: 500;
}

.list-title span {
    vertical-align: middle;
}

.type li {
    padding: .8rem 1.3rem;
    font-family: 'Roboto Mono', monospace;
}

.activateli {
    background-color: rgb(241 245 249);
}

.dark .activateli {
    background-color: rgb(61, 61, 62);
}

.activateli span {
    font-weight: 600;
}

.activateli>div>div {
    background-color: white;
}

.type li:hover {
    background-color: rgb(241 245 249);
}

.dark .type li:hover {
    background-color: rgb(61, 61, 62);
}

.type li:hover span {
    font-weight: 600;
}

.type li:hover>div>div {
    background-color: white;
}

.ww {
    width: 4rem;
}
</style>