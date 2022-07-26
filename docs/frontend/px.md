---
title: 移动端px适配
categories:
 - frontEnd
tags:
 - mobile
---

<!-- more -->



最近发生了一件事情，UI 设计师用 ta 的 iPhone 13 Pro 审查 h5 项目的页面还原度时，发现大部分的页面元素尺寸、间距和字体大小都发生了偏移，一口气提了十几个 bug (一个页面提一个)，但是我在 iPhone X 上看显示正常，自己的 One Plus 9RT 也正常，那这是什么原因呢？嗯... 相信不少小伙伴一眼就看出来了这是什么问题。没错，这个问题的本质就是没有做不同手机屏幕尺寸的**适配**。

但是，正当我准备大干一场（其实安装一个 npm 包，加个配置就行）时，却发现原来代码里面已经有这个适配的配置，只是代码被注释了～:scream::scream::scream:，注释打开后本地运行检查元素，尺寸也由绝对像素转换为了 `vw`。

由于这个项目使用的并不是基础的 webpack + vue2 配置，所以看起来有一点不一样（但是核心内容一样）：

```js
// 内部封装的一个启动工具，对应这个 config.js
const path = require('path');

module.exports = {
  appName: '',
  serverName: '',
  publicPath: '/h5/',
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src')
      },
    },
  },
  css: {
    loaderOptions: {
      postcss: {
        // 这里就是核心配置啦
        plugins: [
          require('postcss-px-to-viewport')({
            viewportWidth: 375, // 设计稿视口宽度
            unitPrecision: 3,   // 转换后保留的小数位数
            viewportUnit: 'vw', // 视口单位
            selectorBlackList: ['.ignore'], // 无需转换的类名
            minPixelValue: 1,   // 最小转换值
            mediaQuery: false   // 媒体查询
          })
        ]
      }
    }
  }
};
```
<br/>

接下来还是介绍下目前使用的比较多的两种适配方式（均为 [postcss](https://www.postcss.com.cn/) 的 plugin），先上配置：

```js
// .postcssrc.js
module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {},
    // 需要搭配lib-flexible使用
    'postcss-pxtorem': {
      rootValue: 37.5, // 对应设计稿宽度 375px
      propList: ['*'],
      unitPrecision: 5,
      minPixelValue: 1,
      selectorBlackList: ['.van']
    },
    'postcss-px-to-viewport': {
      viewportWidth: 375, // 设计稿视口宽度，默认值为 320
      viewportUnit: 'vw',
      propList: ['*'],    // 能转化为vw的属性列表
      unitPrecision: 5,
      minPixelValue: 1,
      selectorBlackList: ['.ignore'],
      mediaQuery: false // 是否转换媒体查询中的 px
    }
  }
}
```

:::warning
1. 无论是 `postcss-px-to-viewport`，还是 `postcss-pxtorem`，均无法转换 行内样式！
2. `lib-flexible` 会为页面根据屏幕自动添加`<meta name='viewport'>`标签，同时自动设置 html 的 font-size 为屏幕宽度除以10，动态控制 initial-scale，maximum-scale，minimum-scale 等属性的值。如果有 `meta[name="viewport"]` 标签，lib-flexible 默认使用此标签。
:::

### [postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport)

```json
"postcss-loader": "2.1.6",
"postcss-px-to-viewport": "1.1.0",
```

来源于 `postcss-pxtorem`。**推荐首选**

忽略部分转换
```css
/* example input: */
.class {
  /* px-to-viewport-ignore-next */
  width: 10px;
  padding: 10px;
  height: 10px; /* px-to-viewport-ignore */
  border: solid 2px #000; /* px-to-viewport-ignore */
}

/* example output: */
.class {
  width: 10px;
  padding: 3.125vw;
  height: 10px;
  border: solid 2px #000;
}
```

<br/>

### [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem)

```json
"postcss-loader": "2.1.6",
"postcss-pxtorem": "6.0.0",
"lib-flexible": "0.3.2",
```

需要搭配 `lib-flexible` 修改根元素字体大小 使用。

仅转换 `font`, `font-size`, `line-height`, `letter-spacing`。不转换 `height`, `width`。

<span class="red">不推荐使用</span>

```js
// main.js
import 'lib-flexible/flexible';
```