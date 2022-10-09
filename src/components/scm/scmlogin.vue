<template>
    <div>
        <div>
            <div class="flex flex-col w-max my-0 mx-auto">
                <div>
                    <input type="text" v-model="token" placeholder="token" />
                </div>
                <el-button type="primary" plain @click="login" :loading="loginLoading">登录</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { scmlogin, scmtesttoken } from './scmapi';
import { useRouter } from "vue-router";


export default {

    name: "ScmLogin",

    setup(props, context) {
        let router = useRouter();

        const token = ref('');
        const loginLoading = ref(false);

        const login = () => {
            scmlogin(token.value).then((res) => {
                console.log(res.data)
                localStorage.scmToken = token.value;
                router.push('/scm');
            }).catch((err) => {
                ElNotification({ message: '无效或者失效的Token。', type: 'warning', duration: 3000 });
                console.log('ERROR => ', err);
            });
        }
        // const initLog = () => {
        //     scmtesttoken().then((res) => {
        //         if (res.data == 'success') {
        //             router.push('/scm');
        //         }
        //     }).catch(() => {
        //         if (localStorage.scmToken) {
        //             token.value = localStorage.scmToken;
        //             ElNotification({ message: '正在尝试验证Token。', type: 'info', duration: 3000 });
        //             login();
        //         }
        //     })
        // }
        // initLog()

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
    color: #000;
}

input:focus {
    outline: 1px solid #100c958a;
}
</style>