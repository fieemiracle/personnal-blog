---
title: 我这样实现Promise
date: 2022-11-19
tags:
 - Promise
categories: 
 - ES6
isShowComments: true  
subSidebar: auto
---

***本文正在参加[「金石计划 . 瓜分6万现金大奖」](https://juejin.cn/post/7162096952883019783 "https://juejin.cn/post/7162096952883019783")***

## 一、剖析Promise的基础框架

要实现Promise原理，肯定得先明白其原理。Promsie的基础框架如下：

```
// 挂在原型上的方法，实例对象可以访问并且使用
MyPromise.prototype.then = function(onResolved, onRejected) {
    //.then接收两个函数类型的形参，分别处理Promise为成功和失败状态时的情况
}
MyPromise.prototype.catch = function(onRejected) {
    //.catch接收一个函数类型的形参，相当于.then的第二个回调函数
}
//...还有一些其他方法
function MyPromise(executor) {
    // Promise的初始状态为pending
    let self = this;
    this.status = 'pending'
    //executor包含两个函数类型的形参，即resolve和reject
    function resolve() {}
​
    function reject() {}
​
    //其他具体操作
}
```

## 二、实现Promsie中两个类型为函数的形参

我们首先要明白的是：

### 1、Promise的三种状态

（1）pending（待处理）：Promise的初始状态 （2）fufilled（处理成功）：Promise执行完resolve回调后的状态 （3）rejected（处理失败）：Promise执行完reject回调后的状态 当Promise状态为pending状态的时候，为同步代码，如果后面接.then，不会执行它的回调函数； 当状态为resolved和rejected是，为异步代码，可用定时器模拟实现。

### 2、Promise的两个类型为函数的形参

（1）resolve：调用resolve函数，Promise状态变为成功

（2）reject：调用reject函数，Promise状态变为失败

有了以上的知识基础，是不是就更好下手了。

```
(function(window) {
    function MyPromise(executor) {
        let self = this //保存this对象
        self.status = 'pending' //初始状态为pending
        self.data = undefined
        self.callbacks = []
​
        // 实现resolve
        function resolve(value) {
            //必须是pending状态,Promsie的状态只会被改变一次
            if (self.status !== 'pending') {
                return
            }
            // 将状态变为fullfilled
            self.status = 'fullfilled'
            self.data = value
​
            //有没有待执行的回调函数
            if (self.callbacks.length > 0) {
                //如果有，必须都执行
                setTimeout(() => {//定时器模拟异步
                    self.callbacks.forEach(callbackObj => {
                            callbackObj.onResolved(value)
                    })
                })
            }
        }
​
        function reject(value) {
            // 同样也必须是pending状态
            if (self.status !== 'pending') {
                return
            }
            // 将状态变为rejected
            self.status = 'rejected'
            self.data = value
​
            // 有没有待执行的回调
            if (self.callbacks.length > 0) {
                //如果有，必须都执行
                setTimeout(() => {//定时器模拟异步
                    self.callbacks.forEach(callbackObj => {
                        callbackObj.onRejected(value)//失败的回调
                    })
                })
            }
        }
        
        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }
    window.MyPromise = MyPromise
})(window)
```

简单概括，实现resolve和reject步骤，

（1）判断状态是否为‘pending’，必须是'pending'状态，因为Promise的状态只会改变一次，如果执行resolve和reject的时候，状态不是'pending'状态，那么它的状态是不会再被改变的。如果状态仍然为Promsie的初始状态'pending'，则进行下一步操作；否则，如果不是，直接跳过，不需要任何返回值。

（2）如果是'pending'状态，将状态改变为成功或者失败状态，同时将数据包裹传递，让.then或者.catch执行的时候，可以得到返回值；

（3）判断是否还有未执行的回调函数，一般是指.then或者.catch里面的还未执行的回调函数，如果有的话，必须都执行，同时他都是异步代码，使用定时器模拟异步效果。

（4）最后，使用*try{}catch(){}*模块，try里面执行这个Promise的异步函数，如果有异常，统一按照rejected状态处理错误。

## 三、实现.then

（1）then接收两个函数类型的参数，第一个是Promise成功情况的回调，第二个是失败情况的回调；当Promise状态为成功时执行第一个回调函数，当Promsie状态为失败时执行第二个回调函数。

（2）Promise的.then是微任务

（3）Promise的.then可以链式调用

（4）.then返回的是一个Promise对象

.then是Promise原型上的，所以可以将它挂载原型上实现：

```
MyPromise.prototype.then = function(onResolved, onRejected) {
        // 把回调用对象包裹，存放在callbacks中
        let self = this
        return new MyPromise((resolve, reject) => {
            if (self.status === 'pending') { //状态还未改变，.then有两个回调函数
                self.callbacks.push({
                    onResolved,
                    onRejected
                })
            } else if (self.status === 'fullfilled') { //状态为成功，执行onResolved
                //定时器模拟.then的异步执行
                setTimeout(() => {
                    const result = onResolved(self.data)
                    if (result instanceof MyPromise) { //返回值是Promise对象
                        result.then( //为了将result的状态变更成resolved
                            (res) => {
                                resolve(res)
                            },
                            (err) => {
                                reject(err)
                            }
                        )
                        return result
                    } else { //返回值不是Promise对象
                        resolve(result)
                    }
                })
            } else { //状态为成功，执行onRejected
                setTimeout(() => {
                    onRejected(self.data)
                })
            }
        })
}
```

实现.then最大的难点就是它的链式调用，如果返回值是一个Promise对象，就执行.then里面的操作；但是如果返回值不是Promsie对象，那就直接调用Promise的resolve函数。另外，还需要明确this的指向，这里this指向的不是新生成的Pomise对象，这点比较重要。

## 四、实现.catch

（1）.catch回调相当于.then的第二个回调，可以捕获reject出来的错误或者直接在Promsie内部throw new Error()出来的错误。它的实现相对比较简单，如果状态为rejected，我们就执行onRejected函数，同时也需要使用定时器模拟异步。

```
MyPromise.prototype.catch = function(onRejected) {
        let self = this
        if (self.status == 'pending') {
            self.callbacks.push({
                onRejected
            })
        } else if (self.status == 'rejected') {
            setTimeout(() => {
                onRejected(self.data)
            })
        }
}
```

除了.then和.catch方法是挂载在Promise原型上的回调函数，还有Promise.prototype.finally()；另外Promise.all()，Promise.race()。。。不是原型上的方法。感兴趣的可以尝试写出他们的实现原理。

## 五、测试
### 1、resolve

Promsie内部没有任何其他return情况，测试如下：

```
let promise = new MyPromise((resolve, reject) => {
    resolve('成功啦~')
}).then(res => {
    console.log(res); //成功啦~
})
```

### 2、reject

```
let promise = new MyPromise((resolve, reject) => {
    reject('失败啦~')
}).then(res => {
    console.log(res);
}, err => {
    console.log(err);//失败啦~
})
```

### 3、.then

```
let MyPromiseTest = new MyPromise((resolve, reject) => {
        resolve('成功啦');
    }).then(res => {
        console.log(res);
​
    })
    .then(res => {
        console.log('猜猜我打印什么');
    })
//成功啦
//猜猜我打印什么
```

### 4、.catch

```
let promise = new MyPromise((resolve, reject) => {
    reject('失败啦')
}).catch(err => {
    console.log(err);//失败啦
})
```
以上实现原理只能在浏览器执行成功，因为node端没有window对象；如果想在node端实现Promie原理，最推荐和优雅的方式就是使用ES6里面的class（类），使用类的话，原型上的方法就写在constructor里面，而其他方法不是原型上的，是类的静态方法，逻辑都一样的哦~。