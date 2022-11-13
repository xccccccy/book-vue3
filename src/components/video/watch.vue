<template>
    <div class="bg-zinc-200 dark:bg-zinc-900">
        <div class="app w-24/25 lg:w-10/12 xl:w-9/12 pt-12 sm:pt-16 text-left pb-14 mx-auto">
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
                <div v-show="videoStore.showing == 'search'">
                    <SearchRelation @togglePanel="togglePanel" ref="searchComponent"></SearchRelation>
                </div>
                <div v-show="videoStore.showing == 'info'">
                    <VideoInfo></VideoInfo>
                </div>
                <div v-show="videoStore.showing == 'player'">
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
                                    <h3> {{ videoStore.playerOptions.name }}</h3>
                                </div>
                            </div>
                            <div class="mb-3 mr-6 ml-1 sm:ml-0 shadow-xl">
                                <video-player :src="videoStore.playerOptions.src"
                                    :poster="videoStore.playerOptions.poster" controls :loop="true" :volume="0.6"
                                    :muted="videoStore.playerOptions.muted"
                                    class="demo-player w-auto h-auto vjs-big-play-centered" @mounted="handleMounted" />
                            </div>
                        </div>
                        <div class="hidden sm:block" style="max-width: 21rem;min-width: 19rem;">
                            <!-- 剧集列表 -->
                            <div class="mt-10">
                                <SeriesItem></SeriesItem>
                            </div>
                            <!-- 播放列表 -->
                            <!-- <div class="">
                            <div class="my-2">播放列表</div>
                            <PlayList v-for="movie in videoList.slice(0, 10)" :key="movie.cover" :item="movie">
                            </PlayList>
                        </div> -->
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
    </div>
</template>
  
<script setup>
import { ref, onUnmounted, watch } from 'vue'
import { VideoPlayer } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
import { ArrowLeft, ArrowRight, ArrowDown, Search, Close } from '@element-plus/icons-vue'
import SeriesItem from './seriesItem.vue'
import { useHeaderStore } from '../../stores/header'

import PlayList from './playList.vue'
import RecommendedItem from './Recommended.vue'
import DATA from './data'
import VideoInfo from './videoInfo.vue'

import { useVideoStore } from './videoStore'
import SearchRelation from './searchRelation.vue'

const searchComponent = ref(null)
var videoStore = useVideoStore()

const togglePanel = () => {
    videoStore.pauseVideo();
    if (videoStore.showing == 'search') {
        videoStore.showing = 'player'
        setTimeout(() => {
            document.getElementsByClassName('demo-player')[0].scrollIntoView({ block: "center" });
        }, 10)
    } else {
        videoStore.showing = 'search'
    }
}

const handleMounted = (payload) => {
    videoStore.player = payload.player;
}

const recommendList = [DATA[2], DATA[4], DATA[1], DATA[0]]

const searchVideo = (s) => {
    searchComponent.value.searchVideo(s);
}

const headerStore = useHeaderStore();
headerStore.$patch({
    headerSetting: {
        headerSettings: [
            {
                type: 'search',
                placeholder: "搜索",
                clickHandle: searchVideo
            }
        ]
    }
})

onUnmounted(() => {
    headerStore.resetHeader()
})

</script>
  
<style scoped>
.w-big {
    width: 95%;
}

.lg\:w-11\/12 {
    width: 92.666667%;
}

.demo-player {
    aspect-ratio: 5 / 3;
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
</style>