---
title: Slot 插槽
categories:
 - Vue2
---

<!-- more -->



v2.6.0开始，Vue 引入了 v-slot 指令取代了 slot 和 slot-scope 这两个已被废弃的 attribute，以此统一具名插槽和作用域插槽。

Vue 实现了一套内容分发的 API，这套 API 的设计灵感源自 Web Components 规范草案，将 `<slot>` 元素作为承载分发内容的出口。

通俗地讲，插槽实现了父级组件向子级组件分发内容，父级组件作为发送方，子级组件作为接收方。

插槽内可以包含任何模板代码，包括 HTML，甚至其它的组件。

⚠️ 父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。

⚠️ v-slot 指令只能在 `<template>` 元素上使用。一种情况例外：当被提供的内容只有默认插槽时，组件的标签才可以被当作插槽的模板来使用。这样可以把 v-slot 直接用在组件上。



- 后备内容（默认内容）

  在父级组件未提供内容时，渲染子级组件`<slot>default</slot>`中的默认内容 `default`。

- 具名插槽

  使用 name 属性标记插槽。默认插槽的 name 属性值为 `default`。

  在向具名插槽提供内容的时候，可以在一个 `<template>` 元素上使用 v-slot 指令，并以 v-slot 的参数的形式提供其名称；任何没有被包裹在带有 v-slot 的 `<template>` 中的内容都会被视为默认插槽的内容。

  ```html
  <!-- 父组件 -->
  <base-layout>
    <template v-slot:header>
      <h1>Here might be a page title</h1>
    </template>

    <p>A paragraph for the main content.</p>
    <p>And another one.</p>

    <template v-slot:footer>
      <p>Here's some contact info</p>
    </template>
  </base-layout>

  <!-- 子组件 -->
  <div class="container">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
  ```

- 作用域插槽

  让插槽内容能够访问子组件中的数据。

  为了让子组件中的数据在父级的插槽内容中可用，可以将数据 user 作为 `<slot>` 元素的一个 attribute 绑定。此属性被称为 插槽 prop。

  作用域插槽的内部工作原理是将你的插槽内容包括在一个传入单个参数的函数里。参数对象可使用对象解构等操作。

  ```html
  <!-- 父组件 -->
  <current-user>
    <!-- 此处将包含所有插槽 prop 的对象命名为 slotProps，可使用对象解构、默认值、重命名 -->
    <template v-slot:default="slotProps">
      {{ slotProps.user.firstName }}
    </template>

    <!-- 可使用对象解构、默认值、重命名 -->
    <template v-slot:default="{ user: person }">
      {{ slotProps.user.firstName }}
    </template>
  </current-user>

  <!-- 子组件 -->
  <span>
    <slot v-bind:user="user">
      {{ user.lastName }}
    </slot>
  </span>
  ```

- 独占默认插槽

  在上述情况下，当被提供的内容只有默认插槽时，组件的标签才可以被当作插槽的模板来使用。这样我们就可以把 v-slot 直接用在组件上：

  ```html
  <current-user v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </current-user>

  <!-- 不带参数的 v-slot 被假定对应默认插槽，或简写为 -->
  <current-user v-slot="slotProps">
    {{ slotProps.user.firstName }}
  </current-user>
  ```

  ⚠️ 默认插槽的缩写语法不能和具名插槽混用，因为它会导致作用域不明确。只要出现多个插槽，请始终为所有的插槽使用完整的基于 `<template>` 的语法。

  ```html
  <current-user>
    <template v-slot:default="slotProps">
      {{ slotProps.user.firstName }}
    </template>

    <template v-slot:other="otherSlotProps">
      ...
    </template>
  </current-user>
  ```

- 具名插槽缩写 #

  `v-slot:` <=> `#`

  ⚠️ 和其它指令一样，该缩写只在其有参数的时候才可用。

  `v-bind:name` <=> `:name`  
  `v-on:click` <=> `@click`  
  `v-slot:default` <=> `#default`  

