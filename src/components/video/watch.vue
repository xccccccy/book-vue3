<template>
    <div class="app w-full sm:w-11/12 2xl:w-9/12 pt-12 sm:pt-16 text-left pb-14">
        <Header></Header>
        <Background></Background>
        <div>
            <div class="flex w-full">
                <div>
                    <div class="demo-player">
                        <v3d-player ref="player" :options="options" />
                    </div>
                    <div>
                        <h3> {{ options.src }}</h3>
                    </div>
                    <div>
                        <ElButton @click="toggleVideo">toggleVideo</ElButton>
                        <ElButton @click="changeSrc">changeVideo</ElButton>
                    </div>
                </div>
                <div class="flex-auto">
                    <h2>Play List</h2>
                    <MovieItem v-for="movie in movieList" :key="movie.cover" :item="movie"></MovieItem>
                </div>
            </div>
            <div>

                <div class="recommend-list">
                    <RecommendedItem v-for="movie in recommendList" :key="movie.cover" :item="movie">
                    </RecommendedItem>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref, reactive, onMounted } from 'vue'
import V3dPlayer from 'v3d-player'
import 'v3d-player/dist/style.css'

import MovieItem from './MovieItem.vue'
import RecommendedItem from './Recommended.vue'
import DATA from './data'

const player = ref()
const options = reactive({
    autoplay: false,
    controls: false,
    muted: false,
    screenshot: true,
    preventClickToggle: false,
    theme: '#FF3366',
    volume: 0.1,
    src: '/任然 - 飞鸟和蝉.mp3'
})

const movieList = DATA
const recommendList = [DATA[2], DATA[4], DATA[1], DATA[0]]

onMounted(() => {
    player.value.play(options)
})

const loadVideo = () => {
    player.value.play(options)
}

const toggleVideo = () => {
    player.value.toggle()
}

const changeSrc = () => {
    options.src = "/rainmood.m4a"
    loadVideo()
}

</script>
  
<style>
.demo-player {
    width: 640px;
    height: 480px;
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

.movie-detail h1 {
    font-size: 20px;
    color: #000;
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

.thanks {
    padding: 20px 0 40px;
    color: rgba(0, 0, 0, .25);
    font-size: 13px;
    text-align: center;
}

.recommend-list:after {
    content: '';
    display: block;
    clear: both;
}
</style>