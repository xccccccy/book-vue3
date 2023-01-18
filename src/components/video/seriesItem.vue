<template>
    <div v-show="Object.keys(videoStore.videoItem).length > 0 ? videoStore.videoItem.url.split('#').length > 1 : false"
        class="pl-2 pb-2 mb-4 border-violet-300 border-opacity-50 dark:border-opacity-60 dark:border-violet-500 border rounded-md dark-transition shadow-xl dark:shadow-none bg-slate-200 dark:bg-slate-700 backdrop-filter bg-opacity-50 dark:bg-opacity-50">
        <div
            class="my-2 flex items-center border-b pb-2 border-violet-300 border-opacity-80 dark:border-opacity-60 dark:border-violet-500">
            <span class="pl-2">剧集列表</span>
            <span class="px-1 text-sm">{{ "(" + String(activateindex + 1) + "/" + series.length + ")" }}</span>
            <div class="ml-auto flex items-center space-x-1 pr-2">
                <span class="text-sm text">自动连播</span>
                <el-switch v-model="autoPlayContinue" />
            </div>
        </div>
        <div style="max-height: 55vh; overflow:scroll; padding-right: .6rem;">
            <div>
                <div v-for="(serie, index) in series" :key="serie.name" :class="{ active: activateindex == index }"
                    @click="changeMovie(index)"
                    class="w-full flex items-center p-2 cursor-pointer text-sm rounded-md hover:text-blue-800 hover:bg-blue-100 hover:dark:bg-slate-600 hover:dark:text-blue-300">
                    <span class="pr-2">{{ "P" + (index + 1) }}</span>
                    <span>{{ serie.name }}</span>
                    <svg t="1666626600841" viewBox="0 0 1024 1024" version="1.1" class="ml-auto hidden"
                        xmlns="http://www.w3.org/2000/svg" p-id="7788" width="1.3rem" height="1.3rem">
                        <path class=" dark:fill-blue-500"
                            d="M544 128v768h-64V128h64z m-192 128v512H288V256h64z m384 0v512h-64V256h64zM160 384v256H96v-256h64z m768 0v256h-64v-256h64z"
                            fill="#383F4A" p-id="7789"></path>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { ref } from 'vue';

import { useVideoStore } from './videoStore'

var videoStore = useVideoStore()

export default {
    name: 'SeriesItem',
    setup(props, context) {
        const activateindex = computed(() => {
            let index = series.value.findIndex((serie) => { return videoStore.playerOptions.src == serie.url });
            return index >= 0 ? index : 0;
        });
        const series = computed(() => {
            let _series = []
            if (Object.keys(videoStore.videoItem).length == 0) { return _series }
            videoStore.videoItem.url.split('#').forEach(movieUrl => {
                let serie = {};
                serie.name = movieUrl.split('$')[0];
                serie.url = movieUrl.split('$')[1];
                _series.push(serie)
            });
            return _series
        })

        const changeMovie = (index) => {
            videoStore.playerOptions.poster = videoStore.videoItem.pic;
            videoStore.playerOptions.name = videoStore.videoItem.name + " " + series.value[index].name;
            videoStore.playerOptions.src = series.value[index].url;
            videoStore.showing = 'player';
            videoStore.playVideo();
        }

        const autoPlayContinue = ref(true);
        return { changeMovie, series, autoPlayContinue, activateindex, videoStore }
    },
}
</script>

<style scoped>
.dark .active {
    color: rgb(147 197 253);
    background-color: rgb(51, 61, 75);
}

.active {
    color: rgb(30 64 175);
    background-color: rgb(213, 227, 245);
}

.active>svg {
    display: block !important;
}
</style>

