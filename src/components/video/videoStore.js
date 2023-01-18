import { defineStore } from "pinia"
import { ref } from "vue"

export const useVideoStore = defineStore('video', {
    // 开启数据缓存
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'videoStore', // 存储的 key 值，默认为 storeId
                storage: localStorage, // 存储的位置，默认为 sessionStorage
                // paths: ['showing', 'playerOptions', 'videoItem'], // 需要存储的 state 状态，默认存储所有的状态
            }
        ]
    },
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
            name: 'something',
            currentTime: 0,
            duration: 0,
            playing: false,
            isFullscreen: false,
            isPip: false
        },
        videoItem: {
            id: ""
        },
        lastPlay: {
            id: "",
            currentTime: 0,
            duration: 0,
            seeked: false
        }
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