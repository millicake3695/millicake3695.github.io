module.exports = {
  base: '/', // 必须 静态资源访问
  title: 'millicake3695',  // 设置网站标题
  description : 'millicake3695‘s blog',
  // evergreen: false, // 禁止 ESNext 到 ES5 的转译以及对 IE 的 polyfills，同时会带来更快的构建速度和更小的文件体积。
  // plugins: ['@vuepress/back-to-top'],
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
  ],
  markdown: {
    lineNumbers: true
  },
  themeConfig : {
    logo: 'logo.png',
    nav : [
      { text: '基本配置', link: '/config' },
      { text: 'Git', link: '/git' },
      { text: 'Mobile', link: '/mobile' },
      { text: 'Redis', link: '/redis' },
      {
        text: 'ES6',
        target: '_blank',
        items: [
          { text: '入门教程', link: 'https://es6.ruanyifeng.com/' },
          { text: 'JavaScript 教程', link: 'https://wangdoc.com/javascript/' },
        ]
      }
    ],
    sidebar: [
      {
        title: 'Git',
        path: '/git', // 标题的跳转链接，应为绝对路径且必须存在
        sidebarDepth: 1, // 默认值 1
        children: [ '/' ]
      },
      {
        title: 'Mobile',
        path: '/mobile'
      },
      {
        title: 'Redis API',
        path: '/redis'
      },
      {
        title: 'Mysql API',
        path: '/sql'
      },
      {
        title: 'Vue2',      // 必要的
        // path: '/vue2/',     // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: true,  // 可选的, 默认值是 true,
        sidebarDepth: 0,    // 可选的, 默认值是 1
        children: [
          '/vue2/',
          '/vue2/axios',
          '/vue2/lifeCycleHooks',
          '/vue2/modifier',
          '/vue2/mustache',
          '/vue2/router',
          '/vue2/slot'
        ] // 绝对路径
      }
    ],
    sidebarDepth: 2, // 0禁用标题（headers）链接； 1默认值,只显示h2的标题； 2可设置的最大值，再大无效, 同时提取h2和h3标题
    lastUpdated: 'last updated'
  }
}
