import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/zh-CN'; // lang i18n

import CommHeader from '@src/components/CommHeader.vue';

export default (config) => {
  const { Vue, isServer } = config;
  
  Vue.component('comm-header', CommHeader); // 全局注册外来组件 自动注册的全局组件需要放在 .vuepress/components 目录下
  Vue.use(ElementUI, { locale });
  
  if (isServer) return;

  const clickList = new Array('点我#', '起飞#', '你好#', '有缘人#', '早安#', '午安#', '晚安#');

  document.body.addEventListener('click', async function (ev) {
    const { pageX: X, pageY: Y } = ev;
    const index = Math.floor(Math.random() * clickList.length);
    const [ H, S, L ] = [ parseInt(Math.random() * 360), '100%', '50%'];
    const color = `HSL(${H},${S},${L})`;
    // const [ red, green, blue ] = [ 
    //   parseInt(Math.random() * 257).toString(16),
    //   parseInt(Math.random() * 257).toString(16),
    //   parseInt(Math.random() * 257).toString(16)
    // ];
    // const color = `#${red}${green}${blue}`;
    const span = document.createElement('span');
    const textNode = document.createTextNode(clickList[index])
    span.appendChild(textNode);

    // span.classList.add('my_toast');
    span.style.position = 'absolute'
    span.style.left = X + 'px';
    span.style.top = Y - 20 + 'px';
    span.style.zIndex = 999;
    span.style.color = color;
    document.body.appendChild(span);

    // element.animate() 返回一个 Animation 对象，包含一个是 Promise 的 finished 属性
    await span.animate([
      {
        transform: 'translateY(0)',
      },
      {
        opacity: 0.67,
        transform: 'translateY(-20px)',
      },
      {
        opacity: 0.33,
        transform: 'translateY(-50px)',
      },
      {
        opacity: 0,
        transform: 'translateY(-100px)',
      }
    ], {
      duration: 1000,
      easing: 'ease-in-out'
    }).finished;

    document.body.removeChild(span);
  }, false);
}
