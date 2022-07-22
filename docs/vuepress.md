---
title: blog 入门
date: 2020-07-17
categories:
 - blog
tags:
 - blog
---

### 背景

使用 `VuePress` + `Github Actions` 搭建一个个人博客，记录日常琐事或开发技术积累。

### 参考

- [VuePress 中文文档](https://www.vuepress.cn/)

- [GitHub Actions 入门教程](https://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)

### 基本配置

::: warning
`node` 版本需要12以上，版本不符合要求会导致 `vuepress` 模块安装失败。另外，windows平台升级 `node` 只能通过官网下载目标版本重新安装的方式。
:::

构建的核心基本就是 `docs/.vuepress/` 目录下的 `config.js`，是配置文件的入口文件。


以下列出几点在配置过程中容易踩坑的点～

1.  `base`

是部署站点的基础路径。

如果要将网站部署到 `https://owner.github.io`，那么 `base` 应该被设置成 `"/"`（或者不设置，此为默认值），它的值应当总是以斜杠开始，并以斜杠结束。

如果部署到 `https://owner.github.io/home/`，那么 `base` 就应该被设置成 `/home/`。否则会导致 `css`、图片等静态资源无法被正确加载。

`base` 将会作为前缀自动地插入到所有以 `/` 开始的其他选项的链接中，因此只需要指定一次。

2. `themeConfig.sidebar`

`themeConfig` 可以为当前的主题提供一些配置，这些选项依赖于你正在使用的主题。

因本 blog 暂时采用的是默认主题，因此此处讨论的是关于修改默认的主题配置。

按照 `VuePress` 官网文档修改侧边栏分组的配置，关键在于 `children` 下的值使用的是 `绝对路径`，而不是 `相对路径`。如 `"/"`指向根目录下的 `README.md`，而`"/foo/bar"`则是指向 `foo` 目录下的 `bar.md`。

3. 侧边栏的标题自动抓取的是对应 `.md` 文件的 `h2`、`h3` 标题，如果没有，默认显示 `文件路径.html`。

::: tip
`github Pages` 可以被认为是用户编写的、托管在 github 上的静态网页。`github Actions` 可以理解为持续集成过程中的某个操作，比如抓取代码、运行测试、登录远程服务器，发布到第三方服务等等。要使用 github Actions 配套的自动构建发布功能，仓库需要包含 GitHub Actions 的配置文件（workflow 文件），存放在仓库的 `.github/workflows` 目录。workflow 文件采用 YAML 格式，文件名可以任意取，但是后缀名统一为 `.yml`，比如 `foo.yml`。一个库可以有多个 workflow 文件。GitHub 只要发现 .github/workflows 目录里面有 .yml 文件，就会自动运行该文件。
:::

4. 关于 `JamesIves/github-pages-deploy-action@releases/v3` 这个 action 中 `FOLDER` 的取值，应该为绝对路径。由于 vuepress 默认的打包文件路径为 `.vuepress/dist`，因此这里应该对应修改为 `docs/.vuepress/dist`。如果你在 vuepress 的配置文件中修改了默认打包路径（配置项为 `dest`），那么这里也需要对应修改。

5. ~~评论功能使用的是`github`提供的`OAuth API`搭配评论插件`Vssue`，将评论存储在`github Issue`系统中，并在当前页面展示。~~

    :::details
    因评论功能在github授权登录重定向至评论页面时，一直初始化失败，无赖放弃。

    `https://cors-anywhere.azm.workers.dev/https://github.com/login/oauth/access_token` 请求失败

    依赖包：  
    `@vssue/vuepress-plugin-vssue`  
    `@vssue/api-github-v3`  

    [Vssue 官网](https://vssue.js.org/zh/)
    :::

6. 使用 `vuepress-theme-reco` 主题内集成的评论功能 `Valine`。侧边栏需显示声明。

    :::warning
    从 1.5.6 之后，主题将原有的侧边栏的中的多级标题移出，生成子侧边栏，放在页面的右侧。左边的侧边栏只有在自定义的侧边栏时才会出现，用于展示多篇文章的集合，而子侧边栏专注于当前文章的多级标题。
    :::

    [vuepress-theme-reco](https://vuepress-reco-doc.vercel.app/)

    [Valine](https://valine.js.org/)

7. 自动构建发布报错

  ```bash
  > ***.github.io@1.0.0 build
  > vuepress build docs
  /home/runner/work/***.github.io/***.github.io/node_modules/vue-server-renderer/index.js:8
    throw new Error(
    ^
  Error: 
  Vue packages version mismatch:
  - vue@2.7.8
  - vue-server-renderer@2.7.4
  This may cause things to work incorrectly. Make sure to use the same version for both.
  ```

  解决方案：delete lock file and node_modules foler, and then run `yarn`

  [related issue](https://github.com/nuxt/nuxt.js/issues/6823)

### 其它

  [Emoji](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json)

<!-- <comm-header /> -->
<!-- <comm-button /> -->

<!-- <el-button type="warning" size="medium">这是警告</el-button> -->
