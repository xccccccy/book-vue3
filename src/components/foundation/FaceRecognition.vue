<template>
  <div id="camera">
    <!-- <button @click="openCapture">开启摄像头</button>
    <button @click="stopCapture">关闭摄像头</button> -->
    <!-- <button v-show="!logged" @click="openCapture">开始面部识别</button>
    <button v-show="logged" @click="addFaceRecognition">注册面部信息</button> -->
    <div style="overflow: hidden">
      <video ref="facevideo" id="video" class="w-full sm:w-64" style="object-fit: cover; aspect-ratio: 3 / 4"
        autoplay="autoplay" playsinline>
      </video>
    </div>

    <canvas ref="facecanvas" id="canvas"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, defineComponent, watch, onUnmounted } from 'vue'
import $ from "jquery";
import axios from 'axios';

export default {
  name: 'FaceRecognitionComponent',
  props: {
    logged: { default: false },
  },
  emits: ["user_face_login", "add_face_success", "user_face_login_error", "not_have_captrue", "user_add_face_error"],
  setup(props, context) {
    const facevideo = ref(null);
    const facecanvas = ref(null);
    var captureOpening = false;
    var containerWidth, containerHeight, imgWidth, imgHeight;
    var _sx, _sy, _swidth, _sheight, _x, _y, _width, _height;
    onMounted(() => {

    })
    onUnmounted(() => {
      stopCapture();
    })
    const openCapture = () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })
          .then((stream) => {
            facevideo.value.srcObject = stream;
            // facevideo.value.play();
            captureOpening = true;
            facevideo.value.oncanplay = () => {
              facevideo.value.pause();
              facevideo.value.play();
              containerWidth = facevideo.value.clientWidth;
              containerHeight = facevideo.value.clientHeight;
              imgWidth = facevideo.value.videoWidth;
              imgHeight = facevideo.value.videoHeight;
              facecanvas.value.width = containerWidth;
              facecanvas.value.height = containerHeight;
              const { sx, sy, swidth, sheight, x, y, width, height } = getObjectFitSize('cover', containerWidth, containerHeight, imgWidth, imgHeight);
              _sx = sx, _sy = sy, _swidth = swidth, _sheight = sheight, _x = x, _y = y, _width = width, _height = height;
              startFaceRecognition();
            };
          })
          .catch((err) => {
            console.log(err.name + ": " + err.message);
          });
      } else {
        ElNotification({ title: '没有可用摄像头或者无法获取摄像头权限。', type: 'warning', duration: 3000 });
        context.emit('not_have_captrue')
      }
    };
    const stopCapture = () => {
      try {
        if (!facevideo.value.srcObject) return
        let stream = facevideo.value.srcObject
        let tracks = stream.getTracks();
        tracks.forEach(track => {
          track.stop()
        })
      }
      catch (e) {

      }
      captureOpening = false;
    };
    const getObjectFitSize = (type, containerWidth, containerHeight, imgWidth, imgHeight) => {
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
    };
    const startFaceRecognition = () => {
      if (!captureOpening) {
        ElNotification({ title: '未打开摄像头！', type: 'error', duration: 3000 });
        return
      }
      postFaceRecognitionApi(1, 0);
    };
    const postFaceRecognitionApi = (count, hasface_count) => {
      if (count >= 1000) {
        ElNotification({ title: '超时！', type: 'warning', duration: 3000 });
        context.emit('user_face_login_error')
        stopCapture();
        return
      }
      if (hasface_count >= 5) {
        ElNotification({ title: '面部信息未注册！', message: "注册登录后选择 Face + 即可注册面部信息，使用面部识别登录功能。", type: 'warning', duration: 3000 });
        context.emit('user_face_login_error')
        stopCapture();
        return
      }
      facecanvas.value.getContext("2d").drawImage(facevideo.value, _sx, _sy, _swidth, _sheight, _x, _y, _width, _height);
      let img_base64 = facecanvas.value.toDataURL("image/png");
      axios
        .post("/faceapi/facerecognition", {
          img_base64: img_base64
        })
        .then((res) => {
          if (res.data.res) {
            let _user = { id: res.data.id, name: res.data.name, faceid: true, icon: res.data.icon };
            localStorage.user = JSON.stringify(_user);
            ElNotification({ title: '登录成功。', message: '欢迎你，' + res.data.name, type: 'success', duration: 3000 });
            context.emit('user_face_login', _user)
            setTimeout(() => {
              stopCapture();
            }, 300)
          } else {
            if (res.data.hasOwnProperty('type')) {
              setTimeout(() => {
                stopCapture();
              }, 200)
              ElNotification({ title: res.data.context, type: 'warning', duration: 3000 });
              context.emit('user_face_login_error')
              return
            }
            if (res.data.hasface) {
              hasface_count += 1
            }
            setTimeout(() => {
              postFaceRecognitionApi(count + 1, hasface_count)
            }, 60)

          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const addFaceRecognition = () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })
          .then((stream) => {
            facevideo.value.srcObject = stream;
            // facevideo.value.play();
            captureOpening = true;
            facevideo.value.oncanplay = () => {
              facevideo.value.pause();
              facevideo.value.play();
              containerWidth = facevideo.value.clientWidth;
              containerHeight = facevideo.value.clientHeight;
              imgWidth = facevideo.value.videoWidth;
              imgHeight = facevideo.value.videoHeight;
              facecanvas.value.width = containerWidth;
              facecanvas.value.height = containerHeight;
              const { sx, sy, swidth, sheight, x, y, width, height } = getObjectFitSize('cover', containerWidth, containerHeight, imgWidth, imgHeight);
              _sx = sx, _sy = sy, _swidth = swidth, _sheight = sheight, _x = x, _y = y, _width = width, _height = height;
              let _user = JSON.parse(localStorage.user)
              let face_id = _user.id;
              postAddFaceRecognitionApi(1, face_id)
            };
          })
          .catch((err) => {
            console.log(err.name + ": " + err.message);
          });
      }
    };
    const postAddFaceRecognitionApi = (count, face_id) => {
      if (count > 1000) {
        ElNotification({ title: '超时了！', type: 'warning', duration: 3000 });
        stopCapture();
        return
      }
      let img_base64s = [];
      let img_base64_count = 0;
      let img_base64_count_Interval = setInterval(() => {
        if (!captureOpening) {
          clearInterval(img_base64_count_Interval);
          return
        }
        facecanvas.value.getContext("2d").drawImage(facevideo.value, _sx, _sy, _swidth, _sheight, _x, _y, _width, _height);
        let img_base64 = facecanvas.value.toDataURL("image/png");
        img_base64s.push(img_base64)
        img_base64_count += 1;
        if (img_base64_count == 3) {
          clearInterval(img_base64_count_Interval);
          axios
            .post("/faceapi/addfacerecognition", {
              img_base64s: img_base64s, face_id: face_id
            })
            .then((res) => {
              if (res.data.res) {
                ElNotification({ title: '添加面部识别成功。', type: 'success', duration: 3000 });
                context.emit('add_face_success')
                setTimeout(() => {
                  stopCapture();
                }, 300)
              } else {
                if (res.data.hasOwnProperty('type')) {
                  setTimeout(() => {
                    stopCapture();
                  }, 100)
                  ElNotification({ title: res.data.context, type: 'warning', duration: 3000 });
                  context.emit('user_add_face_error')
                  return
                }
                postAddFaceRecognitionApi(count, face_id)
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }, 30)
    };
    context.expose({ openCapture, addFaceRecognition, stopCapture })
    return { facevideo, facecanvas, openCapture, stopCapture, startFaceRecognition, addFaceRecognition }
  }
}
</script>


<style scoped>
#video {
  transform: rotateY(180deg);
  /* position: absolute;
  right: 0; */
}

canvas {
  display: none;
}

button {
  margin: 1rem;
}
</style>
