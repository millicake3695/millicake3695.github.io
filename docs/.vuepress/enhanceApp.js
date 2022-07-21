import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/zh-CN'; // lang i18n

import CommHeader from '@src/components/CommHeader.vue';

export default ({ Vue }) => {
  Vue.component('comm-header', CommHeader); // 全局注册外来组件 自动注册的全局组件需要放在 .vuepress/components 目录下
  Vue.use(ElementUI, { locale });
}
