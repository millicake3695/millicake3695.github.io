---
title: Mustache 模板语法
categories:
 - Vue2
---

<!-- more -->



`Mustache` 是一个logic-less（轻逻辑）模板解析引擎，它原本是基于 javascript 实现的，但是因为轻量易用，所以经过拓展目前支持更多的平台，如 java，.NET，PHP，C++ 等。

它是为了使用户界面与业务数据（内容）分离而产生的，

它可以生成特定格式的文档，通常是标准的HTML文档。

* {{ `keyName` }}

简单的变量替换

<!-- ::: v-pre
{{ keyName }}
::: -->

* {{ `#keyName` }} {{ `/keyName` }}

以#开始、以/结束表示区块，它会根据当前上下文中的键值来对区块进行一次或多次渲染。它的功能很强大，有类似if、foreach的功能。

* {{ `^keyName` }} {{ `/keyName` }}

该语法与 {{ `#keyName` }} {{ `/keyName` }} 类似，不同在于它是当 keyName 值为 null, undefined, false 时才渲染输出该区块内容。

* {{ `.` }}

表示枚举，可以循环输出整个数组

* {{ `!comments` }}

表示注释

* {{ `>partials` }}

以 > 开始表示子模块，当结构比较复杂时，我们可以使用该语法将复杂的结构拆分成几个小的子模块。
