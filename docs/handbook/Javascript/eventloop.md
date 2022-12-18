---
title: 挑战一夏，浏览器事件循环（Event Loop）清凉来袭
date: 2022-07-22
tags:
 - 浏览器的事件循环
categories: 
 - Javascript
isShowComments: true  
subSidebar: auto
---

本文已参与「新人创作礼」活动，一起开启掘金创作之路。

什么是事件循环？为什么要进行事件循环？带着同样的问号，本文将简简单单地厘清浏览器事件循环的来龙去脉，保证清凉来袭~。今天我们就来说说浏览器事件循环，Node的事件循环往后放一放熬。
## 写在前面
Event Loop 是一个很重要的概念，指的是计算机系统的一种运行机制。JavaScript语言就采用这种机制，来解决单线程运行带来的一些问题。 浏览器的事件循环是编写的javascript代码和浏览器api调用（Ajax/setTimeout）的一个桥梁，桥梁之间他们通过回调函数进行沟通 多数的浏览器都是多进程的，JavaScript是单线程的，但是JavaScript的线程应该有自己的容器进程：浏览器或者Node。在浏览器中，每次打开一个tab页面就会开启一个新的进程，避免一个页面卡死所有页面无法响应，需要整个强制退出；而在JavaScript中，是在一个单独的线程中执行的 ，同一时刻只做一件事，如果这件事情非常耗时，就会被阻塞。这些简单了解一下就OK。

## 一、准备阶段

### 1、进程和线程？

进程和线程都是CPU工作时间片的描述：

（1）`进程(process)`：描述的是CPU在运行指令及加载和保存上下文所需要的时间。比如计算机已经运行的程序(启动一个应用后程序，默认启动一个进程，也可能是多个进程)。

（2）`线程(thread)`：执行一段指令所需要的时间。操作系统能够运行运算调度的最小单位（每一个进程中，都会启动一个线程来执行程序中的代码，这个线程叫主线程）。

（3）`渲染线程`：读取HTML并且渲染。 js的引擎线程和html的渲染线程是互斥的，不能同时工作（js可以修改DOM结构）。

简单的来说，`进程是线程的容器`，打个比方：一个工厂（操作系统）有很多车间（进程），每个车间（进程）都有工人（线程）。这么说是不是通俗易懂了呢。

### 2、调用栈（执行栈）？

`调用栈`就是 V8内部维护出来的一个用来存放函数的执行上下文环境的一个栈结构。其特点：`先进后出`； 内存泄漏：调用栈被不该用的东西占用，导致可用空间变小

### 3、javascript单线程的好处？

（1）js的单线程可节省内存，节省上下文切换的时间

（2）不会和渲染线程冲突

### 4、浏览器的事件循环(Event Loop)？

--同步代码：代码单线执行，发送服务器请求后，等待返回数据，会出现网页空白（阻塞网页运行）。

--异步代码：代码发送请求后继续执行后续代码，不等待服务器返回数据（网页运行流畅）。

`代码在执行过程中，遇到异步代码，会将异步代码用队列装起来（挂起）。一般异步任务指的都是ajax请求或者定时器等。`

--同步函数调用:该函数会被放到调用栈中执行。

--异步函数调用: 该函数会被放到调用栈中 执行立即结束，不会阻塞后续代码的执行。

### 5、宏任务和微任务？

（1）事件循环中的两个队列（先进先出）：

> `I.宏任务队列`：script整个代码，setTimeut和setInterval（定时器），I/O操作，UI-rendering（UI渲染），ajax请求，Dom监听，requestAnimationFrame等
> 
> `II. 微任务队列` ：Promise.then（Promise的then回调），async-await （async函数的await之后的内容），queueMicrotask，MutationObserver（监控dom变化）

（2）两个队列的优先级 执行每一个宏任务之前，都会查看微任务队列是否有任务需要执行，也就是宏任务执行之前，必须保证微任务是空的。先执行同步代码，再执行微任务，再检查宏任务是否到达时间，到达时间再执行。

### 6、最终执行顺序？

> （1）首先执行同步代码，这属于宏任务
> 
> （2）当执行完所有的同步代码后，执行栈为空，检查是否有异步代码要执行
> 
> （3）执行微任务
> 
> （4）执行完微任务后，有必要的情况下会渲染页面
> 
> （5）开启下一轮Event Loop,也就是执行宏任务中的代码
> 
> (宏任务不一定在微任务之后执行；如果代码中全部都是异步代码，没有同步代码，那么宏任务一定在微任务之后执行)

## 二、试水阶段

### 1、牛刀小试1--定时器

```
let name = 'yd';
setTimeout(function() {
    name = 'zd';
    console.log(name);
}, 1000);
console.log(name);
//yd
//zd
```

