<template>
    <div>
        <div class="flex">
            <span>{{ data.title }}</span>
            <div v-if="data.mark" class=" rounded-2xl bg-green-600 text-gray-100 px-3 text-sm font-medium ml-auto">
                {{ data.mark }}
            </div>
        </div>
        <el-input v-model="model" @input="handleinput" :disabled="data.disable"/>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    name: "DrawerInput",
    emits: ['update:model'],
    props: {
        model:{
            default: 'sddsd'
        },
        data: {
            title: "Repos",
            default: "book-vue3",
            disable: true,
            mark: "now version: v1.0.0"
        }
    },
    setup(props, context) {

        const handleinput = (value) => {
            context.emit('update:model', value);
        }

        return { handleinput }
    }
}
</script>

<style>

</style>