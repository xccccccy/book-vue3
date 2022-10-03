<template>
    <div class="">
        <div
            class="flex items-center space-x-10 p-4 version-info border-violet-300 border-opacity-50 dark:border-opacity-60 dark:border-violet-500 border mb-5 rounded-md dark-transition shadow-xl dark:shadow-none bg-slate-200 dark:bg-slate-700 backdrop-filter bg-opacity-50 dark:bg-opacity-50">
            <div>
                <el-icon style="vertical-align: bottom;" color="#601cd6" class="mx-3" size="2rem" >
                    <GobletSquareFull />
                </el-icon>
                <span class="title">Repository : </span>
                <span class=""><a :href="RepositoryInfo.baseInfo.url"></a>{{ RepositoryInfo.baseInfo.name }}</span>
            </div>
            <div>
                <span class="title">Now Version : </span>
                <span>{{ RepositoryInfo.baseInfo.version }}</span>
            </div>
            <div style="margin-left: auto;margin-right: 1rem;;">
                <div class=" p-4 m-1 rounded-full shadow-2xl bg-indigo-600 hover:bg-indigo-700 cursor-pointer">
                    <Plus style="width: 1.3rem; height: 1.3rem;"></Plus>
                </div>
            </div>
        </div>
        <div>
            <VersionHistory v-for="(versionHistory, index) in RepositoryInfo.versionHistorys"
                :key="versionHistory.version" :index="index" :versionInfo="versionHistory">
            </VersionHistory>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { getAllVersionInfo } from './scmapi'
import VersionHistory from './versionHistory.vue';
import { GobletSquareFull, Plus } from '@element-plus/icons-vue'


export default {
    name: "Repository",
    components: { VersionHistory, GobletSquareFull, Plus },
    props: {
        RepositoryInfo: {
            type: Object,
            default: {
                baseInfo: {
                    name: 'flask-vue-myworld',
                    url: 'https://github.com/xccccccy/flask-vue-myworld',
                    version: '1.0.0'
                },
                versionHistorys: [
                    {
                        branch: 'alpha/1.0.1',
                        branchUrl: 'https://github.com/xccccccy/flask-vue-myworld/tree/alpha/1.0.0',
                        commitUrl: 'https://github.com/xccccccy/flask-vue-myworld/commit/811dc3e1115565866a50a92f137dcb1fde45d327',
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
                ]
            }
        },
        homeString: {
            type: String,
            default: 'Home'
        },
        homeHref: {
            type: String,
            default: '/'
        }
    },
    setup() {

        return {};
    }
}

</script>

<style scoped>
.version-info .title {
    font-size: 1.4rem;
}

.version-info span:last-child {
    font-size: 1.2rem;
    color: rgb(193, 171, 3);
}

.link {
    text-decoration: underline;
}
</style>