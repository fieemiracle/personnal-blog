---
title: javascript中的糖衣语法--Promise对象
date: 2022-07-19
tags:
 - Promise
categories: 
 - ES6
isShowComments: true  
subSidebar: auto
---

本文已参与「新人创作礼」活动，一起开启掘金创作之路。

知道Promise对象的你，知道在使用Promise对象的时候，我们如何做到在使用中如鱼得水嘛？10分钟带你迅速上手！
## 一、Promise的诞生
### 1、回调地狱
最初javascript的异步实现就是使用回调函数。回调地狱就是：一个函数需要等它的回调函数（或者回调和回调的回调...）执行完毕之后再执行。简单来说，`回调函数里面嵌套回调函数`。而因为回调地狱的问题，Promise就出现了。我们看看什么是回调地狱：

```
// 回调地狱
//地狱回调
setTimeout(function () {  //第一层
    console.log(1);//等4秒打印1，然后执行下一个回调函数
    setTimeout(function () {  //第二层
        console.log(2);//等3秒打印2，然后执行下一个回调函数
        setTimeout(function () {   //第三层
            console.log(3);//等2秒打印3，然后执行下一个回调函数
            setTimeout(function () {   //第四层
                console.log(4);//等1秒打印4
            }, 1000)
        }, 2000)
    }, 3000)
}, 4000)
```

可看出`回调地狱的特点`：

```
1.难以复用
2.堆栈信息被断开
3.借助外层变量
```

回调地狱是为了让我们代码执行顺序的一种操作（解决异步），但是它会使我们的可读性非常差。当你有100个，1000个...，代码会不断右移，不够优雅，也会影响性能。嵌套和缩进只是回调地狱的一个梗而已，它导致的问题远非嵌套导致的可读性降低而已。接下里我们今天的目的，就是将上面的回调地狱用Promise解决。

## 二、Promise的行为

### 1、Promise的语法

`Promise的基本语法`：Promise函数接收一个函数作为参数，这个函数有两个参数，一个是成功函数(resolve)，一个是失败函数(reject)。Promise的.then接收两个回调函数，一个是成功函数的回调，一个是失败函数的回调。这两个函数可选，不一定要提供
```
//Promise语法
let myPromise = new Promise(function(resolve, reject) {
    // "Producing Code"（可能需要一些时间）
    
      resolve(); // 成功时
      reject();  // 出错时
    });
    
    // "Consuming Code" （必须等待一个兑现的承诺）
    myPromise.then(
      function(value) { /* 成功时的代码 */ },
      function(error) { /* 出错时的代码 */ }
    );
```

> 特别注意：
> 
> （1）Promise对象中的状态不会被外界干扰。状态的改变取决于异步的操作结果。
> 
> （2）Promise对象的状态一旦被改变，就不会进行再次改变。
例如：

```
let myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('ok');//第一次状态为成功
        reject('no');//不会改变
    })
}).then(
    function (result) { console.log('resolved'); },//成功状态执行then后面的成功回调函数
    function (error) { console.log('reject'); }
)
//resolved
```

> （3）Promise新建后就会立即执行，Promise后面的.then是一个异步操作，在事件循环中叫做“微任务”。会放在同步代码后面执行。
例如：

```
let myPromise=new Promise((resolve,reject)=>{
    console.log('Promise');//1
    resolve();
})
    .then(()=>{//这里是一个异步操作
        console.log('succeed');//3
    })
console.log('Promise resolved');//2
// Promise
// Promise resolved
// succeed
```

## 2、Promise的方法

### （1）Promise.prototype.then()

then方法的返回结果是`新的Promise实例`，对象状态由回调函数的执行结果决定。then方法后面还可以再调用另一个then方法，形成链条。采用`链式的then`，可以指定一组`按照次序调用`的回调函数。

```
const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        //设置 p 对象的状态为失败，并设置失败的值 
        reject("出错啦!");
    }, 1000)
});
p.then(
    function(value){},
    function(reason){console.log(reason);}
)
.then(()=>{
    console.log(123)
});
```

