import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/zh-CN'; // lang i18n

import CommHeader from '@src/components/CommHeader.vue';

export default ({ Vue }) => {
  Vue.component('comm-header', CommHeader); // 全局注册外来组件 自动注册的全局组件需要放在 .vuepress/components 目录下
  Vue.use(ElementUI, { locale });

  function isMobile(){
    return navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i);
  }

  const vm = {
    clickList: [
      { text: 'happy everyday', color: '#eb4339' },
      { text: 'welcome', color: '#823EFF' },
      { text: 'good good study', color: '#D3A54D' },
      { text: 'day day up', color: '#AA4FCA' },
      { text: 'win-win', color: '#4E88FF' },
    ],
    isMobile: isMobile(),
  };
  const len = vm.clickList.length;
  
  document.addEventListener('click', function (ev) {
    // ev = vm.isMobile ? ev.targetTouches[0] : ev;
    // const X = vm.isMobile ? ev.clientX : ev.pageX;
    // const Y = vm.isMobile ? ev.clientY : ev.pageY;
    const { pageX: X, pageY: Y } = ev;
    const index = Math.floor(Math.random() * len)
    const { text, color } = vm.clickList[index];

    const span = document.createElement('span');
    span.classList.add('my_toast');
    span.innerText = text;
    span.style.color = color;
    span.style.left = X + 'px';
    span.style.top = Y - 20 + 'px';
    document.body.appendChild(span);

    setTimeout(() => {
      document.body.removeChild(span);
    }, 1000);
  }, false);
}
