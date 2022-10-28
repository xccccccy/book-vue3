<template>
    <div class="">
        <div class="mb-7 flex justify-between items-center">
            <div>
                <span>APP Name : </span>
                <span>{{ appName }}</span>
            </div>
            <div class="flex space-x-2 items-center">
                <div class="flex items-center p-2 mr-4 rounded-full shadow-2xl bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white"
                    @click="newversion">
                    <Plus style="width: 1.3rem; height: 1.3rem;"></Plus>
                </div>
                <el-tooltip content="快速发布最新Develop版本" placement="bottom" effect="dark">
                    <div class="flex items-center p-3 mr-4 rounded-full shadow-2xl bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white"
                        @click="updateFastVersion">
                        <Promotion style="width: 1.3rem; height: 1.3rem;"></Promotion>
                    </div>
                </el-tooltip>
            </div>
        </div>
        <table class="w-full ">
            <tr class=" space-x-4 space-y-2">
                <td v-for="(key) in Object.keys(tableData[0])" :key="key" class="">
                    <div class="mx-2 my-1">{{ key }}</div>
                </td>
                <td>
                    <el-input v-model="search" placeholder="Type to search" />
                </td>
            </tr>
            <tr v-for="(data, index) in filterTableData" :key="data.version" class=" mt-4 py-1 border-b">
                <td v-for="(value, key) in data" :key="key" class="">
                    <div class="p-2 pb-1 my-1 mr-2">{{ value }}</div>
                </td>
                <td class="flex space-x-3 mr-2 justify-end p-2 pb-1 my-1">
                    <el-button @click="handleEdit(index, data)">Edit</el-button>
                    <el-button type="danger" @click="handleDelete(index, data)">Delete</el-button>
                </td>
            </tr>
        </table>
        <Drawer v-model:isopen="drawerOpen" v-model:isloading="drawerLoading" @confirm="drawerConfirm"
            :drawerData="drawerData"></Drawer>
    </div>
</template>
  
<script>
import { computed, reactive, ref } from 'vue'
import { Plus, Promotion } from '@element-plus/icons-vue'
import { updateFastVersionApi } from '../../foundation/api/scmapi'
import { ElLoading } from 'element-plus'

export default {
    name: "AppVersionManage",
    components: { Promotion, Plus },
    setup() {
        const search = ref('')
        const tableData = ref([
            {
                "version": 'v1.0.0',
                "book-vue3_version": 'v1.0.0',
                "flask-vue-myworld_version": 'v1.0.0',
            }
        ])
        const appName = ref('My Wrold')
        // 请求的数据
        let data = {
            "v1.0.0": {
                "book-vue3": {
                    "version": "v1.0.0"
                },
                "flask-vue-myworld": {
                    "version": "v1.0.0"
                }
            }, "v1.0.1": {
                "book-vue3": {
                    "version": "v1.0.1"
                },
                "flask-vue-myworld": {
                    "version": "v1.0.1"
                }
            }
        }

        let _tableData = []
        Object.keys(data).forEach((version) => {
            let temp = {
                'version': version
            }
            let subRepos = Object.keys(data[version]);
            subRepos.forEach((subRepo) => {
                temp[subRepo + "_version"] = data[version][subRepo]["version"]
            })
            _tableData.push(temp)
        })
        tableData.value = _tableData;

        const filterTableData = computed(() =>
            tableData.value.filter((data) =>
                !search.value ||
                data.version.toLowerCase().includes(search.value.toLowerCase())
            )
        )

        const drawerData = reactive({
            'title': "编辑Version",
            'items': {
                'version': {
                    'title': 'App Version',
                    'type': 'input',
                    'default': 'null',
                    'disable': true,
                }
            },
            'yesTitle': 'confirm',
            'nowversion': 'v1.0.0',
        })
        const drawerOpen = ref(false)
        const drawerLoading = ref(false)
        const handleEdit = (index, row) => {
            console.log(index, row);
            for (let key in row) {
                let value = row[key];
                if (key == 'version') {
                    drawerData['items'][key]['default'] = value;
                    continue
                }
                drawerData['items'][key] = {
                    'title': key.replace('_', ' '),
                    'type': 'input',
                    'default': value,
                    'mark': "now version: " + value
                }
            }
            drawerOpen.value = true;
        }
        const drawerConfirm = (data) => {
            drawerLoading.value = true;
            console.log(data)
            drawerLoading.value = false;
        }

        const handleDelete = (index, row) => {
            console.log(index, row);
            ElNotification({ message: '暂不支持删除App Version！', type: 'warning', duration: 1500 });
        }

        const updateFastVersion = () => {
            const updateFastLoading = ElLoading.service({ fullscreen: true, lock: true, text: '正在快速发布最新Develop版本中' })
            updateFastVersionApi(appName.value)
                .then((res) => {
                    console.log(res.data);
                    ElNotification({ message: '快速发布最新Develop版本成功', type: 'success', duration: 2500 });
                })
                .catch((err) => {
                    console.log(err);
                    ElNotification({ message: err.response.data, type: 'error', duration: 3000 });
                })
                .finally(() => {
                    updateFastLoading.close()
                })
        }

        return { tableData, filterTableData, handleEdit, handleDelete, search, appName, drawerData, drawerOpen, drawerLoading, drawerConfirm, updateFastVersion }
    }
}
</script>
  
<style>
/* 网格背景下 */
.herderbg {
    background-image: radial-gradient(transparent 2px, #000 2px);
    background-size: 4px 4px;
    backdrop-filter: saturate(50%) blur(4px);
}
</style>