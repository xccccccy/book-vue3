<template>
  <div id="camera">
    <button @click="openCapture">开启</button>
    <button @click="stopCapture">关闭</button>
    <button @click="startFaceRecognition">开启面部识别</button>
    <button @click="addFaceRecognition">添加面部识别</button>
    <div><video ref="video" id="video" :style="{ width: videoWidth + 'px' }"
        style="object-fit: cover; aspect-ratio: 3 / 4" autoplay playsinline></video></div>
    <div><button id="snap" v-on:click="capture()">Snap Photo</button></div>
    <canvas ref="canvas" id="canvas"></canvas>
    <ul>
      <li v-for="(c, index) in captures" :key="index">
        <img v-bind:src="c" height="50" />
      </li>
    </ul>

  </div>
</template>

<script>
import { ref, onMounted, defineComponent, watch } from 'vue'
import $ from "jquery";
import axios from 'axios';
import { guid } from '../common/utils';

export default {
  name: 'CameraComponent',
  data() {
    return {
      video: {},
      canvas: {},
      captures: [],
      videoWidth: 300,
      videoHeight: 500,
      uuid: '',
      logged: false,
      captureOpening: false,
    }
  },
  mounted() {
    this.video = this.$refs.video;
    this.canvas = this.$refs.canvas;
    this.uuid = guid();

  },
  unmounted() {
    this.stopCapture();
    // axios
    //   .post("/faceapi/addfacerecognitionclose", {
    //     uuid: this.uuid
    //   })
    // axios
    //   .post("/faceapi/facerecognitionclose", {
    //     uuid: this.uuid
    //   })
  },
  methods: {
    openCapture() {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })
          .then((stream) => {
            this.video.srcObject = stream;
            this.video.play();
            this.captureOpening = true;
          })
          .catch((err) => {
            console.log(err.name + ": " + err.message);
          });
      }
    },
    stopCapture() {
      if (!this.video.srcObject) return
      let stream = this.video.srcObject
      let tracks = stream.getTracks();
      tracks.forEach(track => {
        track.stop()
      })
      this.captureOpening = false;
    },
    capture() {
      let containerWidth = this.video.clientWidth;
      let containerHeight = this.video.clientHeight;
      let imgWidth = this.video.videoWidth;
      let imgHeight = this.video.videoHeight;
      console.log(imgWidth, imgHeight, containerWidth, containerHeight);
      this.canvas.width = containerWidth;
      this.canvas.height = containerHeight;
      const { sx, sy, swidth, sheight, x, y, width, height } = this.getObjectFitSize('cover', containerWidth, containerHeight, imgWidth, imgHeight);
      console.log(this.video, sx, sy, swidth, sheight, x, y, width, height);
      this.canvas.getContext("2d").drawImage(this.video, sx, sy, swidth, sheight, x, y, width, height);
      let img_base64 = canvas.toDataURL("image/png");
      this.captures.push(img_base64);
    },
    getObjectFitSize(type, containerWidth, containerHeight, imgWidth, imgHeight) {
      type = type || 'cover';
      let radio = 1, // 容器与图片的比例
        sx = 0, // 开始剪切的 x 坐标位置。
        sy = 0, // 开始剪切的 y 坐标位置。
        swidth = imgWidth, // 被剪切图像的宽度。
        sheight = imgHeight, // 被剪切图像的高度。
        x = 0, // 在画布上放置图像的 x 坐标位置。
        y = 0, // 在画布上放置图像的 y 坐标位置。
        width = containerWidth, // 要使用的图像的宽度（伸展或缩小图像）。
        height = containerHeight; // 要使用的图像的高度（伸展或缩小图像）。
      let cWHRatio = containerWidth / containerHeight;
      let iWHRatio = imgWidth / imgHeight;
      if (type === "cover") {
        // cover模式，需要裁剪
        if (iWHRatio >= cWHRatio) {
          // 横图，高先匹配，裁剪宽度
          radio = containerHeight / imgHeight;
          sx = (imgWidth - containerWidth / radio) / 2;
          swidth = containerWidth / radio;
          sheight = imgHeight;
        } else {
          // 竖图，宽先匹配，裁剪高度
          radio = containerWidth / imgWidth;
          sy = (imgHeight - containerHeight / radio) / 2;
          swidth = imgWidth;
          sheight = containerHeight / radio;
        }
      } else if (type === "contain") {
        if (iWHRatio >= cWHRatio) {
          // 横图，宽先匹配，高度自适应
          radio = containerWidth / imgWidth;
          y = (containerHeight - imgHeight * radio) / 2;
          height = imgHeight * radio;
        } else {
          // 竖图，高先匹配，宽度自适应
          radio = containerHeight / imgHeight;
          x = (containerWidth - imgWidth * radio) / 2;
          width = imgWidth * radio;
        }
      }
      return { sx, sy, swidth, sheight, x, y, width, height, };
    },
    startFaceRecognition() {
      if (!this.captureOpening) {
        ElNotification({ title: '未打开摄像头！', type: 'error', duration: 3000 });
        return
      }
      let containerWidth = this.video.clientWidth;
      let containerHeight = this.video.clientHeight;
      let imgWidth = this.video.videoWidth;
      let imgHeight = this.video.videoHeight;
      this.canvas.width = containerWidth;
      this.canvas.height = containerHeight;
      const { sx, sy, swidth, sheight, x, y, width, height } = this.getObjectFitSize('cover', containerWidth, containerHeight, imgWidth, imgHeight);
      axios
        .post("/faceapi/facerecognitionpre", {
          uuid: this.uuid
        })
        .then((res) => {
          if (res.data.res) {
            let FaceRecognition = setInterval(() => {
              if (this.captureOpening && !this.logged) {
                this.canvas.getContext("2d").drawImage(this.video, sx, sy, swidth, sheight, x, y, width, height);
                let img_base64 = canvas.toDataURL("image/png");
                this.postFaceRecognitionApi(img_base64, FaceRecognition);
              } else {
                clearInterval(FaceRecognition);
              }
            }, 200)
          }
        })
    },
    postFaceRecognitionApi(img_base64, FaceRecognition) {
      axios
        .post("/faceapi/facerecognition", {
          uuid: this.uuid, img_base64: img_base64
        })
        .then((res) => {
          console.log(res);
          if (res.data.res) {
            clearInterval(FaceRecognition);
            console.log(res.data.id, res.data.name);
            this.logged = true;
            ElNotification({ title: '登录成功。', message: res.data.id, type: 'success', duration: 3000 });
            setTimeout(() => {
              this.stopCapture();
            }, 1000)
            axios
              .post("/faceapi/facerecognitionclose", {
                uuid: this.uuid
              })
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addFaceRecognition() {
      if (!this.captureOpening) {
        ElNotification({ title: '未打开摄像头！', type: 'error', duration: 3000 });
        return
      }
      let containerWidth = this.video.clientWidth;
      let containerHeight = this.video.clientHeight;
      let imgWidth = this.video.videoWidth;
      let imgHeight = this.video.videoHeight;
      this.canvas.width = containerWidth;
      this.canvas.height = containerHeight;
      const { sx, sy, swidth, sheight, x, y, width, height } = this.getObjectFitSize('cover', containerWidth, containerHeight, imgWidth, imgHeight);
      axios
        .post("/faceapi/addfacerecognitionpre", {
          uuid: this.uuid, id: '002'
        })
        .then((res) => {
          if (res.data.res) {
            let FaceInterval = setInterval(() => {
              if (this.captureOpening) {
                this.canvas.getContext("2d").drawImage(this.video, sx, sy, swidth, sheight, x, y, width, height);
                let img_base64 = canvas.toDataURL("image/png");
                this.postAddFaceRecognitionApi(img_base64, FaceInterval);
              } else {
                clearInterval(FaceInterval);
              }
            }, 200)
          }
        })
    },
    postAddFaceRecognitionApi(img_base64, FaceInterval) {
      axios
        .post("/faceapi/addfacerecognition", {
          uuid: this.uuid, img_base64: img_base64, id: '002'
        })
        .then((res) => {
          console.log(res);
          if (res.data.res) {
            clearInterval(FaceInterval);
            ElNotification({ title: '添加面部识别成功。', type: 'success', duration: 3000 });
            setTimeout(() => {
              this.stopCapture();
            }, 1000)
            axios
              .post("/faceapi/addfacerecognitionclose", {
                uuid: this.uuid
              })
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
}
</script>


<style scoped>
#camear {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#video {
  background-color: #000000;
  transform: rotateY(180deg);
}

#canvas {
  display: none;
}

li {
  display: inline;
  padding: 5px;
}
</style>
