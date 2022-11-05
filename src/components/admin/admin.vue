<template>
    <div class="app w-full sm:w-11/12 2xl:w-9/12 pt-12 sm:pt-16 text-left pb-14">
        <div style="min-height: 90vh;" class="w-full flex">
            <div class="mt-2 mr-6">
                <div class=" text-center cursor-pointer" @click="isCollapse = !isCollapse">MENU</div>
                <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleSelect" @select="handleSelect"
                    @close="handleSelect" style="background: none;" :collapse="isCollapse">
                    <el-menu-item index="1">
                        <el-icon>
                            <SetUp />
                        </el-icon>
                        <span>Global Setting</span>
                    </el-menu-item>
                    <el-sub-menu index="2">
                        <template #title>
                            <el-icon>
                                <Menu></Menu>
                            </el-icon>
                            <span>App Version Control</span>
                        </template>
                        <el-menu-item index="2-1">
                            <el-icon>
                                <View></View>
                            </el-icon>
                            <span>Overall View</span>
                        </el-menu-item>
                        <el-menu-item index="2-2">
                            <el-icon>
                                <Setting></Setting>
                            </el-icon>
                            <span>Sub-repos Setting</span>
                        </el-menu-item>
                    </el-sub-menu>
                    <el-menu-item index="3">
                        <el-icon>
                            <SetUp />
                        </el-icon>
                        <span>內容管理系統(CMS)</span>
                    </el-menu-item>
                </el-menu>
            </div>
            <router-view class="flex-auto mt-5" />
        </div>
    </div>
</template>

<script>
import { reactive, ref } from 'vue';
import BackGround from '../common/background.vue'
import { useRouter } from 'vue-router';
import { Setting, Menu, SetUp, View } from '@element-plus/icons-vue'

export default {
    name: "Admin",
    components: { BackGround, Setting, Menu, SetUp, View },
    props: {
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
        let router = useRouter();

        const adminSetting = [
            {
                'type': 'menu-item',
                'title': 'Global Setting',
                'router': '/admin/globalsetting',
                'icon': SetUp,
            },
            {
                'type': 'sub-menu-item',
                'title': 'App Version Control',
                'icon': Menu,
                'items': [
                    {
                        'title': 'Overall View',
                        'router': '/admin/appversionmanage',
                        'icon': View
                    },
                    {
                        'title': 'Global Setting',
                        'router': '/admin/subrepossetting',
                        'icon': Setting,
                    }
                ]
            },
            {
                'type': 'menu-item',
                'title': 'Global Setting',
                'router': '/admin/cms',
                'icon': SetUp,
            },

        ]
        var adminRouter = {};
        adminSetting.forEach((item, index) => {
            if (item.type == 'menu-item') {
                adminRouter[String(index + 1)] = item.router
            } else if (item.type == 'sub-menu-item') {
                if (Object.keys(item).includes('router')) {
                    adminRouter[String(index + 1)] = item.router
                }
                item.items.forEach((subitem, subindex) => {
                    adminRouter[String(index + 1) + '-' + String(subindex + 1)] = subitem.router
                })

            }
        })

        let firstInit = true;
        const handleSelect = (key, keyPath) => {
            let nowurl = location.href;
            console.log(key, nowurl, nowurl.split('/')[4])
            if (Object.keys(adminRouter).includes(key) && (!firstInit || !nowurl.split('/')[4])) {
                router.push(adminRouter[key])
            }
            firstInit = false;
        }

        const isCollapse = ref(false)
        setTimeout(() => {
            isCollapse.value = true;
        }, 2000)

        return { handleSelect, isCollapse };
    }
}

</script>

<style scoped>

</style>