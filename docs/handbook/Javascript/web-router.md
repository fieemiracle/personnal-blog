---
title: 前端路由也能像vue-router一样香
date: 2022-09-14
tags:
 - 前端路由
categories: 
 - Javascript
isShowComments: true  
subSidebar: auto
---

“我报名参加金石计划1期挑战——瓜分10万奖池，这是我的第1篇文章，[点击查看活动详情](https://s.juejin.cn/ds/jooSN7t "https://s.juejin.cn/ds/jooSN7t")”

vue-router路由用着是不是香香的？简单易上手。其实，前端路由也是简单易上手哦，一起来学学趴~。

## 一、先看看vue-router的效果


![Video_Vue.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ebbef77a406f41789db05e0ca90c9427~tplv-k3u1fbpfcp-watermark.image?)

## 二、什么是前端路由

前端路由就是把`不同路由对应不同的内容或页面`的任务交给前端来做，之前是通过服务端根据 url 不同返回不同的页面来实现。

`前端路由描述的是URL和UI之间的映射关系,单向映射。`

## 三、前端路由解决的两个主要问题

1、如何检测URL发生了变化

2、如何改变URL却不引起页面的刷新(例如，变成hash的改变)

## 四、实现前端路由的方案

### 1、hash模式

什么是hash？hash模式是基于锚点的原理实现。在 location 对象属性中，**location .hash 是设置或返回从井号(#)开始的URL(锚)**。使用hash模式一定有一个#，并且通过这个模式，*改变url中的hash值部分，页面是不会刷新的*，这就解决了第一个主要问题。

#### 看看demo：

```
    <body>
        <ul>
            <!-- hash模式如何改变URL？在路径面前添加#，这里展示的是三个不同的URL -->
            <li><a href="#/home">首页</a></li>
            <li><a href="#/about">关于</a></li>
            <li><a href="#/mine">我的</a></li>
        </ul>
​
        <!-- 准备一个容器，渲染对应的UI，相当于vue-router里面的<router-view></router-view> -->
        <div id="routerView"></div>
​
        <script>
            let routerView = document.getElementById('routerView');
            // 页面加载完毕(强制匹配一次)
            window.addEventListener('load', onHashchange);
            // 监听hash改变
            window.addEventListener('hashchange', onHashchange);
​
            // 控制渲染对应的UI
            function onHashchange() {
                console.log(location.hash);
                //设置不同路由对应不同的内容
                switch (location.hash) {
                    case '#/home':
                        routerView.innerHTML = "Home"
                        return
                    case '#/about':
                        routerView.innerHTML = "About"
                        return
                    case '#/mine':
                        routerView.innerHTML = "Mine"
                        return
                    default:
                        return
                }
            }
        </script>
    </body>
```

#### 实现效果长这样：


![hash_vedio (1).gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bf90c6724e8f4a538162e155650ff3e8~tplv-k3u1fbpfcp-watermark.image?)

#### **hash 模式适用场景：**

无重定向传参需求(第三方认证 oauth) ，兼容IE8，无锚点跳跃需求，后端不需要跟踪前端路由信息。

#### 优缺点分析：

（1）优点：实现简单，兼容性好，绝大多数前端框架提供了 hash 的路由实现，不需要服务器端进行任何设置和开。除资源加载和 ajax 请求外，不发起其他请求。

（2）缺点：需要重定向的操作，后端无法获取 hash 部分内容，也就是后台无法取得url中的数据。换句话说，服务器端无法准确跟踪前端路由信息，对于需要锚点功能的需求会与目前路由机制冲突。

### 2、history模式

HTML5提供的一个对象方法，

修改url,是不会引起页面刷新的 ：

（1）pushState() （文章使用这个）

（2）replaceState()

检测url变化 ：

（3）popState()

#### 看看demo:

```
    <body>
        <ul>
            <!-- history模式如何改变URL？直接写，不需要# -->
            <li><a href="/home">首页</a></li>
            <li><a href="/about">关于</a></li>
            <li><a href="/mine">我的</a></li>
        </ul>
​
        <!-- 准备一个容器，渲染对应的UI，相当于vue-router里面的<router-view></router-view> -->
        <div id="routerView"></div>
​
        <script>
            let routerView = document.getElementById('routerView');
            window.addEventListener('DOMContentLoaded', onLoad);
            window.addEventListener('popstate', onPopState); //浏览器前进后退内容与路由能够匹配
​
            function onLoad() {
                onPopState()
                let links = document.querySelectorAll('li a[href]');
                // 拦截a标签的默认跳转行为
                links.forEach(a => {
                    a.addEventListener('click', (e) => {
                    // e.stopImmediatePropagation()  
                    //阻止剩下的事件处理程序执行。会阻止冒泡。停止当前节点和所有后续节点的事件处理程序的运行。
                    // e.stopPropagation() 
                    //阻止事件向上层元素冒泡。若同一个元素绑定多个事件（如addEventListener），则不阻止其他事件的执行
                        
                        // 阻止a标签href的默认行为
                        e.preventDefault();
                        console.log(123);
                        history.pushState(null, '', a.getAttribute('href'));
                        onPopState()
                    })
                })
​
            }
​
            function onPopState() {
                console.log(location);
                switch (location.pathname) {
                    case '/home':
                        routerView.innerHTML = 'Home'
                        return
                    case '/about':
                        routerView.innerHTML = 'about'
                        return
                    case '/mine':
                        routerView.innerHTML = 'mine'
                        return
                    default:
                        return
                }
            }
        </script>
    </body>
```

#### 实现效果长这样：

![history.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bda48f07c9344a10974db458247cb60e~tplv-k3u1fbpfcp-watermark.image?)

#### **history 模式适用场景：**

页面**锚点需求**，需**重定向传参**，后端跟踪路由信息，附加路由信息(history.state)获取路由状态。

#### 优缺点分析：

（1）优点：重定向过程中不会丢失url参数。后端可以拿到数据。绝大多数前段框架提供了 history 模式的路由实现。后端可准确跟踪路由信息，history.state 可获取当前 url 对应的状态信息。

（2）缺点：兼容性只兼容到 IE10， 需要后端支持。
