<template>
    <div class="">
        <div
            class="flex items-center space-x-10 p-2 version-info border-violet-300 border-opacity-50 dark:border-opacity-60 dark:border-violet-500 border mb-4 rounded-md dark-transition shadow-xl dark:shadow-none bg-slate-200 dark:bg-slate-700 backdrop-filter bg-opacity-50 dark:bg-opacity-50">
            <div>
                <el-icon style="vertical-align: bottom;" color="#601cd6" class="mx-3" size="1.6rem">
                    <GobletSquareFull />
                </el-icon>
                <span class="title">Repository : </span>
                <span class="link"><a :href="RepositoryInfo.baseInfo.url" target="_blank">{{
                RepositoryInfo.baseInfo.name }}</a></span>
            </div>
            <div>
                <span class="title">Now Version : </span>
                <span>{{ RepositoryInfo.baseInfo.version }}</span>
            </div>
            <div style="margin-left: auto;margin-right: 1rem;;" class="flex space-x-3">
                <div class=" p-3 m-1 rounded-full shadow-2xl bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white"
                    @click="updateCommits" v-show="!versions_show">
                    <RefreshRight style="width: 1.3rem; height: 1.3rem;"></RefreshRight>
                </div>
                <div class=" p-3 m-1 rounded-full shadow-2xl bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white"
                    @click="newVersion">
                    <Plus v-show="versions_show" style="width: 1.3rem; height: 1.3rem;"></Plus>
                    <House v-show="!versions_show" style="width: 1.3rem; height: 1.3rem;"></House>
                </div>
            </div>
        </div>
        <div v-show="versions_show">
            <div class="flex items-center mb-2">
                <div class="text-lg pl-2">Versions</div>
                <div class="flex ml-auto space-x-5 mr-3">
                    <div class=" hover:bg-violet-500 rounded-full h-min p-1 cursor-pointer" @click="expandAll">
                        <Expand style="width: 1.3rem; height: 1.3rem;" />
                    </div>
                    <div class=" hover:bg-violet-500 rounded-full h-min p-1 cursor-pointer" @click="foldAll">
                        <Fold style="width: 1.3rem; height: 1.3rem;" />
                    </div>
                </div>
            </div>
            <VersionHistory v-for="(versionHistory, index) in RepositoryInfo.versionHistorys"
                @updateRepository="updateRepository" :key="versionHistory.version" :index="index"
                :versionInfo="versionHistory">
            </VersionHistory>
        </div>
        <div v-show="!versions_show" v-loading="commitInfos_loading" style="min-height: 60vh;">
            <div class="pb-2 text-lg pl-2">Commits</div>
            <Commits v-for="commitInfo in allCommitInfos" :commitInfo="commitInfo" :key="commitInfo.commitSha"
                @newVersionWithCommitSha="newVersionWithCommitSha"
                @updateVersionWithCommitSha="updateVersionWithCommitSha"></Commits>
        </div>
        <Drawer v-model:isopen="newVersionDrawerOpen" v-model:isloading="newVersionDrawerLoading"
            @confirm="drawerConfirm" :drawerData="DrawerData"></Drawer>
    </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { getAllVersionInfo, getAllCommitsInfo, newVersionWithData } from '../../foundation/api/scmapi'
import VersionHistory from './versionHistory.vue';
import Commits from './commits.vue';
import { GobletSquareFull, Plus, House, Fold, Expand, RefreshRight } from '@element-plus/icons-vue'
import { utc2beijing } from '../../common/utils'
import Drawer from '../../common/drawer/drawer.vue'


