---
title: 浏览器从输入url到页面渲染发生了什么（今生）
date: 2022-10-18
tags:
 - url
 - 浏览器
categories: 
 - Javascript
isShowComments: true  
subSidebar: auto
---

持续创作，加速成长！这是我参与「掘金日新计划 · 10 月更文挑战」的第4天，[点击查看活动详情](https://juejin.cn/post/7147654075599978532 "https://juejin.cn/post/7147654075599978532")

## 一、渲染页面

页面渲染过程是怎么样的呢？页面渲染大致分为五步，如下代码：

```
<style>
    .wrap{
       width: 100%;
       height: 100%;
       background-color: #bfa;
    }
    p{
        font-size:30px;
    }
</style>
​
<div class="wrap">
     <p class="title">hello world</p>
</div>
```

接下来一步一步彻底熟悉页面渲染：

**1、HTML代码解析生成DOM树**

什么是DOM树?浏览器将HTML解析成树型的数据结构。解析树的根节点是Document对象，文本对象是最底层的节点。

先看上述代码的DOM虚拟结构：

```
var dom={
     target:{
                el:'div',
                class:'wrap',
                children:[
                      {
                            target:{
                            el:'p',
                            class:'title',
                            value:'hello world'
                           }
                      }
               ]
    }
}
```

再看生成的DOM树（图为展示head节点的其余子节点）：


![image-20221017194654460.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b7a70f9342ef4cf9902d866f5d75bf81~tplv-k3u1fbpfcp-watermark.image?)

**2、CSS代码解析生成CSSOM树**

什么是CSSOM树？当 CSS 下载完，通过CSS 解析器把 CSS 解析成 CSS 对象，然后把CSS 对象组装成 CSSOM 树。在浏览器构建 DOM 树的同时，如果样式也加载完成，则 CSSOM 树也在同步地构建。

```
        var dom={
            target:{
                el:'div',
                class:'wrap',
                style:{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#bfa'
                },
                children:[
                    {
                        target:{
                            el:'div',
                            class:'wrap',
                            value:'wrap'
                        }
                    }
                ]
            }
        }
```

CSSOM树如下展示：

![image-20221017200458247.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/288ac032fc9749d89ae2d237c1e61484~tplv-k3u1fbpfcp-watermark.image?)
另外，CSSOM 树和 DOM 树是两个独立的数据结构，它们没有一一对应的关系。

**3、结合DOM树 和CSSOM树，生成一个render树（*重排*）**

什么是render树？DOM树和CSSOM树都构建完成以后，浏览器会根据这两棵树生成一个渲染树。也就是吧HTML按照一定的布局和样式显示出来。


![image-20221017210216077.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7df6bdd1dc0642f095ac8370201158c0~tplv-k3u1fbpfcp-watermark.image?)

**4、布局,将渲染树的所有节点进行平面合成（页面依然没有渲染）（*重绘*）**

渲染树构建完成后，所有元素的位置关系以及对应的样式就已确定，同时浏览器会计算出所有元素的大小和绝对位置。

发生重绘，不一定会发生重排；发生重排，一定会发生重绘。

**5、绘制页面到屏幕上（render-UI）**

布局计算完成后，浏览器就在页面上渲染元素，经过渲染引擎的处理后，整个页面就显示在屏幕。

整体过程如下图：


![image-20221017230633257.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/245a32c043b64016bd828a9a7ee39fac~tplv-k3u1fbpfcp-watermark.image?)

## 二、渲染

网页生成的时候，至少渲染一次

## 三、回流（重排）

*所有导致元素几何信息发生变化的操作*。

当浏览器生成渲染树以后，就会根据渲染树来进行布局（回流），确定各个节点在页面的确切位置和尺寸大小。当元素属性发生改变且影响布局时（位置或尺寸发生改变），发生回流，相当于刷新页面。

### 1、发生重排的操作

（1）window大小被修改 

（2）增加或者删除DOM结构 

（3）元素尺寸发生变化 

（4） offsetWidth和offsetHeight,offset...;

  clientWidth,clientHeight,client...;

  scrollHeight,scrollTop,scroll...;

### 2、减少重排操作

--元素脱离文档流

--改变样式

--回归文档流

## 四、重绘

**所有导致元素非几何信息发生变化的操作**。

当元素属性发生改变但不影响布局时（背景颜色、字体样式等发生改变），发生重绘，但不刷新页面，动态更新内容。

## 五、浏览器的优化

当改变元素的几何信息导致重排（回流）发生，浏览器提供一个渲染队列用于临时存储该次重排（回流），浏览器继续执行代码，如果还有几何信息修改，继续入队，直到没有样式修改，然后浏览器会按照浏览器渲染队列批量优化重排过程。

offsetWidth和offsetHeight,offset...;

clientWidth,clientHeight,client...;

scrollHeight,scrollTop,scroll...

会强制刷新渲染队列（立即执行修改任务）

## 六、什么情况下会发生重排？

### （1）导致回流的操作

页面首次渲染 

浏览器窗口大小发生改变 

元素尺寸或位置发生改变 

元素内容变化（文字数量或图片大小等等） 

元素字体大小变化 

添加或者删除可见的DOM元素 

激活CSS伪类（例如：:hover） 

查询某些属性或调用某些方法

### （2）导致回流的属性和方法

属性：clientWidth、clientHeight、clientTop、clientLeft offsetWidth、offsetHeight、offsetTop、offsetLeft scrollWidth、scrollHeight、scrollTop、scrollLeft...

方法： scrollIntoView()、scrollIntoViewIfNeeded() getComputedStyle() getBoundingClientRect() scrollTo()...

### （3）导致回流的结构变化

节点的增加与删除，例如，若在body最前面插入一个元素，会导致整个文档的重绘渲染。

## 七、如何减少页面重排与重绘？

### 1、CSS

（1）避免使用table布局。 

（2）尽可能在DOM树的最末端改变class。 

（3）避免设置多层内联样式。 

（4）将动画效果应用到position属性为absolute或fixed的元素上，动画速度越快，回流次数越多。 

（5）避免使用CSS表达式（例如：calc()）。

（6）使元素脱离文档流，这样的变化只会在其内容范围内发生重排（回流），不会影响其他元素。

### 2、JavaScript

（1）避免频繁操作样式，最好一次性重写style属性，或者将样式列表定义为class并一次性更改class属性。 

（2）避免频繁操作DOM，创建一个documentFragment，在它上面应用所有DOM操作，最后再把它添加到文档中。

（3）也可以先为元素设置display: none，操作结束后再把它显示出来。因为在display属性为none的元素上进行的DOM操作不会引发回流和重绘。 

（4）避免频繁读取会引发回流/重绘的属性，如果确实需要多次使用，就用一个变量缓存起来。 

（5）对具有复杂动画的元素使用绝对定位，使它脱离文档流，否则会引起父元素及后续元素频繁回流。

## 八、牛刀小试

```
<div id="app">
</div>
<script>
    let el = document.getElementById("app");
    el.style.width = (el.offsetWidth + 1) + "px";
    el.style.width = 1 + "px";
</script>
```

问：发生了几次重排几次重绘？

思路：确定引起回流和重绘的操作，结合考虑浏览器的优化。

答案：一次重排一次重绘。
