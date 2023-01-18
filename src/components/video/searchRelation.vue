<template>
    <div>
        <div class="search-two">
            <el-input v-model="search_string" placeholder="搜索电影、剧集、人物，或者输入其他视频网站地址进行解析"
                class="input-with-select dark:bg-zinc-900 dark:bg-opacity-30 rounded-md" @keyup.enter="searchVideo()"
                size="large">
                <template #suffix>
                    <el-icon class="el-input__icon" @click="searchVideo()" v-show="!JX_show">
                        <Search />
                    </el-icon>
                    <div v-show="JX_show">
                        <el-select v-model="currentJXUrl" class="m-2 w-32" placeholder="Select" size="default">
                            <el-option v-for="(value, key) in JXUrlDict" :key="key" :label="key" :value="value" />
                        </el-select>
                        <ElButton @click="searchVideo()">解析</ElButton>
                    </div>
                </template>
            </el-input>
        </div>
        <div class="border dark:border-0 py-2 my-2">
            <div class=" border-l-8 dark:border-l-8 border-l-green-400 px-4 py-1 font-medium">
                可以搜索影视资源，或者输入网址进行解析播放。</div>
        </div>
        <div class="list-title flex">
            <span v-html="search_info"></span>
            <div class="flex cursor-pointer ml-auto items-center" @click="$emit('togglePanel')">
                <span>播放器</span>
                <ArrowRight class="h-4 px-2" />
            </div>
        </div>
        <div v-show="videoList.length > 0">
            <div class="flex items-start">
                <div class="rounded-lg border dark:border-slate-700 overflow-hidden shadow-lg hidden sm:block"
                    style="width: 32%; min-width: 200px;">
                    <h3 class="p-5 bg-indigo-500 text-white dark:bg-slate-700 font-semibold text-xl">搜索结果</h3>
                    <ul class="pb-2 bg-white dark:bg-slate-700">
                        <li>
                            <div class="bg-white dark:bg-zinc-900 flex items-center cursor-pointer"
                                @click="searchTypeShow = !searchTypeShow">
                                <div class="h-5 w-1 bg-indigo-600"></div>
                                <div class="px-3 py-3 font-medium">类型</div>
                                <div class="bg-indigo-300 rounded-lg text-xs text-black badge"
                                    @click.stop="searchTypeActivateType = 'all'" style="padding: 2px 8px;"
                                    v-show="searchTypeActivateType != 'all'">
                                    {{ searchTypeActivateType }}
                                    <Close class="h-3 inline-block" />
                                </div>
                                <ArrowRight v-if="!searchTypeShow" class="h-4 px-6 ml-auto" />
                                <ArrowDown v-else class="h-4 px-6 ml-auto" />
                            </div>
                            <ul class="py-2 type bg-zinc-100 dark:bg-slate-800 type-1" v-show="searchTypeShow">
                                <li v-for="(value, key) in searchType" :key="key"
                                    :class="{ activateli : searchTypeActivateType == key}"
                                    class="cursor-pointer pl-8 pr-5 py-2 text-tiny hover:bg-zinc-200 dark:hover:bg-slate-700"
                                    @click="selectType(key)">
                                    <div class="flex justify-between items-center">
                                        <span>{{ key }}</span>
                                        <div
                                            class="px-3 font-medium text-sm bg-slate-100 dark:bg-slate-200 text-stone-900 rounded-md">
                                            {{ value }}</div>
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <div class="bg-white dark:bg-zinc-900 flex items-center cursor-pointer"
                                @click="searchCountryShow = !searchCountryShow">
                                <div class="h-5 w-1 bg-yellow-400"></div>
                                <div class="px-3 py-3 font-medium">地区</div>
                                <div class="bg-yellow-300 rounded-lg text-xs text-black badge"
                                    @click.stop="searchCountryActivateType = 'all'" style="padding: 2px 8px;"
                                    v-show="searchCountryActivateType != 'all'">{{
                                    searchCountryActivateType }}
                                    <Close class="h-3 inline-block" />
                                </div>
                                <ArrowRight v-if="!searchCountryShow" class="h-4 px-6 ml-auto" />
                                <ArrowDown v-else class="h-4 px-6 ml-auto" />
                            </div>
                            <ul class="py-2 type bg-zinc-100 dark:bg-slate-800 type-2" v-show="searchCountryShow">
                                <li v-for="(value, key) in searchCountry" :key="key"
                                    :class="{ activateli : searchCountryActivateType == key}"
                                    class="cursor-pointer pl-8 pr-5 py-2 text-tiny hover:bg-zinc-200 dark:hover:bg-slate-700"
                                    @click="selectCountry(key)">
                                    <div class="flex justify-between items-center">
                                        <span>{{ key }}</span>
                                        <div
                                            class="px-3 font-medium text-sm bg-slate-100 dark:bg-slate-200 text-stone-900 rounded-md">
                                            {{ value }}</div>
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <div class="bg-white dark:bg-zinc-900 flex items-center cursor-pointer"
                                @click="searchLanguageShow = !searchLanguageShow">
                                <div class="h-5 w-1 bg-red-500"></div>
                                <div class="px-3 py-3 font-medium">语言</div>
                                <div class=" bg-red-300 rounded-lg text-xs text-black badge"
                                    @click.stop="searchLanguageActivateType = 'all'" style="padding: 2px 8px;"
                                    v-show="searchLanguageActivateType != 'all'">{{ searchLanguageActivateType
                                    }}
                                    <Close class="h-3 inline-block" />
                                </div>
                                <ArrowRight v-if="!searchLanguageShow" class="h-4 px-6 ml-auto" />
                                <ArrowDown v-else class="h-4 px-6 ml-auto" />
                            </div>
                            <ul class="py-2 type bg-zinc-100 dark:bg-slate-800 type-3" v-show="searchLanguageShow">
                                <li v-for="(value, key) in searchLanguage" :key="key"
                                    :class="{ activateli : searchLanguageActivateType == key}"
                                    class="cursor-pointer pl-8 pr-5 py-2 text-tiny hover:bg-zinc-200 dark:hover:bg-slate-700"
                                    @click="selectLanguage(key)">
                                    <div class="flex justify-between items-center">
                                        <span>{{ key }}</span>
                                        <div
                                            class="px-3 font-medium text-sm bg-slate-100 dark:bg-slate-200 text-stone-900 rounded-md">
                                            {{ value }}</div>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="ml-0 sm:ml-6 w-full">
                    <VideoItem v-for="video in filterVideoList" :key="video.id" :item="video">
                    </VideoItem>
                </div>
            </div>
        </div>
        <div class="hidden">
            <ElInput v-model="test"></ElInput>
            <ElButton @click="test2">解析</ElButton>
            <ElButton @click="test3">换源</ElButton>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, shallowRef, onUnmounted, watch, defineEmits, defineExpose } from 'vue'
