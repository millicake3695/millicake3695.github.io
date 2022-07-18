## 名词解释

### 闭包

  当函数可以记住并访问所在的词法作用域时，就产生了闭包，即使函数是在当前词法作用域之外执行。

  本质：是JavaScript函数作用域的副作用产品，一种特殊的对象。

  构成：函数，以及创建该函数的环境。环境由闭包创建时在作用域中的任何局部变量组成。

  内存泄漏：因为闭包可以使函数中的变量都保存在内存中，造成很大的内存消耗。

  使用不当的闭包会在`IE(IE9)`之前造成内存泄漏问题。因为它的`JavaScript引擎`使用的垃圾回收算法是引用计数法，对于循环引用将会导致GC无法回收垃圾。

  垃圾回收`GC(Garbage Collection)`把程序不用的内存空间视为垃圾，找到并且将它们回收，以便再次使用。

  不是所有的语言都有`GC`，一般存在于高级语言中，如`Java`、`JavaScript`、`Python`。那么在没有`GC`的世界里，程序员就比较辛苦，只能手动去管理内存，比如在C语言中我们可以通过`malloc/free`，在`C++`中的`new/delete`来进行管理。


### 垃圾清除算法

1. GC标记-清除算法

  GC标记-清除算法由标记阶段和清除阶段构成，标记阶段将所有的活动对象做上相应的标记，清除阶段把那些没有标记的对象，也就是非活动对象进行回收。在搜索对象并进行标记的时候使用了深度优先搜索，尽可能的从深度上搜索树形结构。

  - 优点：  
  (1). 算法简单，实现容易。  
  (2). 与保守式的GC算法兼容。  

  - 缺点：  
  (1). 在使用过程中会出现碎片化的情况，如同Windows的文件系统一样，导致无数的小分块散布在堆的各个地方。  
  (2). 分配速度，由于分块的不连续性，算法每次分配的时候都需要遍历空闲链表为了找到足够大的分块，这样最糟糕的情况就是遍历到最后才找到合适的分块，影响了分配速度。  

