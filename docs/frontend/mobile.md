### 移动端兼容

1. `css: font-weight: 100 - 900 / lighter / normal / bold / bolder`  
    ios: 表现正常  
    android: 字体样式不正常，不能设置为数字。  
    兼容：加粗 `bold`，正常 `normal`

2. `js new Date()` 日期格式  
    ios: 2020/07/06, 日期需用`/`相连  
    android: 2020-07-06

3. `input.blur()` 点击其它元素触发 input 的 blur 事件  
    ios: `blur` 事件触发时，当前元素的点击事件仍可以触发。  
    android: `blur` 事件触发时，当前元素的点击事件不可以触发。  
    兼容：采用 `setTimeOut(fn)` 处理

    ```html
    <template>
      <!-- 未绑定blur事件时，默认失焦事件不会触发 -->
      <input type="text" ref="input" v-model="message" @focus="onFocus" @blur="onBlur"/>
      <span v-if="isFocus" @click="onSend">发送</span> 
      <span v-else>点赞</span> 
    </template>
    ```

    ```js
    <script>
    export default {
      data() {
        return {
          isFocus: false,
          message: ''
        };
      },
      methods: {
        onFocus () {
          this.isFocus = true;
        },
        onBlur () {
          console.log('blur invoke');
          setTimeout(() => {
            this.isFocus = false;
          }, 100);
        },
        onSend () {
          this.message = '';
          this.isFocus = false;
        }
      }
    }
    </script>
    ```

4. 移动端 `input` 失焦后，软键盘收起后多出空白区域，`body` 滚动位置错误。  
    兼容：失焦时调用 `window.scroll(0, 0)` 或 `window.scrollTo(0, 0)`

5. ios + vue 构建的页面中，使用 `vux` 轮播图组件，页面不缓存，切换时出现轮播图消失、滚动页面即出现的问题  
    兼容：`created()` 中调用 `window.scroll(0, 1)` 即 `Y轴` 滚动 `1px`。

