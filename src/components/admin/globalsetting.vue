<template>
    <div>
        <div v-show="!admin_show">
            <div class="flex flex-col w-max my-0 mx-auto mt-10">
                <div>
                    <input type="text" v-model="verification_code" placeholder="验证码" />
                    <el-button plain @click="get_verification_code" :loading="getloading" :disabled="getdisabled"
                        class="m-4">{{
                        getbtntext
                        }}
                    </el-button>
                </div>
                <el-button type="primary" plain @click="config_login">登录</el-button>
            </div>
        </div>
        <div v-show="admin_show">
            <Config :configData="adminData.configData"></Config>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, defineComponent, watch, reactive } from 'vue'
import $ from "jquery";
import axios from 'axios';
import Config from './config.vue';
import Header from '../header/header.vue'

export default {
    name: "GlobalSetting",
    setup() {
        const admin_show = ref(false);
        const verification_code = ref("");
        const getloading = ref(false);
        const getdisabled = ref(false);
        const getbtntext = ref("获取验证码");
        const adminData = reactive({ configData: {}, logData: {} });
        onMounted(() => {
            axios
                .post("/api/testadmin")
                .then((res) => {
                    if (res.data.res) {
                        ElNotification({ message: "欢迎你", type: "success", duration: 2000 });
                        admin_show.value = true;
                        adminData.configData = res.data.data.configData;
                    }
                });
        });
        const get_verification_code = () => {
            getloading.value = true;
            getdisabled.value = true;
            axios
                .post("/api/verification", {
                    verification_code: verification_code.value,
                    type: "get"
                })
                .then((res) => {
                    getloading.value = false;
                    console.log(res.data);
                    ElNotification({ message: res.data.context, type: "info", duration: 2000 });
                    let get_btn_disabled_second = 120;
                    let get_btn_disabled_Interval = setInterval(() => {
                        getbtntext.value = String(get_btn_disabled_second) + "s 后重试";
                        get_btn_disabled_second -= 1;
                        if (get_btn_disabled_second <= 0) {
                            clearInterval(get_btn_disabled_Interval);
                            getbtntext.value = "获取验证码";
                            getdisabled.value = false;
                        }
                    }, 1000);
                })
                .catch((err) => {
                    getloading.value = false;
                    ElNotification({ message: "发送失败！请重试！", type: "error", duration: 3000 });
                    console.log(err);
                });
        };
        const config_login = () => {
            axios
                .post("/api/verification", {
                    verification_code: verification_code.value,
                    type: "login"
                })
                .then((res) => {
                    getloading.value = false;
                    console.log(res.data);
                    if (res.data.res) {
                        ElNotification({ message: "欢迎你", type: "success", duration: 2000 });
                        admin_show.value = true;
                        adminData.configData = res.data.data.configData;
                    }
                    else {
                        ElNotification({ message: res.data.context, type: "info", duration: 3000 });
                    }
                })
                .catch((err) => {
                    getloading.value = false;
                    ElNotification({ message: "失败！请重试！", type: "error", duration: 3000 });
                    console.log(err);
                });
        };
        return { admin_show, verification_code, getloading, getdisabled, getbtntext, adminData, get_verification_code, config_login };
    },
    components: { Config, Header }
}
</script>


<style scoped>
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
