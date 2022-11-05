<template>
  <div class="back-all w-full min-h-screen">
    <div id="main">
      <div class="page-title">
        <span
          class="italic font-bold text-3xl bg-clip-text linear-gradient inverse text-fill-transparent"
        >Silver alien</span>
      </div>
      <div class="module-list">
        <div>
          <a href="/book">
            <span>读书</span>
          </a>
        </div>
        <div>
          <a href="/music">
            <span>听音乐</span>
          </a>
        </div>
        <div>
          <a href="/video">
            <span>看视频</span>
          </a>
        </div>
        <div>
          <a href="/template">
            <span>组件样版</span>
          </a>
        </div>
        <div>
          <a href="/spy">
            <span>玩游戏</span>
          </a>
        </div>
      </div>
      <div class="module-list hidden" v-if="module_more_show">
        <div>
          <a href="/video">
            <img src="@/assets/img/icon/home_video.svg" />
            <span>看视频</span>
          </a>
        </div>
        <div>
          <a href="/algo">
            <img src="@/assets/img/icon/home_algo.svg" />
            <span>啥</span>
          </a>
        </div>
        <div>
          <a href="/other">
            <img src="@/assets/img/icon/home_other.svg" />
            <span>其他（all not 😁）</span>
          </a>
        </div>
      </div>
      <div class="module-more hidden" @click="module_more_show = !module_more_show">. . .</div>
    </div>
    <div class="footer">
      <div class="h-0.5 bg-gradient-to-r from-yellow-500 via-pink-500 to-cyan-500 w-full"></div>
      <div>
        <span>
          Copyright © 2022 By
          <a
            href="http://www.xcya.cn"
            class="italic font-bold text-xl bg-clip-text linear-gradient inverse text-fill-transparent"
          >Silver alien</a>
        </span>
      </div>
      <div>
        <a href="http://beian.miit.gov.cn/">
          <span>京ICP备2022006333号</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import BackGround from './common/background.vue'

export default {
  name: "home",
  components: { BackGround },
  data() {
    return {
      module_more_show: false,
    };
  },
  mounted() {
    
  }
};
</script>

<style scoped>
@import "../assets/css/main.css";
</style>
