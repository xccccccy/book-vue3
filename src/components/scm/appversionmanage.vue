<template>
    <div class=" text-2xl">
        <div>
            <span>APP Name : </span>
            <span>{{ }}</span>
        </div>
        <el-table :data="filterTableData" style="width: 100%; font-size: 1.5rem;">
            <el-table-column v-for="key in data" :key="key" label="Version" prop="version" />
            <el-table-column label="Version" prop="version" />
            <el-table-column label="Name" prop="name" />
            <el-table-column align="right">
                <template #header>
                    <el-input v-model="search" placeholder="Type to search" />
                </template>
                <template #default="scope">
                    <el-button @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                    <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
  
<script>
import { computed, ref } from 'vue'

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
        // 请求的数据
        let data = {
            "v1.0.0": {
                "book-vue3": {
                    "version": "v1.0.0"
                },
                "flask-vue-myworld": {
                    "version": "v1.0.0"
                }
            }
        }

        let _tableData = []
        Object.keys(data).forEach((version) => {
            let subRepos = Object.keys(version);
            let temp = {
                'version': version
            }
            subRepos.forEach((subRepo) => {
                temp[subRepo + "_version"] = data[version][subRepo]["version"]
            })
            _tableData.push(temp)
        })
        tableData.value = _tableData;

        const filterTableData = computed(() =>
            tableData.filter((data) =>
                !search.value ||
                data.version.toLowerCase().includes(search.value.toLowerCase())
            )
        )
        const handleEdit = (index, row) => {
            console.log(index, row)
        }
        const handleDelete = (index, row) => {
            console.log(index, row)
        }

        return { filterTableData, handleEdit, handleDelete }
    }
}
</script>
  
<style>

</style>