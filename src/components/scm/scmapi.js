import axios from "axios";


export const getAllReposInfo = (repos) => {
    return axios
        .get("/scmapi/get/allReposInfo")
        .catch((err) => {
            ElNotification({ message: '获取Repos失败。', type: 'warning', duration: 3000 });
            console.log('ERROR => ', err);
        });
}

export const getAllVersionInfo = (repos) => {
    return axios
        .post("/scmapi/get/allversioninfo", {
            'repos': repos
        })
        .catch((err) => {
            ElNotification({ message: '获取VersionInfo失败。', type: 'warning', duration: 3000 });
            console.log('ERROR => ', err);
        });
}