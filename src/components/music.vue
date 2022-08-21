<template>
  <div class="back-all">
    <div class="all-container">
      <div class="left-part">
        <music-player
          ref="player"
          :fixed="true"
          :mini="false"
          :lrcType="0"
          :listFolded="false"
        />
      </div>
      <div class="right-part">dijsi</div>
    </div>
  </div>
</template>

<script>
import MusicPlayer from "./MusicPlayer.vue";

export default {
  name: "music",
  data() {
    return {
      player_setting: {
        default_player_type: true,
        server: "netease",
        type: "playlist",
        id: "2676066674",
      },
    };
  },
  mounted() {
    this.$refs.player.initaudio(this.player_setting);
  },
  methods: {
    test() {},
  },
  components: {
    MusicPlayer,
  },
};
</script>

<style scoped>
.all-container {
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: space-evenly;
}
.player-parent {
  position: public !important;
  font-size: 35px;
}
.right-part {
  width: 60%;
}
</style>
