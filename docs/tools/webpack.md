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
# 需要 npm v5.2.0+ 或 Node 8.2+
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
  // webpack v3
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

  ```js
  // webpack.config.js
  module.exports = {
      optimization: {
          splitChunks: { //分割代码块
              cacheGroups: {
                  vendor: {
                      //第三方依赖
                      priority: 1, //设置优先级，首先抽离第三方模块
                      name: 'vendor',
                      test: /node_modules/,
                      chunks: 'initial',
                      minSize: 0,
                      minChunks: 1 //最少引入了1次
                  },
                  //缓存组
                  common: {
                      //公共模块
                      chunks: 'initial',
                      name: 'common',
                      minSize: 100, //大小超过100个字节
                      minChunks: 3 //最少引入了3次
                  }
              }
          }
      }
  }
  ```

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

loader <span class="red">本质就是一个函数</span>，用于对模块的源代码进行转换，类似于其他构建工具中“任务(task)”。loader 让初始只能理解 JavaScript 和 JSON 文件的 webpack 能够去处理其他类型的文件，并将它们转换为有效模块以供应用程序使用，以及被添加到依赖图中。


在 webpack 的配置中，loader 有两个属性：

1. `test` 属性，识别出哪些文件会被转换。

2. `use` 属性，定义出在进行转换时，应该使用哪个 loader。其值可为 字符串、数组，数组的每一项可以是字符串、对象。


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


**常用loader**

* `raw-loader` : 加载文件原始内容(utf8)
* `file-loader` : 把文件输出到一个文件夹中，在代码中使用相对路径引用输出的文件（处理图片和字体）
* `url-loader` : 与 file-loader 类似，区别是可以设置一个阈值，大于阈值时交给 file-loader 处理，小于阈值时返回文件 base64 形式编码（处理图片和字体）
* `image-loader` : 加载并压缩图片文件
* `babel-loader` : 把 es6 转换成 es5
* `less-loader` : 把 less 代码转换成 css
* `css-loader` :  加载 css 文件并解析 import 的 css 文件，最终返回 css 代码，支持模块化、压缩、文件导入等特性
* `style-loader` : 动态创建 style 标签，将 css 插入到 head 中
* `postcss-loader` : 扩展 css 语法，使用下一代 css，可以配合 autoprefixer 插件自动补齐 CSS3 前缀，配合 postcss-px-to-viewport 插件转换 px 为 vw
* `eslint-loader` : 通过 eslint 检查 js 代码
* `vue-loader` : 加载并编译 Vue.js 单文件组件

---



### [插件(plugin)](https://webpack.docschina.org/plugins/)

插件目的在于解决 loader 无法实现的其他事，包括打包优化，资源管理，注入环境变量等。webpack 提供了很多开箱即用的插件。

想要使用一个插件，只需要 `require()` 然后把它添加到 `plugins` 数组中。多数插件可以通过选项(option)自定义。你也可以在一个配置文件中因为不同目的而多次使用同一个插件，这时需要通过使用 `new` 操作符来创建一个插件实例。

webpack 插件是一个具有 `apply` 方法的 JavaScript 对象。`apply` 方法会被 webpack compiler 调用，并且在 整个编译生命周期都可以访问 compiler 对象。

:::tip
plugin 基于事件流框架 `Tapable`，可以扩展 webpack 的功能。在 webpack 运行的生命周期中会广播出许多事件， plugin 可以监听这些事件，在合适的时机通过 webpack 提供的 API 改变输出结果。
:::

* html-webpack-plugin: 打包后自动生成一个 html 文件，并把打包生成的 js 自动引入。

* clean-webpack-plugin: 打包前先清空打包目标文件夹的文件。

