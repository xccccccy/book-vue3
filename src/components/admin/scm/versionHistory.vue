<template>
    <div
        class=" px-2 border-violet-300 border-opacity-50 dark:border-opacity-60 dark:border-violet-500 border mb-5 rounded-md dark-transition shadow-xl dark:shadow-none bg-slate-200 dark:bg-slate-700 backdrop-filter bg-opacity-50 dark:bg-opacity-50">
        <div class="">
            <div class="flex py-2 px-5 space-x-5 border-b items-center dark:border-violet-500 dark:border-opacity-60 text-lg"
                @click="self_open = !self_open">
                <div>
                    <a :href="versionInfo.versionAuthorUrl" target="_blank">
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
                    class=" rounded-2xl bg-violet-600 text-gray-100 px-3 text-sm font-medium">
                    now version
                </div>
            </div>
        </div>
        <el-collapse-transition>
            <div v-show="self_open">
                <div class="flex div-1">
                    <div class="flex-1 flex">
                        <div>
                            <div class="link font-bold text-xl border-b"><a :href="versionInfo.branchUrl"
                                    target="_blank">基础信息</a></div>
                            <div>
                                <div>
                                    <span>Version : </span>
                                    <span>{{ versionInfo.version }}</span>
                                </div>
                                <div>
                                    <span>分支 : </span>
                                    <span><a :href="versionInfo.branchUrl" target="_blank"></a>{{ versionInfo.branch
                                    }}</span>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <span>发版人 : </span>
                                    <span>
                                        <a :href="versionInfo.versionAuthorUrl" target="_blank">
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
                            <div class="link"><a :href="versionInfo.commitUrl" target="_blank">关联Commit</a></div>
                            <CommitInfo :data="versionInfo.commitInfo"></CommitInfo>
                        </div>
                    </div>
                    <div class=" border-l dark:border-violet-500 dark:border-opacity-60">
                        <div class="h-full flex flex-col">
                            <div>操作区</div>
                            <div class="flex flex-col operation flex-1 justify-center">
                                <span></span>
                                <span @click="setnowversion" v-show="!isnowversion"
                                    class=" px-3 py-2 m-2 mb-5 rounded-lg shadow-2xl bg-yellow-500 hover:bg-yellow-600 cursor-pointer text-white">设置为当前版本</span>
                                <span @click="delVersion"
                                    class=" px-3 py-2 m-1 rounded-lg shadow-2xl bg-red-500 hover:bg-red-600 cursor-pointer text-white text-center">删除此版本</span>
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
import BottomLine from '../../common/bottomLine.vue'
import { updateVersion } from '../../foundation/api/scmapi'

export default {
    name: "VersionHistory",
    components: { CommitInfo, BottomLine },
    emits: ['updateRepository'],
    props: {
        versionInfo: {
            type: Object,
            default: {
                repos: 'flask-vue-myworld',
                branch: 'alpha/1.0.0',
                branchUrl: 'https://github.com/xccccccy/flask-vue-myworld/tree/alpha/1.0.0',
                version: 'v1.0.0',
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
    setup(props, context) {
        let isopen = props.index == 0;
        const self_open = ref(isopen);
        const isnowversion = computed(() => {
            return props.index == 0;
        })
        const setnowversion = () => {
            let repos = props.versionInfo.repos;
            let version = props.versionInfo.version;
            updateVersion(repos, version).then((res) => {
                console.log(res);
                context.emit('updateRepository', repos);
                ElNotification({ message: '更新Version成功。', type: 'success', duration: 2000 });
            }).catch((err) => {
                ElNotification({ message: '更新Version失败。', type: 'warning', duration: 3000 });
                console.log('ERROR => ', err);
            });
        };
        const delVersion = () => {
            ElNotification({ message: '暂不支持删除Version！', type: 'warning', duration: 1500 });
        }
        return { self_open, isnowversion, setnowversion, delVersion };
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
    font-size: 1rem;
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