<template>
    <div
        class=" px-2 border-violet-300 border-opacity-50 dark:border-opacity-60 dark:border-violet-500 border mb-5 rounded-md dark-transition shadow-xl dark:shadow-none bg-slate-200 dark:bg-slate-700 backdrop-filter bg-opacity-50 dark:bg-opacity-50">
        <div class="">
            <div class="flex py-2 px-5 space-x-5 border-b items-center dark:border-violet-500 dark:border-opacity-60 text-lg"
                @click="self_open = !self_open">
                <div>
                    <a :href="commitInfo.commitAuthorUrl" target="_blank" >
                        <img :src="commitInfo.commitAuthorAvatar" class="avatar">
                    </a>
                </div>
                <div>
                    <span>Author : </span>
                    <span>{{ commitInfo.commitAuthor }}</span>
                </div>
                <div>
                    <span>Date : </span>
                    <span>{{ commitInfo.commitDate }}</span>
                </div>
                <div>
                    <span>CommitMessage : </span>
                    <span>{{ commitInfo.commitMessage }}</span>
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
                            <div class="link font-bold text-xl border-b"><a :href="commitInfo.commitUrl" target="_blank" >详细信息</a></div>
                            <div class="flex items-center space-x-4">
                                <div>
                                    <span>Author : </span>
                                    <span>
                                        <a :href="commitInfo.versionAuthorUrl" target="_blank" >
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
                                <!-- <span>对应版本
                                    <el-switch v-model="commitInfo.isnowversion" />
                                </span> -->
                                <span></span>
                                <span v-show="!commitInfo.isversion" @click="newVersion" class=" px-3 py-2 m-1 rounded-lg shadow-2xl bg-yellow-600 hover:bg-yellow-700 cursor-pointer text-white">在此commit上新建version</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </el-collapse-transition>
        <BottomLine></BottomLine>
    </div>
</template>

<script>
import { computed, ref } from 'vue';
import BottomLine from '../foundation/bottomLine.vue'

export default {
    name: "CommitsForNewVersion",
    components: { BottomLine },
    emits: ['newVersionWithCommitSha'],
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
                version: 'v1.0.0'
            }
        }
    },
    setup(props, context) {
        const self_open = ref(false);

        const newVersion = () => {
            context.emit('newVersionWithCommitSha', props.commitInfo.commitSha)
        }
        
        return { self_open, newVersion };
    }
}

</script>

<style scoped>
.div-1>div {
    padding: .75rem;
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
    padding: .35rem;
}

.div-1>div>div>div>div {
    padding: .15rem;
}

.mlauto {
    margin-left: auto !important;
}

.avatar {
    border-radius: 50%;
    width: 5vmin;
    height: 5vmin;
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
    margin: .7vmin;
}

div>span:first-child {
    padding-right: .3rem;
}

.link {
    text-decoration: underline;
}
</style>