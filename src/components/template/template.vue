<template>
    <div class="app w-full sm:w-11/12 2xl:w-9/12 pt-12 sm:pt-16 text-left pb-14">
        <Header></Header>
        <Background></Background>
        <div style="min-height: 90vh;" class="w-full flex">
            <div class="mt-2 mr-6">
                <div class=" text-center">MENU</div>
                <el-menu default-active="1" class="el-menu-vertical-demo" @select="handleSelect"
                    style="background: none;">
                    <el-menu-item index="1">
                        <span>Photo Frame</span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <span>Border Animation</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <span>GradientBG Animation</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <span>视差特效</span>
                    </el-menu-item>
                </el-menu>
            </div>
            <router-view class="flex-auto mt-5" />
        </div>
    </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    name: 'Template',
    setup() {
        let router = useRouter();
        const tempRouter = {
            '1': 'PhotoFrame',
            '2': 'BorderAnimation',
            '3': 'GradientBGAnimation',
            '4': 'Parallax'
        }
        const handleSelect = (key, keyPath) => {
            if (Object.keys(tempRouter).includes(String(key))) {
                router.push('/template/' + tempRouter[key])
            }
        }
        handleSelect(1,1)

        return { handleSelect }
    }
}
</script>

<style>

</style>