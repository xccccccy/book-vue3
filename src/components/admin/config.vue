<template>
    <div class="flex flex-col dark-transition rounded-md shadow-2xl dark:shadow-none bg-white dark:bg-slate-800 backdrop-filter bg-opacity-50 dark:bg-opacity-50 p-2 config w-1/2 xl:w-1/3 border border-violet-300 border-opacity-50"
        style="min-height: 80vh;">
        <div class="text-2xl p-5 font-medium">ALL Config</div>
        <div class="mb-auto" :loading="getloading">
            <div v-for="(one_config, index) in configData" :key="index" class="p-2 flex justify-around items-center">
                <span class="w-1/2">{{ one_config.name }}</span>
                <div class="mx-5 inline-block w-1/2">
                    <div v-if="one_config.type == 'switch'">
                        <el-switch v-model="one_config.if" inline-prompt :active-icon="Check" :inactive-icon="Close" />
                    </div>
                    <div v-if="one_config.type == 'select'">
                        <el-select v-model="one_config.value" placeholder="Select" size="default" class="w-32">
                            <el-option v-for="item in one_config.options" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </div>
                    <div v-if="one_config.type == 'input'">
                        <input class=" w-28" type="text" v-model="one_config.where" />
                    </div>
                </div>
            </div>
        </div>
        <el-button type="primary" plain @click="config_change" class="m-2">保存更改</el-button>
    </div>
</template>

<script>
import { ref, onMounted, defineComponent, watch, reactive } from 'vue'
import $ from "jquery";
import axios from 'axios';
import { Check, Close } from '@element-plus/icons-vue'

export default {
    name: 'ConfigComponent',
    props: {
        configData: { default: {} },
    },
    setup(props, context) {
        const getloading = ref(false);
        onMounted(() => {

        })

        const config_change = () => {
            getloading.value = true;
            axios
                .post("/api/updateconfig", {
                    newconfig: props.configData
                })
                .then((res) => {
                    if (res.data.res) {
                        ElNotification({ message: '保存成功', type: 'success', duration: 2000 });
                    } else {
                        ElNotification({ message: res.data.context, type: 'info', duration: 3000 });
                    }
                })
                .catch((err) => {
                    getloading.value = false;
                    ElNotification({ message: '失败！请重试！', type: 'error', duration: 3000 });
                    console.log(err);
                });
        }

        return { getloading, Check, Close, config_change }
    },
}
</script>

<style scoped>
input {
    margin: 0.5rem 0;
    border: 1px solid #1068d38a;
    border-radius: 2px;
    font-size: 16px;
    padding: 0.2rem 0.5rem;
    vertical-align: middle;
}

input:focus {
    outline: 1px solid #100c958a;
}
</style>
