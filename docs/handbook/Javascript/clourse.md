---
title: javascript--闭包知多少
date: 2022-07-14
tags:
 - 闭包
categories: 
 - Javascript
isShowComments: true  
subSidebar: auto
---

本文已参与「新人创作礼」活动，一起开启掘金创作之路。

闭包（closure），在JavaScript的学习中，闭包无处不在，与其空谈，不如实干，今天就来了解理解闭包的本质和工作原理吧。

## 一、闭包的概念

> 一个函数和对其周围状态（lexical environment，词法环境）的引用捆绑在一起（或者说函数被引用包围），这样的组合就是闭包（closure）。

请看以下代码：

```
function outer(){
    var name="来碗盐焗星球";//局部变量
    function inner(){//内部函数
        console.log(name);
    }
    inner();
}
var name="小新没蜡笔";//全局变量
outer();
```

以上代码，浅显地展示了闭包。实际上，`创建函数的同时，闭包也会随之产生`。也就是说，inner实际上就是一个闭包！因为inner内部本身没有name变量，但是确确实实打印了值，这就说明inner可以访问其外部函数的变量（局部变量），与此同时，`闭包刚好就是能够读取其他函数内部变量的函数`，这里可以简单地理解为，闭包可能就是函数内部的子函数，同时它能够访问。

但是这不意味着，可以访问外部函数的函数就是一个闭包，而是，是闭包让你可以在一个内层函数中访问到其外层函数的作用域。虽然有点绕，但是理解了本质就迎刃而解了。

再看一个常见的闭包效果：

```
function doConsole(name){
    setTimeout(()=>{
        console.log(name);//来碗盐焗星球
    },1000);
}
doConsole("来碗盐焗星球");
```

这个例子是常见的定时器，定时器里面的内部匿名函数是回调函数，这是观察闭包效果很好的例子。这个匿名函数作为参数传递给了setTimeout，同时具有函数doConsole作用域的闭包，可以访问到变量name的引用。而在doConsole函数执行完毕之后，它的内部作用域不会被销毁，这就是闭包的神奇之处了。

## 二、闭包的作用

