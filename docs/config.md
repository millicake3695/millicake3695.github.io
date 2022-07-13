[Emoji](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json)

:tada: :tada: :tada:


::: tip
这是一个提示
:::

::: warning
这是一个警告
:::

::: danger
这是一个危险警告
:::

::: details
这是一个详情块，在 IE / Edge 中不生效
:::


### 安装vue-cli@3.x.x
1. `vue -V` 2.9.6

2. `npm uninstall vue-cli -g` or `yarn remove vue-cli -g` 全局卸载vue-cli@2.x.x

    卸载失败处理：

    `cd /usr/local/bin` then `ls` 是否存在 vue vue-init 文件夹 `sudo rm -rf vue vue-init`

    `cd /usr/local/lib/node_modules` then `ls` `sudo rm -rf vue-cli`

3. `npm install @vue/cli -g` or `yarn add @vue/cli -g` 全局安装@vue-cli@3.x.x

4. `vue -V` `@vue/cli 4.4.6` 安装成功


### 代码块中的行高亮

```js {4,6-8}
// {4,6-8} 不能有空格
class Ball {
  constructor(x, y, ctx) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.opa = 1; // 小球透明度
    this.color = 'rgb(' + this.random(0, 255) + ',' + this.random(0, 255) + ',' + this.random(0, 255) + ')';
    this.vx = (Math.random() - 0.5) * 5; // x y偏移量
    this.vy = (Math.random() - 0.5) * 5;
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.globalAlpha = this.opa; // 画布全局透明度
    this.ctx.globalCompositeOperation = 'lighter'; // 颜色叠加时显示的叠加色
    this.ctx.arc(this.x, this.y, 20, 0, Math.PI * 2, false);
    this.ctx.fill();
    this.update();
  }
  update() { // 小球生成后的x,y偏移
    this.x += this.vx;
    this.y += this.vy;
    this.opa *= 0.99;
  }
  // 生成随机数 rgb值
  random (min, max) {
    return Math.floor((max - min) * Math.random() + min);
  }
}
```