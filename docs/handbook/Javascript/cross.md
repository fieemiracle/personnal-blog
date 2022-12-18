---
title: 跨域小知识，小白看了都说悟了
date: 2022-10-27
tags:
 - 跨域
categories: 
 - Javascript
isShowComments: true  
subSidebar: auto
---



持续创作，加速成长！这是我参与「掘金日新计划 · 10 月更文挑战」的第7天，[点击查看活动详情](https://juejin.cn/post/7147654075599978532)

## 一、跨域的导火线？

浏览器有一个重要的安全策略--同源策略，是浏览器最核心和最基本的安全策略。

如果没有同源策略，浏览器很容易遭受XSS、CSFR等攻击。

**同源策略**是指，若页面的源和页面运行过程中加载的源不一致时，出于安全考虑，浏览器会对跨域的资源访问进行一些限制。即*协议+域名+端口*三者相同，即使两个不同的域名指向同一个地址，也是非同源的。


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bf229e071bd14eefb93328f77a047232~tplv-k3u1fbpfcp-watermark.image?)

同源策略会限制AJAX请求不能发送等操作。

## 二、跨域？

前后端进行数据交互的时候，经常会存在跨域错误。

跨域指的是，在前端领域中，浏览器允许服务器发送跨域清奇，从而克服浏览器的同源策略的限制；跨域错误指的是浏览器不能执行其他网站的脚本而发生错误。

跨域只会出现在浏览器上,小程序和APP开发不会有跨域问题。

举个例子：

前端代码：

```
        //这里是前端代码
        <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
        <button id="btn">get data</button>
        <script>
            let btn = document.getElementById('btn');
            btn.addEventListener('click', () => {
                $.ajax({
                    url: 'http://localhost:3000',
                    data: {
                        name: 'lucky'
                    },
                    method: 'get',
                    success(res) {
                        console.log(res);
                    }
                })
            })
        </script>
```

后端（node）主要的代码：

```
// 引入规范
//...
​
const main = (ctx, next) => {
    console.log(ctx.query.name);
    // 往前端输出
    ctx.body = 'hi,good afternoon'
}
​
app.use(main)
​
// 监听一个端口
//...
​
```


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9c04c7779f42416fa80daf7f556992ce~tplv-k3u1fbpfcp-watermark.image?)

当我们先将后端开启服务，然后在前端页面点击按钮向后端发请求，请求数据的时候，控制台报跨域错误。这个错误正是源于浏览器的安全机制---同源策略。

## 三、跨域通常发生在？

前端向后端发送接口请求，后端响应回来的数据，在浏览器接收到时被跨域机制拦截下来（限制跨域访问）。

## 四、解决跨域方案？

首先，我们的HTML文件都是这样的：

```
<button id="btn">get data</button>
```

其次，解决跨域，我们还需要知道，HTML5中，有**三个标签允许跨域加载资源**，也就是不受同源策略限制。

```
<link rel="stylesheet" href="xxx.css">
<script src="xxx.js?callback"></script>//只能走get请求
<img src="xxx.xxx" alt="">
```

而接下来的一些方法，就会在这个基础上，朝着这个方向去实现解决跨域的手段。

### 1、JSONP

#### （1）实现原理

首先，JSONP的思路是这样的：

利用**script标签**中的src属性加载资源时不受同源策略的影响这一特性解决跨域（需要前后端的契合）。 

JSONP的做法是：当需要跨域请求时，不使用AJAX，转而生成一个script元素去请求服务器，由于浏览器并不阻止script元素的请求，这样请求可以到达服务器。服务器拿到请求后，响应一段JS代码，这段代码实际上是一个函数调用，调用的是客户端预先生成好的函数，并把浏览器需要的数据作为参数传递到函数中，从而间接的把数据传递给客户端。

从而，我们可以分清楚前后端分别要做的事情：

前端需要做的事情大底上是这样的：

（1）*封装一个JSONP方法*，该方法返回一个Promise对象。

（2）*动态创建一个script标签*，然后设置script标签的src属性，将跨域的API数据接口地址赋值给src，这个地址后面通过?拼接一个回调函数（如callback）；最后让script标签生效。

（3）*准备一个callback函数*（后端会返回一个函数给前端），形参为要获取的目标数据（后端返回的数据）

