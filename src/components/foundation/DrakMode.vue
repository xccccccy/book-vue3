<template>
  <div :class="{ headeractivate: dark_mode_span_show }" class="relative">
    <div @click="dark_mode_span_show = !dark_mode_span_show">
      <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        class="w-7 h-7 dark:hidden">
        <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" class="fill-indigo-400/20 stroke-indigo-500"></path>
        <path
          d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836"
          class="stroke-indigo-500"></path>
      </svg>
      <svg viewBox="0 0 24 24" fill="none" class="w-7 h-7 hidden dark:block">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z"
          class="fill-indigo-400/20"></path>
        <path
          d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z"
          class="fill-indigo-500"></path>
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z"
          class="fill-indigo-500"></path>
      </svg>
    </div>
    <ul v-show="dark_mode_span_show" @mouseleave="dark_mode_span_show = false"
      class="absolute top-full -left-full bg-white rounded-lg ring-1 ring-slate-900/10 shadow-lg overflow-hidden w-36 py-1 text-sm text-slate-700 font-semibold dark:bg-slate-800 dark:ring-0 dark:highlight-white/5 dark:text-slate-300 mt-1"
      aria-labelledby="headlessui-listbox-label-2" aria-orientation="vertical" role="listbox" tabindex="0">
      <li class="py-1 px-2 flex items-center cursor-pointer text-indigo-500" role="option" tabindex="-1"
        aria-selected="true" v-if="darkmode == 'light'">
        <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="w-6 h-6 mr-2">
          <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" class="fill-indigo-400/20 stroke-indigo-500"></path>
          <path
            d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836"
            class="stroke-indigo-500"></path>
        </svg>日间模式
      </li>
      <li class="py-1 px-2 flex items-center cursor-pointer" role="option" tabindex="-1" aria-selected="true"
        v-if="darkmode != 'light'" @click="changedarkmode('light')">
        <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="w-6 h-6 mr-2">
          <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" class="stroke-slate-400 dark:stroke-slate-500"></path>
          <path
            d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836"
            class="stroke-slate-400 dark:stroke-slate-500"></path>
        </svg>日间模式
      </li>
      <li class="py-1 px-2 flex items-center cursor-pointer text-indigo-500" role="option" tabindex="-1"
        v-if="darkmode == 'dark'">
        <svg viewBox="0 0 24 24" fill="none" class="w-6 h-6 mr-2">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z"
            class="fill-indigo-400/20"></path>
          <path
            d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z"
            class="fill-indigo-500"></path>
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z"
            class="fill-indigo-500"></path>
        </svg>夜间模式
      </li>
      <li class="py-1 px-2 flex items-center cursor-pointer" role="option" tabindex="-1" v-if="darkmode != 'dark'"
        @click="changedarkmode('dark')">
        <svg viewBox="0 0 24 24" fill="none" class="w-6 h-6 mr-2">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z"
            class="fill-transparent"></path>
          <path
            d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z"
            class="fill-slate-400 dark:fill-slate-500"></path>
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z"
            class="fill-slate-400 dark:fill-slate-500"></path>
        </svg>夜间模式
      </li>
      <li class="py-1 px-2 flex items-center cursor-pointer text-indigo-500" id="headlessui-listbox-option-50"
        role="option" tabindex="-1" v-if="darkmode == 'auto'">
        <svg viewBox="0 0 24 24" fill="none" class="w-6 h-6 mr-2">
          <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z" stroke-width="2"
            stroke-linejoin="round" class="stroke-indigo-500 fill-indigo-400/20"></path>
          <path d="M14 15c0 3 2 5 2 5H8s2-2 2-5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="stroke-indigo-500"></path>
        </svg>跟随系统
      </li>
      <li class="py-1 px-2 flex items-center cursor-pointer" id="headlessui-listbox-option-50" role="option"
        tabindex="-1" v-if="darkmode != 'auto'" @click="changedarkmode('auto')">
        <svg viewBox="0 0 24 24" fill="none" class="w-6 h-6 mr-2">
          <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z" stroke-width="2"
            stroke-linejoin="round" class="stroke-slate-400 dark:stroke-slate-500"></path>
          <path d="M14 15c0 3 2 5 2 5H8s2-2 2-5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="stroke-slate-400 dark:stroke-slate-500"></path>
        </svg>跟随系统
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted, defineComponent, watch } from 'vue'
import $ from "jquery";

export default {
  name: 'DarkModeComponent',
  emits: ["darkModeChange"],
  setup(props, context) {
    const darkmode = ref('no');
    const dark_mode_span_show = ref(false);

    onMounted(() => {
      darkmode.value = localStorage.darkmode;
    })

    let callback = e => {
      let prefersDarkMode = e.matches;
      if (prefersDarkMode) {
        $('html').addClass('dark');
      } else {
        $('html').removeClass('dark');
      }
      context.emit('darkModeChange');
    }

    watch(darkmode, (newmode, oldValue) => {
      if (newmode == 'dark') {
        $('html').addClass('dark');
      } else if (newmode == 'light') {
        $('html').removeClass('dark');
      } else {
        let media = window.matchMedia('(prefers-color-scheme:dark)');
        if (media.matches) {
          $('html').addClass('dark');
        } else {
          $('html').removeClass('dark');
        }
        media.removeEventListener("change", callback);
        media.addEventListener('change', callback);
      }
      context.emit('darkModeChange');
    })
    const changedarkmode = (mode) => {
      let _mode = mode || 'auto';
      if (_mode == 'auto') {
        darkmode.value = 'auto';
      } else if (_mode == 'dark') {
        darkmode.value = 'dark';
      } else {
        darkmode.value = 'light';
      }
      localStorage.darkmode = darkmode.value;
    }
    return { dark_mode_span_show, darkmode, changedarkmode }
  },
}
</script>


<style scoped>
img {
  height: 1.3rem;
}
.headeractivate {
  border-bottom: 2px solid rgb(20, 175, 103);
}
</style>
