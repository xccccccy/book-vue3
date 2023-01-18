<template>
    <div class="">
        <div
            class="movie-item rounded-md shadow-xl overflow-hidden dark:bg-slate-700 dark:bg-opacity-70 border-gray-300 dark:border-opacity-20 dark:border-violet-500">
            <div class="detail flex-1 flex flex-col items-start py-4 px-6" style="">
                <div class="title cursor-pointer flex w-full items-baseline">
                    <span>{{ videoStore.videoItem.name }}</span>
                    <div class="mx-1 text-xs font-normal bg-orange-100 dark:bg-black rounded" style="padding: 2px 6px;">
                        {{ videoStore.videoItem.note }}
                    </div>
                    <div class="ml-auto text-xs font-light opacity-50">{{ videoStore.videoItem.id}}</div>
                </div>
                <div class="flex space-x-3 items-center text-gray-500">
                    <div class="date">{{ videoStore.videoItem.area }}</div>
                    <div class="border-current h-1 border-r"
                        v-show="videoStore.videoItem.director && videoStore.videoItem.director.length"></div>
                    <div class="author" v-show="videoStore.videoItem.director && videoStore.videoItem.director.length">
                        {{ videoStore.videoItem.director }}</div>
                    <div class="border-current h-1 border-r"
                        v-show="videoStore.videoItem.lang && videoStore.videoItem.lang.length"></div>
                    <div class="date">{{ videoStore.videoItem.lang }}</div>
                </div>
                <div class="actor text-sm text-slate-600 dark:text-slate-400">{{ videoStore.videoItem.actor }}</div>
                <div class="mt-auto des" v-html="videoStore.videoItem.des">
                </div>
                <div v-show="series_bottom.length > 0">
                    <div class="flex flex-wrap">
                        <div v-for="(serie, index) in series_bottom" :key="serie.name" @click="selectSerie(index)"
                            class="border border-violet-300 border-opacity-50 dark:border-opacity-60 dark:border-violet-500 rounded px-6 py-1 mx-2 mt-3 bg-indigo-200 bg-opacity-30 dark:bg-indigo-800 dark:bg-opacity-40 cursor-pointer text-lg flex justify-center">
                            {{ serie.name }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { computed } from '@vue/reactivity'
import { useVideoStore } from './videoStore'

var videoStore = useVideoStore()

// series_bottom
const series_bottom = computed(() => {
    let _series = []
    if (Object.keys(videoStore.videoItem).length == 0) { return _series }
    videoStore.videoItem.url.split('#').forEach(seriesUrl => {
        let serie = {};
        serie.name = seriesUrl.split('$')[0];
        serie.url = seriesUrl.split('$')[1];
        _series.push(serie)
    });
    return _series
})

const selectSerie = (index) => {
    videoStore.playerOptions.poster = videoStore.videoItem.pic;
    videoStore.playerOptions.name = videoStore.videoItem.name + " " + series_bottom.value[index].name;
    videoStore.playerOptions.src = series_bottom.value[index].url;
    videoStore.showing = "player";
    videoStore.playVideo();
}

</script>

<style scoped>
.movie-item {
    display: flex;
    margin: 1rem 0;
}

.movie-item .cover {
    position: relative;
    width: 160px;
    overflow: hidden;
    background: #000;
}

.movie-item .cover img:hover {
    opacity: .9;
    transform: scale(1.25, 1.25);
}

.movie-item .cover img {
    width: 100%;
    transition: transform ease .25s;
    aspect-ratio: 166/242;
}

.movie-item .cover .duration {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 3px 6px;
    line-height: 1.2em;
    background-color: rgba(0, 0, 0, .65);
    color: #fff;
    font-size: 12px;
    border-radius: 2px;
}

.movie-item .detail>div {
    margin-bottom: .6rem;
}

.movie-item .detail .title {
    font-size: 1.3rem;
    font-weight: 600;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    text-overflow: -o-ellipsis-lastline;
    text-overflow: ellipsis;
    word-break: break-word;
    -webkit-line-clamp: 2;
}

.movie-item .detail .date,
.movie-item .detail .author {
    font-size: .9rem;
    font-weight: 500;
}

.movie-item .detail .data.hot {
    background-color: #ff6060;
}

.ww {
    width: 4rem;
}

.des {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    text-overflow: -o-ellipsis-lastline;
    text-overflow: ellipsis;
    word-break: break-word;
    -webkit-line-clamp: 10;
}

.actor {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    text-overflow: -o-ellipsis-lastline;
    text-overflow: ellipsis;
    word-break: break-word;
    -webkit-line-clamp: 1;
}
</style>