（4）*调用JSONP方法*

如下大概框架：

```
1、封装一个JSONP方法:
const jsonp=(...)=>{
    return new Promise((...)=>{
        
        //利用JSONP方法发接口请求：
        //（1）凭空创建一个script标签,动态创建 script
        var script = document.createElement('script');
        //设置 script 的 src 属性，并设置请求地址
        script.src = 'http://localhost:3000/?callback=getData';
        // 让 script 生效
        document.body.appendChild(script);
        
        
        2、准备一个callback函数（后端会返回一个函数给前端）
        function callback(data){
            resolve(data)
        }
    })
}
​
//调用JSONP方法
```

后端需要做的事情大底上是这样的：

（1）后端收到请求以后，需要进行特殊的处理：把传递进来的回调函数的函数名与所需数据进行拼接，准备好数据返回给前端

（2）准备好数据以后，后端把准备好的数据通过HTTP协议返回给前端，前端再调用回调函数，对返回的数据进行操作

```
callback()//调用回调函数
```

#### （2）实现代码

接下来就看看，如何实现的吧~。这里是前端代码：

```
let btn = document.getElementById('btn');
// 封装一个JSONP方法
const jsonp = (url, params, cb) => {
    return new Promise((resolve, reject) => {
        // 利用JSONP方法发接口请求
        // 凭空创建script标签
        const script = document.createElement('script');
        params = {
            ...params,
            cb: cb
        }
        //为了不影响前端传来的参数个数
        const arr = Object.keys(params).map(key =>
            `${key}=${params[key]}`); //['name="lucky"','age="19"','cb:xxx']
​
        script.src = `${url}?${arr.join('&')}`; //http://localhost:3000?name="lucky"&age=19&cb:xxx
        document.body.appendChild(script);
​
        // 后端会返回一个函数给前端
        // 前端拿到的相当于：script.src==='callback('lucky is 19 years old!')'
        window[cb] = (data) => { //相当于在window上挂载了一个方法callback
            resolve(data)
        }
    })
}
btn.addEventListener('click', () => {
    // 调用JSONP方法，对后端传来的数据进行加工
    jsonp('http://localhost:3000', {
            name: 'lucky',
            age: 19
        }, 'callback')
        .then((res) => {
            console.log(res);
        })
})
​
```

后端主要代码：

```
//引入一些规范
​
const main = (ctx, next) => {
    console.log(ctx.query);
    const {
        name,
        age,
        cb
    } = ctx.query;
    const userInfo = `${name} is ${age} years old!`;
    const str = `${cb}(${JSON.stringify(userInfo)})`; //'callback()'
    // 往前端输出
    // ctx.body = 'hi,good afternoon'
    ctx.body = str;
}
​
//app监听一个端口
```

#### （3）使用JSONP的优点

使用JSONP比较简单，兼容性也比较好，可用于解决主浏览器的跨域数据访问的问题

#### （4）使用JSONP的缺点

JSONP **只支持发送get请求**，发送请求的方法具有局限性，因为 script 标签只能使用 get 请求；

JSONP 需要后端配合**返回指定格式的数据**。

### 2、Cors

#### （1）实现原理

CORS(Cross-origin resource sharing)跨域资源共享 。*允许浏览器向跨源服务器发出XMLHttpRequest请求*，从而解决跨域问题。后端开启==给前端一个通行证。

CORS需要*浏览器和后端同时支持*，而实现CORS哦通信的关键是后端。只要后端开启了CORS，就实现了跨域。

服务器设置对CORS的支持原理：服务器设置**Access-Control-Allow-Origin**就可以开启CORS，该属性表示哪些域名可以访问资源，若设置成了*，则表示所有网站都可以进行访问资源。 HTTP响应头之后，浏览器将会允许跨域请求。

也许有人会疑问，既然后端就可以开启CORS，跟前端有什么关系哦？实际上，使用CORS解决跨域问题，会在发送请求时出现两种情况，简单请求和复杂请求。

什么是简单请求？什么是复杂请求呢？

请求满足以下条件为**简单请求**：

```
（1）请求方式(Request Method)是 get/post/head
（2）请求头(Request Headers)包含字段可以有：Accept，Accept-Language，content-Language，Last-Event-ID，Content-Type，其中Content-Type的值只能是 application/x-www-form-urlencoded，text/plain，multipart/form-data。
```

