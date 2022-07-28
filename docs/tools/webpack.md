---
title: webpack相关
categories:
 - Tools
tags:
 - webpack
---

<!-- more -->



## 概念

[webpack 5 官网](https://webpack.docschina.org/)

webpack 5 运行于 Node.js v10.13.0+ 的版本。

webpack 遵循 CommonJS 模块规范。

如果不生成配置文件，webpack会按照默认配置去打包(> v4.0.0)，默认配置文件名为 `webpack.config.js` ，也可以自定义修改(`--config`)：

```bash
# 建议根据项目安装而不是全局安装
# 安装 webpack-cli 是为了在命令行工具中可以正确地执行命令行工具
yarn add webpack webpack-cli webpack-dev-server -D

# 自定义配置并且修改默认配置名字
# 需要 npm v5.2.0+
npx webpack --config my-webpack-config.js
```

:::tip
本质上，webpack 是一个用于现代 JavaScript 应用程序的 **静态模块打包工具**。当 webpack 处理应用程序时，它会在内部从一个或多个入口点构建一个依赖图(dependency graph)，然后将你项目中所需的每一个模块组合成一个或多个 bundles，它们均为静态资源，用于展示你的内容。

**从 v4.0.0 开始，webpack 可以不用再引入一个配置文件来打包项目**。
:::

---


### 入口(entry)

指示 webpack 构建内部依赖图的起始模块。默认值是 `./src/index.js`，但可以在 webpack configuration 中配置 entry 属性，来指定一个（或多个）不同的入口起点。

单个入口（简写）语法：`entry: string | [string]`

对象语法(最可扩展的方式): `entry: { <entryChunkName> string | [string] } | {}`

:::tip
1. 当通过插件生成入口时，可以传递空对象 {} 给 entry。  
2. “webpack 配置的可扩展” 是指，这些配置可以重复使用，并且可以与其他配置组合使用。这是一种流行的技术，用于将关注点从环境(environment)、构建目标(build target)、运行时(runtime)中分离。然后使用专门的工具（如 webpack-merge）将它们合并起来。  
:::

<br/>

  **常见场景**

  (1) **分离 app(应用程序) 和 vendor(第三方库) 入口**
  ```js
  // webpack.config.js
  module.exports = {
    // 配置 2 个单独的入口点
    entry: {
      main: './src/app.js',
      // 在 vendor.js 中存入未做修改的必要 library 或文件（例如 Bootstrap, jQuery, 图片等），
      // 然后将它们打包在一起成为单独的 chunk。
      // 内容哈希保持不变，这使浏览器可以独立地缓存它们，从而减少了加载时间。
      vendor: './src/vendor.js'
    },
  };

  // webpack.prod.js
  module.exports = {
    output: {
      filename: '[name].[contenthash].bundle.js',
    },
  };

  // webpack.dev.js
  module.exports = {
    output: {
      filename: '[name].bundle.js',
    },
  };
  ```

  :::warning
  在 `webpack < 4` 的版本中，通常将 vendor 作为一个单独的入口起点添加到 entry 选项中，以将其编译为一个单独的文件（与 `CommonsChunkPlugin` 结合使用，见下文）。

  而在 `webpack 4` 中不鼓励这样做。而是使用 `optimization.splitChunks` 选项，将 vendor 和 app(应用程序) 模块分开，并为其创建一个单独的文件。不要为 vendor 或其他不是执行起点创建 entry。
  :::

  webpack 4 之前，使用 `CommonsChunkPlugin` 做分离。  
  我们把以下文件单独抽离出来打包：  
  1. node_modules 文件夹下的模块；  
  2. 被3个入口 chunk 共享的模块；  

  ```js
  module.exports = {
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
  }
  ```

  webpack 4 最大的改动就是废除了 `CommonsChunkPlugin` 引入了 `optimization.splitChunks`。mode 是 `production` 时 webpack4 会自动开启 [Code Splitting](https://webpack.docschina.org/guides/code-splitting/)。

  它内置的代码分割策略是这样的：  
  1. 新的 chunk 是否被共享或者是来自 node_modules 的模块；  
  2. 新的 chunk 体积在压缩之前是否大于 30kb；  
  3. 按需加载 chunk 的并发请求数量小于等于 5 个；  
  4. 页面初始加载时的并发请求数量小于等于 3 个；  

  :::warning
  尽管可以在 webpack 中允许每个页面使用多入口，仍应尽可能避免使用多入口的入口。推荐如下写法，如此在使用 async 脚本标签时，会有更好的优化以及一致的执行顺序。
  `entry: { app: ["babel-polyfill", "./src/main.js"] }`
  :::

  (2) **多页面应用程序**

  ```js
  // webpack.config.js
  module.exports = {
    // 搭配 `optimization.splitChunks` 为页面间共享的应用程序代码创建 bundle。
    // 由于入口起点数量的增多，多页应用能够复用多个入口起点之间的大量代码/模块。
    entry: {
      pageOne: './src/pageOne/index.js',
      pageTwo: './src/pageTwo/index.js',
      pageThree: './src/pageThree/index.js',
    },
  };
  ```

:::warning
模块永远不会被多次实例化 —— `ECMAScript 模块` 和 `CommonJS 模块` 都指定一个模块只能在每个 JavaScript 上下文中实例化一次。此保证允许将模块的顶级范围用于全局状态，并在该模块的所有使用中共享。[multi-entry](https://bundlers.tooling.report/code-splitting/multi-entry/#webpack)
:::

---



### 输出(output)

指示 webpack 如何命名和输出它所创建的 bundle。主要输出文件的默认值是 `./dist/main.js`，其他生成文件默认放置在 `./dist` 文件夹中。

<p class="red">注意，即使可以存在多个 entry 起点，但只能指定一个 output 配置。</p>

```js
module.exports = {
  entry: {
    app: './src/app.js',
    search: './src/search.js',
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist',
  },
};

// 写入到硬盘：./dist/app.js, ./dist/search.js
```

当通过多个入口起点(entry point)、代码拆分(code splitting)或各种插件(如 CommonsChunkPlugin)创建多个 bundle，则应该使用 **占位符(substitutions)** 来确保每个 bundle 具有唯一的名称。

:::warning
注意此选项被称为文件名，但还是可以使用像 `'js/[name]/bundle.js'` 这样的文件夹结构。

注意，此选项不会影响那些「按需加载 chunk」的输出文件。它只影响最初加载的输出文件。对于按需加载的 chunk 文件，请使用 `output.chunkFilename` 选项来控制输出。通过 loader 创建的文件也不受影响。在这种情况下，你必须尝试 loader 特定的可用选项。
:::

```js
// webpack.config.js
// 占位符
module.exports = {
  // 1. 使用入口名称
  output: {
    filename: '[name].bundle.js',
  },

  // 2. 使用内部 chunk id
  output: {
    filename: '[id].bundle.js',
  },

  // 3. 使用由生成的内容产生的 hash
  output: {
    filename: '[contenthash].bundle.js',
  },

  // 4. 结合多个替换组合
  output: {
    filename: '[name].[contenthash].bundle.js',
  },

  // 5. 使用函数返回 filename
  output: {
    filename: (pathData) => {
      return pathData.chunk.name === 'main' ? '[name].js' : '[name]/[name].js';
    },
  },
};
```

---



### [loader](https://webpack.docschina.org/loaders/)

loader 用于对模块的源代码进行转换，类似于其他构建工具中“任务(task)”。loader 让初始只能理解 JavaScript 和 JSON 文件的 webpack 能够去处理其他类型的文件，并将它们转换为有效模块以供应用程序使用，以及被添加到依赖图中。


在 webpack 的配置中，loader 有两个属性：

1. `test` 属性，识别出哪些文件会被转换。

2. `use` 属性，定义出在进行转换时，应该使用哪个 loader。


两种使用 loader 的方式：

1. **配置方式**（推荐）：在 `webpack.config.js` 文件中指定 loader。

2. **内联方式**：在 `import` 语句或任何[与"import"方法同等的引用方式](https://webpack.docschina.org/api/module-methods)中指定 loader。如 `require('script-loader!file-saver');`


<p class="red">loader 从右到左（或从下到上）地取值(evaluate)/执行(execute)。</p>

:::warning
1. 在 webpack 配置中定义 rules 时，要定义在 module.rules 而不是 rules 中。

2. 使用正则表达式匹配文件时，不要添加引号。比如 `/\.txt$/` 与 `'/\.txt$/'` 或 `"/\.txt$/"` 不一样。前者指示 webpack 匹配任何以 `.txt` 结尾的文件，后者指示 webpack 匹配具有绝对路径 `'.txt'` 的单个文件。
:::


**loader 特性**

* loader 支持链式调用。链中的每个 loader 会将转换应用在已处理过的资源上。一组链式的 loader 将按照相反的顺序执行。
* loader 可以是同步的，也可以是异步的。
* loader 运行在 Node.js 中，并且能够执行任何操作。
* loader 可以通过 options 对象配置
* 插件(plugin)可以为 loader 带来更多特性。
* loader 能够产生额外的任意文件。

通过 loader 的预处理函数，可以更加灵活地引入诸如压缩、打包、语言转译（或编译）等细粒度逻辑。

---



### [插件(plugin)](https://webpack.docschina.org/plugins/)

插件目的在于解决 loader 无法实现的其他事，包括打包优化，资源管理，注入环境变量等。webpack 提供了很多开箱即用的插件。

想要使用一个插件，只需要 `require()` 然后把它添加到 `plugins` 数组中。多数插件可以通过选项(option)自定义。你也可以在一个配置文件中因为不同目的而多次使用同一个插件，这时需要通过使用 `new` 操作符来创建一个插件实例。

webpack 插件是一个具有 `apply` 方法的 JavaScript 对象。`apply` 方法会被 webpack compiler 调用，并且在 整个编译生命周期都可以访问 compiler 对象。

* html-webpack-plugin: 打包后自动生成一个 html 文件，并把打包生成的 js 自动引入。

* clean-webpack-plugin: 打包前先清空打包目标文件夹的文件。

* sourceMap: 常用于定位代码错误位置。

    sourceMap 通过配置中的 devtool 去配置，参数的含义大概有以下几种情况：

    |devtool                |作用|
    |:--------------------- |:--|
    |source-map             |生成 map 文件，错误精确到行和列|
    |inline-source-map      |inline，不生成 map 文件，以 base64 形式嵌入js中，错误精确到行和列
    |cheap-source-map       |cheap，错误只精确到行，且只针对业务代码，不包括第三方模块|
    |cheap-module-source-map|cheap-module，错误只精确到行，且只针对业务代码，包括第三方模块|
    |eval-source-map        |eval，不生成 map 文件，在 js 中以 eval 方法的形式出现，但是复杂项目的提示是不全的|

    **最佳实践**

    1. develop：cheap-module-eval-source-map，提示比较全，打包速度快
    2. production：~~cheap-module-source-map，提示更全面，打包稍微慢~~，[禁用](https://webpack.docschina.org/guides/build-performance/#source-maps)

    :::warning
    避免在生产中使用 `inline-***` 和 `eval-***`，因为它们会增加 bundle 体积大小，并降低整体性能。
    :::

---



### 模式(mode)

通过选择 `development`, `production` 或 `none` 之中的一个来设置 `mode` 参数，以启用 webpack 内置在相应环境下的优化。其默认值为 production。

---



### 构建目标(Targets)

webpack 能够为多种环境或 target 构建编译。

`target: string [string] false`

告知 webpack 为目标(target)指定一个环境。默认值为 `"browserslist"`，如果没有找到 browserslist 的配置，则默认为 `"web"`。

---



```js
// 一个简单的配置如下
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); // 用于访问内置插件
const path = require('path');

module.exports = {
  target: 'web', // 可省略
  mode: 'production', // production：默认，生产环境，代码被压缩；development：开发环境，代码不压缩
  entry: './path/to/my/entry/file.js', // 单入口简写
  output: {
    publicPath: 'http://cdn.com.cn',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].chunk.js',
  },
  mode: 'production',
  module: {
    rules: [{ test: /\.txt$/, use: 'raw-loader' }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }) // 以index.html为模板生成一个 HTML 文件，并自动将生成的所有 bundle 注入到此文件中
  ], 
};
```

<br/>


## [术语表](https://webpack.docschina.org/glossary/)

<br />


## [命令行接口（CLI）](https://webpack.docschina.org/api/cli/a)

## 延伸阅读

* [使用 &lt;link rel="preload" /&gt; 预加载内容](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/preload)
  ```html
  <link rel="preload" href="style.css" as="style">
  <link rel="preload" href="main.js" as="script">
  ```

  Using as to specify the type of content to be preloaded allows the browser to:

  - Prioritize resource loading more accurately.
  - Store in the cache for future requests, reusing the resource if appropriate.
  - Apply the correct content security policy to the resource.
  - Set the correct Accept request headers for it.

* [创建并发布一个 library](https://webpack.docschina.org/guides/author-libraries/)

* [进程间通讯(IPC, inter process communication)]()

* [Dynamic Imports in Vue.js for better performance](https://vuedose.tips/dynamic-imports-in-vue-js-for-better-performance)

<br/>

:::tip
1.  webpack 在入口 chunk 中，包含了某些 boilerplate(引导模板)，特别是 runtime 和 manifest，这样就导致即使未改动任何内容，主输出文件 contenthash 也不一致。webpack 提供了一个优化功能，可使用 optimization.runtimeChunk 选项将 runtime 代码拆分为一个单独的 chunk。将其设置为 single 来为所有 chunk 创建一个 runtime bundle。
:::



