<template>
    <div class="search hidden sm:flex my-2 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
        <el-input v-model="search_string" :placeholder="headerSetting.placeholder" class="input-with-select"
            @keyup.enter="headerSetting.clickHandle(search_string)">
            <template #suffix>
                <el-icon class="el-input__icon" @click="headerSetting.clickHandle(search_string)">
                    <Search />
                </el-icon>
            </template>
        </el-input>
    </div>
</template>

<script>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'

export default {
    name: "HomeHeader",
    components: { Search },
    props: {
        headerSetting: {
            type: Object
        },
        homeString: {
            type: String,
            default: 'Home'
        },
        homeHref: {
            type: String,
            default: '/'
        }
    },
    setup() {

        const search_string = ref('')

        return { search_string };
    }
}

</script>

<style scoped>
.search:hover {
    background: none !important;
    border-bottom: none !important;
}

.input-with-select {
    opacity: 0.9;
    color: #000;
}

.el-input__icon {
    color: #4642c5;
    font-size: 1.3rem;
}
</style>