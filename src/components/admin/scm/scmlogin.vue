<template>
    <div class="app w-full sm:w-11/12 2xl:w-9/12 pt-12 sm:pt-16 text-left pb-14">
        <Header></Header>
        <BackGround></BackGround>
        <div style="margin-top: 10vh;">
            <div class="flex flex-col w-1/2 my-0 mx-auto space-y-4">
                <div class="">
                    <input type="text" v-model="token" placeholder="token" class="w-full"/>
                </div>
                <el-button type="primary" plain @click="login" :loading="loginLoading">登录</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { scmlogin, scmtesttoken } from '../../foundation/api/scmapi';
import { useRouter } from "vue-router";
import BackGround from '../../common/background.vue'


export default {

    name: "ScmLogin",
    components: { BackGround },
    setup(props, context) {
        let router = useRouter();

        const token = ref('');
        const loginLoading = ref(false);

        const login = () => {
            loginLoading.value = true;
            scmlogin(token.value).then((res) => {
                console.log(res.data)
                localStorage.scmToken = token.value;
                router.push('/admin');
            }).catch((err) => {
                ElNotification({ message: '无效或者失效的Token。', type: 'warning', duration: 3000 });
                console.log('ERROR => ', err);
            }).finally(() => {
                loginLoading.value = false;
            });
        }
        const initLog = () => {
            scmtesttoken().then((res) => {
                if (res.data == 'success') {
                    router.push('/admin');
                }
            }).catch(() => {
                if (localStorage.scmToken) {
                    token.value = localStorage.scmToken;
                    ElNotification({ message: '正在尝试验证Token。', type: 'info', duration: 3000 });
                    login();
                }
            })
        }
        initLog()

        return { loginLoading, token, login };
    }
}
</script>

<style>
input {
    margin: 0.5rem 0;
    border: 1px solid #1068d38a;
    border-radius: 2px;
    font-size: 16px;
    padding: 0.2rem 0.5rem;
    vertical-align: middle;
}

input:focus {
    outline: 1px solid #100c958a;
}
</style>