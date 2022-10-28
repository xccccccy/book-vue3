<template>
    <div>
        <div>
            <span>Commit Message : </span>
            <span>{{data.commitMessage}}</span>
        </div>
        <div>
            <span>Commit Author : </span>
            <span>{{data.commitAuthor}}</span>
        </div>
        <div>
            <span>Commit Author Email: </span>
            <span>{{data.commitEmail}}</span>
        </div>
        <div>
            <span>Commit Date : </span>
            <span>{{data.commitDate}}</span>
        </div>
        <div>
            <span>Commit sha : </span>
            <span>{{data.commitSha}}</span>
        </div>
    </div>
</template>

<script>

export default {
    name: "CommitInfo",
    props: {
        data: {
            type: Object,
            default: {
                commitMessage: 'init commit',
                commitAuthor: 'xccccccy',
                commitEmail: '***@163.com',
                commitDate: '2022年9月22日 19:26:58',
                commitSha: 'cdysud98uewyhe8whe8duwedy8wegfy7wegf7w6'
            }
        }
    },
    setup() {

        return {};
    }
}

</script>

<style scoped>

div > span {
    padding-right: .5rem;
}

div > div {
    margin-bottom: .3rem;
}
</style>