<template>
    <div @click="headerSetting.clickHandle" :class="headerSetting.class">
        <component :is="headerSetting.iconSetting" class="h-6 w-6 text-indigo-600"/>
        <span :style="headerSetting.style">{{ headerSetting.headerString }}</span>
    </div>
</template>

<script>

export default {
    name: "CommonHeader",
    props: {
        headerSetting: {
            type: Object,
            default: {
                clickHandle: {
                    type: Function,
                    default: () => {
                        console.log('qwerty')
                    }
                },
                myClass: {
                    type: String,
                    default: '/'
                },
                headerString: {
                    type: String,
                    default: '默认Header'
                }
            }
        },

    },
    setup() {

        return {};
    }
}

</script>

<style scoped>
.home {
    margin-left: .6rem;
    margin-right: auto !important;
}

.home a {
    font-size: 1.5rem;
    font-weight: 500;
    vertical-align: middle;
}
</style>