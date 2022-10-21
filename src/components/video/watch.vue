<template>
    <div class="app w-full sm:w-11/12 2xl:w-9/12 pt-12 sm:pt-16 text-left pb-14">
        <Header></Header>
        <Background></Background>
        <div class="demo-player">
            <v3d-player ref="player" :options="options" />
        </div>
        <div>
            <ElButton @click="toggleVideo">toggleVideo</ElButton>
            <ElButton @click="changeSrc">changeVideo</ElButton>
        </div>
    </div>
</template>
  
<script setup>
import { ref, reactive, onMounted } from 'vue'
import V3dPlayer from 'v3d-player'
import 'v3d-player/dist/style.css'

const player = ref()
const options = reactive({
    autoplay: false,
    controls: false,
    muted: false,
    screenshot: true,
    preventClickToggle: false,
    theme: '#FF3366',
    volume: 0.1,
    src: 'https://hnzy.bfvvs.com/play/Yer2V4Ee/index.m3u8'
})

onMounted(() => {
    player.value.play(options)
})

const playVideo = () => {
    player.value.play(options)
}

const toggleVideo = () => {
    player.value.toggle()
}

const changeSrc = () => {
    options.src = "https://hnzy.bfvvs.com/play/1aK89xRb/index.m3u8"
    player.value.play(options)
}

</script>
  
<style>
.demo-player {
    width: 640px;
    height: 480px;
}
</style>