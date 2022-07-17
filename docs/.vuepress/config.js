module.exports = {
  base: '/', // 必须 静态资源访问
  cache: false, // 每次构建前删除cache
  title: 'Hello, Stranger',  // 设置网站标题
  description : 'millicake3695‘s blog',
  // evergreen: false, // 禁止 ESNext 到 ES5 的转译以及对 IE 的 polyfills，同时会带来更快的构建速度和更小的文件体积。
  plugins: ['@vuepress/back-to-top'],
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }], // favicon
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
  ],
  markdown: {
    lineNumbers: true // 使代码块显示行数标记
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
      },
      { text: 'GitHub', link: 'https://github.com/millicake3695/millicake3695.github.io', target: '_blank' }
    ],
    sidebar: [
      {
        title: 'VuePress',
        path: '/vuepress',
        sidebarDepth: 2 // 0禁用标题链接；1默认值,只显示h2的标题；2提取h2和h3标题
      },
      {
        title: 'Daily',
        collapsable: false,
        children: [
          '/daily/'
        ]
      },
      {
        title: 'Tools',
        collapsable: false,
        children: [
          '/tools/git'
        ]
      },
      {
        title: 'Vue2',      // 必要的
        // path: '/vue2/',  // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 可选的, 默认值 true, 让一个组永远都是展开状态
        sidebarDepth: 0,    // 可选的
        children: [
          '/vue2/',
          '/vue2/axios',
          '/vue2/lifeCycleHooks',
          '/vue2/modifier',
          '/vue2/mustache',
          '/vue2/router',
          '/vue2/slot'
        ] // 绝对路径
      },
      {
        title: 'Vue3',
        collapsable: false,
        children: [
          '/vue3/'
        ]
      },
      {
        title: 'Front-End',
        collapsable: false,
        children: [
          '/frontend/mobile',
          'frontend/exportExcel'
        ]
      },
      {
        title: 'Back-End',
        collapsable: false,
        children: [
          '/backend/redis',
          '/backend/sql',
        ]
      },
    ],
    lastUpdated: 'last updated'
  }
}
