<template>
    <div class="app w-full sm:w-11/12 2xl:w-2/3 pt-12 sm:pt-16 text-left pb-14">
        <Header></Header>
        <div class="">
            <div class="flex space-x-10 p-4 version-info">
                <div>
                    <span>Repository : </span>
                    <span class="link"><a href="baidu.com">flask-vue-myworld</a></span>
                </div>
                <div>
                    <span>Now Version : </span>
                    <span>1.0.0</span>
                </div>
            </div>
            <div>
                <VersionHistory v-for="(versionHistory, index) in versionHistorys" :versionInfo="versionHistory">
                </VersionHistory>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { getAllVersionInfo } from './scmapi'

export default {
    name: "Scm",
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

        // init all version info
        const scmInfo = ref({})

        const versionHistorys = ref([
            {
                branch: 'alpha/1.0.1',
                branchLink: 'https://github.com/xccccccy/flask-vue-myworld/tree/alpha/1.0.0',
                version: '1.0.0',
                versionAuthor: 'xccccccy',
                versionDate: '2022年9月22日 19:26:58',
                commitInfo: {
                    commitMessage: 'init commit',
                    commitAuthor: 'xccccccy',
                    commitEmail: '***@163.com',
                    commitDate: '2022年9月22日 19:26:58',
                    commitSha: 'cdysud98uewyhe8whe8duwedy8wegfy7wegf7w6'
                }
            }
        ])
        getAllVersionInfo().then((res) => {
            console.log(res.data)
            var allVersionInfo = res.data;

            var version_historys = []
            for (let version_name in allVersionInfo.version_historys['flask-vue-myworld']) {
                let version_info = allVersionInfo.version_historys['flask-vue-myworld'][version_name]
                let version_history = {
                    branch: version_info['name'],
                    branchLink: version_info['_links']['html'],
                    version: 'v' + version_info['name'].slice(6),
                    versionAuthor: version_info['commit']['commit']['author']['name'],
                    versionDate: version_info['commit']['commit']['author']['date'],
                    commitInfo: {
                        commitMessage: version_info['commit']['commit']['message'],
                        commitAuthor: version_info['commit']['commit']['author']['name'],
                        commitEmail: version_info['commit']['commit']['author']['email'],
                        commitDate: version_info['commit']['commit']['author']['date'],
                        commitSha: version_info['commit']['sha']
                    }
                }
                version_historys.push(version_history)
            }

            scmInfo.value = allVersionInfo.version_dict
            versionHistorys.value = version_historys
            console.log(versionHistorys)
        })

        return { scmInfo, versionHistorys };
    }
}

</script>

<style scoped>
.version-info span:first-child{
    font-size: 1.35rem;
}
.version-info span:last-child{
    font-size: 1rem;
    color: rgb(193, 171, 3);
}

.link {
    text-decoration: underline;
}
</style>