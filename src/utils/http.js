//axios做一些基础的封装
import axios from "axios";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/stores/userStore";
import "element-plus/theme-chalk/el-message.css";
import router from "@/router";
//生成一个axios实例，用http来接收一下
const httpInstance = axios.create({
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
  timeout: 5000,
});

// axios请求拦截器
httpInstance.interceptors.request.use(
  (config) => {
    //1,从pinia获取token数据
    const userStore = useUserStore();
    //2,将token数据放到请求头中,按后端的要求拼接数据
    const token = userStore.userInfo.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (e) => Promise.reject(e)
);

// axios响应式拦截器
httpInstance.interceptors.response.use(
  (res) => res.data,
  (e) => {
    const userStore = useUserStore();
    //统一错误提示  warning（警告）
    ElMessage({
      type: "warning",
      massage: e.response.data.message,
    });
    //401token失效处理
    //1，清除本地用户数据
    //2，跳转登录页
    if (e.response.status === 401) {
      userStore.clearUserInfo();
      router.push("/login");
    }
    return Promise.reject(e);
  }
);
export default httpInstance;
