---
title: 响应式系统与React|青训营笔记
date: 2022-08-23
tags:
 - 青训营笔记
categories: 
 - 字节青训营笔记
isShowComments: true  
subSidebar: auto
---

这是我参与[第四届青训营]笔记创作活动的第1天。
## 一、React的历史与应用

1、前端应用开发，如Facebook,Instagram,Netflix网页版

2、移动原生应用开发，如Instagram,Discord,Oculus

3、结合Electron，进行桌面应用开发

## 二、React的设计思路

### 1、UI编程的特点：

前端UI工作原理：事件-->执行既定的回调-->状态变更-->UI更新

(1)状态更新，UI不会自动更新，需要手动地调用DOM进行更新

(2)欠缺基本的代码层面的封装和隔离，代码层面没有组件化

(3)UI之间的数据依赖关系，需要手动维护，如果依赖链路长，则会遇到“Callback Hell”

### 2、设计思路

（1）转换式系统

（2）响应式系统

工作原理：事件-->执行既定的回调-->状态变更

响应式编程：

（1）状态更新，UI自动更新

（2）前端代码组件化，可复用，可封装

（3）状态之间的互相依赖关系，只需要声明既可

### 3、组件化

概括：

（1）组件是组件的组合/原子组件

（2）组件内拥有状态，外部不可见

（3）父组件可将状态传入组件内部

组件设计：

（1）组件声明了状态和UI的映射

（2）组件有Props/State两种状态

（3）“组件”可由其他组件拼装而成

组件内部代码样子：

（1）组件内部有用私有状态State

（2）组件接受外部的Props状态提供复用性

（3）根据当前的State/Props,返回一个UI

### 4、状态归属问题

状态归属于两个节点向上寻找到最近的祖宗节点。

思考：

（1）React是单向数据流还是双向数据流？

（2）如何解决状态不合理上升的问题？

（3）组件的状态改变后，如何更新DOM？

## 三、React（hooks）的写法

```
import React, { useState, useEffect } from 'react';
function Example() {
const [count, setCount] = useState(0);
// Similar to componentDidMount and componentDidUpdate: useEffect(() => {
// Update the document title using the browser api document.title = 'You clicked ${count} times`;
});
return (<div>
<p>You clicked {count} times</p >
<button onClick={() => setCount(count + 1)}>
Click me</button></div>);
```

## 四、React的简单实现demo

### 1、React的实现主要解决三个问题：

（1）JSX不符合JS标准语法？

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3af8982451ce4b918ed7c02852cd46d7~tplv-k3u1fbpfcp-watermark.image?)
（2）返回JSX发生改变时，如何更新DOM？

   Virtual DOM (虚拟 DOM) 
   
   Virtual DOM 是一种用于和真实 DOM 同步，而在JS内存中维护的一个对象，它具有和 DOM 类似的树状结构，并和 DOM 可以建立--对应的关系。 它赋予了 React 声明式的 API:您告诉React 希望让U是什么状态，React 就确保 DOM 匹配该状态。这使您可以从属性操作、事件处理和手动 DOM 更新这些在构建应用程序时必要的操作中解放出来。

（3）State/Props更新时，要重新触发render函数，如何使速度更快？

A.不同类型的元素-->替换

B.同类型的DOM元素，更新

C.同类型的组件元素-->递归

