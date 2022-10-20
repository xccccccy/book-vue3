<template>
    <div>
        <div class="flex">
            <span>{{ data.title }}</span>
            <div v-if="data.mark" class=" rounded-2xl bg-green-600 text-gray-100 px-3 text-sm font-medium ml-auto">
                {{ data.mark }}
            </div>
        </div>
        <el-select v-model="model" @change="handlechange" class="w-full" placeholder="Select" size="large">
            <el-option v-for="item in data.options" :key="item" :label="item" :value="item" />
        </el-select>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    name: "DrawerSelect",
    emits: ['update:model'],
    props: {
        model:{
            default: 'sddsd'
        },
        data: {
            title: "Version",
            default: "v1.0.0",
            disable: true,
            mark: "now version: v1.0.0",
            options: ['v1.0.0', 'v1.0.1']
        }
    },
    setup(props, context) {

        const handlechange = (value) => {
            context.emit('update:model', value);
        }

        return { handlechange }
    }
}
</script>

<style>

</style>