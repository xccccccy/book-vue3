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

export const getAllCommitsInfo = (repos) => {
    return axios
        .post("/scmapi/get/" + repos + "/commits", {
            'repos': repos
        })
        .catch((err) => {
            ElNotification({ message: '获取CommitsInfo失败。', type: 'warning', duration: 3000 });
            console.log('ERROR => ', err);
        });
}

export const newVersionWithData = (repos, commitSha, version, mode) => {
  return axios
      .post("/scmapi/new/version", {
          'repos': repos,
          'commitSha': commitSha,
          'version': version,
          'mode': mode
      })
}

export const updateVersion = (repos, version) => {
  return axios
      .post("/scmapi/update/version", {
          'repos': repos,
          'version': version
      })
      .catch((err) => {
          ElNotification({ message: '更新Version失败。', type: 'warning', duration: 3000 });
          console.log('ERROR => ', err);
      });
}