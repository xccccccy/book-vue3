<template>
    <el-drawer v-model="isopen" direction="rtl" :before-close="handleClose" custom-class="drawer-bg">
        <template #header>
            <div class=" text-slate-800 dark:text-slate-200 text-lg">
                <div class="flex space-x-3">
                    <DataAnalysis style="width: 1.3rem; height: 1.3rem;" />
                    <span>{{ drawerData.title }}</span>
                </div>
            </div>
        </template>
        <template #default>
            <div class="text-slate-800 dark:text-slate-200 form">
                <component v-for="(data, key) in drawerData.items" :is="drawerComponents[data.type]" :key="key"
                    v-model:model="models[key]" :data="data"></component>
            </div>
        </template>
        <template #footer>
            <div style="flex: auto">
                <el-button @click="cancelClick">cancel</el-button>
                <el-button type="primary" @click="confirmClick" :loading="isloading">
                    <span>{{ drawerData.yesTitle }}</span>
                </el-button>
            </div>
        </template>
    </el-drawer>

</template>

<script>
import { computed, reactive, ref } from 'vue';
import { DataAnalysis } from '@element-plus/icons-vue'
import DrawerInput from './drawer_input.vue'
import DrawerSelect from './drawer_select.vue'


export default {
    name: "Drawer",
    components: { DataAnalysis },
    emits: ['update:isopen', 'update:isloading', 'confirm'],
    props: {
        isopen: {
            type: Boolean,
            default: true
        },
        isloading: {
            type: Boolean,
            default: false
        },
        drawerData: {
            type: Object,
            default: {
                'title': "新建Version",
                'items': {
                    'repos': {
                        'title': 'Repos',
                        'type': 'input',
                        'default': 'book-vue3',
                        'disable': true,
                        'mark': "main"
                    },
                    'commitSha': {
                        'title': 'Commit Sha',
                        'type': 'input',
                        'default': 'iushdjhjfdbfdjkf',
                        'disable': true
                    },
                    'version': {
                        'title': 'Version',
                        'type': 'select',
                        'default': 'v1.0.0',
                        'options': ['v1.0.0', 'v1.0.1'],
                        'mark': "now version: v1.0.0"
                    }
                },
                'yesTitle': 'confirm',
                'nowversion': 'v1.0.0',
            }
        }
    },
    setup(props, context) {

        function cancelClick() {
            context.emit('update:isopen', false)
        }

        const handleClose = (done) => {
            context.emit('update:isopen', false)
            done()
        }

        const drawerComponents = {
            input: DrawerInput,
            select: DrawerSelect
        }

        let tempModels = {}
        Object.keys(props.drawerData.items).forEach((key) => {
            tempModels[key] = props.drawerData.items[key]['default'];
        })

        const models = computed(() => {
            let tempModels = {}
            Object.keys(props.drawerData.items).forEach((key) => {
                tempModels[key] = props.drawerData.items[key]['default'];
            })
            return tempModels;
        })

        function confirmClick() {
            let confirmData = {}
            Object.keys(props.drawerData.items).forEach((key) => {
                confirmData[key] = models.value[key];
            })
            context.emit('confirm', confirmData)
        }


        return { cancelClick, confirmClick, handleClose, drawerComponents, models };
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
    padding: .6rem;
}

.form>div>div {
    margin-top: .6rem;
}
</style>