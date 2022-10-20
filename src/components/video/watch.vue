<template>
    <div>
        <div class="demo-player">
            <v3d-player ref="player" :options="options" />
        </div>
        <ElButton @click="toggleVideo">toggleVideo</ElButton>
    </div>
</template>
  
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import V3dPlayer from 'v3d-player'
import 'v3d-player/dist/style.css'

const player = ref()
const options = reactive({
    autoplay: false,
    controls: false,
    muted: false,
    screenshot: true,
    preventClickToggle: true,
    theme: '#FF3366',
    volume: 0.1,
    src: '/任然 - 飞鸟和蝉.mp3'
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

</script>
  
<style>
.demo-player {
    margin: 0 auto;
    margin-top: 50px;
    width: 320px;
    height: 240px;
}
</style>