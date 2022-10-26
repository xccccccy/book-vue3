<template>
    <div class="movie-item">
        <div class="cover">
            <img :src="item.pic" alt="cover" />
            <div class="duration">{{item.duration}}</div>
        </div>
        <div class="detail flex-1 flex flex-col items-start" style="">
            <div class="title">{{item.name}}</div>
            <div class="author">{{item.director}}</div>
            <div class="date">{{item.year}}</div>
            <div class="flex flex-wrap mt-auto ml-0">
                <div v-for="(serie, index) in series.slice(0, maxShowNum)" :key="serie.name" @click="changeVideo(index)"
                    class="px-6 py-2 mx-2 mt-4 dark:bg-blue-800 dark:bg-opacity-60 cursor-pointer text-lg flex justify-center"
                    :class="{ ww: series.length > (maxShowNum + 1) / 2 }">
                    {{ series.length > (maxShowNum + 1) / 2 ? String(index + 1) : serie.name }}
                </div>
                <div v-show="series.length > maxShowNum">
                    <div @click="changeVideo(0)"
                        class="px-6 py-2 mx-2 mt-4 dark:bg-blue-800 dark:bg-opacity-60 cursor-pointer text-lg flex justify-center">
                        ...
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
            let maxInRow = parseInt(((screenWidth > 640 ? (screenWidth * 3 / 4) : screenWidth) - 170) / (5 * fontsize));
            console.log(maxInRow)
            return maxInRow * 2 - 1
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
    margin-bottom: 20px;
}

.movie-item .cover {
    position: relative;
    width: 166px;
    overflow: hidden;
    background: #000;
}

.movie-item .cover img:hover {
    opacity: .8;
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

.movie-item .detail {
    padding-left: 0.5rem;
    font-size: 14px;
}

.movie-item .detail>div {
    margin-bottom: 0.4rem;
    margin-left: 0.5rem;
}

.ml-0 {
    margin-left: 0px !important;
    margin-bottom: 0px !important;
}

.movie-item .detail .title {
    font-size: 1rem;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    text-overflow: -o-ellipsis-lastline;
    text-overflow: ellipsis;
    word-break: break-word;
    -webkit-line-clamp: 2;
}

.movie-item .detail .author {
    font-size: .7rem;
    line-height: 1rem;
}

.movie-item .detail .date {
    display: inline-block;
    padding: 4px 9px;
    line-height: 1em;
    background-color: #31C2F2;
    color: #fff;
    font-size: 0.5rem;
    border-radius: 2px;
}

.movie-item .detail .data.hot {
    background-color: #ff6060;
}

.ww {
    width: 4rem;
}
</style>

