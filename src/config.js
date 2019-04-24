import axios from "axios"
import { Toast } from "antd-mobile"
import NProgress from "nprogress"

axios.interceptors.request.use((config) => {
  console.log(config)
  if (config.url !== "/openapi/api") {
    Toast.loading("加载中", 0)
    NProgress.start()
  }
  return config
})
axios.interceptors.response.use((config) => {
  Toast.hide()
  NProgress.done()
  return config
})
