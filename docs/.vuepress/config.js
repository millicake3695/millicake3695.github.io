module.exports = {
  base: '/millicake3695.github.io/',
  title: 'millicake3695',  // 设置网站标题
  description : 'millicake3695‘s blog',
  themeConfig : {
    logo: 'logo.png',
    nav : [
      { text: 'a', link: '/a' },
      { text: 'b', link: '/b' },
      { text: 'error', link: '/error' },
      { text: '百度一下', link: 'https://www.baidu.com', target: '_blank' }
    ],
    sidebar: {
      '/' : [
        "/",
        "a",
        "b",
        ["error", '出错啦～']
      ]
    },
    sidebarDepth: 1, // 0禁用标题（headers）链接； 1默认值,只显示h2的标题； 2可设置的最大值，再大无效, 同时提取h2和h3标题
    lastUpdated: 'last updated'
  }
}