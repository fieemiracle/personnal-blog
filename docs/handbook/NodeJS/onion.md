---
title: 如果你一层一层一层地剥开洋葱模型，你会明白
date: 2022-07-26
tags:
 - 洋葱模型
categories: 
 - NodeJS
isShowComments: true  
subSidebar: auto
---

本文已参与「新人创作礼」活动，一起开启掘金创作之路。

关于洋葱模型你知道多少？经过短时间接触NodeJS,浅浅地了解了NodeJS的相关知识，很多不太理解，但是对于洋葱模型，个人觉得挺有意思的，不仅是出于对名字的熟悉。刚接触NodeJS不久，今天就浅浅谈谈koa里的洋葱模型吧。

## 知识卡片

### -   koa

    koa是一个精简的Node框架，被认为是第二代Node框架，其最大的特点就是`独特的中间件`流程控制，是一个典型的`洋葱模型`，
    它的核心工作包括下面两个方面：

    (1) 将Node原生的request和response封装成为一个context对象。
    (2)  基于async/await的中间件洋葱模型机制。

### -   中间件

    中间件是一种独立的系统软件或服务程序，分布式应用软件借助这种软件在不同的技术之间共享资源。
    中间件位于客户机/ 服务器的操作系统之上，管理计算机资源和网络通讯。(晦涩难懂了)

    重点：
    //这是一个中间件(app.use(fun)里的fun)，有两个参数，ctx和next
    app.use(async (ctx,next)=>{
        console.log('<<one');
        await next();
        console.log('one>>');
    })

    中间件和路由处理器的参数中都有回调函数，这个函数有2,3,4个参数

    如果有两个参数就是req和res；

    如果有三个参数就是request,response和next

    如果有四个参数就是error，request，response，next

## 洋葱模型执行过程

1、koa写接口

为了更好地引入洋葱模型，我们先从使用koa为切入口。且看下面代码：

```
// 写接口
const Koa = require('koa')//说明安装koa
const app = new Koa()

const main = (ctx) => {
    //   console.log(ctx.request);
    if(ctx.request.url=='/home'){//localhost:3000/home访问
        ctx.response.body={data:1}

    }else if(ctx.request.url=='/user'){//localhost:3000/user访问
        ctx.response.body={name:'fieemiracle'}

    }else{//localhost:3000访问
        ctx.response.body='texts'

    }
}
app.use(main)
app.listen(3000)
```

以上代码，当我们在后端（终端）启动这个项目，可以通过localhost:3000 || localhost:3000/home || localhost:3000/user访问，页面展示的内容不一样，分别对应分支里的内容。

模拟创建接口，虽然通过if分支让代码跟直观易懂，但是不够优雅，当需要创建多个不同接口时，代码冗长且不优雅，需要改进，我们这采用`路由（router）`:

```
// 优化5.js
const Koa = require('koa')
const app = new Koa()
const fs=require('fs') ;
// 路由
const router=require('koa-route')//安装koa-router
​
// 中间件:所有被app.use()掉的函数
const main = (ctx) => {
  ctx.response.body = 'hello'
}
// 中间件:所有被app.use()掉的函数
const about=(ctx)=>{
    ctx.response.type='html';
    ctx.response.body='<a href="https://koa.bootcss.com/">About</a>'
    // ctx.response.body='<a href="/">About</a>'
}
// 中间件:所有被app.use()掉的函数
const other=(ctx)=>{
    ctx.response.type='json';
    ctx.response.body=fs.createReadStream('./6.json')
}

app.use(router.get('/',main));
app.use(router.get('/about',about));
app.use(router.get('/other',other));
// 路由内部有中间件，不需要第二个参数next

app.listen(3000);
```

注意app.use()语句，被app.use()过的，就是中间件。通过传入路由的方式，当我们使用localhost:3000 || localhost:3000/home || localhost:3000/user访问时候，会对应地执行app.use()。这样就更优雅了。接下来我们看看洋葱模型，跟路由这种方式的区别：

```
const Koa = require('koa');
const app=new Koa();

// 洋葱模型（koa中间件的执行顺序）
const one=(ctx,next)=>{
    console.log('<<one');
    next();//执行two()
    console.log('one>>');
}
const two=(ctx,next)=>{
    console.log('<<two');
    next();//执行three()
    console.log('two>>');
}
const three=(ctx,next)=>{
    console.log('<<three');
    next();//没有下一个函数，执行下一个打印
    console.log('three>>');
}
app.use(one)
app.use(two)
app.use(three)
​
app.listen(3000,function(){
    console.log('start');
})
```

