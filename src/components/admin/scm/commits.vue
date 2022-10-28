<template>
    <div class="" v-show="commitInfo.showDateGuide">
        <div class="h-3 border-l-2 ml1 dark:border-slate-400">
        </div>
        <div class="my-1 flex items-center space-x-3">
            <svg height="16" viewBox="0 0 16 16" version="1.1" width="16" class=" fill-slate-900 dark:fill-slate-200">
                <path fill-rule="evenodd"
                    d="M10.5 7.75a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm1.43.75a4.002 4.002 0 01-7.86 0H.75a.75.75 0 110-1.5h3.32a4.001 4.001 0 017.86 0h3.32a.75.75 0 110 1.5h-3.32z">
                </path>
            </svg>
            <div class=" text-slate-600 dark:text-slate-100">
                Commits on {{ commitInfo.dateGuide }}
            </div>
        </div>
        <div class="h-2 border-l-2 ml1 dark:border-slate-400">
        </div>
    </div>
    <div class=" border-l-2 pl-3 ml1 dark:border-slate-400">
        <div
            class=" px-2 shadow-md border-violet-300 border-opacity-50 dark:border-opacity-60 dark:border-violet-500 border rounded-md dark-transition dark:shadow-none bg-slate-200 dark:bg-slate-700 backdrop-filter bg-opacity-50 dark:bg-opacity-50">
            <div class="">
                <div class="flex py-2 px-2 space-x-5 border-b items-center dark:border-violet-500 dark:border-opacity-60 text-lg"
                    @click="self_open = !self_open">
                    <div>
                        <a :href="commitInfo.commitAuthorUrl" target="_blank">
                            <img :src="commitInfo.commitAuthorAvatar" class="avatar">
                        </a>
                    </div>
                    <div>
                        <div class=" text-xl">
                            <span>{{ commitInfo.commitMessage }}</span>
                        </div>
                        <div class="flex text-sm space-x-4">
                            <div>
                                <span>Author : </span>
                                <span>{{ commitInfo.commitAuthor }}</span>
                            </div>
                            <div>
                                <span>Date : </span>
                                <span>{{ commitInfo.commitDate }}</span>
                            </div>
                        </div>
                    </div>
                    <div v-show="commitInfo.isversion" style="margin-left:auto"
                        class=" rounded-2xl bg-green-600 text-gray-100 px-3 text-sm font-medium">
                        <span>{{ commitInfo.version }}</span>
                    </div>
                    <div v-show="commitInfo.isnowversion" :class="{ mlauto: !commitInfo.isversion}"
                        class=" rounded-2xl bg-violet-600 text-gray-100 px-3 text-sm font-medium">
                        now version
                    </div>
                </div>
            </div>
            <el-collapse-transition>
                <div v-show="self_open">
                    <div class="flex div-1">
                        <div class="flex-1">
                            <div>
                                <div class="link font-bold text-xl border-b"><a :href="commitInfo.commitUrl"
                                        target="_blank">详细信息</a></div>
                                <div class="flex items-center space-x-4">
                                    <div>
                                        <span>Author : </span>
                                        <span>
                                            <a :href="commitInfo.versionAuthorUrl" target="_blank">
                                                <img :src="commitInfo.commitAuthorAvatar" class="avatar avatar-mini">
                                            </a>
                                        </span>
                                        <span>{{ commitInfo.commitAuthor }}</span>
                                    </div>
                                    <div>
                                        <span>Email : </span>
                                        <span>{{ commitInfo.commitEmail }}</span>
                                    </div>
                                </div>
                                <div>
                                    <span>Date : </span>
                                    <span>{{ commitInfo.commitDate }}</span>
                                </div>
                                <div>
                                    <span>CommitMessage : </span>
                                    <span>{{ commitInfo.commitMessage }}</span>
                                </div>
                                <div>
                                    <span>CommitSha : </span>
                                    <span>{{ commitInfo.commitSha }}</span>
                                </div>

                            </div>

                        </div>
                        <div class=" border-l dark:border-violet-500 dark:border-opacity-60">
                            <div>
                                <div>操作区</div>
                                <div class="flex flex-col operation">
                                    <span></span>
                                    <span v-show="!commitInfo.isversion" @click="newVersion"
                                        class=" px-3 py-2 m-1 my-2 rounded-lg shadow-2xl bg-yellow-600 hover:bg-yellow-700 cursor-pointer text-white">在此commit上新建version</span>
                                    <span v-show="!commitInfo.isversion" @click="updateVersion"
                                        class=" px-3 py-2 m-1 my-2 rounded-lg shadow-2xl bg-blue-500 hover:bg-blue-700 cursor-pointer text-white">在此commit上更新version</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-collapse-transition>
            <!-- <BottomLine></BottomLine> -->
        </div>
    </div>
</template>

<script>
import { computed, ref } from 'vue';
import BottomLine from '../../common/bottomLine.vue'

export default {
    name: "CommitsForNewVersion",
    components: { BottomLine },
    emits: ['newVersionWithCommitSha', 'updateVersionWithCommitSha'],
    props: {
        commitInfo: {
            type: Object,
            default: {
                commitAuthor: 'xccccccy',
                commitAuthorUrl: 'https://github.com/xccccccy',
                commitAuthorAvatar: 'https://avatars.githubusercontent.com/u/97515896?v=4',
                commitEmail: '***@163.com',
                commitDate: '2022年9月22日 19:26:58',
                commitMessage: 'init commit',
                commitSha: 'cdysud98uewyhe8whe8duwedy8wegfy7wegf7w6',
                commitUrl: 'https://github.com/xccccccy/book-vue3/commit/04cb8ecd641d77b640367eb50f52d14cea46f735',
                isversion: true,
                isnowversion: true,
                version: 'v1.0.0',
                showDateGuide: true,
                dateGuide: '2022-10-8'
            }
        }
    },
    setup(props, context) {
        const self_open = ref(false);

        const newVersion = () => {
            context.emit('newVersionWithCommitSha', props.commitInfo.commitSha)
        }

        const updateVersion = () => {
            context.emit('updateVersionWithCommitSha', props.commitInfo.commitSha)
        }

        return { self_open, newVersion, updateVersion };
    }
}

</script>

<style scoped>
.div-1>div {
    padding: .5rem;
}

.div-1>div>div>div:first-child {
    font-size: 1.25rem;
    font-weight: 700;
    border-bottom-width: 1px;
    padding: .3rem;
}

.dark .div-1>div>div>div:first-child {
    border-bottom-width: 0px;
}

.div-1>div>div>div {
    padding: .15rem;
}

.div-1>div>div>div>div {
    padding: .15rem;
}

.mlauto {
    margin-left: auto !important;
}

.avatar {
    border-radius: 50%;
    width: 4vmin;
    height: 4vmin;
    object-fit: cover;
    object-position: center;
    margin: 1vmin;
    transition: all 0.2s ease;
    /* border = "5px solid #f36"; */
}

.avatar-mini {
    display: inline;
    width: 3vmin;
    height: 3vmin;
    margin: .4vmin;
}

div>span:first-child {
    padding-right: .3rem;
}

.link {
    text-decoration: underline;
}

.ml1 {
    margin-left: 7px;
}
</style>