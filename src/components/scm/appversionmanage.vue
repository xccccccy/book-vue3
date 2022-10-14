<template>
    <div class="">
        <div>
            <span>APP Name : </span>
            <span>{{ appName }}</span>
        </div>
        <table class="mt-4 w-full">
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
            <!-- <div class="flex mt-3 py-2 border-b">
                <div class="flex-1 space-x-4 flex">
                    <div v-for="(key) in Object.keys(tableData[0])" :key="key" class=" w-1/3">{{ key }}</div>
                </div>
                <el-input v-model="search" placeholder="Type to search" style="width: 15rem;" />
            </div>
            <div>
                <div v-for="(data, index) in filterTableData" :key="data.version"
                    class="flex mt-4 py-1 border-b hover:bg-slate-500">
                    <div class="flex-1 space-x-4 flex">
                        <span v-for="(value, key) in data" :key="key" class=" w-1/3">{{ value }}</span>
                    </div>
                    <div class="flex space-x-3 mr-2 justify-end" style="width: 15rem;">
                        <el-button @click="handleEdit(index, data)">Edit</el-button>
                        <el-button type="danger" @click="handleDelete(index, data)">Delete</el-button>
                    </div>
                </div>
            </div> -->
        </table>
        <Drawer v-model:isopen="drawerOpen" v-model:isloading="drawerLoading" @confirm="drawerConfirm"
            :drawerData="drawerData"></Drawer>
    </div>
</template>
  
<script>
import { computed, reactive, ref } from 'vue'

export default {
    name: "AppVersionManage",
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
            Object.keys(data[Object.keys(data)[0]]).map(() => {
                
            })
            drawerData['items']['kn'] = {
                'title': 'Version',
                'type': 'select',
                'default': props.RepositoryInfo.baseInfo.version,
                'options': props.RepositoryInfo.versionHistorys.map((item, index, self) => { return item.version }),
                'mark': "now version: " + props.RepositoryInfo.baseInfo.version
            }
        }
        const drawerConfirm = (data) => {
            console.log(data)
        }

        const handleDelete = (index, row) => {
            console.log(index, row);
            ElNotification({ message: '暂不支持删除App Version！', type: 'warning', duration: 1500 });
        }

        return { tableData, filterTableData, handleEdit, handleDelete, search, appName, drawerData, drawerOpen, drawerLoading, drawerConfirm }
    }
}
</script>
  
<style>

</style>