### （2）Promise.prototype.catch()

catch()用于指定发生错误时的回调函数.例如：

```
const p = new Promise((resolve, reject) => {//p为Promise的实例
    setTimeout(() => {
        //设置 p 对象的状态为失败，并设置失败的值 
        reject("出错啦!");//reject()方法的作用，等同于抛出错误
    }, 1000)
});
// p.then(function(value){},function(reason){
// // console.error(reason); 
// console.log(reason);
// });
​
p.catch(function (reason) {//相当于上面的.then(...)
    console.log(reason);//捕获reject状态的值
});
```

建议总是使用`catch()`方法，而不使用`then()`方法的第二个参数.

catch()还可以这样使用：

```
const myPromise = new Promise(function(resolve, reject) {
    throw new Error('出错啦');//从这抛出错误，catch()指定的回调函数也可以捕获
  });
  promise.catch(function(error) {
    console.log(error);
});
```

### （3）Promise.prototype.finally()

`finally()`方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。而且`finally`方法总是会返回原来的值。举个例子：

```
function a(){
    return new Promise((resolve,reject)=>{
        resolve('ok')
    },1000)
}
​
function b(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            reject('no')
        },1500)
    })
}
function c(){
    setTimeout(()=>{
         console.log('finally');
    },500)
   
}
a()
    .then((res)=>{
        console.log(res);
        return b()
    })
    .catch((err)=>{
        console.log(err);
    })
    .finally(c)//参数不是回调函数，如果是回调函数也不需要带参
​
//ok
//no
//finally //说明finally()照样执行，有打印
```

### （4）Promise.resolve()

将现有对象转为 Promise 对象,状态为`resolved`。举例如下：

```
let myString='hello';
console.log(myString);//hello

const myPromise=Promise.resolve(myString)//带参
//等同于const myPromise=Promise.resolve('hello')
console.log(myPromise);//Promise { 'hello' }

myString=Promise.resolve();//不带参，直接调用
console.log(myString);//Promise { undefined }
myString.then(result=>{//说明myString已经是Promise对象了，只有Promise对象才有.then
    console.log(result);//undefined
})
```

### （5）Promise.reject()

也会返回一个新的 Promise 实例，该实例的状态为`rejected`。简单举例：

```
// 以上代码等于
const p=new Promise((resolve,reject)=>{
    reject('error')
})
p.catch(error=>{
    console.log(error);//error
})
// 或者
p.then(function(){},function(error){console.log(error);})//error
// 或者
p.then(null,function(error){console.log(error);})//error
// 或者
p.then(undefined,function(error){console.log(error);})//error
```

### （6）Promise.all()

all()是将多个 Promise 实例，包装成一个新的 Promise 实例。接收一个数组作为参数，数组的每一项都是·Promise对象的实例。如果不是，会通过Promise.resolve()将参数转为Promise实例，再进行处理。`all()用于将多个 Promise 实例，包装成一个新的 Promise 实例`。

```
// promise.all()
const myPromise1=new Promise((resolve,reject)=>{
    resolve('sure');
})
    .then(result=>result)

const myPromise2=new Promise((resolve,reject)=>{
    reject('cancel')
})
    .then(result=>result)
    .catch(error=>error)//myPromise2有自己的catch
//感兴趣的小伙伴可以尝试，如果删除myPromise2.catch(...)后Promise.all([myPromise1,myPromise2])会如何？

Promise.all([myPromise1,myPromise2])//myPromise1,myPromise2都处于成功状态
    .then(result=>{console.log(result);})//走这里  [ 'sure', 'cancel' ]
    .catch(error=>{console.log(error);})
```

### （7）Promise.race()

race()是将多个 Promise 实例，包装成一个新的 Promise 实例。接收一个数组作为参数，数组的每一项都是·Promise对象的实例。如果不是，会通过promise.resolve()将参数转为Promise实例，再进行处理。`只要参数的Promise实例有一个率先改变状态，则状态改变`。例如：

