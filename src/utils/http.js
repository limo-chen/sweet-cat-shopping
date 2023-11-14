//axios做一些基础的封装
import axios from "axios";
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/el-message.css";
//生成一个axios实例，用http来接收一下
const httpInstance = axios.create({
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
  timeout: 5000,
});

// axios请求拦截器
httpInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (e) => Promise.reject(e)
);

// axios响应式拦截器
httpInstance.interceptors.response.use(
  (res) => res.data,
  (e) => {
    //统一错误提示  warning（警告）
    ElMessage({
      type: "warning",
      massage: e.response.data.message,
    });
    return Promise.reject(e);
  }
);
export default httpInstance;
