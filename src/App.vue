<template>
  <router-view class="root" />
  <div class="footer" v-show="false">
    <div class="h-0.5 bg-gradient-to-r from-yellow-500 via-pink-500 to-cyan-500 w-full"></div>
    <div>
      <span>
        Copyright © 2022 By
        <a href="http://www.xcya.cn"
          class="italic font-bold text-xl bg-clip-text linear-gradient inverse text-fill-transparent">Silver alien</a>
      </span>
    </div>
    <div>
      <a href="http://beian.miit.gov.cn/">
        <span>京ICP备2022006333号</span>
      </a>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeMount } from 'vue'
import { useRouter } from "vue-router";
import axios from 'axios';

export default {
  setup(props, content) {
    let router = useRouter();
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
  },
}
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


.footer {
  /* position:absolute;
    bottom:0%; */
  width: 100%;
  text-align: center;
  backdrop-filter: blur(20px);
  background: #0000009C;
  color: #FFF;
}

.footer>div {
  font-size: .85rem;
}
</style>
