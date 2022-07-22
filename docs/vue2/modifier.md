---
title: Modifiers 修饰符
date: 2019-08-24
categories:
 - Vue2
---

<!-- more -->


### 分类

  Event Modifiers, Key Modifiers (keyboard), System Modifier Keys (.ctrl, .alt, .shift, .meta), etc.

### 定义

  修饰符是由点开头的修饰符来表示的。修饰符可以串联，不同的顺序含义不同。

  [按键修饰符](https://cn.vuejs.org/v2/guide/events.html#%E6%8C%89%E9%94%AE%E4%BF%AE%E9%A5%B0%E7%AC%A6)。

  |事件修饰符  |说明        |
  |:---------|:-----------|
  |`.stop`   |阻止事件冒泡。|
  |`.prevent`|阻止默认事件。|
  |`.self`   |仅当 event.target 为当前元素时触发事件处理函数。|
  |`.once`   |v2.1.4新增。点击事件仅会触发一次。|
  |`.native` |将事件处理函数绑定至`子组件的根元素`上。|
  |`.capture`|添加事件监听器时使用事件捕获模式|
  |`.passive`|v2.3.0新增。滚动事件的默认行为 (即滚动行为) 将会立即触发，而不会等待 onScroll 完成，禁止和 .prevent 一起使用。尤其能够提升移动端的性能。`<div v-on:scroll.passive="onScroll">...</div>`|


  |数据绑定修饰符|说明        |
  |:---------|:-----------|
  |[.sync]   |v2.3.0+ 新增。对一个 prop 进行“双向绑定”。此时的v-bind不能和表达式一起使用，只能提供想要绑定的 property 名，类似 v-model。|

  [.sync]: https://cn.vuejs.org/v2/guide/components-custom-events.html#sync-%E4%BF%AE%E9%A5%B0%E7%AC%A6


  |输入框修饰符|说明        |
  |:---------|:-----------|
  |`.lazy`   |在“change”时而非“input”时更新视图。|
  |`.number` |自动将用户的输入值转为数值类型。如果这个值无法被 parseFloat() 解析，则会返回原始的值。|
  |`.trim`   |自动过滤用户输入的首尾空白字符。|


  ```html
  <!-- 父组件 修饰符 -->
  <text-document :title.sync="doc.title"></text-document>

  <!-- 父组件 非修饰符 使用 $event 传参 -->
  <text-document :title="doc.title"
                  @update:title="doc.title = $event" ></text-document>
  ```

  ```js
  // 子组件
  this.$emit('update:title', 'day day up');
  ```

  当我们用一个对象同时设置多个 prop 的时候，可以使用 v-bind.sync (v-bind不能简写)。这样会把 doc 对象中的每一个 property (如 title) 都作为一个独立的 prop 传进去，然后各自添加用于更新的 v-on 监听器。

### 应用：keep-alive 动态组件传参

  ⚠️ 将 v-bind.sync 用在一个字面量的对象上，例如 v-bind.sync=”{ title: doc.title }”，是无法正常工作的，因为在解析一个像这样的复杂表达式的时候，有很多边缘情况需要考虑。
  ```html
  <!-- doc: { title: '', content: '' } -->
  <text-document v-bind.sync="doc"></text-document>
  ```

  ```js
  // 子组件
  this.$emit('update:title', 'good good study');
  this.$emit('update:content', 'day day up');
  ```
