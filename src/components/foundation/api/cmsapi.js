import { service } from "./api"

export const initVideoDatabase = (cmsUrlName) => {
    return service.post("/cmsapi/init/videos", {
        'cmsUrlName': cmsUrlName
    })
}

export const initUrlNames = () => {
    return service.get("/cmsapi/init/urlnames")
}

export const delAllVideos = () => {
    return service.get("/cmsapi/del/allvideos")
}