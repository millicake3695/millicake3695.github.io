const path = require('path');

module.exports = {
  base: '/', // 必须 静态资源访问
  cache: false, // 每次构建前删除cache
  title: '有药',  // 设置网站标题
  description : 'Welcome to millicake3695‘s blog',
  theme: 'reco',
  configureWebpack: {
    resolve: {
      alias: {
        '@src': path.resolve(__dirname, '../src/')
      }
    }
  },
  plugins: {
    // '@vuepress/back-to-top': true, // 主题插件自带此功能
    // '@vssue/vuepress-plugin-vssue': { // @vssue/vuepress-plugin-vssue
    //   platfrom: 'github', // 对应 @vssue/api-github-v3
    //   locale: 'zh',
    //   owner: 'millicake3695',
    //   repo: 'millicake3695.github.io',
    //   clientId: '',
    //   clientSecret: '',
    //   autoCreateIssue: false
    // }
  },
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }], // favicon
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
    // ['script', { src: 'demo.js' }]
  ],
  markdown: {
    lineNumbers: true // 使代码块显示行数标记
  },
  themeConfig : {
    logo: '/logo.png',
    author: '有药',
    authorAvatar: '/logo.png',
    type: 'blog',
    noFoundPageByTencent: false,
    subSidebar: 'auto',
    // 评论插件
    valineConfig: {
      appId: 'ls7AKbeCh9jeP641deUKEJBU-gzGzoHsz', // your appId
      appKey: 'QLcPr42wN4cgnX2i29bopMD8', // your appKey
      placeholder: '写点什么...',
      meta: ['nick','mail'], // ['nick','mail','link'] 默认值
      recordIP: true, // 评论者ip
      visitor: true, // 文章访问量统计
      requiredFields: ['nick'], // 必填项
      showComment: true
    },
    // 分类和标签
    blogConfig: {
      category: {
        location: 2, // 在导航栏菜单中所占的位置，默认2
        text: '分类' // 默认文案
      },
      tag: {
        location: 3,     // 在导航栏菜单中所占的位置，默认3
        text: '标签'      // 默认文案 “标签”
      }
    },
    nav : [
      { text: '博客入门', link: '/vuepress' },
      {
        text: 'ES6',
        target: '_blank',
        items: [
          { text: '入门教程', link: 'https://es6.ruanyifeng.com/' },
          { text: 'JavaScript 教程', link: 'https://wangdoc.com/javascript/' },
        ]
      },
      { text: 'GitHub', link: 'https://github.com/millicake3695/millicake3695.github.io', target: '_blank', icon: 'reco-github' }
    ],
    // 指定 type=blog 后，无需显示指定 sidebar
    // sidebar: [
    //   {
    //     title: 'VuePress',
    //     path: '/vuepress',
    //     // sidebarDepth: 2 // 0禁用标题链接；1默认值,只显示h2的标题；2提取h2和h3标题
    //     collapsable: false, // 可选的, 默认值 true, 让一个组永远都是展开状态
    //   },
    //   {
    //     title: 'Daily',
    //     collapsable: false,
    //     children: [
    //       '/daily/'
    //     ]
    //   },
    //   {
    //     title: 'Tools',
    //     collapsable: false,
    //     children: [
    //       '/tools/git'
    //       '/tools/axios',
    //     ]
    //   },
    //   {
    //     title: 'Front-End',
    //     collapsable: false,
    //     children: [
    //       '/frontend/noun',
    //       '/frontend/css',
    //       '/frontend/mobile',
    //       'frontend/exportExcel',
    //       'frontend/regularExpressions',
    //       'frontend/sensitiveword',
    //       'frontend/h5scroll',
    //       'frontend/webpack',
    //     ]
    //   },
    //   {
    //     title: 'Vue2',
    //     collapsable: false,
    //     children: [
    //       '/vue2/',
    //       '/vue2/lifeCycleHooks',
    //       '/vue2/modifier',
    //       '/vue2/mustache',
    //       '/vue2/router',
    //       '/vue2/slot'
    //     ] // 绝对路径
    //   },
    //   {
    //     title: 'Vue3',
    //     collapsable: false,
    //     children: [
    //       '/vue3/'
    //     ]
    //   },
    //   {
    //     title: 'Back-End',
    //     collapsable: false,
    //     children: [
    //       '/backend/ip',
    //       '/backend/redis',
    //       '/backend/sql',
    //     ]
    //   },
    // ],
    lastUpdated: '上次更新'
  }
}
