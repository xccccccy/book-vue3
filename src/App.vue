<template>
    <Header :headerSetting="headerStore.headerSetting"></Header>
    <BackGround></BackGround>
    <router-view class="root pt-14" />
    <Footer></Footer>
</template>

<script>
import { ref, onMounted, onBeforeMount } from 'vue'
import { useRouter } from "vue-router";
import axios from 'axios';
import Footer from './components/footer/footer.vue'
import Header from './components/header/header.vue'
import BackGround from './components/common/background.vue'
import { useHeaderStore } from './stores/header'

export default {
    components: { Footer, Header, BackGround },
    setup(props, content) {
        const headerStore = useHeaderStore()
        var router = useRouter();
        onMounted(() => {
            axios
                .get('/api/rootredirect')
                .then((res) => {
                    if (res.data == '/') {
                    } else {
                        let newurl = location.href;
                        if (newurl.split('/').slice(3).join('/') == '') {
                            router.push(res.data);
                        }
                    }
                })
                .catch((res) => {
                    console.log(res)
                })
        })

        return { headerStore }
    },
}

localStorage.removeItem("bookuser");
</script>


<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    position: relative;
    align-items: center;
}


.root {
    min-height: 100vh;
    width: 100%;
}

a {
    text-decoration: none;
}

.app {
    min-height: 100vh;
}
</style>