* [terser-webpack-plugin](https://webpack.docschina.org/plugins/terser-webpack-plugin/): js多进程压缩和缓存。 webpack v5 默认开启， webpack v4 需手动安装 terser-webpack-plugin v4 版本。

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

修改的属性为 `process.env.NODE_ENV`。

**development**: 启用 `NamedChunksPlugin` 和 `NamedModulesPlugin`。

**production**: 启用 `FlagDependencyUsagePlugin`, `FlagIncludedChunksPlugin`, `ModuleConcatenationPlugin`, `NoEmitOnErrorsPlugin`, `OccurrenceOrderPlugin`, `SideEffectsFlagPlugin` 和 `UglifyJsPlugin`。

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
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[contenthash].chunk.js',
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' },
      {
        test: /\.(le|c)ss$/,
        use: [ 'style-loader', 'css-loader', {
          loader: 'postcss-loader',
          options: {
            plugins: function () {
              return [
                require('autoprefixer')({
                  overrideBrowserslist: [ '>0.25%', 'not dead' ]
                })
              ]
            }
          }
        }, 'less-loader' ],
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          // options 配置也可以写在 .babelrc 文件中
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              ['@babel/plugin-transform-runtime', { 'corjs': 3 }]
            ]
          }
        },
        include: [ path.resolve(__dirname, 'src') ]
      },
      {
        test: /\.vue$/,
        // 仅适用一个 loader 时
        loader: 'vue-loader',
        options: {
          loaders: {
            js: {
              loader: 'babel-loader',
              options: {
                presets: [
                  [ 'env', { targets: { browsers: pkg.browserslist } } ],
                  'stage-2',
                  'react'
                ]
              }
            }
          },
          postcss: [ autoprefixer({ browsers: pkg.browserslist }) ]
        }
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }) // 以index.html为模板生成一个 HTML 文件，并自动将生成的所有 bundle 注入到此文件中
  ], 
};
```

<br/>

## webpack 编译生命周期

1. 初始化参数

    从配置文件和 shell 语句中读取与合并参数，得到最终的参数

2. 开始编译

    初始化 compiler 对象，加载 plugin，执行对象的 run 方法

3. 确定入口

    依据 entry 找到所有入口文件

4. 编译模块

    从入口文件出发，递归调用 loader 对目标模块以及该模块依赖的模块进行解析，得到每个模块被编译后的最终内容以及它们之间的依赖关系

5. 输出资源

    根据入口和模块间的依赖关系，组装 chunk 后转换为单独的文件加入到输出列表。\[压缩\]

6. 输出完成

    将待输出的文件内容写入到 output 目标路径

## 文件指纹 (substitutions)

1. hash：和整个项目的构建相关，只要项目文件有修改，hash 值就会更改。

  (IMG)设置 file-loader 的 name，使用 hash。

2. chunkhash：和 Webpack 打包的 chunk 有关，不同的入口会生成不同的 chunkhash。

  (JS)用于设置 output 的 filename, chunkFilename。

3. contenthash：根据文件内容来定义的 hash，内容不变，则 contenthash 不变。

  (CSS)设置 MiniCssExtractPlugin 的 filename，使用 contenthash。

## webpack --watch

原理：轮询判断文件的最后编辑时间是否变化，如果某个文件发生了变化，并不会立刻告诉监听者，而是先缓存起来，等 aggregateTimeout 后再执行。

缺点：每次需要手动刷新浏览器。

```js
module.export = {
  watch: true, // 默认不开启
  // 只有开启监听模式时，watchOptions才有意义
  watchOptions: {
    ignored: /node_modules/, // 不监听的文件或者文件夹，支持正则匹配，默认为空
    aggregateTimeout: 300, // 监听到变化后的等待时间，默认300ms
    poll: 1000, // 轮询频率，默认每秒1000次
  }
}
```

## [常用术语](https://webpack.docschina.org/glossary/)

1. [Asset](https://webpack.docschina.org/guides/asset-management/): 资源是对图像、字体、媒体和任何其他类型文件的统称，通常用于网站和其他应用程序中。这些文件通常在 output 中最终输出为单独的文件，但也可以通过诸如 style-loader 或 url-loader 之类的方法内联。

2. **Bundle**: bundle 由许多不同的模块生成，包含已经经过加载和编译过程的源文件的最终版本。

3. **Bundle Splitting**: 这个过程提供了一种优化构建的方法，允许 webpack 为单个应用程序生成多个 bundle 文件。因此，可以将每个 bundle 文件与影响其他文件的更改进行分离，从而减少重新发布并由此被客户端重新下载的代码量，并且运用浏览器缓存。

4. **Chunk**: 此 webpack 特定术语在内部用于管理捆绑过程。输出束（bundle）由块组成，其中有几种类型（例如 entry 和 child ）。通常，块 直接与 输出束 (bundle）相对应，但是，有些配置不会产生一对一的关系。

5. [Code Splitting](https://webpack.docschina.org/guides/code-splitting/): 代码分离指将代码分成不同的包/块，然后可以按需加载，而不是加载包含所有内容的单个包。

6. **Configuration**: webpack 的配置文件是导出一个对象的 JavaScript 文件。 webpack 根据配置对象定义的属性进行解析。

7. **Dependency Graph**: 任何时候，一个文件依赖于另一个文件，webpack 就把此视为文件之间有 依赖关系 。从这些入口起点开始，webpack 递归地构建一个依赖图，这个依赖图包含着应用程序所需的每个模块。

8. **Entry Point**: 入口起点告诉 webpack 从哪里开始，并遵循着依赖图知道要打包哪些文件。您可以将应用程序的入口起点视为要捆绑的内容的 根上下文。

9. [Hot Module Replacement](https://webpack.docschina.org/concepts/hot-module-replacement) (HMR)：模块热替换功能会在应用程序运行过程中替换、添加或删除 模块，而无需重新加载整个页面。

    [Webpack HMR 原理解析](https://zhuanlan.zhihu.com/p/30669007)

10. **Loaders**: loader 用于对模块的源代码进行转换。loader 可以使你在 require() 或"加载"模块时预处理文件。类似于一个 “task-runner”。

11. [Lazy Loading](https://webpack.docschina.org/guides/lazy-loading): 对应用程序的部分（块）进行懒加载的过程。换句话说，只有我们在真正需要它们的时候才进行加载。

12. **Module**: Module 是离散功能块，相比于完整程序提供了更小的接触面。精心编写的模块提供了可靠的抽象和封装界限，使得应用程序中每个模块都具有条理清楚的设计和明确的目的。

13. [Module Resolution](https://webpack.docschina.org/concepts/module-resolution/)：一个模块可以作为另一个模块的依赖模块。resolver 是一个库(library)，用于帮助找到模块的绝对路径，并在 resolve.modules 中指定的所有目录中搜索该模块。

14. [Manifest](https://webpack.docschina.org/concepts/manifest): 当完成打包并发送到浏览器时，会在运行时通过 Manifest 来解析和加载模块。

15. **Output**: 配置项指定将编译的文件输出到磁盘的位置。注意：即使可以存在多个入口起点，但只指定一个输出配置。

16. **Plugin**: webpack 插件是一个具有 apply 属性的 JavaScript 对象。apply 属性会被 webpack compiler 调用，并且插件可在整个编译生命周期访问。这些包通常会以某种方式扩展编译功能。

17. [Request](https://webpack.docschina.org/guides/dependency-management/): 指在 require/import 语句中的表达式，如在 require("./template/" + name + ".ejs") 中的请求是 "./template/" + name + ".ejs" 。

18. [Shimming](https://webpack.docschina.org/guides/shimming/): 并非所有 JS 文件都可以直接与 webpack 一起使用。有些文件可能是不支持的模块格式，甚至不是任何模块格式。shimming(预置依赖) 这时就会发挥作用。

19. **Target**: 用户配置的部署目标 此处列出 用于为特定环境编译，如浏览器、 NodeJS 或 Electron。

20. [Tree Shaking](https://webpack.docschina.org/guides/tree-shaking/): 删除未使用/多余的代码，或者更准确地说，实时代码导入。像 webpack 这样的编译器将通过分析各种 import 语句和导入代码的使用情况，来确定实际使用了依赖项的哪些部分来实现这一点，删除那些没有使用的 “树” 的部分。

21. **Vendor Entry Point**: 从 app.js 和 vendors.js 开始创建依赖图。这些依赖图完全是分开且独立的，允许使用 CommonsChunkPlugin，并将应用程序包的任何供应商（vendor）引用提取到你的供应商包中。有助于在 webpack 中实现一种称为 [长期供应商缓存](https://webpack.docschina.org/guides/caching/) 的常见模式。

22. **webpack**: 一个用于现代 JavaScript 应用程序的高度可配置的 [module](https://webpack.docschina.org/concepts/modules) 打包工具。

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

* [带你深度解锁Webpack系列(优化篇)](https://juejin.cn/post/6844904093463347208)

<br/>

:::tip
1.  webpack 在入口 chunk 中，包含了某些 boilerplate(引导模板)，特别是 runtime 和 manifest，这样就导致即使未改动任何内容，主输出文件 contenthash 也不一致。webpack 提供了一个优化功能，可使用 optimization.runtimeChunk 选项将 runtime 代码拆分为一个单独的 chunk。将其设置为 single 来为所有 chunk 创建一个 runtime bundle。
:::



