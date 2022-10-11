<template>
    <div class="app w-full sm:w-11/12 2xl:w-9/12 pt-12 sm:pt-16 text-left pb-14">
        <Header></Header>
        <BackGround></BackGround>
        <div v-loading="repos_loading" style="min-height: 80vh;" class="w-full">
            <el-tabs tab-position="top">
                <el-tab-pane label="App Version Manage">
                    <AppVersionManage />
                </el-tab-pane>
                <el-tab-pane v-for="(repositoryInfo, repositoryName) in repositoryInfos" :key="repositoryName"
                    :label="repositoryName" lazy>
                    <Repository :RepositoryInfo="repositoryInfo" style="min-height: 80vh;"
                        @updateRepository="updateNowRepositoryInfo" v-loading="repository_loading[repositoryName]">
                    </Repository>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { getAllReposInfo, getAllVersionInfo } from './scmapi'
import VersionHistory from './versionHistory.vue';
import Repository from './repository.vue';
import { utc2beijing } from '../utils'
import BackGround from '../foundation/background.vue'
import AppVersionManage from './appversionmanage.vue';

export default {
    name: "Scm",
    components: { VersionHistory, Repository, BackGround, AppVersionManage },
    props: {
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

        const repos_loading = ref(true)

        const repository_loading = ref({ 'flask-vue-myworld': true })

        const repositoryInfos = reactive({
            "book-vue3": {
                baseInfo: {
                    name: 'book-vue3',
                    url: 'https://github.com/xccccccy/book-vue3',
                    version: 'v1.0.0'
                },
                versionHistorys: [
                    {
                        repos: 'book-vue3',
                        branch: 'alpha/1.0.1',
                        branchUrl: 'https://github.com/xccccccy/book-vue3/tree/alpha/1.0.0',
                        commitUrl: 'https://github.com/xccccccy/book-vue3/commit/811dc3e1115565866a50a92f137dcb1fde45d327',
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
        })

        var allReposInfos = {};

        const initRepos = () => {
            getAllReposInfo().then((res) => {
                console.log(res.data)
                allReposInfos = res.data;
                repos_loading.value = false;
                // repositoryInfos.value = {};
                repository_loading.value = {};
                for (let reposName in allReposInfos) {
                    repository_loading.value[reposName] = true;
                    updateNowRepositoryInfo(reposName)
                }
            }).catch((err) => {
                ElNotification({ message: '获取Repos失败。', type: 'warning', duration: 3000 });
                console.log('ERROR => ', err);
            });
        }

        const updateNowRepositoryInfo = (repos) => {
            repository_loading.value[repos] = true;
            getAllVersionInfo(repos).then((res) => {
                console.log(res.data)
                var allVersionInfo = res.data;
                if (Object.keys(allVersionInfo.version_historys).length == 0) { return; }

                var version_historys = []
                var nowCommitSha;
                var versionCommitShas = {};
                for (let version_name in allVersionInfo.version_historys) {
                    let version_info = allVersionInfo.version_historys[version_name]
                    let version_history = {
                        repos: repos,
                        branch: version_info['name'],
                        branchUrl: version_info['_links']['html'],
                        commitUrl: version_info['commit']['html_url'],
                        version: 'v' + version_info['name'].slice(6),
                        versionAuthor: version_info['commit']['commit']['author']['name'],
                        versionAuthorUrl: version_info['commit']['author'] ? version_info['commit']['author']['html_url'] : "https://github.com/xccccccy",
                        versionAuthorAvatar: version_info['commit']['author'] ? version_info['commit']['author']['avatar_url'] : "https://avatars.githubusercontent.com/u/97515896?v=4",
                        versionDate: utc2beijing(version_info['commit']['commit']['author']['date']),
                        commitInfo: {
                            commitMessage: version_info['commit']['commit']['message'],
                            commitAuthor: version_info['commit']['commit']['author']['name'],
                            commitEmail: version_info['commit']['commit']['author']['email'],
                            commitDate: utc2beijing(version_info['commit']['commit']['author']['date']),
                            commitSha: version_info['commit']['sha']
                        }
                    }
                    version_historys.push(version_history)
                    versionCommitShas[version_history['commitInfo']['commitSha']] = version_history.version
                }

                let now_version = allVersionInfo['now_version'];
                version_historys = version_historys.sort((a, b) => {
                    return a.version == now_version ? -1 : (b.version == now_version ? 1 : (a.version < b.version ? 1 : -1))
                })
                nowCommitSha = version_historys[0]['commitInfo']['commitSha'];
                var baseInfo = {
                    name: repos,
                    url: allReposInfos[repos]['url'],
                    version: allVersionInfo['now_version']
                }

                repositoryInfos[repos] = {
                    'baseInfo': baseInfo,
                    'versionHistorys': version_historys,
                    'nowCommitSha': nowCommitSha,
                    'versionCommitShas': versionCommitShas
                }
                repository_loading.value[repos] = false;
            }).catch((err) => {
                ElNotification({ message: '获取VersionInfo失败。', type: 'warning', duration: 3000 });
                console.log('ERROR => ', err);
            });
        }

        initRepos()
        // repos_loading.value = false;
        // repository_loading.value['flask-vue-myworld'] = false;

        return { repos_loading, repository_loading, repositoryInfos, updateNowRepositoryInfo };
    }
}

</script>

<style scoped>
.version-info span:first-child {
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