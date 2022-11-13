import { defineStore } from "pinia"
import { ref } from "vue"

export const useVideoStore = defineStore('video', {
    state: () => ({
        showing: 'search',
        player: {},
        playerOptions: {
            autoplay: false,
            controls: false,
            muted: false,
            volume: 0.6,
            poster: '/1.jpg',
            src: '',
            name: 'something'
        },
        videoItem: {
        },
    }),
    actions: {
        pauseVideo() {
            setTimeout(() => {
                this.player?.pause()
            }, 20)
        },
        playVideo() {
            setTimeout(() => {
                this.player?.play()
            }, 20)
            setTimeout(() => {
                document.getElementsByClassName('demo-player')[0].scrollIntoView({ block: "center" });
            }, 10)
        }
    }
})