首先这个代码是写在javascript里面的，整个代码是一个宏任务，接下来从上往下执行，遇到`定时器（异步任务）`，会等待返回数据，先挂起，执行后续代码，打印name,再执行定时器。有人说，把定时器的时间参数改为0不就好啦？这肯定是不行的，首先，定时器本身就是异步任务；其次，定时器时间参数为0的情况下，比起立即执行代码，也有4ms的延迟。

### 2、牛刀小试2-Promise

```
// 2 Promise
const myPromise = new Promise((resolve, reject) => {
    console.log('start');
    resolve('loading')
    console.log('next');
})
    .then(result => { console.log(result); })
//start
//next
//loading
```

分析：从上往下，先执行Promise中的同步代码，打印start,Promise状态改为resolved，打印next;再执行.then后面的代码。

### 3、牛刀小试3-Async-await

```
// 3 Async-await
async function async1() {
    console.log(123);
    //这里是Async-await编译成Promise的代码，效果一样
    //   return Promise.resolve().then(()=>{
    //     return async2()
    //   }).then(()=>{
    //      return async3()
    //   })
    //   }).then(()=>{
    //     console.log('async1 end');
    //   })
    await async2();
    await async3();
    console.log('async1 end');//微任务
}
async function async2() {
    console.log('async2 end');
}
async function async3() {
    console.log('async3 end');
}
async1();
​
//123
//async2 end
//async3 end
//async1 end
```

解析：从上到下，先执行Async-await的同步代码，打印123，接下来注意的是，`自浏览器更新后，为await开辟特殊通道，async await会立即执行`；所以会依次调用async2和async3，依次打印async2 end，async3 end，最后打印async3 end。

## 三、进阶阶段

### 1、题目一

```
setTimeout(() => {
    console.log('timeout1');
    Promise.resolve().then(data => {
        console.log('then1');
    });
}, 0);
​
Promise.resolve().then(data => {
    console.log('then2');
    setTimeout(() => {
        console.log('timeout2');
    }, 0);
});
```

跟着我全面分析一下：首先这一整个js代码是一个宏任务，从上到下执行这个宏任务，首先碰到*第一个宏任务--定时器*，进宏任务队列；接下来碰到*第一个微任务--Promise.resolve().then()*，这是一个微任务，进微任务队列；整份代码就这两个队列，微任务先执行，打印then2，碰到*第二个宏任务--定时器*，进宏任务队列，微任务队列执行完毕。执行第一个宏任务，打印timeout1，碰到第一个微任务（先前的微任务已经执行完啦），进微任务队列。执行微任务队列，打印then1,再执行第二个宏任务，打印timeout2。使用打印顺序为：then2->timeout1->then1->timeout2。

### 2、题目二

```
console.log('start');
​
async function async1() {
    console.log(123);
    await async2();
    await async3();//微任务1
    console.log('async1 end');//微任务3   这里需要等async3执行完毕，先挂起 
}
async function async2() {
    console.log('async2 end');
}
async function async3() {
    console.log('async3 end');
}
​
async1();
​
setTimeout(() => {//宏任务1
    console.log('setTimeout');
}, 0)
​
new Promise(resolve => {
    console.log('Promise');
    resolve()
})
    .then(() => {//微任务2
        console.log('promise1');
    })
    .then(() => {//微任务4    这里依赖前一个.then的返回结果，先挂起
        console.log('promise2');
    })
console.log('end');
```

代码有点长，我们慢慢分析：从上到下，我门的思想是遇到同步代码执行，遇到异步代码分析是宏任务还是微任务，依次进队列。

首先，打印start，毋庸置疑。接下来，是两个函数，我们要知道，函数声明的时候是不会执行的，直到async1();调用了函数，函数执行，则进入async1函数体内部，打印123，没问题吧。

接下来是 await async2()，立即执行，打印async2 end，上篇文章分析过，`**await后面的代码会立即执行，await下面的代码放到前一个创建的那个Promise对象的.then里面执行-**`- await async3()（*微任务1*），也就是微任务，进微任务队列。await async2()下面的代码-- console.log('async1 end')，亦是如此，所以async2还没执行前，我们先挂起。async1()执行完毕，接下来碰到第一个宏任务定时器，进宏任务队列。

接下来，执行Promise的同步代码，打印Promise，状态为resolved;碰到第一个.then，是一个微任务（*微任务2*），进微任务队列；接下里第二个.then,依赖前一个.then返回的Promise，所以第一个.then还没执行前，先挂起；最后打印end。

```
宏任务队列：宏任务1
微任务队列：微任务1，微任务2，微任务3，微任务4
​
打印结果：start,123，async2 end，Promise，end，async3 end，promise1，async1 end，promise2，setTimeout
```

接下来我们清空以下微任务队列，*执行微任务1*,打印async3 end，同时产生一个微任务（*微任务3*），进微任务队列；*执行微任务2*，打印promise1，同时产生一个微任务（*微任务4*）；检查微任务队列，还有两个微任务，先*执行微任务3*，打印async1 end；再*执行微任务4*，打印promise2

