## Vue-Router

### 完整的导航解析流程

1. 导航被触发。  
2. 在失活的组件里调用 beforeRouteLeave 守卫。  
3. 调用全局的 beforeEach 守卫。  
4. 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。  
5. 在路由配置里调用 beforeEnter。  
6. 解析异步路由组件。  
7. 在被激活的组件里调用 beforeRouteEnter。  
8. 调用全局的 beforeResolve 守卫 (2.5+)。  
9. 导航被确认。  
10. 调用全局的 afterEach 钩子。  
11. 触发 DOM 更新。  
12. 调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。  

:::tip
1. 路由守卫

  全局守卫：beforeEach、beforeResolve、afterEach  
  路由独有守卫：beforeEnter  
  组件内守卫：beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave

2. 参数或查询的改变并不会触发进入/离开的导航守卫。你可以通过 [观察 $route 对象](https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html#%E5%93%8D%E5%BA%94%E8%B7%AF%E7%94%B1%E5%8F%82%E6%95%B0%E7%9A%84%E5%8F%98%E5%8C%96) 来应对这些变化，或使用 beforeRouteUpdate 的组件内守卫。
:::


### Vue Router 组件

```html
<router-link :to="/index"></router-link>
<router-view></router-view>
<keep-alive></keep-alive>
```

### Vue 路由懒加载的三种方式

1. vue 异步组件按需加载方式
```js
const login = resolve => require(['@/auth/login.vue'], resolve);
```

2. ES6 按需加载
```js
const login = () => import(/* webpackChunkName: "login" */ '@/auth/login.vue');
```

3. vue+webpack 按需加载 可通过参数中的 webpackChunkName 将 js 分开打包
```js
const login = resolve => require.ensure([], () => resolve(require('@/auth/login.vue')), 'login');
```
