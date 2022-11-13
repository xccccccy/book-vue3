<template>
    <div v-show="!isHidden" class="fixed top-0 left-0 header-container bg-slate-200 bg-opacity-50 dark:bg-zinc-900 dark:bg-opacity-50">
        <div class="header space-x-0.5 sm:space-x-2 w-full mx-auto">
            <HeaderHome :homeSetting="homeSetting"></HeaderHome>
            <component v-for="(headerSetting, index) in headerSettings" :is="headers[headerSetting.type]"
                v-show="!headerSetting.hidden" @click="activateHeaderOfIndex(index)" :key="index"
                :class="{ headeractivate: headeractivate[index] }" :headerSetting="headerSetting"></component>
            <DrakMode @darkModeChange="darkModeChange"></DrakMode>
            <User @userLog="userLog"></User>
            <component is="carbon-accessibility"/>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, watch, reactive, computed } from 'vue'
import axios from 'axios';
import DrakMode from '../foundation/DrakMode.vue';
import User from '../foundation/User.vue'
import HeaderHome from './headerHome.vue'
import CommonHeader from './commonHeader.vue'
import SearchHeader from './searchHeader.vue'

export default {
    name: "Header",
    props: {
        headerSetting: {
            type: Object,
            default: {}
        }
    },
    setup(props, context) {

        const headers = {
            common: CommonHeader,
            search: SearchHeader
        }

        const isHidden = computed(() => {
            if (props.headerSetting.hiddenSetting) {
                return props.headerSetting.hiddenSetting
            }
            return false
        })

        const homeSetting = computed(() => {
            if (props.headerSetting.homeSetting) {
                return props.headerSetting.homeSetting
            }
            return {
                homeString: 'Home',
                homeHref: '/'
            }
        })

        const headerSettings = computed(() => {
            if (props.headerSetting.headerSettings) {
                return props.headerSetting.headerSettings
            }
            return []
            // [
            //     {
            //         type: 'search',
            //         placeholder: "搜索书籍。",
            //         clickHandle: (search_string) => {
            //             console.log('asdfgh', search_string)
            //         }
            //     },
            //     {
            //         type: 'common',
            //         headerString: '书架',
            //         class: ['student', 'asda']
            //     },
            //     {
            //         type: 'common',
            //         headerString: '书架2',
            //         clickHandle: () => {
            //             console.log('asdfgh')
            //         },
            //         hidden: true,
            //     },
            //     {
            //         type: 'common',
            //         headerString: 'Shǎng',
            //         clickHandle: () => {
            //             console.log('asdfgh')
            //         },
            //         style: "font-weight: 500; color: #CD9D02"
            //     }
            // ]
        })

        let initHeaderActivate = {}
        for (let i = 0; i < headerSettings.value.length; i++) {
            if (headerSettings.value[i].type == 'common') {
                initHeaderActivate[i] = false
            }
        }
        const headeractivate = reactive(initHeaderActivate)

        const activateHeaderOfIndex = (index) => {
            for (let key in initHeaderActivate) {
                headeractivate[key] = false
            }
            if (headerSettings.value[index].type != 'common') return;
            headeractivate[index] = true
        }

        const darkModeChange = computed(() => {
            if (props.headerSetting.darkmodeSetting) {
                return props.headerSetting.darkmodeSetting.darkModeChangeHandle
            }
            return () => {
                // console.log('darkMode Change.')
            }
        })

        const userLog = computed(() => {
            if (props.headerSetting.userSetting) {
                return props.headerSetting.userSetting.userLogHandle
            }
            return (mode) => {
                // console.log(mode, 'user loged.')
            }
        })

        return { homeSetting, headerSettings, headers, activateHeaderOfIndex, headeractivate, userLog, darkModeChange, isHidden };
    },
    components: { DrakMode, User, HeaderHome }
}

</script>

<style scoped>

.header-container {
    /* position: fixed;
    top: 0;
    left: 0; */
    width: 100%;
    /* box-shadow: 2px -2px 10px #00000058; */
    backdrop-filter: blur(25px);
    z-index: 99;
}

.header {
    display: flex;
    align-items: stretch;
    justify-content: flex-end;
}

.header>div {
    padding: 0.3rem 0.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
}

.header>div:hover {
    border-bottom: 1px solid rgb(218, 175, 0);
}

.headeractivate {
    border-bottom: 1px solid rgb(20, 175, 103);
}
</style>