最后我们清空宏任务队列：*执行宏任务1*，打印setTimeout。结束啦，这就是事件循环了，复杂又有趣。

3、题目三

我们再试一下。

```
new Promise(resolve => {//Promise1
    resolve();
})
    .then(() => {//微任务1  Promise2
        new Promise(resolve => {//Promise4
            resolve();
        })
            .then(() => { console.log(123); })//then1
            .then(() => { console.log(234); })//微任务3  then3
    })
    .then(() => {//微任务2   then2---Promise3
        console.log(555);
    })
    .then(() => {//微任务4   then4
        new Promise(resolve => {
            resolve();
        })
            .then(() => { console.log(345); })//微任务5   then5
            .then(() => { console.log(567); })//微任务6   then6
    })
​
```

这个题目看上去简单，实际上还是需要一点技术的。接下来我们分析一下：

从上到下,Promise1的状态变为resolved，执行下一步Promise1.then（*微任务1*），这是一个微任务，进微任务队列，并且会返回一个新的Promise实例，记为Promise2。

此外，我们要知道：**`then中返回一个新的promise实例 ，只有当then中返回的Promise状态确定后才会进行下一步的链式调用`**。Promise后的then也是一个微任务（*微任务2*），进微任务队列，并且返回一个新的Promise对象，记为Promise3，因为Promise3的状态不确定，不会执行到then4，所以先挂起。

```
微任务队列：微任务1，微任务2，微任务3，微任务4，微任务5，微任务6
宏任务队列：
​
执行结果：123,555，234，345，567
```

接下来清空微任务队列：

*执行微任务1*，Promise4的状态为resolved，执行Promise4.then（记为then1）,打印123；then1返回一个新的Promise实例，所以then1.then()是一个微任务（*微任务3*），进微任务队列；

*执行微任务2*，打印555，同时Promise3状态为resolved，执行下一步then4，是一个微任务（记为*微任务4*），进微任务队列；

*执行微任务3*，打印234；

*执行微任务4*，碰到then5（记为*微任务5*），进微任务队列，此时微任务1，微任务2，微任务3已经执行完毕，所以直接*执行微任务5*，打印345，返回一个新的Promise对象，执行then6，是一个微任务（*微任务6*），进微任务队列，此时微任务队列只有微任务6了，执行微任务6，打印567。

结束。这里需要注意的就是，**`then中返回一个新的promise实例 ，只有当then中返回的Promise状态确定后才会进行下一步的链式调用`**。举个例子说明：

```
let myPromise=new Promise((resolve,reject) => {//myPromise
    console.log('promise1');
})
    .then(() => { console.log(123); })
    .catch(()=>{console.log('error');})

//promise1

//只会打印promise1,因为myPromise的状态不确定，所以不会执行下面的.then和.catch。如果状态不确定，我们在
//事件循环中，可以先挂起，等待前一个Promise的状态确定以后再执行
```

4、题目四

因为题目三我也研究了很久，所以为了加深印象，我再举一个例子吧。

```
let myPromise=new Promise((resolve,reject) => {
    console.log('promise1');
    setTimeout(() => {
        resolve();
        console.log(123);
    })
})
    .then(() => { 
        console.log(234); 
    })
    .then(()=>{console.log('error');})
​
//promise1，123,234,error
```

这个题目的可看之处在于，定时器不是最后执行的，现在你们自己试着分析分析，为什么是这个结果吧。**`切记：then中返回一个新的promise实例 ，只有当then中返回的Promise状态确定后才会进行下一步的链式调用。`**重要的事情说三遍。

## 四、思考阶段

学完这篇，相信你已经跃跃欲试了，那就思考下面问题吧：

```
Promise.resolve().then(() => {
    console.log('promise1');
    setTimeout(() => {
        console.log('timeout1')
    }, 0)
})
​
new Promise(resolve => {
    resolve();
})
    .then(function () {
        new Promise(resolve => {
            resolve();
        })
            .then(function () {
                console.log("promise2");
            })
            .then(function () {
                console.log("promise3");
            })
        console.log("then1");
    })
    .then(function () {
        new Promise(resolve => {
            resolve();
        })
            .then(function () {
                console.log("promise4");
            })
            .then(function () {
                console.log("promise5");
            })
​
​
        console.log("then2");
    })
    .then(function () {
        new Promise(resolve => {
            resolve();
        })
            .then(function () {
                console.log("promise6");
            })
            .then(function () {
                console.log("promise7");
            })
        console.log("then3");
    });
​
setTimeout(() => {
    console.log('timeout2')
    Promise.resolve().then(() => {
        console.log('promise8')
    })
}, 0)
```

## 总结

浏览器事件循环到此就告一段落啦~，主要就是，当你一个任务（宏任务或微任务）进入相应队列的时候，当他执行的时候，可能会有新的任务（宏任务或微任务）产生，记得`实时更新任务队列`。此外记得多温习温习哦。
