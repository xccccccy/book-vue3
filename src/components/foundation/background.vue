<template>
    <div class="backpic absolute left-0 top-0">
        <img src="../../assets/img/back1.avif" />
        <img src="../../assets/img/back_qiu.svg" />
    </div>
</template>

<script>
export default {
    name: "BackGround",
    components: {  },
    props: {
        
    },
    setup() {
        
    }
}
</script>

<style>
.backpic {
    z-index: -1;
    max-height: 100%;
    overflow: hidden;
}

.dark .backpic {
    filter: brightness(0.75);
}

.backpic img:nth-child(1) {
    top: 0;
    left: 5%;
}

.backpic img:nth-child(2) {
    top: 50%;
    left: -30%;
    opacity: 0.7;
}
</style>