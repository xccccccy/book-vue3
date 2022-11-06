import { defineStore } from "pinia"
import { ref } from "vue"

export const useHeaderStore = defineStore('header', {
    state: () => ({
        headerSetting: {
        }
    }),
    actions: {
        resetHeader() {
            this.headerSetting = {}
        }
    }
})