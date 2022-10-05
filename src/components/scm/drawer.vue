<template>
    <el-drawer v-model="isopen" direction="rtl" :before-close="handleClose" custom-class="drawer-bg">
        <template #title>
            <div class=" text-slate-800 dark:text-slate-200 text-lg">
                <div class="flex space-x-3">
                    <DataAnalysis style="width: 1.3rem; height: 1.3rem;" />
                    <span>新建Version</span>
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
                    <span>Version</span>
                    <el-input v-model="version" />
                </div>
            </div>
        </template>
        <template #footer>
            <div style="flex: auto">
                <el-button @click="cancelClick">cancel</el-button>
                <el-button type="primary" @click="confirmClick">confirm</el-button>
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
    emits: ['update:isopen', 'newVersionConfirm'],
    props: {
        isopen: {
            type: Boolean,
            default: false
        },
        data: {
            type: Object,
            default: {
                'repos': 'book-vue3',
                'commitSha': 'iushdjhjfdbfdjkf'
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
            context.emit('update:isopen', false)

        }

        const handleClose = (done) => {
            context.emit('update:isopen', false)
            done()
        }

        const version = ref('v1.0.1')

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