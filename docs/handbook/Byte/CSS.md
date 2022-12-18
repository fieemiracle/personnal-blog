---
title: CSS小知识|青训营笔记
date: 2022-08-23
tags:
 - 青训营笔记
categories: 
 - 字节青训营笔记
isShowComments: true  
subSidebar: auto
---
---

这是我参加青训营笔记的第2天。

## 一、英文超出自动换行

在CSS中，可以使用`word-wrap: break-word;`或`word-break:break-all;`来让英文强制换行。

`word-break: break-all;` 设置文字的强制自动换行，但只对英文起作用，以字母作为换行依据。

`word-wrap: break-word;` 设置文字的强制自动换行，但只对英文起作用，以单词作为换行依据。

来看一个小demo:

```
<style>
            div {
                overflow-wrap: break-word
            }
            div {
                /* width: 9em; */
                border: 1px solid #000000;
            }
            div.letter {
                word-wrap: break-word;
            }
            div.word {
                word-break: break-all;
            }
</style>
<body>
        <div>
            This paragraph text. aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        </div>
        <div class="letter">
            This paragraph text. aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        </div>
        <div class="word">
            This paragraph text. aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        </div>
</body>
```

结果如图所示：


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d377061e1ec547609489e1b468b9c7d5~tplv-k3u1fbpfcp-watermark.image?)

## 二、块级排版上下文

（1）BFC--Block Formatting Context(块级格式化上下文) 某些容器会创建一个BFC： 根元素 浮动、绝对定位、inline-block Flex子项和Grid子项 overflow值不是visible的快盒 display:flow-root

（2）BFC排版规则 盒子从上倒下排放 垂直margin合并 BFC内盒子的margin不会与外面的合并 BFC不会和浮动元素重叠

（3）概括与扩展：

```
#概念(范围)：一个BFC包含该上下文的所有子元素，但不包含创建了新BFC容器的内部元素
         一个元素不能同时处于两个bfc容器
​
#效果：让处于bfc内部的元素与外部的元素相互隔离，使内外元素的定位（浏览器的渲染位置）不会相互影响
      1、重点:解决外边距重叠
      2、内部盒子会在垂直方向上一个接一个排列
      3、bfc容器在计算高度的时候，会连着浮动元素计算在内，所以可以借助bfc清除浮动
​
视觉格式化模型--Box
#BFC的创建方法：
    （1） 给开启浮动元素的父辈容器设置浮动，float:left/right
    （2） 给开启浮动元素的父辈容器开启定位，position:absolute/fixed
    （3） 给开启浮动元素的父辈容器设置display,
            行内块： display:inline-block
            表格单元：display:table-cell/table(属性值含有table的都可以)
            弹性布局:display:flex
    （4）给开启浮动元素的父辈容器设置overflow
            overflow:auto|hidden|overlay|scroll(非visible的值)
```

看一个BFC的小demo:

```
 <style>
        *{
            margin: 0;
            padding: 0;
        }
        ul li{
            width: 200px;
            height: 100px;
            margin-right: 20px;
            background-color: #ff6799;
            float: left;
            list-style: none;
            text-align: center;
            line-height: 100px;
            font-size: 30px;
            font-weight: 500;
        }
        /* 1给父辈容器设置 float：left/right */
​
        .box6{
            width: 100%;
            height: 600px;
            background-color: #bfa;
            overflow: auto;
​
        }
        .box7{
            width: 100%;
            height: 200px;
            margin-top: 200px;
            background-color: rgb(184, 201, 31);
            overflow: hidden;
        }
        .box8{
            /* width: 100%;
            height: 100px;
            margin-top: 100px;
            background-color: rgb(31, 167, 201); */
            position: relative;
            display: inline-table;            
        }
        .box9{
            width: 50px;
            height: 50px;
            background-color: #333;
            position: absolute;
        }
</style>
<body>
    <div class="wrap">
        <ul>
            <li>A</li>
            <li>B</li>
            <li>C</li>
        </ul>
    </div>
​
    <div class="bfc1">
        <div class="box">
            <div class="box1">1</div>
        </div>
        <div class="box2">2</div>
​
        <div class="box3 bfc2">
            <div class="box4">4</div>
        </div>
        <div class="box5">5</div>
    </div>
    <br>
    <div class="box6">
        <div class="box7">
            <div class="box8">
                <div class="box9"></div>
            </div>
        </div>
    </div>
</body>
```

效果：


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b4d2f923e0e9443bb81d6fcecf75687d~tplv-k3u1fbpfcp-watermark.image?)

## 三、Grid布局

## 额外知识--自适应单位

（1）px ：px是像素，是相对长度单位，是相对于显示器屏幕分辨率而言的。 px的特性是属于绝对数值，它不受外围单位影响。

（2）em ：em是相对的数值单位，它会受到外围的文字大小所影响，而1em即是1倍的文字大小，1.5em也就是1.5倍的文字大小。它的单位长度是根据元素的文本垂直长度来决定的，可以作用在width、height、lineheight、margin、padding、border等样式的设置上。

（3）rem ：rem是相对单位，是于HTML根元素，直白点就是相对于html元素字体大小的单位

优点：这个单位集相对大小和绝对大小的优点于一身，通过它既可做到只修改根元素就成比例地调整所有字体大小，又可以避免字体大小逐层复合的连锁反应。

（4）fr ：是一个自适应单位，fr单位被用于在一系列长度值中分配剩余空间，如果多个已指定了多个部分，则剩下的空间根据各自的数字按比例分配。

```
（1）划分网络
    grid-template-columns:100px 100px 200px//3列
    grid-template-rows:100px 100px//2行
    
    grid-template-columns:30% 30% auto//3列
    grid-template-rows:100px auto//2行
    
    grid-template-columns:100px 1fr 1fr //3列
    grid-template-rows:100px 1fr//2行
​
（2）网格线（grid line）
（3）网格区域（grid area）
```

来看一个小demo:

```
//wxml:
<view class="timeKeeping_catalogue">
    <view class="timeKeeping_item {{index==itemId?classArr[index].className:''}}" wx:for="{{catalogue}}" wx:key="index" data-index="{{index}}" bindtap="handleChangeItem">
      <view class="timeKeepimg_item_icon">
        <image src="{{item.item_icon}}"></image>
      </view>
      <view class="timeKeeping_item_title">{{item.item_title}}</view>
    </view>
</view>
​
//wxss
.timeKeeping_catalogue {
  width: 100%;
  height: 480rpx;
  display: inline-grid;//网格布局
  grid-template-columns: 230rpx 230rpx 230rpx;//3行
  grid-template-rows: 230rpx 230rpx 230rpx;//3列
  background-color: #ffffff;
  padding: 10px;
  box-sizing: border-box;
}
```

来看看效果吧。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a8226b98b86b4bfe822401aa7ae0d446~tplv-k3u1fbpfcp-watermark.image?)

你学会了吗？
