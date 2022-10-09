<template>
    <el-drawer v-model="isopen" direction="rtl" :before-close="handleClose" custom-class="drawer-bg">
        <template #title>
            <div class=" text-slate-800 dark:text-slate-200 text-lg">
                <div class="flex space-x-3">
                    <DataAnalysis style="width: 1.3rem; height: 1.3rem;" />
                    <span v-show="!data.newMode">更新Version</span>
                    <span v-show="data.newMode">新建Version</span>
                </div>
            </div>
        </template>
        <template #default>
            <div class=" text-slate-800 dark:text-slate-200 form">
                <div>
                    <span>Repos</span>
                    <el-input v-model="data.repos" disabled />
                </div>
                <div>
                    <span>Commit Sha</span>
                    <el-input v-model="data.commitSha" disabled />
                </div>
                <div>
                    <div class="flex justify-between">
                        <span>Version</span>
                        <div class=" rounded-2xl bg-green-600 text-gray-100 px-3 text-sm font-medium">
                            now version: <span>{{ data.nowversion }}</span>
                        </div>
                    </div>
                    <el-input v-if="data.newMode" v-model="version" />
                    <el-select v-if="!data.newMode" v-model="version" class="w-full" placeholder="Select" size="large">
                        <el-option v-for="item in data.versions" :key="item" :label="item" :value="item" />
                    </el-select>
                </div>
            </div>
        </template>
        <template #footer>
            <div style="flex: auto">
                <el-button @click="cancelClick">cancel</el-button>
                <el-button type="primary" @click="confirmClick" :loading="isloading">
                    <span v-show="data.newMode">confirm</span>
                    <span v-show="!data.newMode">update</span>
                </el-button>
            </div>
        </template>
    </el-drawer>

</template>

<script>
import { reactive, ref } from 'vue';
import { DataAnalysis } from '@element-plus/icons-vue'


export default {
    name: "NewVersionDrawer",
    components: { DataAnalysis },
    emits: ['update:isopen', 'update:isloading', 'newVersionConfirm'],
    props: {
        isopen: {
            type: Boolean,
            default: false
        },
        isloading: {
            type: Boolean,
            default: false
        },
        data: {
            type: Object,
            default: {
                'nowversion': 'v1.0.0',
                'repos': 'book-vue3',
                'commitSha': 'iushdjhjfdbfdjkf',
                'newMode': true,
                'versions': ['v1.0.0', 'v1.0.1']
            }
        }
    },
    setup(props, context) {

        function cancelClick() {
            context.emit('update:isopen', false)
        }

        function confirmClick() {
            context.emit('newVersionConfirm', {
                'repos': props.data.repos,
                'commitSha': props.data.commitSha,
                'version': version.value
            })
            context.emit('update:isloading', true)
        }

        const handleClose = (done) => {
            context.emit('update:isopen', false)
            done()
        }

        const version = ref(props.data.nowversion)

        return { cancelClick, confirmClick, handleClose, version };
    }
}
</script>

<style>
.drawer-bg {
    background-color: #f3f4f6;
}

.dark .drawer-bg {
    background-color: dimgrey;
    color: azure;
}

.form>div {
    padding: .3rem;
}

.form>div>div {
    margin-bottom: .5rem;
    margin-top: .5rem;
}
</style>