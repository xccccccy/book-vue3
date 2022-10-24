<template>
    <div class="px-2 pb-2 mb-4 border-violet-300 border-opacity-50 dark:border-opacity-60 dark:border-violet-500 border rounded-md dark-transition shadow-xl dark:shadow-none bg-slate-200 dark:bg-slate-700 backdrop-filter bg-opacity-50 dark:bg-opacity-50">
        <div class="my-2 flex items-center border-b pb-2 border-violet-300 border-opacity-80 dark:border-opacity-60 dark:border-violet-500">
            <span class="pl-2">剧集列表</span>
            <span class="px-1 text-sm">{{ "(" + "1" + "/" + series.length + ")" }}</span>
            <div class="ml-auto flex items-center space-x-1 pr-2">
                <span class="text-sm text">自动连播</span>
                <el-switch v-model="autoPlayContinue" />
            </div>
        </div>
        <!-- <div class="movie-item">
            <div class="cover">
                <img :src="item.pic" alt="cover" />
                <div class="duration">{{item.duration}}</div>
            </div>
            <div class="detail flex-1 flex flex-col items-start">
                <div class="title">{{item.name}}</div>
                <div class="author">{{item.director}}</div>
                <div class="date">{{item.year}}</div>
            </div>
        </div> -->
        <div>
            <div v-for="(serie, index) in series" :key="serie.name" @click="changeMovie(index)" class="w-full p-2 cursor-pointer text-sm rounded-md hover:text-blue-800 hover:bg-blue-100 hover:dark:bg-slate-600 hover:dark:text-blue-300">
                <span class="pr-2">{{ "P" + index }}</span>{{ serie.name }}
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { ref } from 'vue';

export default {
    props: {
        item: Object,
    },
    name: 'SeriesItem',
    emits: ['selectVideoSeries'],
    setup(props, context) {

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

        const changeMovie = (index) => {
            let item = JSON.parse(JSON.stringify(props.item));
            item.url = series.value[index].url;
            item.name = props.item.name + series.value[index].name;
            context.emit('selectVideoSeries', item)
        }

        const autoPlayContinue = ref(true);
        return { changeMovie, series, autoPlayContinue }
    },
}
</script>

<style scoped>
.movie-item {
    display: flex;
    /* margin-bottom: 20px; */
}

.movie-item .cover {
    position: relative;
    width: 166px;
    overflow: hidden;
    background: #000;
}

.movie-item:hover .cover img {
    opacity: .7;
    transform: scale(1.25, 1.25);

}

.movie-item .cover img {
    width: 100%;
    transition: transform ease .25s;
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
    padding-left: 10px;
    font-size: 14px;
}

.movie-item .detail div {
    margin-bottom: 3px;
}

.movie-item .detail .title {
    font-size: 16px;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    text-overflow: -o-ellipsis-lastline;
    text-overflow: ellipsis;
    word-break: break-word;
    -webkit-line-clamp: 2;
}

.movie-item .detail .author {
    font-size: 13px;
    line-height: 1em;
}

.movie-item .detail .date {
    display: inline-block;
    padding: 3px 6px;
    line-height: 1em;
    background-color: #31C2F2;
    color: #fff;
    font-size: 12px;
    border-radius: 2px;
}

.movie-item .detail .data.hot {
    background-color: #ff6060;
}
</style>

