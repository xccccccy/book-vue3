<template>
    <div>
        <el-select v-model="urlName" class="w-full my-4" placeholder="Select" size="large">
            <el-option v-for="item in urlNames" :key="item" :label="item" :value="item" />
        </el-select>
        <el-button @click="initDownloadVideos">初始化视频数据库</el-button>
    </div>
</template>

<script>
import { ref, reactive } from "vue"
import { initVideoDatabase, initUrlNames } from "../foundation/api/cmsapi"

export default {
    name: "CMS",
    setup() {
        const urlName = ref('')
        const urlNames = ref([])
        const initUrlName = () => {
            initUrlNames()
                .then((res) => {
                    urlNames.value = res.data.data;
                    urlName.value = urlNames.value?.[0]
                })
                .catch((err) => {
                    ElNotification({ message: "ERROR!", type: 'error', duration: 2500 });
                })
        }
        initUrlName()

        const initDownloadVideos = () => {
            initVideoDatabase(urlName.value)
                .then((res) => {
                    ElNotification({ message: res.data, type: 'success', duration: 2500 });
                })
                .catch((err) => {
                    ElNotification({ message: "ERROR!", type: 'error', duration: 2500 });
                })
        }
        return { initDownloadVideos, urlNames, urlName }
    }

}
</script>

<style>

</style>