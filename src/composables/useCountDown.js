//封装倒计时逻辑函数
import { ref, computed, onUnmounted } from "vue";
import dayjs from "dayjs";
export const useCountDown = () => {
  //1，响应式的数据
  let timer = null;
  const time = ref(0);
  //格式化时间为多少分多少秒  计算属性：基于一个已经存在的数据做二次响应
  const formatTime = computed(() => dayjs.unix(time.value).format("mm分ss秒"));
  //2，开启倒计时的函数
  const start = (currentTime) => {
    //3，开始倒计时的逻辑
    //核心逻辑编写，每隔一秒减一
    time.value = currentTime;
    timer = setInterval(() => {
      time.value--;
    }, 1000);
    //为防止内存泄漏，定时清除定时器 ，如果timer存在调用clearInterval
    onUnmounted(() => {
      timer && clearInterval(timer);
    });
  };
  return {
    formatTime,
    start,
  };
};