不满足以上条件的自然就是复杂请求了，简单请求和复杂请求的区别在于，**复杂请求会多发一次请求**，也叫预请求，后端也会相应得做出预响应。预请求也存在跨域问题，只有预请求成功后，真实的请求才会执行。

我们接下来的请求将以简单请求为例：

#### （2）实现代码

前端实现：

```
let btn = document.getElementById('btn');
btn.addEventListener('click', () => {
    $.ajax({
        url: 'http://localhost:3000',
        data: {
            name: 'lucky',
            age: 19
        },
        headers: {
            // Accept: "application/json;charset=utf-8"
​
            //为了告诉后端，你返回的响应头的类型应该是xxx
            "Content-Type": "application/json;charset=utf-8"
        },
        //请求头方法
        method: 'get',
        success(res) {
            console.log(res);
        }
    })
})
```

后端实现：

```
// 原生JS实现
const http = require('http');
​
const server = http.createServer((req, res) => {
    // 开启cors
    // writeHead()后端在响应头中设置
    res.writeHead(200, {
        // 允许请求源，将域名地址加入白名单，例如http://127.0.0.1:5500
        "Access-Control-Allow-Origin": "*",
        // 允许发请求的方式
        "Access-Control-Allow-Methods": "GET,POST,PUT,OPTIONS",
        // 允许请求头的类型
        // 不管向浏览器返回什么类型都可以，浏览器不会拦截
        "Access-Control-Allow-Headers": "Content-Type"
    })
    res.end('hello cors');
})
//server监听一个端口
```

#### （3）使用CORS的场景

仅适用于开发环境

### 3、node的Proxy

目前常用方式,通过服务器设置代理 ，但是一般情况还是后台解决跨域，因为前台是上线之后是没有服务器的概念的。

#### （1）实现原理

同源策略是浏览器遵循的标准，而如果是*服务器向服务器请求数据*，就不需要遵循同源策略。于是，当前端向一个服务器请求数据时，在中间设置一个中间件---代理服务器，设置以后，就变成代理服务器向服务器请求数据了。

代理服务器需要做这些事情：

A.接受客户端请求

B.将请求转发给服务器

C.服务器给代理服务器响应数据

D.代理服务器件响应的数据转发给客户端


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b0f6ae0639ac42118a96b24c89ab65c1~tplv-k3u1fbpfcp-watermark.image?)

#### （2）实现代码

前端实现代码：

```
let btn = document.getElementById('btn');
btn.addEventListener('click', () => {
    $.ajax({
        url: 'http://localhost:3001',
        data: {
            name: 'lucky'
        },
        method: 'get',
        success(res) {
            console.log(res);
        }
    })
})
```

后端实现代码：

服务器：

```
// 服务器
// 引入规范
​
const main = (ctx, next) => {
    // 往前端输出
    ctx.body = 'hi,good afternoon'
}
app.use(main)
​
// app监听一个3000端口
```

代理服务器：

```
// 代理服务器
// 原生JS实现
const http = require('http');
​
const server = http.createServer((req, res) => {
    // 开启cors
    // writeHead()后端在响应头中设置
    res.writeHead(200, {
        // 允许请求源，将域名地址加入白名单，例如http://127.0.0.1:5500
        "Access-Control-Allow-Origin": "*",
        // 允许发请求的方式
        "Access-Control-Allow-Methods": "GET,POST,PUT,OPTIONS",
        // 允许请求头的类型
        // 不管向浏览器返回什么类型都可以，浏览器不会拦截
        "Access-Control-Allow-Headers": "Content-Type"
    })
    // res.end('hello cors');
​
    // 向服务器请求数据
    const proxyReq = http.request({
        host: "127.0.0.1",
        port: '3000',
        path: '/',
        method: 'GET'
    }, proxyRes => {
        // console.log(proxyRes);
        proxyRes.on('data', result => {
            // console.log(result.tostring());
            res.end(result.toString())
        });
    }).end()
})
​
//server监听一个3001的端口
```

当服务器和代理服务器都启动时，前端请求数据，解决跨域问题。

#### （3）使用Proxy的场景

适用于开发环境