import { computed } from '@vue/reactivity'
import { ArrowLeft, ArrowRight, ArrowDown, Search, Close } from '@element-plus/icons-vue'
import axios from "axios";
import VideoItem from './VideoItem.vue'
import { useRouter } from 'vue-router'
import { useVideoStore } from './videoStore'

var videoStore = useVideoStore()

var router = useRouter()

const emit = defineEmits(['togglePanel'])

const videoList = ref([])

const filterVideoList = computed(() =>
    videoList.value.filter((item) => {
        if (searchTypeActivateType.value != "all" && item.type != searchTypeActivateType.value) {
            return false
        }
        if (searchCountryActivateType.value != "all" && item.area != searchCountryActivateType.value) {
            return false
        }
        if (searchLanguageActivateType.value != "all" && item.lang != searchLanguageActivateType.value) {
            return false
        }
        return true
    })
)

// search
const search_string = ref('')
const search_info = ref('暂无搜索。')
const searchVideo = (s) => {
    let search_s = s || search_string.value;
    if (search_s.includes("http")) {
        jumpJX(search_s)
        return
    }
    if (search_s == "" || !search_s) {
        ElNotification({ title: '搜索不能为空。', type: 'warning', duration: 1600 });
        return
    };

    router.push("/video?s=" + search_s)
    videoStore.showing = "search"
    axios.post("/videoapi/search", {
        's': search_s
    }).then((res) => {
        videoList.value = res.data.videos;
        search_info.value = videoList.value.length ? "搜索'<span class='text-orange-500 font-medium'>" + search_s + "</span>', 找到<span class='text-orange-500 font-medium'>" + String(videoList.value.length) + "</span>条相关资源" : '暂无资源'
        let types = {}
        let countries = {}
        let languages = {}
        res.data.videos.forEach(item => {
            types[item.type] ? types[item.type] += 1 : types[item.type] = 1;
            countries[item.area] ? countries[item.area] += 1 : countries[item.area] = 1;
            languages[item.lang] ? languages[item.lang] += 1 : languages[item.lang] = 1;
        });
        searchType.value = types;
        searchCountry.value = countries;
        searchLanguage.value = languages;
    }).catch((err) => {
        console.log(err)
    }).finally(() => {
        searchTypeActivateType.value = "all";
        searchCountryActivateType.value = "all";
        searchLanguageActivateType.value = "all";
    })
}
const JX_show = computed(() => {
    return search_string.value.includes("http")
})
const JXUrlDict = ref({
    "m3u8": "https://jx.m3u8.tv/jiexi/?url=",
    "okjx": "https://okjx.cc/?url=",
    "虾米": "https://jx.xmflv.com/?url="
})
const currentJXUrl = ref('https://okjx.cc/?url=')
const jumpJX = (url) => {
    window.open(currentJXUrl.value + url, "_blank");
}

