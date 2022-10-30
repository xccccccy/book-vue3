<template>
    <div>
        <!-- <el-select v-model="urlName" class="w-full my-4" placeholder="Select" size="large">
            <el-option v-for="item in urlNames" :key="item" :label="item" :value="item" />
        </el-select> -->
        <el-checkbox-group v-model="urlName.private" size="large" class="w-full my-4">
            <el-checkbox-button v-for="item in urlNames.private" :key="item" :label="item" :value="item">
                {{ item }}
            </el-checkbox-button>
        </el-checkbox-group>
        <el-checkbox-group v-model="urlName.official" size="large" class="w-full my-4 hidden">
            <el-checkbox-button v-for="item in urlNames.official" :key="item" :label="item" :value="item">
                {{ item }}
            </el-checkbox-button>
        </el-checkbox-group>
        <el-button @click="initDownloadVideos">初始化视频数据库</el-button>
        <el-button @click="delDownloadVideos">删除视频数据库所有数据</el-button>
    </div>
</template>

<script>
import { ref, reactive } from "vue"
import { initVideoDatabase, initUrlNames, delAllVideos } from "../foundation/api/cmsapi"

export default {
    name: "CMS",
    setup() {
        const urlName = ref({ "private": [], "official": [] })
        const urlNames = ref({ "private": [], "official": [] })
        const initUrlName = () => {
            initUrlNames()
                .then((res) => {
                    urlNames.value = res.data.data;
                })
                .catch((err) => {
                    ElNotification({ message: "ERROR!", type: 'error', duration: 2500 });
                })
        }
        initUrlName()

        const initDownloadVideos = () => {
            const downloadLoading = ElLoading.service({ fullscreen: true, lock: true, text: '正在下载。。。' })
            initVideoDatabase(urlName.value)
                .then((res) => {
                    ElNotification({ message: res.data, type: 'success', duration: 2500 });
                })
                .catch((err) => {
                    ElNotification({ message: "ERROR!", type: 'error', duration: 2500 });
                })
                .finally(() => {
                    downloadLoading.close()
                })
        }

        const delDownloadVideos = () => {
            const delLoading = ElLoading.service({ fullscreen: true, lock: true, text: '正在删除' })
            delAllVideos()
                .then((res) => {
                    console.log(res);
                    ElNotification({ message: res.data, type: 'success', duration: 2500 });
                })
                .catch((err) => {
                    ElNotification({ message: "ERROR!", type: 'error', duration: 2500 });
                })
                .finally(() => {
                    delLoading.close()
                })
        }

        return { initDownloadVideos, urlNames, urlName, delDownloadVideos }
    }

}
</script>

<style>

</style>