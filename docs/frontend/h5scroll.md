---
title: 移动端滚动插件
categories:
 - frontEnd
tags:
 - mobile
---

<!-- more -->



npm package: `vue-slim-better-scroll`

```js
// main.js
import Vue from "vue";
import Scroll from 'vue-slim-better-scroll';
Vue.use(Scroll);
```

```html
<!-- component.vue -->
<Scroll ref="scroll"
        :update-data="[dataList]"
        :refresh-data="[]"
        :pullUpConfig="{threshold: 100, txt: {more: '没有更多数据了', noMore: '没有更多数据了'}}"
        @pullingDown="onPullDown"
        @pullingUp="onPullUp"
        v-if="dataList && dataList.length">
</Scroll>
```

```js {8}
async getData () {
  if (this.total >= this.page || this.page === 1) {
    try {
      // ...
      this.page++;
    } catch (err) {}
  } else {
    this.$refs.scroll.update(true);
  }
},

async onPullUp () {
  await this.getData();
}

async onPullDown () {
  this.page = 1;
  await this.getData();
}
```