<template>
    <div
        class=" px-2 border-violet-300 border-opacity-50 dark:border-opacity-60 dark:border-violet-500 border mb-5 rounded-md dark-transition shadow-xl dark:shadow-none bg-slate-200 dark:bg-slate-700 backdrop-filter bg-opacity-50 dark:bg-opacity-50">
        <div class="">
            <div class="flex py-2 px-5 space-x-6 border-b items-center dark:border-violet-500 dark:border-opacity-60 text-lg"
                @click="self_open = !self_open">
                <div>
                    <a :href="versionInfo.versionAuthorUrl">
                        <img :src="versionInfo.versionAuthorAvatar" class="avatar">
                    </a>
                </div>
                <div>
                    <span>Version : </span>
                    <span>{{ versionInfo.version }}</span>
                </div>
                <div>
                    <span>发版人 : </span>
                    <span>{{ versionInfo.versionAuthor }}</span>
                </div>
                <div>
                    <span>Date : </span>
                    <span>{{ versionInfo.versionDate }}</span>
                </div>
                <div v-show="isnowversion" style="margin-left:auto"
                    class=" rounded-2xl bg-violet-600 text-gray-100 px-2 text-sm font-medium">now version</div>
                <div :class="{ mlauto: !isnowversion}">
                    <div class="inline-block">
                        <el-switch v-model="self_open" />
                    </div>
                </div>
            </div>
        </div>
        <el-collapse-transition>
            <div v-show="self_open">
                <div class="flex div-1">
                    <div class="flex-1 flex">
                        <div>
                            <div class=" font-bold text-xl border-b"><a :href="versionInfo.branchUrl">基础信息</a></div>
                            <div>
                                <div>
                                    <span>Version : </span>
                                    <span>{{ versionInfo.version }}</span>
                                </div>
                                <div>
                                    <span>分支 : </span>
                                    <span><a :href="versionInfo.branchUrl"></a>{{ versionInfo.branch }}</span>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <span>发版人 : </span>
                                    <span>
                                        <a :href="versionInfo.versionAuthorUrl">
                                            <img :src="versionInfo.versionAuthorAvatar" class="avatar avatar-mini">
                                        </a>
                                    </span>
                                    <span>{{ versionInfo.versionAuthor }}</span>
                                </div>
                                <div>
                                    <span>Date : </span>
                                    <span>{{ versionInfo.versionDate }}</span>
                                </div>
                            </div>
                        </div>
                        <div style="margin-left: 6%;">
                            <div><a :href="versionInfo.commitUrl">关联Commit</a></div>
                            <CommitInfo :data="versionInfo.commitInfo"></CommitInfo>
                        </div>
                    </div>
                    <div class=" border-l dark:border-violet-500 dark:border-opacity-60">
                        <div>
                            <div>操作区</div>
                            <div class="flex flex-col operation">
                                <span>当前版本
                                    <el-switch v-model="isnowversion" />
                                </span>
                                <span>设置为当前版本</span>
                                <span v-show="false">删除此版本</span>
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
import CommitInfo from './commitInfo.vue'
import BottomLine from '../foundation/bottomLine.vue'

export default {
    name: "VersionHistory",
    components: { CommitInfo, BottomLine },
    props: {
        versionInfo: {
            type: Object,
            default: {
                branch: 'alpha/1.0.0',
                branchUrl: 'https://github.com/xccccccy/flask-vue-myworld/tree/alpha/1.0.0',
                version: '1.0.0',
                versionAuthor: 'xccccccy',
                versionAuthorUrl: 'https://github.com/xccccccy',
                versionAuthorAvatar: 'https://avatars.githubusercontent.com/u/97515896?v=4',
                versionDate: '2022年9月22日 19:26:58',
                commitInfo: {
                    commitMessage: 'init commit',
                    commitAuthor: 'xccccccy',
                    commitEmail: '***@163.com',
                    commitDate: '2022年9月22日 19:26:58',
                    commitSha: 'cdysud98uewyhe8whe8duwedy8wegfy7wegf7w6'
                }
            }
        },
        index: {
            type: Number,
            default: 0
        }
    },
    setup(props) {
        let isopen = props.index == 0;
        const self_open = ref(isopen);
        const isnowversion = computed(() => {
            return props.index == 0;
        })
        const setnowversion = ref(false);
        return { self_open, isnowversion, setnowversion };
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

.operation span {
    font-size: 1.1rem;
    padding: .25rem;
    margin: .25rem;
}

.mlauto {
    margin-left: auto !important;
}

.avatar {
    border-radius: 50%;
    width: 6vmin;
    height: 6vmin;
    object-fit: cover;
    object-position: center;
    margin: 1.2vmin;
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