export default {
    name: "Repository",
    components: { VersionHistory, GobletSquareFull, Plus, House, Commits, Fold, Expand, Drawer, RefreshRight },
    emits: ['updateRepository'],
    props: {
        RepositoryInfo: {
            type: Object,
            default: {
                baseInfo: {
                    name: 'flask-vue-myworld',
                    url: 'https://github.com/xccccccy/flask-vue-myworld',
                    version: 'v1.0.0'
                },
                versionHistorys: [
                    {
                        branch: 'alpha/1.0.1',
                        branchUrl: 'https://github.com/xccccccy/flask-vue-myworld/tree/alpha/1.0.0',
                        commitUrl: 'https://github.com/xccccccy/flask-vue-myworld/commit/811dc3e1115565866a50a92f137dcb1fde45d327',
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
                ],
                nowCommitSha: 'cdysud98uewyhe8whe8duwedy8wegfy7wegf7w6',
                versionCommitShas: ['cdysud98uewyhe8whe8duwedy8wegfy7wegf7w6']
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
    setup(props, context) {

        const versions_show = ref(true);
        const commitInfos_loading = ref(true);
        const newVersionDrawerOpen = ref(false);
        const newVersionDrawerLoading = ref(false);

        const allCommitInfos = ref([
            {
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
        ])

        var allCommitLooaded = false;
        const initAllCommits = (repos) => {
            commitInfos_loading.value = true;
            getAllCommitsInfo(repos).then((res) => {
                console.log(res.data.data)

                let commitInfos = res.data.data;
                let commits = [];
                let showDateNow = '';
                for (var commitInfo of commitInfos) {
                    let temp = {
                        commitAuthor: commitInfo['commit']['author']['name'],
                        commitAuthorUrl: commitInfo['author'] ? commitInfo['author']['html_url'] : 'https://github.com/xccccccy ',
                        commitAuthorAvatar: commitInfo['author'] ? commitInfo['author']['avatar_url'] : 'https://avatars.githubusercontent.com/u/97515896?v=4',
                        commitEmail: commitInfo['commit']['author']['email'],
                        commitDate: utc2beijing(commitInfo['commit']['author']['date']),
                        commitMessage: commitInfo['commit']['message'],
                        commitSha: commitInfo['sha'],
                        commitUrl: commitInfo['html_url'],
                        isversion: Object.keys(props.RepositoryInfo.versionCommitShas).indexOf(commitInfo['sha']) != -1,
                        isnowversion: props.RepositoryInfo.nowCommitSha == commitInfo['sha']
                    }
                    temp['version'] = temp.isversion ? props.RepositoryInfo.versionCommitShas[commitInfo['sha']] : '';
                    let time = utc2beijing(commitInfo['commit']['author']['date'])
                    temp['dateGuide'] = time.slice(0, time.indexOf(' '))
                    temp['showDateGuide'] = showDateNow == temp.dateGuide ? false : true;
                    showDateNow = temp.dateGuide;
                    commits.push(temp);
                }

                allCommitInfos.value = commits;
                console.log(allCommitInfos.value)

                allCommitLooaded = true;
                commitInfos_loading.value = false;
            }).catch((err) => {
                ElNotification({ message: '获取CommitsInfo失败。', type: 'warning', duration: 3000 });
                console.log('ERROR => ', err);
            });
        }

        const newVersion = () => {
            versions_show.value = !versions_show.value;
            if (!versions_show.value && !allCommitLooaded) {
                initAllCommits(props.RepositoryInfo.baseInfo.name)
            }
        }

        const DrawerData = reactive({
            'title': "新建Version",
            'items': {
                'repos': {
                    'title': 'Repos',
                    'type': 'input',
                    'default': props.RepositoryInfo.baseInfo.name,
                    'disable': true,
                },
                'commitSha': {
                    'title': 'Commit Sha',
                    'type': 'input',
                    'default': 'iushdjhjfdbfdjkf',
                    'disable': true
                },
                'version': {
                    'title': 'Version',
                    'type': 'select',
                    'default': props.RepositoryInfo.baseInfo.version,
                    'options': props.RepositoryInfo.versionHistorys.map((item, index, self) => { return item.version }),
                    'mark': "now version: " + props.RepositoryInfo.baseInfo.version
                }
            },
            'yesTitle': 'confirm',
        })

        var mode = 'new';

        const newVersionWithCommitSha = (commitSha) => {
            mode = 'new';
            DrawerData['title'] = '新建Version';
            DrawerData['yesTitle'] = 'confirm';
            DrawerData['items']['commitSha']['default'] = commitSha;
            DrawerData['items']['version']['type'] = 'input';
            newVersionDrawerOpen.value = true;
        }

        const drawerConfirm = (data) => {
            newVersionDrawerLoading.value = true;
            let { repos, commitSha, version } = data;
            if (mode == 'new') {
                version = version.startsWith('v') ? version : 'v' + version
                let versions = props.RepositoryInfo.versionHistorys.map((item, index, self) => { return item.version });
                if (versions.find(item => { return item == version })) {
                    ElNotification({ message: '已经存在Version: ' + version, type: 'error', duration: 3000 });
                    newVersionDrawerLoading.value = false;
                    return
                }
                newVersionWithData(repos, commitSha, version, mode).then((res) => {
                    console.log(res);
                    ElNotification({ message: '添加Version: ' + version + '成功！', type: 'success', duration: 3000 });
                    newVersionDrawerLoading.value = false;
                    newVersionDrawerOpen.value = false;
                    context.emit('updateRepository', repos)
                }).catch((err) => {
                    let error_message = err.response.data;
                    newVersionDrawerLoading.value = false;
                    ElNotification({ title: '创建Version失败。', message: error_message, type: 'warning', duration: 5000 });
                    console.log('ERROR => ', err);
                })
            } else {
                newVersionWithData(repos, commitSha, version, mode).then((res) => {
                    console.log(res);
                    ElNotification({ message: '更新Version: ' + version + '成功！', type: 'success', duration: 3000 });
                    newVersionDrawerLoading.value = false;
                    newVersionDrawerOpen.value = false;
                    context.emit('updateRepository', repos)
                }).catch((err) => {
                    let error_message = err.response.data;
                    newVersionDrawerLoading.value = false;
                    ElNotification({ title: '更新Version失败。', message: error_message, type: 'warning', duration: 5000 });
                    console.log('ERROR => ', err);
                })
            }
        }

        const updateRepository = (repos) => {
            context.emit('updateRepository', repos)
        }

        const expandAll = () => {

        }

        const foldAll = () => {

        }

        const updateCommits = () => {
            initAllCommits(props.RepositoryInfo.baseInfo.name)
        }

        const updateVersionWithCommitSha = (commitSha) => {
            mode = 'update';
            DrawerData['title'] = '更新Version';
            DrawerData['yesTitle'] = 'update';
            DrawerData['items']['commitSha']['default'] = commitSha;
            DrawerData['items']['version']['type'] = 'select';
            newVersionDrawerOpen.value = true;
        }


        return { versions_show, newVersion, allCommitInfos, commitInfos_loading, newVersionWithCommitSha, DrawerData, newVersionDrawerOpen, drawerConfirm, newVersionDrawerLoading, updateRepository, updateCommits, updateVersionWithCommitSha, expandAll, foldAll };
    }
}

</script>

<style scoped>
.version-info .title {
    font-size: 1.2rem;
}

.version-info span:last-child {
    font-size: 1rem;
    color: rgb(193, 171, 3);
}

.link {
    text-decoration: underline;
}
</style>