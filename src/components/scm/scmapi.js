import axios from "axios";

export const getAllVersionInfo = () => {
    return axios
      .get("/scmapi/get/allversioninfo")
      .catch((err) => {
        ElNotification({ message: '获取VersionInfo失败。', type: 'warning', duration: 3000 });
        console.log('ERROR => ', err);
      });
}