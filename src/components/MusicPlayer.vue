<template>
  <div class="player-parent">
    <div class="music-title">
      <span>当前歌单：</span>
      <span>喜欢的音乐</span>
    </div>
    <aplayer
      class="player"
      ref="true_player"
      :audio="audio"
      :lrcType="lrcType"
      :fixed="fixed"
      :mini="mini"
      :listFolded="listFolded"
      @listSwitch="handleEvent"
    />
    <div class="music-tool">
      <div>
        <a href="/music" title="音乐主页">
          <img src="@/assets/img/icon/music-one.svg" />
        </a>
      </div>
      <div>
        <a href="javascript:void(0);" title="切换歌单" @click="switchpalylist(1)">
          <img src="@/assets/img/icon/data-switch.svg" />
        </a>
      </div>
      <div>
        <a
          :href="curmusic.url"
          :download="curmusic.name + '-' + curmusic.artist + '.mp3'"
          :title="'下载《' + curmusic.name + '-' + curmusic.artist + '》'"
        >
          <img src="@/assets/img/icon/download.svg" />
        </a>
      </div>
      <div>
        <a href="/music" title="相关音乐设置">
          <img src="@/assets/img/icon/music-set.svg" />
        </a>
      </div>
      <div>
        <a href="javascript:void(0);" title="关闭音乐">
          <img src="@/assets/img/icon/power.svg" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MusicPlayer",
  data() {
    return {
      audio: null,
      curmusic: { name: "歌名", artist: "歌手", url: "" },
    };
  },
  mounted() {
    // this.initaudio(this.server, this.type, this.id);
  },
  methods: {
    initaudiowithserver(server, type, id) {
      var music_api_temp =
        "https://api.i-meto.com/meting/api?server=:server&type=:type&id=:id&r=:r";
      var audio = [];
      var r = Math.random();
      var music_api = music_api_temp
        .replace(":server", server)
        .replace(":type", type)
        .replace(":id", id)
        .replace(":r", r);
      axios
        .get(music_api, {})
        .then((res) => {
          for (let music of res.data) {
            audio.push({
              name: music["title"],
              artist: music["author"],
              url: music["url"],
              cover: music["pic"],
              lrc: music["lrc"],
            });
          }
          this.audio = audio;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    initdefaultaudio() {
      this.audio = [
        {
          name: "rainmood",
          artist: "可乐加冰",
          url: "/public/rainmood.m4a",
          cover: "/public/rain.jpeg",
          lrc: "暂无歌词。",
        },
        {
          name: "飞鸟与蝉",
          artist: "任然",
          url: "/public/任然 - 飞鸟和蝉.mp3",
          cover: "/public/rain.jpeg",
          lrc: "暂无歌词。",
        },
      ];
    },
    preventautoplay() {
      const { media } = this.$refs.true_player;
      // console.log(media.paused, 22222);
      if (!media.paused) {
        console.log("阻止自动播放！");
        this.$refs.true_player.pause();
      }
    },
    initaudio(player_setting) {
      let default_player_type = player_setting.default_player_type || true;
      if (default_player_type) {
        this.initdefaultaudio();
      } else {
        let player_server = player_setting.server || "netease";
        let player_type = player_setting.type || "playlist";
        let palyer_id = player_setting.id || "2676066674";
        this.initaudiowithserver(player_server, player_type, palyer_id);
      }
      this.preventautoplay();
      this.curmusic = this.$refs.true_player.currentMusic;
    },
    handleEvent(music) {
      this.curmusic = music;
    },
    switchpalylist(value) {
      console.log(value);
    }
  },
  props: {
    mini: { type: Boolean, default: false },
    fixed: { type: Boolean, default: false },
    lrcType: { type: Number, default: 3 },
    listFolded: { type: Boolean, default: false },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.aplayer-body {
  background: none !important;
}
.aplayer {
  background: none !important;
}
.aplayer.aplayer-fixed {
  position: relative !important;
  text-align: left !important;
}
.aplayer.aplayer-fixed .aplayer-body {
  position: relative !important;
}
.aplayer.aplayer-fixed .aplayer-list {
  margin-bottom: 0px !important;
  border: none !important;
}
.aplayer.aplayer-fixed .aplayer-icon-menu {
  position: public !important;
}
.aplayer.aplayer-fixed .aplayer-icon-forward {
  right: 5px !important;
}
.aplayer.aplayer-fixed .aplayer-icon-play {
  right: 30px !important;
}
.aplayer.aplayer-fixed .aplayer-icon-back {
  right: 55px !important;
}
.aplayer.aplayer-fixed .aplayer-info .aplayer-music {
  display: flex !important;
  /* align-items: flex-end; */
}
.aplayer .aplayer-list li {
  border-top: 1px solid #e9e9e949 !important;
}
.aplayer .aplayer-list li.aplayer-list-light,
.aplayer .aplayer-list li:hover {
  background: #e9e9e972 !important;
}
.aplayer.aplayer-fixed .aplayer-info {
  border-top: none !important;
}
.aplayer.aplayer-arrow .aplayer-icon-loop,
.aplayer.aplayer-arrow .aplayer-icon-order {
  display: inline-block !important;
}
.aplayer .aplayer-miniswitcher {
  background: #6b8ece19 !important;
}

.player-parent {
  position: absolute;
  top: 0em;
  left: 1.8em;
  background: #ddddddaa;
  padding: 15px;
  border-radius: 15px;
  text-align: center;
  width: max-content;
  padding-bottom: 0px;
  backdrop-filter: blur(20px);
}

.player {
  min-width: 330px;
}

.music-title {
  text-align: left;
  display: flex;
  padding: 15px 0;
  align-items: center;
}

.music-title span {
  padding: 0 5px;
}

.music-title span:nth-child(1) {
  font-size: 20px;
}

.music-title span:nth-child(2) {
  color: #009688;
  font-size: 16px;
}

.music-tool {
  display: flex;
  padding: 10px 0;
  margin: 15px 0 10px 0;
  border-top: 1px solid #00000066;
  justify-content: space-around;
}

.music-tool > div {
  display: flex;
}

.music-tool img {
  height: 0.7em;
  width: 0.7em;
  vertical-align: middle;
}
</style>
