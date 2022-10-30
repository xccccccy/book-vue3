<template>
    <div
        class="movie-item border rounded-md shadow-xl dark:bg-slate-700 dark:bg-opacity-70 border-gray-300 overflow-hidden dark:border-opacity-20 dark:border-violet-500">
        <div class="cover cursor-pointer" @click="changeVideo(0)">
            <img :src="item.pic" alt="cover" loading="lazy" />
            <div class="duration">{{ item.year }}</div>
        </div>
        <div class="detail flex-1 flex flex-col items-start py-4 px-6" style="">
            <div class="title cursor-pointer flex w-full items-baseline" @click="changeVideo(0)">
                <span>{{ item.name }}</span>
                <div class="mx-1 text-xs font-normal bg-orange-100 dark:bg-black rounded" style="padding: 2px 6px;">
                    {{ item.note }}
                </div>
                <div class="ml-auto text-xs font-light opacity-50">{{ item.id}}</div>
            </div>
            <div class="flex space-x-3 items-center text-gray-500">
                <div class="date">{{ item.area }}</div>
                <div class="border-current h-1 border-r" v-show="item.director.length"></div>
                <div class="author" v-show="item.director.length">{{ item.director }}</div>
                <div class="border-current h-1 border-r" v-show="item.lang.length"></div>
                <div class="date">{{ item.lang }}</div>
            </div>
            <div class="actor text-sm text-slate-600 dark:text-slate-400">{{ item.actor }}</div>
            <div class="mt-auto des" v-html="item.des">
            </div>
            <div class="hidden">
                <div class="flex flex-wrap">
                    <div v-for="(serie, index) in series.slice(0, maxShowNum)" :key="serie.name"
                        @click="changeVideo(index)"
                        class="border border-violet-300 border-opacity-50 dark:border-opacity-60 dark:border-violet-500 rounded px-6 py-1 mx-2 mt-3 bg-indigo-200 bg-opacity-30 dark:bg-indigo-800 dark:bg-opacity-40 cursor-pointer text-lg flex justify-center"
                        :class="{ ww: series.length > (maxShowNum + 1) / 2 }">
                        {{ series.length > (maxShowNum + 1) / 2 ? String(index + 1) : serie.name }}
                    </div>
                    <div v-show="series.length > maxShowNum">
                        <div @click="changeVideo(0)"
                            class="border border-violet-300 border-opacity-50 dark:border-opacity-60 dark:border-violet-500 rounded px-6 py-1 mx-2 mt-3 bg-indigo-200 bg-opacity-30 dark:bg-indigo-800 dark:bg-opacity-40 cursor-pointer text-lg flex justify-center">
                            ...
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
    props: {
        item: Object,
    },
    name: 'VideoItem',
    emits: ['selectVideo'],
    setup(props, context) {

        const maxShowNum = computed(() => {
            let fontsize = Number(window.getComputedStyle(document.getElementsByTagName('html')[0], null).getPropertyValue('font-size').slice(0, 2));
            let screenWidth = document.getElementsByTagName("html")[0].clientWidth;
            let maxInRow = parseInt(((screenWidth > 640 ? (screenWidth * 3 / 4) : screenWidth) - 163 - 1 * fontsize) / (5 * fontsize));
            return maxInRow * 1 - 1
        })

        const series = computed(() => {
            let _series = []
            if (Object.keys(props.item).length == 0) { return _series }
            props.item.url.split('#').forEach(movieUrl => {
                let serie = {};
                serie.name = movieUrl.split('$')[0];
                serie.url = movieUrl.split('$')[1];
                _series.push(serie)
            });
            return _series
        })

        const changeVideo = (index) => {
            let item = JSON.parse(JSON.stringify(props.item));
            item.currentUrl = series.value[index].url;
            item.currentName = props.item.name + series.value[index].name;
            item.series = series.value;
            context.emit('selectVideo', item)
        }
        return { changeVideo, series, maxShowNum }
    },
}
</script>

<style scoped>
.movie-item {
    display: flex;
    margin-bottom: 2rem;
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
    -webkit-line-clamp: 2;
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

