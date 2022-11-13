<template>
  <div class="user-all" :class="{ headeractivate: loginShow }" style="margin-right: .6rem">
    <img v-show="icon_show" :src="user.icon" @click="loginShow = !loginShow" class=" rounded-full" onerror="this.src='/icon/user/default.png'"/>
    <uil:chat-bubble-user v-show="!icon_show" @click="loginShow = !loginShow" class="h-6 w-6 text-indigo-500" />
    <div v-show="loginShow" v-loading="logloading" @mouseleave="loginShow = false"
      class="w-full sm:w-max rounded-md bg-white bg-opacity-90 dark:bg-zinc-900 dark:bg-opacity-75 p-2 cursor-auto">
      <div class="login" v-show="!userloged">
        <div v-show="!logon_show">
          <div>
            <div v-show="faceid_show">
              <div @click="close_face_id" class="flex space-x-2 items-center mb-2 cursor-pointer">
                <ArrowLeft style="height: 1rem"></ArrowLeft>
                <div>账号密码登录</div>
              </div>
            </div>
            <div v-show="!faceid_show">
              <div @click="openCapture" class="flex space-x-2 items-center mb-2 cursor-pointer">
                <ArrowLeft style="height: 1rem"></ArrowLeft>
                <svg style="height: 1.35rem" viewBox="0 0 48 48" fill="none" class="dark:hidden"
                  xmlns="http://www.w3.org/2000/svg">
                  <rect width="48" height="48" fill="white" fill-opacity="0.01" />
                  <path d="M4 34V44H14" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M34 44H44V34" stroke="#333" stroke-width="4" stroke-linecap="round"
                    stroke-linejoin="round" />
                  <path d="M34 4H44V14" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M14 4H4V14" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M16 34C16 34 19 37 24 37C29 37 32 34 32 34" stroke="#333" stroke-width="4"
                    stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M24 14V23C24 25 22 27 20 27H19" stroke="#333" stroke-width="4" stroke-linecap="round"
                    stroke-linejoin="round" />
                  <path d="M34 14V16" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M14 14V16" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <svg style="height: 1.35rem" viewBox="0 0 48 48" fill="none" class="hidden dark:block"
                  xmlns="http://www.w3.org/2000/svg">
                  <rect width="48" height="48" fill="white" fill-opacity="0.01" />
                  <path d="M4 34V44H14" stroke="#ffffff" stroke-width="4" stroke-linecap="round"
                    stroke-linejoin="round" />
                  <path d="M34 44H44V34" stroke="#ffffff" stroke-width="4" stroke-linecap="round"
                    stroke-linejoin="round" />
                  <path d="M34 4H44V14" stroke="#ffffff" stroke-width="4" stroke-linecap="round"
                    stroke-linejoin="round" />
                  <path d="M14 4H4V14" stroke="#ffffff" stroke-width="4" stroke-linecap="round"
                    stroke-linejoin="round" />
                  <path d="M16 34C16 34 19 37 24 37C29 37 32 34 32 34" stroke="#ffffff" stroke-width="4"
                    stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M24 14V23C24 25 22 27 20 27H19" stroke="#ffffff" stroke-width="4" stroke-linecap="round"
                    stroke-linejoin="round" />
                  <path d="M34 14V16" stroke="#ffffff" stroke-width="4" stroke-linecap="round"
                    stroke-linejoin="round" />
                  <path d="M14 14V16" stroke="#ffffff" stroke-width="4" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
                <div>Face ID</div>
              </div>
              <div>
                <input v-model="user.id" placeholder="用户ID" />
                <br />
                <input v-model="user.passwd" placeholder="用户密码" @keyup.enter="user_login" />
                <br />
                <span @click="user_login" style="cursor: pointer;">登录</span>
                <span @click="logon_show = !logon_show" style="cursor: pointer;">注册</span>
              </div>
            </div>
          </div>
        </div>
        <div v-show="logon_show">
          <input type="text" v-model="userLogon.id" placeholder="用户ID" />
          <br />
          <input type="text" v-model="userLogon.name" placeholder="用户名字" />
          <br />
          <input type="text" v-model="userLogon.passwd" placeholder="用户密码" @keyup.enter="user_logon" />
          <br />
          <span @click="user_logon" style="cursor: pointer;">注册</span>
          <span @click="logon_show = !logon_show" style="cursor: pointer; margin:">取消</span>
        </div>
      </div>
      <div class="loged" v-show="userloged">
        <div>
          <span>欢迎你，{{ user.name }}</span>
        </div>
        <div>
          <div v-show="!face_add_back_show">
            <div class="flex justify-around items-end my-3 logged-control">
              <div @click="user_logout">
                <svg viewBox="0 0 1024 1024" style="height: 2rem">
                  <path
                    d="M874.666667 512l-55.466667-55.466667 29.866667-29.866666 106.666666 106.666666-106.666666 106.666667-29.866667-29.866667 55.466667-55.466666H554.666667v-42.666667h320zM725.333333 426.666667h-42.666666V256H298.666667v554.666667h384v-170.666667h42.666666v213.333333H256V213.333333h469.333333v213.333334z"
                    class="fill-current" p-id="2154"></path>
                </svg>
                <span>Log out</span>
              </div>
              <div @click="addFaceRecognition" v-show="!user.faceid">
                <svg style="height: 1.5rem" viewBox="0 0 48 48" fill="none" class="dark:hidden"
                  xmlns="http://www.w3.org/2000/svg">
                  <rect width="48" height="48" fill="white" fill-opacity="0.01" />
                  <path d="M4 34V44H14" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M34 44H44V34" stroke="#333" stroke-width="4" stroke-linecap="round"
                    stroke-linejoin="round" />
                  <path d="M34 4H44V14" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M14 4H4V14" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M16 34C16 34 19 37 24 37C29 37 32 34 32 34" stroke="#333" stroke-width="4"
                    stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M24 14V23C24 25 22 27 20 27H19" stroke="#333" stroke-width="4" stroke-linecap="round"
                    stroke-linejoin="round" />
                  <path d="M34 14V16" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M14 14V16" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <svg style="height: 1.5rem" viewBox="0 0 48 48" fill="none" class="hidden dark:block"
                  xmlns="http://www.w3.org/2000/svg">
                  <rect width="48" height="48" fill="white" fill-opacity="0.01" />
                  <path d="M4 34V44H14" stroke="#ffffff" stroke-width="4" stroke-linecap="round"
                    stroke-linejoin="round" />
                  <path d="M34 44H44V34" stroke="#ffffff" stroke-width="4" stroke-linecap="round"
                    stroke-linejoin="round" />
                  <path d="M34 4H44V14" stroke="#ffffff" stroke-width="4" stroke-linecap="round"
                    stroke-linejoin="round" />
                  <path d="M14 4H4V14" stroke="#ffffff" stroke-width="4" stroke-linecap="round"
                    stroke-linejoin="round" />
                  <path d="M16 34C16 34 19 37 24 37C29 37 32 34 32 34" stroke="#ffffff" stroke-width="4"
                    stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M24 14V23C24 25 22 27 20 27H19" stroke="#ffffff" stroke-width="4" stroke-linecap="round"
                    stroke-linejoin="round" />
                  <path d="M34 14V16" stroke="#ffffff" stroke-width="4" stroke-linecap="round"
                    stroke-linejoin="round" />
                  <path d="M14 14V16" stroke="#ffffff" stroke-width="4" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
                <span>Face +</span>
              </div>
              <div v-show="admin_show" @click="$router.push('/admin')">
                <svg viewBox="0 0 1024 1024" style="height: 1.7rem">
                  <path
                    d="M480.2 525.1c61.4 0 119.1-23.9 162.5-67.3 43.4-43.4 67.3-101.1 67.3-162.5s-23.9-119.1-67.3-162.5c-43.4-43.4-101.1-67.3-162.5-67.3s-119.1 23.9-162.5 67.3c-43.4 43.4-67.3 101.1-67.3 162.5s23.9 119.1 67.3 162.5c43.4 43.4 101.1 67.3 162.5 67.3z m0-387.8c87 0 157.9 70.8 157.9 157.9s-70.8 157.9-157.9 157.9-157.9-70.8-157.9-157.9 70.9-157.9 157.9-157.9zM890.7 600.4c19.9 0 36-16.1 36-36s-16.1-36-36-36h-72.3v-45.1h72.3c19.9 0 36-16.1 36-36s-16.1-36-36-36H782.4c-19.9 0-36 16.1-36 36v226.9c-62.2 16-108.3 72.6-108.3 139.8 0 79.6 64.7 144.3 144.3 144.3S926.7 893.6 926.7 814c0-67.2-46.1-123.7-108.3-139.8v-73.7h72.3z m-36 213.5c0 39.9-32.4 72.3-72.3 72.3s-72.3-32.4-72.3-72.3 32.4-72.3 72.3-72.3 72.3 32.4 72.3 72.3zM667.7 605.5c0-19.9-16.1-36-36-36h-342c-50.9 0-98.9 18.6-135.2 52.3-37 34.4-57.3 80.3-57.3 129.3v139.1c0 19.9 16.1 36 36 36s36-16.1 36-36V751.1c0-60.4 54-109.6 120.5-109.6h342c19.9 0 36-16.1 36-36z"
                    class="fill-current" p-id="2878"></path>
                </svg>
                <span>Admin set</span>
              </div>
            </div>
          </div>
          <div v-show="face_add_back_show">
            <div @click="face_add_back" class="flex space-x-2 items-center mb-2 cursor-pointer">
              <ArrowLeft style="height: 1rem"></ArrowLeft>
              <div>返回</div>
            </div>
          </div>
        </div>
      </div>
      <FaceRecognition ref="FaceRecognitionComponent" v-show="faceid_show" :logged="userloged"
        @user_face_login="user_face_login" @add_face_success="add_face_success"
        @user_face_login_error="user_face_login_error" @not_have_captrue="not_have_captrue"
        @user_add_face_error="user_add_face_error">
      </FaceRecognition>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core';
