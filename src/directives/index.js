import { useIntersectionObserver } from "@vueuse/core";
//定义懒加载函数
export const lazyPlugin = {
  install(app) {
    //编写懒加载逻辑
    //定义全局指令,第一个参数是他的名字，第二个参数是一个对象，
    app.directive("img-lazy", {
      mounted(el, binding) {
        //el:指令绑定的那个元素 img
        //binding：binding.value 指令等于号后面绑定的表达式的值，图片URL
        console.log(el, binding.value);
        //el是监听的img，isIntersecting是个布尔值，实时的告诉我们，当前监听的el是否进入视口区域
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
          console.log(isIntersecting);
          if (isIntersecting) {
            //进入视口区域
            el.src = binding.value;
            stop();
          }
        });
      },
    });
  },
};
