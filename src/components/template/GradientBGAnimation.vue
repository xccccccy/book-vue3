<!-- 动态渐变背景 -->
<template>
    <div>
        <div class="text-xl p-2 m-2 ">GradientBGAnimation</div>
        <div class="gradient"></div>
    </div>
</template>

<script>

export default {
    name: 'GradientBGAnimation',
    setup() {
    }
}
</script>

<style scoped>
.gradient {
    /* width: 400px; */
    height: 400px;
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 600% 600%;
    animation: gradientBG 5s ease infinite;
}

@keyframes gradientBG {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}
</style>