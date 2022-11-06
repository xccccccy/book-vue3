<template>
  <div class="w-full bg-slate-800 text-gray-100 sm:w-1/3 relative">
    <div v-show="!roomshow">
      <div class="min-h-screen">
        <div class=" text-5xl bg-clip-text linear-gradient inverse text-fill-transparent" style="padding-top: 13vh;">hi,
          谁是卧底</div>
        <div class=" text-2xl bg-indigo-500 rounded-xl ring-1 p-3 mx-2 bg-opacity-80 text-yellow-100 cursor-pointer"
          @click="createroom" style="margin-top: 12vh;">创建房间</div>
        <div class=" text-2xl bg-indigo-500 rounded-xl ring-1 p-3 mx-2 bg-opacity-80 text-yellow-100 cursor-pointer"
          @click="joinroom" style="margin-top: 8vh;">加入房间</div>
      </div>
      <div v-show="selectheadiconshow">
        <div class="absolute bg-slate-700 bg-opacity-80 top-0 min-h-screen flex flex-col justify-center">
          <div class=" w-11/12  mx-auto bg-slate-600  bg-opacity-90 rounded-xl pb-3">
            <div @click="selectheadiconshow = !selectheadiconshow;" class="p-3 cursor-pointer">
              <Close class="h-8 ml-auto"></Close>
            </div>
            <div class="py-3 text-3xl text-yellow-600">请选择喜欢的头像 </div>
            <div class="flex flex-row flex-wrap justify-evenly">
              <div v-for="(headiconid, index) in allheadicon" :key="index" @click="selecthead(headiconid)"
                class="bg-purple-300 bg-opacity-20 rounded-full p-1 m-4 flex justify-center items-center cursor-pointer headicon">
                <img :src="'/static/icon/game/spy/r' + String(headiconid) + '.png'" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="selectroomidshow">
        <div class="absolute bg-slate-700 bg-opacity-80 top-0 min-h-screen flex flex-col justify-center w-full">
          <div class=" w-11/12  mx-auto bg-slate-600  bg-opacity-90 rounded-xl pb-3 mb-16">
            <div @click="selectroomidshow = !selectroomidshow;" class="p-3 cursor-pointer">
              <Close class="h-8 ml-auto"></Close>
            </div>
            <div class="py-3 text-3xl text-yellow-600">请输入房间ID： </div>
            <div>
              <input class=" w-7/12 text-black p-3 text-xl bg-opacity-90 bg-white rounded-md" type="text"
                v-model="my.roomid" />
              <div
                class=" text-2xl bg-indigo-500 rounded-xl ring-1 p-3 mx-2 bg-opacity-80 text-yellow-100 cursor-pointer mt-10"
                @click="enterroom">进入房间</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="roomshow">
      <div class="min-h-screen flex flex-col justify-between">
        <div class="flex items-center pt-3 justify-between">
          <div @click="backDialogVisible = true;" class="m-3 cursor-pointer">
            <ArrowLeft style="height: 1.75rem"></ArrowLeft>
          </div>
          <div class=" text-lg" style="padding-left: 10%;">房间号：<span class=" text-yellow-600 font-medium">{{ my.roomid
          }}</span></div>
          <div class=" m-3">房间状态：<span class=" text-blue-500 font-medium">{{ roomstatus }}</span></div>
        </div>
        <div class="alllocation flex flex-row flex-wrap justify-evenly" style="padding-bottom: 1vh">
          <div v-for="(value, location, index) in alllocation" :key="index" class="flex flex-col">
            <el-popover v-model:visible="swapVisible[location]" placement="top" :width="160" effect="dark">
              <p class="pt-2 pb-4">切换到此位置?</p>
              <div style="text-align: right; margin: 0">
                <el-button size="small" type="text" @click="swapVisible[location] = false">关闭</el-button>
                <el-button size="small" type="primary" @click="swapConfirm(location)">确定</el-button>
              </div>
              <template #reference>
                <div @click.prevent="swapWithKey(location)"
                  class="bg-purple-400 bg-opacity-50 rounded-full p-1 m-2 flex justify-center items-center cursor-pointer headicon border"
                  :class="[location == my.location ? selftag : '']">
                  <div class=" relative select-none">
                    <img src="/icon/game/spy/host.svg" class="h-6 w-16 absolute -top-6" v-show="value.host">
                    <div v-show="value.ids.length > 1"
                      class=" leading-none absolute -top-2 -right-3 p-1 bg-red-600 rounded-full h-6 w-6">
                      {{ value.ids.length }}</div>
                    <div v-show="roomstatus == 'Playing'">
                      <div style="padding: 2px; transform: rotateZ(40deg);" v-show="value.role == '卧底' && value.expose"
                        class="bg-opacity-80 rounded-md bg-white absolute -top-2 -right-5">
                        <div class="leading-none text-red-600 font-bold border-2 text-center border-yellow-500"
                          style="padding: 1px;">卧底</div>
                      </div>
                      <div style="padding: 2px; transform: rotateZ(40deg);" v-show="value.role == '平民' && value.expose"
                        class="bg-opacity-80 rounded-md bg-white absolute -top-2 -right-5">
                        <div class="leading-none text-yellow-600 font-bold border-2 text-center border-yellow-500"
                          style="padding: 1px;">平民</div>
                      </div>
                      <div style="padding: 2px; transform: rotateZ(40deg);" v-show="value.role == '白板' && value.expose"
                        class="bg-opacity-80 rounded-md bg-white absolute -top-2 -right-5">
                        <div class="leading-none text-black font-bold border-2 text-center border-yellow-500"
                          style="padding: 1px;">白板</div>
                      </div>
                    </div>
                    <img
                      :src="'/static/icon/game/spy/r' + String(value.ids.length > 1 ? (value.ids.indexOf(my.id) == -1 ? value.headicons[value.ids[0]] : value.headicons[my.id]) : value.headicons[value.ids[0]]) + '.png'"
                      v-show="value.hasperson" />
                    <span class="text-2xl text-yellow-100" v-show="!value.hasperson">+</span>
                  </div>
                </div>
              </template>
            </el-popover>
            <div>{{ location }}</div>
          </div>
        </div>
        <div class=" text-2xl bg-indigo-500 rounded-xl ring-1 p-3 mx-2 bg-opacity-80 text-yellow-100 cursor-pointer"
          @click="startgame" style="" v-show="my.host && roomstatus == 'Ready'">开始游戏
        </div>
        <div style="padding-bottom: 5vh" class="text-lg flex justify-center items-center">
          <div class="h-max pr-3 text-xl">
            你的词语：
          </div>
          <div
            class="text-3xl text-yellow-500 px-6 py-1 bg-slate-600 bg-opacity-20 rounded-lg border border-stone-200 cursor-pointer"
            @click="wordshow = !wordshow" style="text-shadow: 1px 2px 2px rgb(180 255 250 / 50%);">
            <span v-show="wordshow">
              {{ my.word }}
            </span>
            <span v-show="!wordshow">
              *****
            </span>
          </div>
        </div>
        <div></div>
      </div>
      <div v-show="sendwordshow">
        <div class="absolute bg-slate-700 bg-opacity-80 top-0 min-h-screen flex flex-col justify-center w-full">
          <div class=" w-11/12  mx-auto bg-slate-600  bg-opacity-90 rounded-xl pb-3 mb-16">
            <div @click="sendwordshow = !sendwordshow;" class="p-3 cursor-pointer">
              <Close class="h-8 ml-auto"></Close>
            </div>
            <div class="pt-5 pb-3 text-3xl text-yellow-600">游戏开始</div>
            <div class="pt-5 pb-3 text-3xl text-yellow-600">你的词语： <span class="rounded-lg p-2">{{ my.word }}</span>
            </div>
            <div
              class=" text-2xl bg-indigo-500 rounded-xl ring-1 p-3 mx-2 bg-opacity-80 text-yellow-100 cursor-pointer mt-10"
              @click="sendwordshow = !sendwordshow">确定</div>
          </div>
        </div>
      </div>
      <div v-show="backDialogVisible">
        <div class="absolute bg-slate-700 bg-opacity-80 top-0 min-h-screen flex flex-col justify-center w-full">
          <div class=" w-11/12  mx-auto bg-slate-600  bg-opacity-90 rounded-xl pb-3 mb-16">
            <div @click="backDialogVisible = false;" class="p-3 cursor-pointer">
              <Close class="h-8 ml-auto"></Close>
            </div>
            <div class="pt-5 pb-3 text-3xl text-yellow-600">是否退出房间？
            </div>
            <div class="flex justify-evenly">
              <div
                class=" text-xl bg-indigo-500 rounded-xl ring-1 py-2 px-7 mx-4 bg-opacity-80 text-yellow-100 cursor-pointer mt-10"
                @click="backDialogVisible = false">关闭</div>
              <div
                class=" text-xl bg-indigo-500 rounded-xl ring-1 py-2 px-7 mx-4 bg-opacity-80 text-yellow-100 cursor-pointer mt-10"
                @click="leaveroom">确定</div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="exposedivshow">
        <div class="absolute bg-slate-700 bg-opacity-80 top-0 min-h-screen flex flex-col justify-center w-full">
          <div class=" w-11/12  mx-auto bg-slate-600  bg-opacity-90 rounded-xl pb-3 mb-16">
            <div @click="exposedivshow = false;" class="p-3 cursor-pointer">
              <Close class="h-8 ml-auto"></Close>
            </div>
            <div class="flex items-center justify-between">
              <div class=" relative w-max mx-3">
                <img :src="'/static/icon/game/spy/r' + willexposeheadicon + '.png'" class="h-32 w-32">
                <div class="leading-none absolute -top-0 -right-0 h-6 w-6 text-6xl text-red-400">
                  ?</div>
              </div>
              <div class="pt-5 pb-3 text-3xl text-yellow-600">揭露 {{ willexposelocation }} 号玩家的身份？
              </div>
            </div>
            <div class="flex justify-evenly">
              <div
                class=" text-xl bg-indigo-500 rounded-xl ring-1 py-2 px-7 mx-4 bg-opacity-80 text-yellow-100 cursor-pointer mt-10"
                @click="exposedivshow = false">关闭</div>
              <div
                class=" text-xl bg-indigo-500 rounded-xl ring-1 py-2 px-7 mx-4 bg-opacity-80 text-yellow-100 cursor-pointer mt-10"
                @click="exposesomeone">确定</div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="messageshow">
        <div class="absolute bg-slate-700 bg-opacity-80 top-0 min-h-screen flex flex-col justify-center w-full">
          <div class=" w-11/12  mx-auto bg-slate-600  bg-opacity-90 rounded-xl pb-3 mb-16">
            <div @click="messageshow = false;" class="p-3 cursor-pointer">
              <Close class="h-8 ml-auto"></Close>
            </div>
            <div class="pt-5 pb-3 text-3xl text-yellow-600">{{ message }}
            </div>
            <div class="flex justify-evenly">
              <div
                class=" text-xl bg-indigo-500 rounded-xl ring-1 py-2 px-7 mx-4 bg-opacity-80 text-yellow-100 cursor-pointer mt-10"
                @click="messageshow = false">关闭</div>
              <div
                class=" text-xl bg-indigo-500 rounded-xl ring-1 py-2 px-7 mx-4 bg-opacity-80 text-yellow-100 cursor-pointer mt-10"
                @click="messageshow = false;">确定</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="maskshow">

    </div>
  </div>