watch(filterVideoList, (newFilterVideoList) => {
    return;
    Object.keys(searchType.value).forEach((key) => { searchType.value[key] = 0; })
    Object.keys(searchCountry.value).forEach((key) => { searchCountry.value[key] = 0; })
    Object.keys(searchLanguage.value).forEach((key) => { searchLanguage.value[key] = 0; })
    newFilterVideoList.forEach(item => {
        searchType.value[item.type] += 1;
        searchCountry.value[item.area] += 1;
        searchLanguage.value[item.lang] += 1;
    });
})

const searchTypeShow = ref(true)
const searchType = ref({
    "电影": 166,
    "剧集": 26,
    "综艺": 828,
    "动漫": 720,
    "电视剧": 8969
})
const searchTypeActivateType = ref("all");
const selectType = (type) => {
    if (searchType.value[type] == 0) { return }
    type == searchTypeActivateType.value ? searchTypeActivateType.value = "all" : searchTypeActivateType.value = type;
}

const searchCountryShow = ref(false)
const searchCountry = ref({
    "中国": 166,
    "美国": 26,
    "日本": 828,
    "加利福尼亚": 720
})
const searchCountryActivateType = ref("all");
const selectCountry = (type) => {
    if (searchCountry.value[type] == 0) { return }
    type == searchCountryActivateType.value ? searchCountryActivateType.value = "all" : searchCountryActivateType.value = type;
}

const searchLanguageShow = ref(false)
const searchLanguage = ref({
    "粤语": 166,
    "普通话": 26,
    "英语": 828,
    "泰国语": 720
})
const searchLanguageActivateType = ref("all");
const selectLanguage = (type) => {
    if (searchLanguage.value[type] == 0) { return }
    type == searchLanguageActivateType.value ? searchLanguageActivateType.value = "all" : searchLanguageActivateType.value = type;
}

const test = ref('')
const test2 = (url) => {
    let _url = url || test.value;
    window.open('https://okjx.cc/?url=' + _url, "_blank");
}
const test3 = () => {
    videoStore.playerOptions.src = test.value;
}
defineExpose({ searchVideo })
</script>

<style scoped>
.search-two {
    margin: 1rem auto;
}

.search-two .el-input__icon {
    font-size: 1.5rem;
    cursor: pointer;
}

.input-with-select {
    opacity: 0.9;
    color: #000;
}

.el-input__icon {
    color: #4642c5;
    font-size: 1.3rem;
}

.list-title {
    font-size: 1.3rem;
    padding: .7rem 1%;
    text-align: left;
    font-weight: 500;
}

.list-title span {
    vertical-align: middle;
}

.type li {
    font-family: 'Roboto Mono', monospace;
}

.activateli {
    background-color: rgb(228, 228, 231);
}

.dark .activateli {
    background-color: rgb(51, 65, 85);
}

.activateli span {
    font-weight: 600;
}

.type-1 .activateli>div>div {
    background-color: rgb(165, 180, 251);
}

.type-2 .activateli>div>div {
    background-color: rgb(253, 224, 71);
}

.type-3 .activateli>div>div {
    background-color: rgb(252, 165, 165);
}

.badge {
    transition: transform ease .25s;
}

.badge:hover {
    transform: scale(1.1, 1.1);
}
</style>