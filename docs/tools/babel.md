---
title: babel介绍
categories:
 - Tools
tags:
 - babel
color: black
---


### [babel](https://www.babeljs.cn/docs/)

Babel 是一个工具链，主要用于将采用 ECMAScript 2015+ 语法编写的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。

主要功能：

1. 语法转换
2. 通过 Polyfill 方式在目标环境中添加缺失的特性 （通过引入第三方 polyfill 模块，例如 core-js）
3. 源码转换
4. ...


### @babel/core

Babel 的核心功能包含在 @babel/core 模块中。


### @babel/preset-env

如果不进行任何配置，该预设所包含的插件将支持所有最新的 JavaScript （ES2015、ES2016 等）特性。

preset-env `useBuiltIns` 设置为 `usage` 将自动对我们所使用的并且目标浏览器中缺失的功能进行代码转换和加载 polyfill (无需显示引入 @babel/polyfill)。

否则的话，必须在所有代码之前(entry point)利用 require 加载一次完整的 polyfill:

```js
// As of Babel 7.4.0, @babel/polyfill has been deprecated in favor of directly including core-js/stable
// (to polyfill ECMAScript features):
import "core-js/stable";
```

### @babel/polyfill

包含 core-js 和一个自定义的 regenerator runtime 来模拟完整的 ES2015+ 环境。

缺点：对全局范围（global scope）造成污染

:::warning
注意，使用 `--save` 参数安装而不是 `--save-dev`，因为这是一个需要在源码之前运行的 polyfill。
:::

:::tip
With webpack, there are multiple ways to include the polyfills:

  When used alongside @babel/preset-env,

  * If `useBuiltIns: 'usage'` is specified in `.babelrc` then do not include `@babel/polyfill` in either `webpack.config.js` entry array nor source. Note, `@babel/polyfill` still needs to be installed.

  * If `useBuiltIns: 'entry'` is specified in `.babelrc` then include `@babel/polyfill` at the top of the **entry point** to your application via `require` or `import` as discussed above.

  * If `useBuiltIns` key is not specified or it is explicitly set with `useBuiltIns: false` in your `.babelrc`, add `@babel/polyfill` directly to the entry array in your `webpack.config.js`.

  ```js
  module.exports = {
    entry: ["@babel/polyfill", "./app/js"],
  };
  ```

If `@babel/preset-env` is not used then add `@babel/polyfill` to webpack entry array as discussed above. It can still be added at the top of the entry point to application via import or require, but **this is not recommended**.
:::

### [@babel/plugin-transform-runtime](https://www.babeljs.cn/docs/babel-plugin-transform-runtime)

把注入的代码和 core-js 全局引入的代码转换成从 @babel/runtime-corejs3 中引入的形式，解决 corejs 的重复注入和全局引入 polyfill 的两个问题。

babel 插件和 preset 生效的顺序：先插件后 preset，插件从左往右，preset 从右往左。

新问题：通过 @babel/plugin-transform-runtime 提前把 polyfill 转换了，但是这个插件里没有按需转换的设置项 - targets，那就会多做一些没必要的转换。


总结：

babel7 以后，只需要使用 `@babel/preset-env` 指定目标环境的 `targets`，babel 就会根据内部的兼容性数据库查询出该环境不支持的语法和 api，进行对应插件的引入，从而实现按需的语法转换和 polyfill 引入。

但是 `@babel/preset-env` 转换用到的一些辅助代码（helper）是直接注入到模块里的，没有做抽离，多个模块可能会重复注入。并且用到的 polyfill 代码也是全局引入的，可能污染全局环境。为了解决这两个问题，可以使用 `@babel/plugin-transform-runtime` 插件来把注入的代码抽离，把全局的引入改为从 `@babel/runtime-corejs3` 引入的方式。

runtime 包包含 `core-js`、`regenerator`、`helper` 三部分。

`@babel/plugin-transform-runtime` 能生效的原理是因为插件先于 preset 被调用，提前把那些 api 做了转换，并且设置了 preset-env 生成 helper 的方式。

但是这个转换和 preset-env 是独立的，它没有 targets 的配置，这就导致了不能按需 polyfill，会进行一些不必要的转换。这个是已知的 issue，等 babel 版本更新 fix。
