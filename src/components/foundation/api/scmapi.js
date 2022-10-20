import { service } from "./api"

export const scmtesttoken = () => {
    return service
        .get("/scmapi/test/token")
}

export const scmlogin = (token) => {
    return service
        .post("/scmapi/set/token", {
            'token': token
        })
}

export const getAllReposInfo = (repos) => {
    return service
        .get("/scmapi/get/allReposInfo")
}

export const getAllVersionInfo = (repos) => {
    return service
        .post("/scmapi/get/allversioninfo", {
            'repos': repos
        })
}

export const getAllCommitsInfo = (repos) => {
    return service
        .post("/scmapi/get/" + repos + "/commits", {
            'repos': repos
        })
}

export const newVersionWithData = (repos, commitSha, version, mode) => {
    return service
        .post("/scmapi/new/version", {
            'repos': repos,
            'commitSha': commitSha,
            'version': version,
            'mode': mode
        })
}

export const updateVersion = (repos, version) => {
    return service
        .post("/scmapi/update/version", {
            'repos': repos,
            'version': version
        })
}

export const updateFastVersionApi = (appName) => {
    return service
        .post("/scmapi/update/fastversion", {
            'app': appName,
        })
}