import axios from 'axios';
import FaceRecognition from './FaceRecognition.vue';
import { ArrowLeft } from '@element-plus/icons-vue'

export default {
  components: { FaceRecognition, ArrowLeft },
  name: "UserComponent",
  emits: ["userLog"],
  setup(props, context) {
    const logloading = ref(false);
    const userloged = ref(false);
    const loginShow = ref(false);
    const logon_show = ref(false);
    const faceid_show = ref(false);
    const face_add_back_show = ref(false);
    const user = reactive({ id: null, name: null, passwd: null, faceid: false, icon: "/static/icon/user/default.png" });
    const userLogon = reactive({ id: null, name: null, passwd: null, faceid: false });
    const FaceRecognitionComponent = ref(null);
    const admin_show = ref(false);
    const icon_show = ref(false)

    onMounted(() => {
      inituser();
    })
    const inituser = () => {
      if (localStorage.user) {
        let _user = JSON.parse(localStorage.user)
        user.id = _user.id;
        if (user.id == '001') {
          admin_show.value = true;
        }
        user.name = _user.name;
        user.faceid = _user.faceid;
        user.icon = _user.icon;
        icon_show.value = true;
        userloged.value = true;
      }
    }

    const user_login = () => {
      logloading.value = true;
      axios
        .post("/api/login", {
          id: user.id,
          passwd: user.passwd,
        })
        .then((res) => {
          logloading.value = false;
          if (res.data.res) {
            user.name = res.data.user_name;
            user.faceid = res.data.faceid;
            user.icon = res.data.icon;
            icon_show.value = true;
            userloged.value = true;
            let _user = { id: user.id, name: user.name, faceid: user.faceid, icon: user.icon };
            localStorage.user = JSON.stringify(_user);
            ElNotification({ title: '登录成功', message: '欢迎你，' + user.name, type: 'success', duration: 2000 });
            context.emit('userLog', 'login')
            if (user.id == '001') {
              admin_show.value = true;
            }
            loginShow.value = false;
          } else {
            ElNotification({ title: '登录失败', message: res.data.context, type: 'error', duration: 3000 });
          }
        })
        .catch((err) => {
          logloading.value = false;
          ElNotification({ message: '登录失败！请重试！', type: 'error', duration: 3000 });
          console.log(err);
        });
    }

    const user_logon = () => {
      console.log(userLogon);
      logloading.value = true;
      axios
        .post(
          "/api/insertuser",
          userLogon
        )
        .then((res) => {
          logloading.value = false;
          if (res.data.res) {
            logon_show.value = false;
            userloged.value = true;
            user.name = userLogon.name;
            user.id = userLogon.id;
            user.faceid = false;
            icon_show.value = true;
            let _user = { id: user.id, name: user.name, faceid: user.faceid, icon: user.icon };
            localStorage.user = JSON.stringify(_user);
            ElNotification({ message: '注册成功。', type: 'success', duration: 1000 });
            context.emit('userLog', 'logon');
            if (user.id == '001') {
              admin_show.value = true;
            }
            userLogon.id = null;
            userLogon.name = null;
            userLogon.passwd = null;
          } else {
            ElNotification({ title: '注册失败', message: res.data.context, type: 'error', duration: 1500 });
          }
        })
        .catch((err) => {
          logloading.value = false;
          ElNotification({ title: '登录失败！请重试！', message: res.data.context, type: 'error', duration: 1500 });
          console.log(err);
        });
    }

    const user_logout = () => {
      (user.id = null),
        (user.name = null),
        (user.passwd = null),
        (user.icon = "/static/icon/user/default.png"),
        (icon_show.value = false),
        (userloged.value = false);
      localStorage.removeItem("user");
    }

    const user_face_login = (_user) => {
      userloged.value = true;
      user.id = _user.id;
      user.name = _user.name;
      user.icon = _user.icon;
      icon_show.value = true;
      user.faceid = true;
      localStorage.user = JSON.stringify(_user);
      faceid_show.value = false;
      context.emit('userLog', 'login')
      loginShow.value = false;
    }

    const addFaceRecognition = () => {
      faceid_show.value = true;
      face_add_back_show.value = true;
      FaceRecognitionComponent.value.addFaceRecognition();
    }

    const openCapture = () => {
      faceid_show.value = true;
      FaceRecognitionComponent.value.openCapture();
    }

    const add_face_success = () => {
      user.faceid = true;
      let _user = { id: user.id, name: user.name, faceid: user.faceid, icon: user.icon };
      localStorage.user = JSON.stringify(_user);
      faceid_show.value = false;
      loginShow.value = false;
      face_add_back_show.value = false;
    }
    const user_face_login_error = () => {
      faceid_show.value = false;
    }
    const not_have_captrue = () => {
      faceid_show.value = false;
    }
    const close_face_id = () => {
      FaceRecognitionComponent.value.stopCapture();
      faceid_show.value = false
    }
    const face_add_back = () => {
      close_face_id();
      face_add_back_show.value = false;
    }
    const user_add_face_error = () => {
      face_add_back();
    }
    return { logloading, userloged, loginShow, logon_show, faceid_show, face_add_back_show, user, userLogon, FaceRecognitionComponent, admin_show, user_login, user_logon, user_logout, user_face_login, addFaceRecognition, openCapture, add_face_success, user_face_login_error, not_have_captrue, close_face_id, face_add_back, user_add_face_error, icon_show }

  }
}
</script>

<style scoped>
svg {
  height: 1.8rem;
}

img {
  height: 1.7rem;
  margin-top: 0.2rem;
}

.user-all>div {
  position: absolute;
  top: 3.2rem;
  right: 0.5rem;
}

.user-all input {
  margin: 0.5rem 0;
  border: 1px solid #4642c58a;
  border-radius: 2px;
  font-size: 16px;
  padding: 0.2rem 0.5rem;
  vertical-align: middle;
}

.user-all input:focus {
  outline: 1px solid #4642c58a;
}

.user-all span {
  margin: 0 10px;
}

.headeractivate {
  border-bottom: 2px solid rgb(20, 175, 103);
}

.logged-control>div {
  cursor: pointer;
  display: flex;
  flex-direction: column;
}
</style>