```
const myPromise2 = new Promise((resolve, reject) => {
    setTimeout(()=>{
       reject('cancel') 
    },3000)
    //如果将时间改为<2000,Promise.race([myPromise1, myPromise2])走哪一步呢？
    
})
    .then(result => result)
    .catch(error => error)
const myPromise1 = new Promise((resolve, reject) => {
    setTimeout(()=>{
        resolve('sure');
    },2000)//myPromise1比myPromise2更先改变状态
    
})
    .then(result => result)
​
​
Promise.race([myPromise1, myPromise2])
    .then(result => { console.log(result); })//走这里，sure
    .catch(error => { console.log(error); })
```

> 简要说一下const p1=Promise.all([promise1,promise2,promise3]) 和const p2=Promise.race([promise1,promise2,promise3])的`区别`：
> 
> --前者Promise的实例状态都为resolved时，p1调用.then()里面成功时的回调函数；如果实例状态有一个为rejected，p1调用.then()里面失败时的函数或者走.catch()
> 
> --后者注重时序，如果率先改变状态的实例为resolved，则p2为reslove状态；否则，为reject状态。

## 三、Promise的场景

### 1、Ajax请求
 
```
<head>
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
</head>
<body>
   <div class="name">
      <audio id="audio" controls></audio>
   </div>
        
   <script>
      function getSong() {
       return new Promise((resolve, reject) => {
       $.ajax({
        url: 'https://www.fastmock.site/mock/c024e8920dd6003c63dcd9ed2bbf6cb9/music/music',
        dataType: 'json',
        success(res) {
            console.log(res);
            url = res[0].url;
        }
    })
      resolve();
    })
  }

            function playSong() {
                let audio = document.getElementById('audio');
                window.addEventListener('click', function () {
                audio.src = url;
                audio.play()
            })

            }
            getSong().then(playSong())
    </script>
</body>
```
### 2、文件读取

```
// 引入fs模块
const fs=require('fs');
// 使用Promise封装
const P=new Promise(function(resolve,reject){
    fs.readFile('./text/2.md',(err,data)=>{
        // 如果地址错误，抛出异常
        if(err) reject(err) ;
        
        // 如果成功，输出内容
        resolve(data);
    });
});

P.then(function(value){
    console.log(value.toString());
},function(reason){
    console.log("defeat!!!!");
});
```

### 3、图片加载

```
<body>
    <img src="http://m.imeitou.com/uploads/allimg/220514/5-220514101036.jpg" alt="风景" id="myImage">

    <script>
        const preloadImage = function (path) {
            return new Promise(function (resolve, reject) {
                const image = new Image();
                // 图片加载成功
                image.onload=()=>{
                    resolve(image)
                }
                // 图片加载失败
                image.onerror=()=>{
                    reject('sorry,cannot loding picture')
                };
                image.src = path;
            });
        };

        // 获取图片DOM节点
        var preImage=document.getElementById('myImage')
        // 图片预加载
        preloadImage('http://m.imeitou.com/uploads/allimg/220512/5-220512111J0-50.jpg')
        .then(targetImage=>
            // 点击页面切换图片，让图片加载
            window.onclick=function(){
                setTimeout(()=>{
                       preImage.src=targetImage.src
                },1000)
            }
        )

    </script>
</body>
```

### 4、函数封装

```
//例如将微信小程序里的showModal进行Promise封装，那么在任何需要用到此函数的直接引入就很方便了
// promise形式 封装 showModal
export const showModal=({content})=>{
    return new Promise((resolve,reject)=>{
        wx.showModal({
          title:'提示',
          content:content,
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err);
            }
        });
          
    })
}
```

## 四、Promise的短板

1.无法取消Promise,一旦新建它就会立即执行，无法中途取消

2.如果不设置回调函数，Promise内部抛出的错误，不会反映到外部

3.当处于pending状态时，无法得知目前进展到哪一个阶段，是刚刚开始还是即将完成

## 总结

恭喜你看到文章末尾了，相信你可以写出Promise方案解决第一个回调地狱的异步问题了，快去试试把！