</template>

<script>
import { ref, onMounted, defineComponent, watch, reactive, onUnmounted, computed } from 'vue'
import $ from "jquery";
import axios from 'axios';
import { ArrowLeft, Close } from '@element-plus/icons-vue'
import { InfoFilled } from '@element-plus/icons-vue'
import { guid } from '../common/utils';
import { useHeaderStore } from '../../stores/header';

export default {
  name: 'GameSpyComponent',
  components: { ArrowLeft, InfoFilled, Close },
  setup(props, context) {
    const headerStore = useHeaderStore()
    headerStore.$patch({
      headerSetting: {
        hiddenSetting: true
      }
    })

    const roomshow = ref(false);
    const selectheadiconshow = ref(false);
    const selectroomidshow = ref(false);
    const maskshow = ref(false);
    const backDialogVisible = ref(false);
    const swapVisible = ref([]);
    const wordshow = ref(true);
    const sendwordshow = ref(false);
    const exposedivshow = ref(false);
    const messageshow = ref(false);
    const message = ref('提示的消息。');
    const roomstatus = ref('Ready');

    const my = reactive({ roomid: null, word: '长颈鹿', location: 1, id: '', host: false, headicon: 1, role: '平民', expose: false })

    const allheadicon = ref([]);
    for (let i = 1; i <= 20; i++) {
      allheadicon.value.push(i);
    }

    const selftag = ref('border-yellow-600 border-4');

    var alluser = [
      { Uid: '3', Slot: 3, Host: true, Headicon: 3, Signal: 'good' }, // , word: '长颈鹿'
      { Uid: '2', Slot: 1, Host: false, Headicon: 2, Signal: 'good' },
      { Uid: '1', Slot: 3, Host: false, Headicon: 1, Signal: 'good' },
      { Uid: '10', Slot: 4, Host: false, Headicon: 10, Signal: 'good' },
      { Uid: '9', Slot: 6, Host: false, Headicon: 9, Signal: 'good' },
    ]

    const alllocation = reactive({ '1': {} });
    for (let i = 1; i <= 16; i++) {
      swapVisible.value[i] = false;
    }
    const initalllocation = () => {
      for (let i = 1; i <= 16; i++) {
        alllocation[i] = { 'hasperson': 0, 'ids': [], 'host': false, 'headicons': {}, 'expose': false, 'role': '' };
      }
    }
    initalllocation();
    const alluser2alllocation = (alluser) => {
      for (var index in alluser) {
        let Slot = alluser[index]['Slot'];
        alllocation[Slot].ids.push(alluser[index]['Uid']);
        alllocation[Slot].hasperson += 1;
        alllocation[Slot].host = alllocation[Slot].host || alluser[index]['Host'];
        alllocation[Slot].headicons[alluser[index]['Uid']] = alluser[index]['Headicon'];
        if (alluser[index]['Uid'] == my.id) {
          my.location = Slot;
          my.host = alluser[index]['Host'];
        }
        alllocation[Slot].expose = alluser[index]['Reveal'];
        alllocation[Slot].role = alluser[index]['Role'] == 'spy' ? '卧底' : alluser[index]['Role'] == 'civy' ? '平民' : '白板';
      }
    }
    alluser2alllocation(alluser);

    onMounted(() => {
      document.title = "hi, 谁是卧底"
    })
    let afterSelectHeadStep = '';
    const createroom = () => {
      afterSelectHeadStep = 'createroom';
      allheadicon.value = [];
      for (let i = 1; i <= 20; i++) {
        allheadicon.value.push(i);
      }
      selectheadiconshow.value = true;
    }
    const joinroom = () => {
      afterSelectHeadStep = 'joinroom';
      selectroomidshow.value = true;
      // selectheadiconshow.value = true;
    }
    let getroominfoInterval = null;
    const getroominfo = (mode) => {
      if (mode == 'clear') {
        clearInterval(getroominfoInterval);
        return
      }
      let nextgetroominfo = true;
      getroominfoInterval = setInterval(() => {
        if (!nextgetroominfo) return;
        axios.post('/spy/api/room/roominfo', { "rid": my.roomid, "uid": my.id })
          .then((res) => {
            selectheadiconshow.value = false;
            let recAllUser = res.data.roominfo.Players;
            initalllocation();
            alluser2alllocation(recAllUser);
            if (res.data.roominfo.Messages.Type == 'None') {
              return
            } else {
              if (res.data.roominfo.Messages.Content == 'Start Game') {
                my.word = res.data.roominfo.Self.Word;
                my.role = res.data.roominfo.Self.Role == 'spy' ? '卧底' : res.data.roominfo.Self.Role == 'civy' ? '平民' : '白板';
                roomstatus.value = 'Playing';
                sendwordshow.value = true;
              } else {
                message.value = res.data.roominfo.Messages.Content;
                messageshow.value = true;
                roomstatus.value = 'Ready';
              }
            }
          })
          .catch((res) => {
            console.log(res)
          })
      }, 1000);
    }
    const selecthead = (headiconid) => {
      selectheadiconshow.value = false;
      roomshow.value = true;
      let Uid;
      if (localStorage.spyid) {
        Uid = localStorage.spyid
      } else {
        Uid = guid();
        localStorage.spyid = Uid;
      }
      my.id = Uid;
      my.headicon = headiconid;
      if (afterSelectHeadStep == 'createroom') {
        axios.post('/spy/api/room/createroom', { "uid": my.id, "icon": my.headicon })
          .then((res) => {
            my.roomid = res.data.rid;
            my.host = true;
            let recAllUser = res.data.roominfo.Players;
            initalllocation();
            alluser2alllocation(recAllUser);
            getroominfo('set');
          })
          .catch((res) => {
            console.log(res)
          })
      } else {
        axios.post('/spy/api/room/joinroom', { "rid": my.roomid, "uid": my.id, "icon": my.headicon })
          .then((res) => {
            console.log(res);
            selectheadiconshow.value = false;
            let recAllUser = res.data.roominfo.Players;
            console.log(recAllUser);
            initalllocation();
            alluser2alllocation(recAllUser);
            getroominfo('set');
          })
          .catch((res) => {
            console.log(res)
          })
      }
    }
    const enterroom = () => {
      let roomid;
      try {
        roomid = Number(my.roomid);
        my.roomid = roomid;
      } catch (e) {
        ElNotification({ title: '房间号格式错误！', type: 'error', duration: 3000 });
      }
      axios.post('/spy/api/room/remainicons', { "rid": roomid })
        .then((res) => {
          console.log(res);
          selectroomidshow.value = false;
          allheadicon.value = res.data.icons;
          selectheadiconshow.value = true;
        })
        .catch((res) => {
          console.log(res);
          ElNotification({ title: '无此房间！', type: 'error', duration: 3000 });
        })
    }
    const leaveroom = () => {
      my.host = false;
      getroominfo('clear');
      backDialogVisible.value = false;
      axios.post('/spy/api/room/leaveroom', { "rid": my.roomid, "uid": my.id })
        .then((res) => {
          console.log(res);
          roomshow.value = !roomshow.value;
        })
        .catch((res) => {
          console.log(res)
        })
    }

    onUnmounted(() => {
      leaveroom();
      headerStore.resetHeader()
    })

    const willexposelocation = ref(1);
    const willexposeheadicon = computed(() => {
      return alllocation[willexposelocation.value].headicons[alllocation[willexposelocation.value]['ids'][0]];
    })

    var nowswapVisiblekey = null;
    const swapWithKey = (swapkey) => {
      if (roomstatus.value == 'Ready') {
        if (nowswapVisiblekey) {
          swapVisible.value[nowswapVisiblekey] = false;
        }
        if (swapkey == my.location) {
          return
        }
        nowswapVisiblekey = swapkey;
        swapVisible.value[nowswapVisiblekey] = true;
      } else {
        if (alllocation[swapkey]['hasperson'] < 1) return;
        willexposelocation.value = swapkey;
        exposedivshow.value = true;
      }
    }
    const swapConfirm = (location) => {
      swapVisible.value[location] = false;
      alllocation[my.location].hasperson -= 1;
      alllocation[my.location].ids.splice(alllocation[my.location].ids.indexOf(my.id), 1);
      delete alllocation[my.location].headicons[my.id];
      alllocation[location].ids.push(my.id);
      alllocation[location].headicons[my.id] = my.headicon;
      alllocation[location].hasperson += 1;
      if (my.host) {
        alllocation[my.location].host = false;
        alllocation[location].host = true;
      }
      my.location = location;
      axios.post('/spy/api/room/playermoveslot', { "rid": my.roomid, "uid": my.id, "slot": Number(my.location) })
        .then((res) => {
          console.log(res);
        })
        .catch((res) => {
          console.log(res)
        })
    }
    const exposesomeone = () => {
      axios.post('/spy/api/room/voteplayer', { "rid": my.roomid, "uid": alllocation[willexposelocation.value]['ids'][0] })
        .then((res) => {
          console.log(res);
          exposedivshow.value = false;
        })
        .catch((e) => {
          console.log(e);
        })
    }
    const startgame = () => {
      axios.post('/spy/api/room/startplay', { "rid": my.roomid, "uid": my.id })
        .then((res) => {
          console.log(res);
          my.word = res.data.roominfo.Self.Word;
          my.role = res.data.roominfo.Self.Role == 'spy' ? '卧底' : res.data.roominfo.Self.Role == 'civy' ? '平民' : '白板';
          roomstatus.value = 'Playing';
          sendwordshow.value = true;
        })
        .catch((res) => {
          console.log(res)
        })
    }
    const messagefunc = () => {
      console.log(message.value)
    }
    return { roomshow, selectheadiconshow, selectroomidshow, maskshow, allheadicon, my, alllocation, swapVisible, backDialogVisible, selftag, wordshow, sendwordshow, roomstatus, exposedivshow, willexposelocation, willexposeheadicon, messageshow, message, createroom, joinroom, enterroom, leaveroom, swapWithKey, swapConfirm, selecthead, startgame, exposesomeone, messagefunc }
  },
}
</script>

<style >
.headicon {
  height: 4rem;
  width: 4rem;
}

.my-w-full {
  width: 90% !important;
}

@media (min-width: 640px) {
  .sm\:my-w-1\/3 {
    width: 30% !important;
  }
}
</style>
