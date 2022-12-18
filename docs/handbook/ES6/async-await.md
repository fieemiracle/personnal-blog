---
title: 消灭异步回调，还得是async-await
date: 2022-07-20
tags:
 - async-await
categories: 
 - ES6
isShowComments: true  
subSidebar: auto
---

本文已参与「新人创作礼」活动，一起开启掘金创作之路。

本篇，带你读懂async~await间的浪漫。

关于异步处理问题，ES5的回调让我们陷入回调地狱轮回，后来ES6的Promise（[Promise不了解？点这了解](https://juejin.cn/post/7122028062702567455)）让我们脱离轮回，终于，ES7的async-await带我们走向光明。今天我们就来学习一夏 async-await，看看与Promise有何联系和区别。

## 一、走进Async-await原理

### 1、原理1

`async函数返回一个 Promise 对象，可以使用then方法添加回调函数`。举例说明：

```
// async返回的是Promise对象？
async function testAsync() {
    return 'hello';//上篇文章Promise对象的返回值如果不是Promise，会通过Promise.resolve()转化为Promise，再进行处理
}
const result = testAsync()
console.log(result);//Promise { 'hello' }  说明async返回的是Promise对象
```

那既然async返回的是Promise对象，那么async后面的函数可以接.then()或者.catch()...嘛？我们试一试就知道了。

```
// async返回的是Promise对象,并且可以接Promise的方法？
async function testAsync() {
    // await await等待还是promise对象
    return 'hello'
}
testAsync()
    .then((result)=>{
        console.log(result);
    })
    .catch((error)=>{
        console.log(error);
    })
//hello  妈耶！打印了！说明async返回的是Promise对象，并且可以接Promise的方法，并且！！！默认状态是resolved的
```

上面代码说明，`async函数内部return语句返回的值，会成为then方法回调函数的参数`

### 2、原理2

`当async函数内部抛出错误的时候，会导致返回的 Promise 对象变为reject状态`。抛出的错误对象会被.then()方法的第二个回调函数接收或者.catch()方法回调函数接收到。

```
// async函数内部抛出错误或者Promise状态为reject
async function testError(){
    //throw new Error('出错啦~~');
    await Promise.reject('出错了');//await前面有return和没有return效果一样
} 
testError()
    // .then(()=>{},(error)=>{console.log(error);})
    .catch(error=>{console.log(error);})
//Error: 出错啦~~
```

### 3、原理3

`await命令后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值`。代码说明：

```
// await
async function getName(){
    // return '来自星星的你';
    return await '来自星星的你';//上面直接return等价于这个return
}
getName()
    .then(result=>{console.log(result);})
//来自星星的你
```

### 4、原理4

`await的使用，必须要有async`。这便是async-await的浪漫所在了：async返回的是一个Promise对象，await等待的就是这个Promise对象，所以await不能没有async（但是async可以没有await）。有没有被浪漫到？反正我是醉了。如果await没有async会怎么样？报错：

```
// await没有async会报错
function testAwait(){
    return await '西红柿炒辣椒'
}
testAwait()
    .catch(error=>{
        console.log(error);
    })
//SyntaxError: await is only valid in async function
```

## 二、深入Async-await规则

### 1、async封装Promise

```
// async封装Promise
async function fn1() {
    return '喜羊羊与灰太狼';// //相当于return Promise.resolve('喜羊羊与灰太狼')
    const data = await fn1();//接收data值
}
fn1()//执行async函数，返回的是一个Promise对象
    .then(data => {
        console.log('content =', data)
    })
​
//content = 喜羊羊与灰太狼
```

### 2、await相当于then

```
// await---.then()
async function getName(){
    const operate=Promise.resolve('白雪公主')//执行函数
    const name= await operate //await相当于Promise的then  operate.then(name=>{})
    console.log('name:',name)
}
getName();
( async function(){
    const person=await '七个小矮人' //await Promise.resolve('七个小矮人') await后面不跟Promise，也会被封装成Promise
    console.log('person:',person)//400
})();//自执行函数
​
//name: 白雪公主
//person: 七个小矮人
```

### 3、多个await时，按时序执行
当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。`任何一个await语句后面的 Promise 对象变为reject状态，那么整个async函数都会中断执行`。

```
async function testOrder() {
    await Promise.reject('出错了')//UnhandledPromiseRejectionWarning: 出错了
    await Promise.resolve('hello world'); // 不会执行
}
testOrder();
```

### 4、try…catch相当于catch

如果希望即使前一个异步操作失败，也不要中断后面的异步操作。可`将第一个await放在try...catch结构里面`，这样不管这个异步操作是否成功，第二个await都会执行。

```
// try...catch
!(async function () {
    const testError = Promise.reject('出错啦~~~')//rejected状态
    // const testError=throw new Error('出错啦~~~');
    try {
        const result = await testError; //await相当于then，但是reject不会触发then
        console.log('success:'+result) //不会输出，因为const result = await testError被报错，被catch捕获
    } catch (error) {
        console.error('error:'+error)//try...catch 相当于Promise的catch
    }
​
})()
//error:出错啦~~~
```
当await后面是Promise对象的时候，我们`也可直接在await后面直接.catch捕获`错误：

```
async function testError() {
    await Promise.reject('出错了')
        .catch(error => console.log(error));//这里捕获错误，不会影响下一个await执行
    
    return await Promise.resolve('hello world');
}
​
testError()
    .then(result => console.log(result))
```

## 三、解析Async-await语法

我们浅浅看一个面试题：

```
// 面试题
function getJSON() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(2);
            resolve(2)
        }, 2000)
    })
}
async function testAsync() {
    await getJSON()
    console.log(3);
}
testAsync()
//2
//3
```

问题当然不会问打印顺序啦，问题是将async await语句解析翻译为Promise？

根据现在的知识面，我们必须知道：

> （1）await不能单独出现，其函数前面一定要有async。
> 
> （2）await会干两件事：
> 
>    第一，将写在await后面的代码放到async创建的那个Promise里面执行。
> 
>    第二、将写在await下面的代码放到前一个创建的那个Promise对象的.then里面执行。
> 
> （3）await返回的也是Promise对象，他只是把await下面的代码放到了await返回的promise的.then里面执行。

这样的话，是不是如鱼得水了。翻译如下：

```
function getJSON() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(2);
            resolve(2)
        }, 2000)
    })
}
// 编译成Promise原理
function testAsync() {
    return Promise.resolve().then(() => {
        return getJSON();
    })
        .then(() => {
            console.log(3);
​
        })
}
testAsync()
```

## 四、拓展Async-await应用

### 1、场景1

你学废async-await了嘛？还记得上一篇开篇的回调地狱嘛？我们通过Promise解决回调是这样的：

```
// Promise解决方式
function doCallback(n) {
    var myPromise = new Promise(function (resolve, reject) {   
        //处理异步任务
        var flag = true;
        setTimeout(function () {
            if (flag) {
                resolve(n)
            }
            else {
                reject('失败')
            }
        },0)
    })
    return myPromise;
}
​
doCallback(1)
    .then((result) => { //then是成功执行的方法 返回的还是一个Promise对象
        console.log(result);//打印张三  res是执行
        return fn(2);
    })
    .then((result) => {
        console.log(result);
        return fn(3)
    })
    .then((result) => {
        console.log(result);
        return fn(4)
    })
    .then((result) => {
        console.log(result);
    })
    .catch((result) => { //catch是失败执行的方法
        console.log(result);
    })
    //好多.then,形成.then链啦
//1
//2
//3
//4
```

通过以上Promise方法，可以明显解决回调地狱“向右移”的浮夸表现，但是，`Promise是基于 then, catch 的链式调用，但也是基于回调函数`。.then链多多少少还是违背原生代码，显得也不是很优雅。作为回调终极武器，async-await更加贴近于原生代码，我们看一下吧：

```
//封装一个返回promise的异步任务
function doCallback(str) {
    var myPromise = new Promise(function (resolve, reject) {
        var flag = true;
        setTimeout(function () {
            if (flag) {
                resolve(str)
            } else {
                reject('处理失败')
            }
        })
    })
    return myPromise;
}
​
//封装一个执行上述异步任务的async函数
async function testAsync() {
    var result1 = await doCallback(1);  //await直接拿到fn()返回的promise的数据，并且赋值给result
    var result2 = await doCallback(2);  //await 后面的代码，都可以看做是异步回调 callback 里的内容，都是异步的
    var result3 = await doCallback(3);
    var result4 = await doCallback(4);
    console.log(result1);
    console.log(result2);
    console.log(result3);
    console.log(result4);
}//这样是不是简洁优雅多了呢？
//执行函数
testAsync();
//1
//2
//3
//4
```

有了 async-await、promise 还有必要学习吗？通过上面async-await的解决方案可以瞧见，`async / await 和 Promise 并不互斥，二者相辅相成`。同时async / await 并不能改变异步的本质（ js是单线程的，异步需要回调，都是要基于 event loop 来实现(什么是event loop?关注我，等我文章~)）。

## 总结

现在知道了，async-await是promise的语法糖了吧，不仅让我们书写代码时更加流畅，而且增强了代码的可读性。特别注意的是：虽然async-await 是建立在 Promise机制之上的，但是并不能取代其地位，他们两者相辅相成，息息相关。其实async-await不止是Promise的语法糖，还是Generator的语法糖，Generator是什么？我们下篇见分晓。

![heiehi.webp](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9c1c37fd40504326b72a86918f41e6f0~tplv-k3u1fbpfcp-watermark.image?)
