<template>
    <div class="home" @click="$router.push(homeSetting.homeHref)">
        <fluent-emoji:astronaut-medium-light class="h-6 w-6 m-1"/>
        <a class="bg-clip-text linear-gradient inverse text-fill-transparent">{{ homeSetting.homeString }}</a>
    </div>
</template>

<script>

export default {
    name: "HomeHeader",
    props: {
        homeSetting: {
            type: Object,
            default: {
                homeString: 'Home',
                homeHref: '/'
            }
        }
    },
    setup(props) {
        return {};
    }
}

</script>

<style scoped>
.home {
    margin-left: .2rem;
    margin-right: auto !important;
}

.home a {
    font-size: 1.3rem;
    font-weight: 500;
    vertical-align: middle;
}
.home:hover {
    border-bottom: none !important;
}
</style>