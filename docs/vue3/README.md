### 安装vue-cli@3.x.x

首先全局卸载vue@2.x，然后全局安装@vue-cli@3.x

1. `vue -V` 2.9.6

2. `npm uninstall vue-cli -g` or `yarn remove vue-cli -g` 全局卸载vue-cli@2.x.x

    卸载失败处理：

    `cd /usr/local/bin` then `ls` 是否存在 vue vue-init 文件夹 `sudo rm -rf vue vue-init`

    `cd /usr/local/lib/node_modules` then `ls` `sudo rm -rf vue-cli`

3. `npm install @vue/cli -g` or `yarn add @vue/cli -g` 全局安装@vue-cli@3.x.x

4. `vue -V` `@vue/cli 4.4.6` 安装成功