---
title: CSS 集合
date: 2021-06-17
categories:
 - frontEnd
tags:
 - css
---

### 动画、过渡和转移

1. animation

  `animation: blue 0.7s linear infinite alternate;`  
  `animation-direction: alternate;`
  
  动画交替反向运行，反向运行时，动画按步后退，同时，带时间功能的函数也反向，比如，ease-in 在反向时成为ease-out。计数取决于开始时是奇数迭代还是偶数迭代。

  [CSS 关键字索引](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference)

  ```css
  animation-name: none; /* 关键帧名 */
  animation-duration: 0s; /* 一次动画持续时间 */
  animation-time-function: ease | linear | <cubic-bezier-timing-function> | <step-timing-function>; /* 动画时间函数 */
  animation-delay: 0s; /* 动画播放之前的延时 */
  animation-iteration-count: <number = 1> | infinite; /* 动画播放的次数 */
  animation-direction: normal | reverse | alternate | alternate-reverse; /* 动画播放的方向 */
  animation-fill-mode: none | forwards | backwards | both; /* 确定动画在执行之前和之后这两个阶段应用的样式 */
  animation-play-state: running | paused; /* 确定动画是否正在播放 */
  ```

  每个动画定义中的属性值的顺序很重要：可以被解析为 `time` 的第一个值被分配给`animation-duration`， 第二个分配给 `animation-delay`。

  `where <cubic-bezier-timing-function> = ease | ease-in | ease-out | ease-in-out | cubic-bezier(<number>, <number>, <number>, <number>)`

  `<step-timing-function> = step-start | step-end | steps(<integer>[, <step-position>]?)`

2. transition

  可动画属性列表：可简写为`all`...

  `auto`值常常较复杂，规范指出不要在它上动画。在`auto`上动画结果可能不可预期，这取决于浏览器及其版本，应当避免使用。

  在插入元素 如`appendChild()`或改变属性`display: none`后立即使用过渡, 元素将视为没有开始状态，始终处于结束状态。简单的解决办法，改变属性前用`window.setTimeout()`延迟几毫秒。

  检测过渡是否完成: 当过渡完成时触发一个事件，在符合标准的浏览器下，这个事件是 `transitionend`, 在 WebKit 下是 `webkitTransitionEnd`。 transitionend 事件提供两个属性`propertyName`, `elapsedTime`;

  ```js
  // 如果取消了过渡则不会触发 transitionend 事件，因为在过渡完成前动画的属性值改变了。
  el.addEventListener("transitionend", updateTransition, true);
  ```

3. transform

  只能转换由盒模型定位的元素。根据经验，如果元素具有`display: block`，则由盒模型定位元素。


### 展示服务端返回的换行符`1.aa↵2.bb`

  使用一行css即可 `white-space: pre-wrap;`。默认情况下`html`中空格、换行符合并为一个空格(`normal`)，设置`pre-wrap`则按原格式展示。

  [white-space](https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space)

  |           |换行符|空格和制表符|文字转行|
  |-----------|:--: |:--:|:-----:|
  normal      |合并 |合并 |转行
  nowrap      |合并 |合并 |不转行
  pre         |保留 |保留 |不转行
  pre-wrap    |保留 |保留 |转行
  pre-line    |保留 |合并 |转行
  break-spaces|保留 |保留 |转行


