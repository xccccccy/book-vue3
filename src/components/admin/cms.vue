<template>
    <div>
        <el-button @click="initDownloadVideos" disabled>初始化视频数据库</el-button>

    </div>
</template>

<script>
import { ref, reactive } from "vue"
import { initVideoDatabase } from "../foundation/api/cmsapi"

export default {
    name: "CMS",
    setup() {

        const initDownloadVideos = () => {
            initVideoDatabase()
                .then((res) => {
                    ElNotification({ message: res.data, type: 'success', duration: 2500 });
                })
                .catch((err) => {
                    ElNotification({ message: "ERROR!", type: 'error', duration: 2500 });
                })
        }
        return { initDownloadVideos }
    }

}
</script>

<style>

</style>