上面代码的执行顺序是什么？

```
<<one
<<two
<<three
three>>
two>>
one>>
```

这就是koa的洋葱模型的执行过程：先走近最外层(one),打印'<<one'-->next(),走进第二层(two),打印'<<two'-->next(),走进第三层,打印'<<three'-->next(),没有下一个中间件，打印'three>>'-->第三层执行完毕，走出第三层，打印'two>>'-->第二层执行完毕，走出第二层，打印'one>>'。如图：


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/88b081db5e414cb6b62744dda5b425d6~tplv-k3u1fbpfcp-watermark.image?)

这个轮廓是不是就很像洋葱的亚子。简而言之，`洋葱模型的执行过程就是：从外面一层一层的进去，再一层一层的从里面出来。`

`洋葱模型与路由的区别在于：路由内部有内置中间件，不需要第二个参数next`。

## 洋葱模型执行原理

上面提到过，中间件:所有被app.use()掉的函数。也就是说，没有被app.use()掉，就不算是中间件。

```
//新建一个数组，存放中间件
cosnt middleware=[];
```

当我们使用中间件的时候，首先是使用use方法，use方法会将传入的中间件回调函数存储到middleware中间件数组中。所以我们可以通过`app.use()添加中间件`，例如：

```
app.use(function){
    middleware.push(function);
}
```

监听，当执行app.listen去监听端口的时候，其实其内部调用了http模块的createServer方法，然后传入内置的callback方法，这个callback方法就会将use方法存储的middleware中间件数组传给compose函数（后期补充该内容）。

那么我们将上面的洋葱模型，利用其原理改造一下吧：

```
const Koa = require('koa');
const app=new Koa();

// 添加三个中间件
app.use(async (ctx,next)=>{
    console.log('<<one');
    await next();
    console.log('one>>');
})
app.use(async (ctx,next)=>{
    console.log('<<two');
    await next();
    console.log('two>>');
})
app.use(async (ctx,next)=>{
    console.log('<<three');
    await next();
    console.log('three>>');
})

app.listen(3000,function(){
    console.log('start');
})

//<<one
//<<two
//<<three
//three>>
//two>>
//one>>
```

看！打印结果一样。async和洋葱模型的结合可谓是yyds了，其实，不用async也是一样的。这下明白什么是洋葱模型了吧。

> `compose方法是洋葱模型的核心`，compose方法中有一个dispatch方法，第一次调用的时候，执行的是第一个中间件函数，中间件函数执行的时候就是`再次调用dispatch函数`，也就说形成了一个递归，这就是next函数执行的时候会执行下一个中间件的原因。

因此形成了一个洋葱模型。

```
function compose (middleware) {
  return function (context, next) {
    let index = -1
    // 一开始的时候传入为 0，后续递增
    return dispatch(0)
    
    //compose方法中的dispatch方法
    function dispatch (i) {
      // 假如没有递增，则说明执行了多次
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i;
      
      // 拿到当前的中间件
      let fn = middleware[i];
      
      if (i === middleware.length) fn = next
      
      // 当 fn 为空的时候，就会开始执行 next() 后面部分的代码
      if (!fn) return Promise.resolve()
      try {
        // 执行 next() 的时候就是调用 dispatch 函数的时候
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
        
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}

```

## 洋葱模型存在意义

当在一个app里面有很多个中间件，有些中间件需要依赖其他中间件的结果时，洋葱模型可以保证执行的顺序，如果没有洋葱模型，执行顺序可能出乎我们的预期。

## 结尾

看到第一个koa写接口的例子，我们知道上下文context（简写ctx）有两个属性，一个是request,另一个是response，洋葱模型就是以函数第二个参数next()为切割点，由外到内执行request逻辑，再由内到外执行response逻辑，这样中间件的交流就更加简单。专业一点说就是：

```
Koa的洋葱模型是以next()函数为分割点，先由外到内执行Request的逻辑，然后再由内到外执行Response的逻辑，这里的request的
逻辑，我们可以理解为是next之前的内容，response的逻辑是next函数之后的内容，也可以说每一个中间件都有两次处理时机。洋葱
模型的核心原理主要是借助compose方法。
```


