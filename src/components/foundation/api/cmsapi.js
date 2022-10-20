import { service } from "./api"

export const initVideoDatabase = () => {
    return service.get("/cmsapi/init/videos")
}