<template>
    <div>
        <div>
            <div>
                <div>基础信息</div>
                <div>
                    <div>
                        <span>分支 : </span>
                        <span><a :href="versionInfo.branchLink"></a>{{ versionInfo.branch }}</span>
                    </div>
                    <div>
                        <span>Version : </span>
                        <span>{{ versionInfo.version }}</span>
                    </div>
                </div>
                <div>
                    <div>
                        <span>发版人 : </span>
                        <span>{{ versionInfo.versionAuthor }}</span>
                    </div>
                    <div>
                        <span>Date : </span>
                        <span>{{ versionInfo.versionDate }}</span>
                    </div>
                </div>
            </div>
            <div>
                <div>关联Commit</div>
                <CommitInfo :data="versionInfo.commitInfo"></CommitInfo>
            </div>
        </div>
        <div>
            <div>操作区</div>
            <div>
                <span>当前版本 ✅</span>
                <span>设置为当前版本</span>
            </div>
        </div>
    </div>
</template>

<script>
import CommitInfo from './commitInfo.vue'

export default {
    name: "VersionHistory",
    components: { CommitInfo },
    props: {
        versionInfo: {
            type: Object,
            default: {
                branch: 'alpha/1.0.0',
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
        }
    },
    setup() {

        return {};
    }
}

</script>

<style scoped>

</style>