---
title: 基本问题
date: 2019-08-24
categories:
 - Vue2
---

<!-- more -->



### 为什么在 HTML 中监听事件？

    你可能注意到这种事件监听的方式违背了关注点分离 (separation of concern) 这个长期以来的优良传统。但不必担心，因为所有的 Vue.js 事件处理方法和表达式都严格绑定在当前视图的 ViewModel 上，它不会导致任何维护上的困难。实际上，使用 `v-on` 有几个好处：

    - 扫一眼 HTML 模板便能轻松定位在 JavaScript 代码里对应的方法。

    - 因为你无须在 JavaScript 里手动绑定事件，你的 ViewModel 代码可以是非常纯粹的逻辑，和 DOM 完全解耦，更易于测试。

    - 当一个 ViewModel 被销毁时，所有的事件处理器都会自动被删除。你无须担心如何清理它们。



### Vue data为什么是一个函数？
  
    因为组件是用来复用的，且JS对象是引用关系。如果组件中 data 是一个对象，那么这样作用域没有隔离，子组件中的 data 属性值会相互影响。

    如果组件中 data 选项是一个函数，那么每个实例可以维护一份被返回对象的独立的拷贝，组件实例之间的 data 属性值不会互相影响。

    而 new Vue 的实例，是不会被复用的，因此不存在引用对象的问题。



### Vue单文件组件模板为什么只能有一个根元素

    先认识一下 `template`

    > `HTML`内容模板 `<template>` 元素是一种用于保存客户端内容机制，该内容在加载页面时不会呈现，但随后可以在运行时使用`JavaScript`实例化。将模板视为一个内容片段，存储在文档中供后续使用。虽然解析器在加载页面时确实会处理 `<template>` 元素的内容，但这样做只是为了确保这些内容有效；然而，元素的内容不会被呈现。

    因一个`.vue`单文件组件是一个vue实例，那么此组件下的唯一根节点（根元素）即为Vue实例的根入口。

    vue实例通过这个根节点来递归遍历整个Vue `DOM Tree`下的所有节点，并处理为`vDom`，最后再渲染成真正的HTML，插入到文档的正确位置。



### Scoped Style

    vue中的scoped属性的效果主要通过PostCSS转译实现。

    PostCSS给一个组件中的所有dom添加了一个独一无二的动态属性。然后给CSS选择器额外添加一个对应的属性选择器来选择该组件中dom，这种做法使得样式只作用于含有该属性的dom——组件内部dom。

    深度选择器: css: `.a >>> .b { color: #333; }`, sass/less: `/deep/ .b { color: #333; }`



### 依赖注入 (provide & inject)

  用途：在任意后代子孙组件中访问顶层父组件的方法或属性，`但是所提供的 property 是非响应式的`。可以把依赖注入看作一部分“大范围有效的 prop”，除了：

    - 祖先组件不需要知道哪些后代组件使用它提供的 property
    - 后代组件不需要知道被注入的 property 来自哪里
    
    ```js
    // 父组件
    data() {
      return { count: 1 };
    }
    provide() {
      return { count: this.count, sayHi: this.sayHi }
    },
    methods: {
      sayHi () {
        this.count += 1;
      }
    }

    // 子组件
    inject: [ 'count', 'sayHi' ] // count
    created() {
      this.sayHi(); // 适用于通用的数据请求
      console.log(this.count); // 1 不会响应更新, 始终为初始值。没意义
    }
    ```

### keepAlive 动态组件缓存

    ```html
    <template>
      <div id="app">
        <keep-alive :include="keepAliveList">
          <router-view></router-view>
        </keep-alive>
      </div>
    </template>
    ```
    场景：父组件缓存，子组件缓存，tab切换

    activated执行顺序：首次加载，父组件 > 子组件；其它：父组件 < 子组件  `<child @hook:activated="handleChildActivated"></child>`

    solution A: 离开已缓存父组件时 `vm.$store.commit('updateKeepAliveListAction', data);` 动态修改需缓存的组件列表keepAliveList，模拟需求场景首次进入父组件  
    solution B: this.$children.init();

    watch: 子组件更新业务写进watch，否组通信易出错

    beforeRouteLeave：清除定时器等业务写进beforeRouteLeave, beforeDestory不会触发



### Vue EventBus

    ```js
    class Bus {
      constructor () {
        super(); // 调用父类的constructor方法
        this.callbacks = {};
      },
      $on (name, fn) {
        this.callbacks[name] = this.callbacks[name] || [];
        this.callbacks[name].push(fn);
      },
      $emit (name, args) {
        this.callbacks[name] && this.callbacks[name].forEach(cb => cb(args));
      },
      $off (name) {
        this.callbacks[name] = [];
      }
    }
    // typeof Bus === 'function'

    // main.js
    // Vue.prototype.$EventBus = new Bus();
    // this.$EventBus.$on('foo', cb);
    // this.$EventBus.$emit('foo', {});
    ```

### [程序化的事件侦听器](https://cn.vuejs.org/v2/guide/components-edge-cases.html#%E7%A8%8B%E5%BA%8F%E5%8C%96%E7%9A%84%E4%BA%8B%E4%BB%B6%E4%BE%A6%E5%90%AC%E5%99%A8)

  `$on(eventName, eventHandler)` 侦听一个事件

  `$once(eventName, eventHandler)` 一次性侦听一个事件

  `$off(eventName, eventHandler)` 停止侦听一个事件

    v-on 侦听 $emit

    优势：首先不用在当前实例下挂载一个额外的属性，其次可以封装为一个方法，复用更方便。

    - 生命周期hook还可以用在子组件上 `<child @hook:created="handleChildCreated"></child>`

    ```js
    mounted () {
      // 一次性侦听一个事件
      // 组件销毁时清除定时器
      let timer = setInterval(() => {
        this.num++;
      }, 30000);
      this.$once('hook:beforeDestory', function () {
        timer && clearInterval(timer);
      });
    }
    ```

### Pieces
  
    (1) `this.$data`获取组件当前data；`this.$options.data()`获取组件初始化时的data。

    (2) `this.$nextTick` 替换成 setTimeout(fn, 20) 也是可以的（20 ms 是一个经验值，每一个 Tick 约为 17 ms），对用户体验而言都是无感知的。

    (3) `v-for` 遍历必须为 item 添加 key, 且避免同时使用 v-if, 优先级: v-for > v-if

    key function: 标识vNode唯一性, 加快dom diff算法更新速度

    处理方法: (1) computed 修饰循环数组 (2) v-if在v-for上一层使用

    (4) 长列表性能优化 - 切断响应式更新

    Vue 会通过 `Object.defineProperty` 对数据进行劫持来实现视图响应数据的变化，然而有些时候我们的组件就是纯粹的数据展示，不会有任何改变，就不需要 Vue 来劫持我们的数据。

    在大量数据展示的情况下，这能够很明显的减少组件初始化的时间，通过 `Object.freeze` 方法来冻结一个对象，一旦被冻结的对象就再也不能被修改了。

    (5) 在Vue的beforeDestory hook中通过document.querySelector()无法获取DOM元素，无法取消事件监听器。

    solution: 不使用原生API，使用vm.$refs['refName']查找元素，清除事件监听器。`beforeDestory hook`中的`this`仍指向当前组件实例。

    (6) [vue-slim-better-scroll](https://wannaxiao.github.io/vue-slim-better-scroll/docs/dist/)

    基于better-scroll, 路由组件 keepalive 不会记录滚动位置。

    solution: 修改router/index.js，route map 目标组件`meta`增加`top`属性，记录当前组件需滚动的像素值。