### 图片优化

  [web优化之图片](https://juejin.im/post/5dc7fb87e51d454b4213c934)

  `JPEG/JPG`: 有损压缩，直接色，位图，体积最小，常用于颜色较丰富、无透明要求的图片。

  `PNG`：是一种无损压缩的位图图形格式，支持索引、灰度、RGB 三种颜色方案以及 Alpha 通道等特性。  
  名称由来一个是 Portable Network Graphics（便携式网络图形），还有一个非正式的由来是 "Png is Not Gif"。  
  [PNG无损压缩](https://tinypng.com/)

  `GIF`：图像互换格式（Graphics Interchange Format）是一种位图图形文件格式，无损压缩、索引色。

  `WebP`：Google 2010 年发布的同时支持有损和无损压缩的图片文件格式。有损用来替换 JPG，无损用来替换PNG，动态用来替换 GIF。

  `SVG`：可缩放矢量图形（Scalable Vector Graphics）是一种基于可扩展编辑语言（XML），用于描述二维矢量图形的图形格式。SVG 由 W3C 制定，是一个开放标准。SVG 的优点是文件可读，易于修改编辑。

  ```html
  <!-- 自适应 DPR 加载图片 -->
  <picture>  
    <source srcset="photo@3x.jpg" media="(min-width: 800px)">  
    <source srcset="photo@2x.jpg" media="(min-width: 600px)">  
    <img srcset="photo.jpg">  
  </picture>

  <img src="photo.png" srcset="photo@2x.png 2x, photo@3x.png 3x" alt="photo" />
  ```

  ⚠️ .net服务器不支持文件名中带`@`


### 本地图片预览

  `window.URL.createObjectURL(file)` 返回一个存在内存中的url。在关闭页面时，浏览器会自动释放图片地址中的内存，但同一页面多次调用会造成内存占用过多。可以主动调用window.URL.revokeObjectURL(url) 释放图片资源，释放后通过src请求图片会返回404。

  ```js {4}
  const imgList = [];
  const files = event.target.files;
  for (let i = 0, len = files.length; i < len; i++) {
    imgList.push(window.URL.createObjectURL(files[i]));
  }
  ```

  ```js {4}
  const imgList = [];
  const files = event.target.files;
  for (let i = 0, len = files.length; i < len; i++) {
    let reader = new FileReader();
    reader.readAsDataURL(files[i]);
    reader.onload = function(res) {
      let url = res.target.result;
      imgList.push(url);
    };
  }
  ```


### 自动展开的文本输入框

  `input[text=textarea]` 设置一个默认的初始高度，当输入内容较多时，输入框高度自动变化。

  ```html
  <div class="expandingArea active">
    <pre><span>{{mycomment}}</span><br></pre>
    <textarea type="text"
              ref="textbox"
              v-model="mycomment"
              @blur="window.scroll(0, 0);"
              placeholder="写评论..."></textarea>
  </div>
  ```

  ```less
  .expandingArea { position: relative; min-height: 50px; border: 1px solid #2f7dcd; border-radius: 6px; background-color: #fff; }
  pre, textarea {
    padding: 5px; width: 100%; border: 0 none; outline: none; background-color: transparent;
    white-space: pre-wrap; word-wrap: break-word;
    font-size: 16px; color: #222; line-height: 20px;
    overflow: hidden;
  }
  textarea { height: 100px; font-size: 16px; color: #000; }
  pre { display: none; }
  .expandingArea.active pre { display: block; visibility: hidden; }
  .expandingArea.active textarea {
    position: absolute; top: 0; left: 0; height: 100%;
    overflow-y: scroll; resize: none;
  }
  ```

  ```js
  function makeExpandingArea (container) {
    var area = container.querySelector('textarea');
    var span = container.querySelector('span');
    if (area.addEventListener) {
      area.addEventListener('input', function () {
        span.textContent = area.value;
      }, false);
      span.textContent = area.value;
    } else if (area.attachEvent) {
      // IE8 compatibility
      area.attachEvent('onpropertychange', function () {
        span.innerText = area.value;
      });
      span.innerText = area.value;
    }
    // Enable extra CSS
    container.className += " active";
  }
  var areas = document.querySelectorAll('.expandingArea');
  var l = areas.length;
  while (l--) {
    makeExpandingArea(areas[l]);
  }
  ```


### 监听 scroll 使元素产生吸顶效果

  类似的效果也可使用 `position: sticky;` 实现。

  ```js
  import _ from 'lodash';

  window.addEventListener('scroll', _.debounce(function() {
    // 不使用 window.scrollY 兼容
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop > 92) {
      // 改变需要吸顶的元素样式为 position: fixed;...
    }
  }), 1000);
  ```