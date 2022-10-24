<template>
    <div class="app w-full sm:w-9/12 2xl:w-9/12 pt-12 sm:pt-16 text-left pb-14">
        <Header :headerSetting="headerSetting"></Header>
        <Background></Background>
        <div class="main relative">
            <transition name="bounce">
                <div v-show="showing == 'player'">
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
                    <div class="flex w-full">
                        <div class="flex-auto">
                            <div class="mb-3 mr-6 ml-1 sm:ml-0 shadow-xl">
                                <video-player :src="options.src" :poster="options.poster" controls :loop="true"
                                    :volume="0.6" :muted="options.muted"
                                    class="demo-player w-auto h-auto vjs-big-play-centered" @mounted="handleMounted" />
                            </div>
                            <ElInput v-model="test"></ElInput>
                            <ElButton @click="test2"></ElButton>
                        </div>
                        <div class="hidden sm:block" style="max-width: 21rem;min-width: 19rem;">
                            <div v-show="seriesShow">
                                <SeriesItem :item="series" @selectVideoSeries="selectVideoSeries"></SeriesItem>
                            </div>
                            <div class="">
                                <div class="my-2">播放列表</div>
                                <MovieItem v-for="movie in videoList" :key="movie.cover" :item="movie"
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
            </transition>
            <transition name="bouncereverse">
                <div v-show="showing == 'search'">
                    <div class="search-two">
                        <el-input v-model="search_string" placeholder="搜索视频。" class="input-with-select"
                            @keyup.enter="searchVideo()" size="large">
                            <template #suffix>
                                <el-icon class="el-input__icon" @click="searchVideo()">
                                    <Search />
                                </el-icon>
                            </template>
                        </el-input>
                    </div>
                    <div class="list-title flex">
                        <span v-html="search_info"></span>
                        <div class="flex cursor-pointer ml-auto items-center" @click="togglePanel">
                            <span>播放器</span>
                            <ArrowRight class="h-4 px-2" />
                        </div>
                    </div>
                    <div>
                        <VideoItem v-for="video in videoList" :key="video.id" :item="video" @selectVideo="selectVideo">
                        </VideoItem>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>
  
<script setup>
import { ref, reactive, onMounted, shallowRef } from 'vue'
import { VideoPlayer } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
import { ArrowLeft, ArrowRight, Search } from '@element-plus/icons-vue'
import VideoItem from './VideoItem.vue'
import SeriesItem from './seriesItem.vue'
import axios from "axios";

import MovieItem from './MovieItem.vue'
import RecommendedItem from './Recommended.vue'
import DATA from './data'
import { computed } from '@vue/reactivity'

const player = shallowRef()
const options = reactive({
    autoplay: false,
    controls: false,
    muted: false,
    poster: '/1.jpg',
    volume: 0.1,
    src: 'https://hnzy.bfvvs.com/play/YerknV2a/index.m3u8',
    name: 'something'
})

const movieList = ref([])
const recommendList = [DATA[2], DATA[4], DATA[1], DATA[0]]

const handleMounted = (payload) => {
    console.log('Advanced player mounted', payload)
    player.value = payload.player
}

const toggleVideo = () => {
    player.value?.pause()
}

const search_string = ref('')
const search_info = ref('暂无搜索。')
const searchVideo = (s) => {
    let search_s = s || search_string.value;
    axios.post("/videoapi/search", {
        's': search_s
    }).then((res) => {
        console.log(res);
        videoList.value = res.data.videos;
    }).catch((err) => {
        console.log(err)
    })
}
const headerSetting = ref({
    headerSettings: [
        {
            type: 'search',
            placeholder: "搜索。",
            clickHandle: searchVideo
        }
    ]
})

const series = ref({});
const seriesShow = computed(() => {
    return Object.keys(series.value).length > 0
})
const videoList = ref([])
const selectVideo = (item) => {
    let videoNumber = item.url.split('#').length
    if (videoNumber > 1) {
        series.value = item;

        // ------------------------------test-------------------------------------
        let movies = []
        item.url.split('#').forEach(movieUrl => {
            let movie = JSON.parse(JSON.stringify(item));
            movie.name = item.name + movieUrl.split('$')[0];
            movie.url = movieUrl.split('$')[1];
            movies.push(movie)
        });
        movieList.value = movies;
        // ----------------------------------------------------------------------

        options.src = item.url.split('#')[0].split('$')[1];
        options.name = item.name + " " + item.url.split('$')[0];
    } else {
        series.value = {};
        options.src = item.url.split('$')[1];
        options.name = item.name;
    }
    options.poster = item.pic;
    showing.value = 'player'
}

const selectVideoSeries = (item) => {
    options.src = item.url;
    options.name = item.name;
    options.poster = item.pic;
    showing.value = 'player'
}
// ---------------------------------test---------------------------------------------------
const showing = ref('search')
const changeSrc = () => {
    options.src = "/rainmood.m4a"
    setTimeout(() => {
        player.value?.play()
    }, 200)
}
const togglePanel = () => {
    if (showing.value == 'search') {
        showing.value = 'player'
    } else {
        showing.value = 'search'
    }
}
const test = ref('')
const test2 = () => {
    options.src = test.value;
    window.open('https://okjx.cc/?url=' + test.value, "_blank");
}
// ----------------------------------------------------------------------------------------
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

.bounce-enter-active {
    animation: bounce-in 0.2s ease-in-out;
}

.bounce-leave-active {
    animation: bounce-in 0.2s ease-in-out reverse;
}

.bouncereverse-enter-active {
    animation: bounce-out 0.2s ease-in-out;
}

.bouncereverse-leave-active {
    animation: bounce-out 0.2s ease-in-out reverse;
}

@keyframes bounce-in {
    0% {
        /* opacity: 0; */
        -webkit-transform: translateX(100vw);
        -ms-transform: translateX(100vw);
        transform: translateX(100vw);
    }

    100% {
        /* opacity: 1; */
        -webkit-transform: translateX(0);
        -ms-transform: translateX(0);
        transform: translateX(0);
    }
}

@keyframes bounce-out {
    0% {
        /* opacity: 0; */
        -webkit-transform: translateX(-100vw);
        -ms-transform: translateX(-100vw);
        transform: translateX(-100vw);
    }

    100% {
        /* opacity: 1; */
        -webkit-transform: translateX(0);
        -ms-transform: translateX(0);
        transform: translateX(0);
    }
}

.main>div {
    min-height: 80vh;
    position: relative;
    width: 100%;
}

.search-two {
    margin: 1rem auto;
    max-width: 40rem;
}

.search-two .el-input__icon {
    font-size: 1.5rem;
    cursor: pointer;
}

.input-with-select {
    opacity: 0.8;
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
</style>