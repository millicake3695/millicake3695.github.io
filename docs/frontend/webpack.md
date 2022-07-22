---
title: webpack相关
date: 2020-06-16
categories:
 - frontEnd
tags:
 - webpack
---

<!-- more -->



[webpack的异步加载原理及分包策略](https://segmentfault.com/a/1190000038180453)
webpack 4.x 版本之前，使用 CommonsChunkPlugin 做分离。
我们把以下文件单独抽离出来打包：
1. node_modules 文件夹下的模块；
2. 被3个入口 chunk 共享的模块；

```js
plugins: [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: function (module, count) {
      return (
        module.resource &&
        /.js$/.test(module.resource) &&
        module.resource.indexOf(path.join(__dirname, './node_modules')) === 0
      )
    },
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'common',
    chunks: 'initial',
    minChunks: 2,
  }),
]
```

webpack 4 最大的改动就是废除了 CommonsChunkPlugin 引入了 optimization.splitChunks。mode 是 production 时 webpack4 会自动开启 Code Splitting。

它内置的代码分割策略是这样的：
1. 新的 chunk 是否被共享或者是来自 node_modules 的模块；
2. 新的 chunk 体积在压缩之前是否大于 30kb；
3. 按需加载 chunk 的并发请求数量小于等于 5 个；
4. 页面初始加载时的并发请求数量小于等于 3 个；