2. 引用计数法

  这种方法中引入了计数器的概念，通过计数器来表示对象的“人气指数”，也就是有多少个程序引用了这个对象。当计数器(引用数)为0时，垃圾立刻被回收。

  - 优点：  
  (1). 可以立即回收垃圾。  
  (2). 最大暂停的时间短。  
  (3). 并且没有必要沿指针查找。  

  - 缺点：  
  (1). 循环引用（如闭包）无法回收。  
  (2). 实现起来很复杂。  
  (3). 计数器值的增减处理十分繁重。  
  (4). 同时计数器需要占很多位，导致内存空间的使用效率大大降低。  

  [js闭包测试](https://www.cnblogs.com/rubylouvre/p/3345294.html)


### 函数柯里化

  ```js
  // Number | String | Boolean | Object | Array | Undefined | Null
  // Function | RegExp
  // Symbol | Set | WeakSet | Map | WeakMap
  const isType = type => target => `[object ${type}]` === Object.prototype.toString.call(target);
  ```


### Event Loop 事件循环

  🌟推荐阅读 —— [JavaScript 运行机制详解](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)

  浏览器的事件循环是HTML5定义的规范，Node的事件循环是libuv库实现的。二者基本一致。

  JavaScript代码的执行过程中，除了依靠函数调用栈来搞定函数的执行顺序外，还依靠任务队列( task queue )来搞定另外一些代码的执行。整个执行过程，我们称为事件循环过程。一个线程中，事件循环是唯一的，但是任务队列可以拥有多个。任务队列又分为 macro-task（宏任务）与 micro-task（微任务），在最新标准中，它们被分别称为task与jobs。 

  ::: warning 分类
  macro-task大概包括：`script(整体代码)`, `setTimeout`, `setInterval`, `setImmediate`, `I/O`, `UI rendering`  

  micro-task大概包括: `process.nextTick`, `Promise.then`, `Async/Await(实际就是promise)`, `Object.observe`, `MutationObserver(html5新特性)`
  :::

  #### 事件循环的执行流程：

  (1) 检查 `Macrotask` 队列是否为空,若不为空，则进行下一步，若为空，则跳到3

  (2) 从 `Macrotask` 队列中取队首(在队列时间最长)的任务进去执行栈中执行(仅仅一个)，执行完后进入下一步

  (3) 检查 `Microtask` 队列是否为空，若不为空，则进入下一步，否则，跳到1（开始新的事件循环）

  (4) 从 `Microtask` 队列中取队首(在队列时间最长)的任务进去事件队列执行,执行完后，跳到3。其中，在执行代码过程中新增的`microtask`任务会在当前事件循环周期内执行，而新增的`macrotask`任务只能等到下一个事件循环才能执行了。

  ::: tip 执行顺序
  `script(主程序代码)` => `process.nextTick` => `Promise.then...` => `setTimeout` => `setInterval` => `setImmediate` => `I/O` => `UI rendering`
  :::

  ⚠️ 一开始js主线程中跑的任务是 `macrotask` 任务。

  ⚠️ 一次事件循环只执行`一个`处于 `Macrotask` 队首的任务，执行完成后，立即执行 `Microtask` 队列中的`所有`任务。

  ⚠️ setImmediate 和 process.nextTick 是 Node 独有的。不要在面向web的生产站点上使用 setImmediate！

  该功能可以通过几种不同的方式进行仿真：

  `postMessage` 可用于触发立即产生的回调。请注意，Internet Explorer 8包含的同步版本postMessage，这意味着它不能用作后备。 

  `MessageChannel` 可以在Web Workers内部可靠地使用，而postMessage的语义意味着它不能在其中使用。

  `setTimeout(fn, 0)` 可以使用，但是由于HTML规范将计时器嵌套在5层以上，因此计时器的时间限制为4毫秒，因此无法自然适应setImmediate。

  [延伸阅读](https://developer.mozilla.org/en-US/docs/Web/API/Window/setImmediate)

  ⚠️ 定义promise的构造部分是同步执行的。

  总的结论就是，执行宏任务，然后执行该宏任务产生的微任务，若微任务在执行过程中产生了新的微任务，则继续执行微任务，微任务执行完毕后，再回到宏任务中进行下一轮循环。

  ⚠️ [setTimeout](https://mp.weixin.qq.com/s/7qTRSMqaqG8XZ9rpEBhYNQ)

  如果当前任务执行时间过久，会延迟到期定时器任务的执行。

  如果 setTimeout 存在嵌套调用，调用超过5次后，系统会设置最短执行时间间隔为 4 毫秒。之所以出现这样的情况，是因为在 Chrome 中，定时器被嵌套调用 5 次以上，系统会判断该函数方法被阻塞了，如果定时器的调用时间间隔小于 4 毫秒，那么浏览器会将每次调用的时间间隔设置为 4 毫秒。可以看下[源码](https://cs.chromium.org/chromium/src/third_party/blink/renderer/core/frame/dom_timer.cc)

  使用 setTimeout 设置的回调函数中的 this 环境不是指向回调函数。

  Chrome、Safari、Firefox 都是以 32 个 bit 来存储延时值的，32bit 最大只能存放的数字是 2147483647 毫秒，这就意味着，如果 setTimeout 设置的延迟值大于 2147483647 毫秒（大约 24.8 天）时就会溢出，这导致定时器会被立即执行。

  ```js
    async function async1() {
      await async2();
      console.log('async1 end');
    }
    async function async2() {
      console.log('async2 end');
    }
    async1();

    setTimeout(() => {
      console.log('setTimeout');
    }, 0);
    new Promise(resolve => {
      console.log('Promise'); // Promise 新建后就会立即执行。
      resolve();
    }).then(() => {
      console.log('Promise1');
    }).then(() => {
      console.log('Promise2');
    });
    // async2 end => Promise => async1 end => Promise1 => Promise2 => setTimeout
  ```