兜兜转转，还是得从闭包的作用出发，方能理解闭包。还记得AO对象和GO对象嘛？不记得[戳这里](https://juejin.cn/post/7116516393100853284)。

（1）实现共有变量（模块化）

> 实现共有变量（模块化），全局变量能够通过闭包实现局部（私有）。
例如：累加器

```
 // count是全局变量，污染全局
 var count=0;
 function add(){
     return count++;
 } 
 console.log(add());//0
 console.log(add());//1
 console.log(add());//2

 // count不是全局变量
function add() {
    var count=0;
    function a() {
        count++;
        // return count;
        console.log(count);//1
    }
    return a;
}
var res = add();
res()
```

（2）做缓存

> 函数一旦被执行完毕，其内存就会被销毁，而闭包的存在，就可以保有内部环境的作用域。

```
function fruit() {
    var food = 'apple'
    var people = {
      eatFood: function() {
        if (food !== '') {
          console.log('还有 ' + food);
          food = ''
        } else {
          console.log('没水果了');
        }
      },
      pushFood: function(myfood) {
        food = myfood
      }
    }
    return people
  }
  var person = fruit()
  person.eatFood()//还有 apple
  person.eatFood()//没水果了
  person.pushFood('banana')
  person.eatFood()//还有 banana
```

（3）实现私有化

> --闭包可以实现封装，是一种保护私有变量的机制，在函数执行时形成私有的作用域，保护里面的私有变量不受外界干扰。直观的说就是形成一个不销毁的栈环境，使函数可以继续访问定义时的词法作用域。

```
var name="开心超人"
function outer(){
    var name="来碗盐焗星球";
    function inner(){
        console.log(name);
    }
    // inner();
    return inner;//inner在使用内部作用域
}
var doOuter=outer();这里outer函数已经被调用了！但是因为inner被return，outer的内部作用域依然存在
doOuter();//这就是闭包
```
按照`垃圾回收机制`，outer执行完毕是会被回收的，释放内存，但是因为闭包的存在，闭包会阻止垃圾回收的进行，所以outer的内部作用域依然存在，依然可以被内部函数访问到。

（4）模块化开发

> --模块化开发可以防止污染全局变量
> 
> 模块函数也可以传参数，模块函数具备条件：
> 
> （1）有外部的封闭函数，且该函数至少被调用一次，每次调用都会创建一个新的模块实例
> 
> （2）封闭函数必须返回至少一个内部函数，便于在私有作用域形成闭包，且可以访问或者修改私有状态

```
// 模块函数
function aModule(){
    var name="来碗盐焗星球"
    function inner(){
        console.log(name);
    }

    return {inner:inner}
}
var doModule=aModule();
doModule.inner();
```

## 三、闭包的缺陷

### （1）内存泄漏

> --简而言之，内存泄漏就是可用空间变小的现象
> 
> --闭包会导致原有的作用域链不释放，导致`内存泄漏`

```
function b(){
       var a=123;
      b();//这里b已经被调用一次
}
b();
```

## 四、闭包的应用场景

闭包其实无处不在，但凡`使用了回调函数的，实际上就是在使用闭包`。接下来我们来瞅一瞅闭包的经典应用场景。

### （1）定时器

定时器的第一个参数接收一个回调函数，这个回调函数可以是匿名的，具名的，也可以是箭头函数。

```
let name = "来碗盐焗星球";
setTimeout(function timeHandler() {
    console.log(name);//来碗盐焗星球
}, 1000)
```

### （2）事件监听器

```
<style>
    .box{
       width: 100px;
       height: 100px;
       background-color: #bfa;
    }
</style>
<body>
    <button id="btn">点我试试</button>
    <button id="btn01">再点以下试试</button>
    <div class="box"></div>
​
    <script>
        var btn=document.getElementById('btn');
        var btn01=document.getElementById('btn01');
        var box=document.querySelector('.box')
        btn.addEventListener('click',function(){//事件监听器，第二个参数就是一个回调函数，也可以写成箭头函数...
            box.style.backgroundColor='pink'
        });
​
        btn01.onclick=function(){
            box.style.backgroundColor='red'
        };
    </script>
</body>
```

### （3）return一个函数

```
var name = '来碗盐焗星球';
function fn() {
    var name = 20;
    function f() {
        console.log(name);//蜡笔小新?
    }
    f();
    return f;//此处函数引用，导致fn()执行完毕后，栈内存不会被销毁
}
var doName = fn();
doName();//蜡笔小新??
```

### （4）异步编程

其实异步编程有很多类型，比如Ajax异步，Promise函数，async函数。。。，我们以Promise举例：

```
let myPromise=new Promise(function(myResolve,myReject){
    var num=6;
    if(num==6){
        myResolve();//成功函数
    }else{
        myReject();//失败函数，这两个也是回调函数
    }
});
myPromise.then(
    function(value){
        console.log('you are right!!');
    },
    function(error){
        console.log('error!!');
    }
)
```

### （5）IIFE模式

什么是IIFE模式？IIFE模式其实就是比较适合研究闭包的自执行函数。自执行函数也是可以传参的。

```
var name = '来碗盐焗星球';
(function doName() {
    console.log(name);//来碗盐焗星球
})();
```

### （6）for循环和闭包

```
function foo() {
    for (var i = 0; i < 10; i++) {
        // (function (j) {//循环和自执行函数--闭包
        //     setTimeout(function () {
        //         console.log(j);
        //     }, 1000 * j)
        // })(i);//
        setTimeout(function () {//for循环和定时器回调函数--闭包
            console.log(j);
        }, 1000, i)
    }
}
```

### （7）块作用域和闭包

块作用域，在[作用域和作用域链](https://juejin.cn/post/7116516393100853284)一文中，提到过，像我们接触的let作用域，代码块{}，for循环用let时的作用域，if,while,switch等等。我们以let为例：

```
for(let i=1;i<6;i++){
    setTimeout(()=>{
        console.log(i);
    },i*1000);
}
```

我们必须知道的是，for循环头部的let声明会使得变量不止被声明一次，这使得结果依次，每隔i*1000，打印1,2,3,4,5.其实这个代码是以下代码演变而来的：

```

for(var i=0;i<=5;i++){
    let j=i;//此处便是闭包的块作用域
    setTimeout(()=>{
        console.log(j);
    },j*1000)
}
```

### （8）函数作为参数

其实函数作为参数跟回调函数具有异曲同工的效果，请看下面代码：

```
var a = '来碗盐焗星球';
function outer() {
    var a = '小猪佩奇';
    function inner() {
        console.log(a);//小猪佩奇
    }
    return inner;//此处return的是函数引用
}

function other(func) {//定义形参传入一个函数
    var a = '小狗汪汪队';
   func();//在此处调用形参
}
other(outer());//实参为outer函数，根据词法作用域  小猪佩奇
```

以上便是一些简单的闭包使用场景了，简单来说，`当一个函数被保存到了外部，将会产生闭包`。相信你已经能在慢慢代码海里，一眼认出闭包的。闭包的应用场景总结不是很全面，欢迎评论区补充哟~。
