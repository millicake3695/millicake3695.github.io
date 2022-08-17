(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{553:function(e,t,n){"use strict";n.r(t);var a=n(2),s=Object(a.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h3",{attrs:{id:"为什么在-html-中监听事件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#为什么在-html-中监听事件"}},[e._v("#")]),e._v(" 为什么在 HTML 中监听事件？")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v("你可能注意到这种事件监听的方式违背了关注点分离 (separation of concern) 这个长期以来的优良传统。但不必担心，因为所有的 Vue.js 事件处理方法和表达式都严格绑定在当前视图的 ViewModel 上，它不会导致任何维护上的困难。实际上，使用 `v-on` 有几个好处：\n\n- 扫一眼 HTML 模板便能轻松定位在 JavaScript 代码里对应的方法。\n\n- 因为你无须在 JavaScript 里手动绑定事件，你的 ViewModel 代码可以是非常纯粹的逻辑，和 DOM 完全解耦，更易于测试。\n\n- 当一个 ViewModel 被销毁时，所有的事件处理器都会自动被删除。你无须担心如何清理它们。\n")])])]),t("h3",{attrs:{id:"vue-data为什么是一个函数"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#vue-data为什么是一个函数"}},[e._v("#")]),e._v(" Vue data为什么是一个函数？")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v("因为组件是用来复用的，且JS对象是引用关系。如果组件中 data 是一个对象，那么这样作用域没有隔离，子组件中的 data 属性值会相互影响。\n\n如果组件中 data 选项是一个函数，那么每个实例可以维护一份被返回对象的独立的拷贝，组件实例之间的 data 属性值不会互相影响。\n\n而 new Vue 的实例，是不会被复用的，因此不存在引用对象的问题。\n")])])]),t("h3",{attrs:{id:"vue单文件组件模板为什么只能有一个根元素"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#vue单文件组件模板为什么只能有一个根元素"}},[e._v("#")]),e._v(" Vue单文件组件模板为什么只能有一个根元素")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v("先认识一下 `template`\n\n> `HTML`内容模板 `<template>` 元素是一种用于保存客户端内容机制，该内容在加载页面时不会呈现，但随后可以在运行时使用`JavaScript`实例化。将模板视为一个内容片段，存储在文档中供后续使用。虽然解析器在加载页面时确实会处理 `<template>` 元素的内容，但这样做只是为了确保这些内容有效；然而，元素的内容不会被呈现。\n\n因一个`.vue`单文件组件是一个vue实例，那么此组件下的唯一根节点（根元素）即为Vue实例的根入口。\n\nvue实例通过这个根节点来递归遍历整个Vue `DOM Tree`下的所有节点，并处理为`vDom`，最后再渲染成真正的HTML，插入到文档的正确位置。\n")])])]),t("h3",{attrs:{id:"scoped-style"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#scoped-style"}},[e._v("#")]),e._v(" Scoped Style")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v("vue中的scoped属性的效果主要通过PostCSS转译实现。\n\nPostCSS给一个组件中的所有dom添加了一个独一无二的动态属性。然后给CSS选择器额外添加一个对应的属性选择器来选择该组件中dom，这种做法使得样式只作用于含有该属性的dom——组件内部dom。\n\n深度选择器: css: `.a >>> .b { color: #333; }`, sass/less: `/deep/ .b { color: #333; }`\n")])])]),t("h3",{attrs:{id:"依赖注入-provide-inject"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#依赖注入-provide-inject"}},[e._v("#")]),e._v(" 依赖注入 (provide & inject)")]),e._v(" "),t("p",[e._v("用途：在任意后代子孙组件中访问顶层父组件的方法或属性，"),t("code",[e._v("但是所提供的 property 是非响应式的")]),e._v("。可以把依赖注入看作一部分“大范围有效的 prop”，除了：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v("- 祖先组件不需要知道哪些后代组件使用它提供的 property\n- 后代组件不需要知道被注入的 property 来自哪里\n\n```js\n// 父组件\ndata() {\n  return { count: 1 };\n}\nprovide() {\n  return { count: this.count, sayHi: this.sayHi }\n},\nmethods: {\n  sayHi () {\n    this.count += 1;\n  }\n}\n\n// 子组件\ninject: [ 'count', 'sayHi' ] // count\ncreated() {\n  this.sayHi(); // 适用于通用的数据请求\n  console.log(this.count); // 1 不会响应更新, 始终为初始值。没意义\n}\n```\n")])])]),t("h3",{attrs:{id:"keepalive-动态组件缓存"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#keepalive-动态组件缓存"}},[e._v("#")]),e._v(" keepAlive 动态组件缓存")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v('```html\n<template>\n  <div id="app">\n    <keep-alive :include="keepAliveList">\n      <router-view></router-view>\n    </keep-alive>\n  </div>\n</template>\n```\n场景：父组件缓存，子组件缓存，tab切换\n\nactivated执行顺序：首次加载，父组件 > 子组件；其它：父组件 < 子组件  `<child @hook:activated="handleChildActivated"></child>`\n\nsolution A: 离开已缓存父组件时 `vm.$store.commit(\'updateKeepAliveListAction\', data);` 动态修改需缓存的组件列表keepAliveList，模拟需求场景首次进入父组件  \nsolution B: this.$children.init();\n\nwatch: 子组件更新业务写进watch，否组通信易出错\n\nbeforeRouteLeave：清除定时器等业务写进beforeRouteLeave, beforeDestory不会触发\n')])])]),t("h3",{attrs:{id:"vue-eventbus"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#vue-eventbus"}},[e._v("#")]),e._v(" Vue EventBus")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v("```js\nclass Bus {\n  constructor () {\n    super(); // 调用父类的constructor方法\n    this.callbacks = {};\n  },\n  $on (name, fn) {\n    this.callbacks[name] = this.callbacks[name] || [];\n    this.callbacks[name].push(fn);\n  },\n  $emit (name, args) {\n    this.callbacks[name] && this.callbacks[name].forEach(cb => cb(args));\n  },\n  $off (name) {\n    this.callbacks[name] = [];\n  }\n}\n// typeof Bus === 'function'\n\n// main.js\n// Vue.prototype.$EventBus = new Bus();\n// this.$EventBus.$on('foo', cb);\n// this.$EventBus.$emit('foo', {});\n```\n")])])]),t("h3",{attrs:{id:"程序化的事件侦听器"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#程序化的事件侦听器"}},[e._v("#")]),e._v(" "),t("a",{attrs:{href:"https://cn.vuejs.org/v2/guide/components-edge-cases.html#%E7%A8%8B%E5%BA%8F%E5%8C%96%E7%9A%84%E4%BA%8B%E4%BB%B6%E4%BE%A6%E5%90%AC%E5%99%A8",target:"_blank",rel:"noopener noreferrer"}},[e._v("程序化的事件侦听器"),t("OutboundLink")],1)]),e._v(" "),t("p",[t("code",[e._v("$on(eventName, eventHandler)")]),e._v(" 侦听一个事件")]),e._v(" "),t("p",[t("code",[e._v("$once(eventName, eventHandler)")]),e._v(" 一次性侦听一个事件")]),e._v(" "),t("p",[t("code",[e._v("$off(eventName, eventHandler)")]),e._v(" 停止侦听一个事件")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v("v-on 侦听 $emit\n\n优势：首先不用在当前实例下挂载一个额外的属性，其次可以封装为一个方法，复用更方便。\n\n- 生命周期hook还可以用在子组件上 `<child @hook:created=\"handleChildCreated\"></child>`\n\n```js\nmounted () {\n  // 一次性侦听一个事件\n  // 组件销毁时清除定时器\n  let timer = setInterval(() => {\n    this.num++;\n  }, 30000);\n  this.$once('hook:beforeDestory', function () {\n    timer && clearInterval(timer);\n  });\n}\n```\n")])])]),t("h3",{attrs:{id:"pieces"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#pieces"}},[e._v("#")]),e._v(" Pieces")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v("(1) `this.$data`获取组件当前data；`this.$options.data()`获取组件初始化时的data。\n\n(2) `this.$nextTick` 替换成 setTimeout(fn, 20) 也是可以的（20 ms 是一个经验值，每一个 Tick 约为 17 ms），对用户体验而言都是无感知的。\n\n(3) `v-for` 遍历必须为 item 添加 key, 且避免同时使用 v-if, 优先级: v-for > v-if\n\nkey function: 标识vNode唯一性, 加快dom diff算法更新速度\n\n处理方法: (1) computed 修饰循环数组 (2) v-if在v-for上一层使用\n\n(4) 长列表性能优化 - 切断响应式更新\n\nVue 会通过 `Object.defineProperty` 对数据进行劫持来实现视图响应数据的变化，然而有些时候我们的组件就是纯粹的数据展示，不会有任何改变，就不需要 Vue 来劫持我们的数据。\n\n在大量数据展示的情况下，这能够很明显的减少组件初始化的时间，通过 `Object.freeze` 方法来冻结一个对象，一旦被冻结的对象就再也不能被修改了。\n\n(5) 在Vue的beforeDestory hook中通过document.querySelector()无法获取DOM元素，无法取消事件监听器。\n\nsolution: 不使用原生API，使用vm.$refs['refName']查找元素，清除事件监听器。`beforeDestory hook`中的`this`仍指向当前组件实例。\n\n(6) [vue-slim-better-scroll](https://wannaxiao.github.io/vue-slim-better-scroll/docs/dist/)\n\n基于better-scroll, 路由组件 keepalive 不会记录滚动位置。\n\nsolution: 修改router/index.js，route map 目标组件`meta`增加`top`属性，记录当前组件需滚动的像素值。\n")])])])])}),[],!1,null,null,null);t.default=s.exports}}]);