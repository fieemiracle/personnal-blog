(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{429:function(s,n,a){"use strict";a.r(n);var t=a(1),e=Object(t.a)({},(function(){var s=this,n=s._self._c;return n("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[n("p",[s._v("持续创作，加速成长！这是我参与「掘金日新计划 · 10 月更文挑战」的第7天，"),n("a",{attrs:{href:"https://juejin.cn/post/7147654075599978532",target:"_blank",rel:"noopener noreferrer"}},[s._v("点击查看活动详情"),n("OutboundLink")],1)]),s._v(" "),n("h2",{attrs:{id:"一、跨域的导火线"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#一、跨域的导火线"}},[s._v("#")]),s._v(" 一、跨域的导火线？")]),s._v(" "),n("p",[s._v("浏览器有一个重要的安全策略--同源策略，是浏览器最核心和最基本的安全策略。")]),s._v(" "),n("p",[s._v("如果没有同源策略，浏览器很容易遭受XSS、CSFR等攻击。")]),s._v(" "),n("p",[n("strong",[s._v("同源策略")]),s._v("是指，若页面的源和页面运行过程中加载的源不一致时，出于安全考虑，浏览器会对跨域的资源访问进行一些限制。即"),n("em",[s._v("协议+域名+端口")]),s._v("三者相同，即使两个不同的域名指向同一个地址，也是非同源的。")]),s._v(" "),n("p",[n("img",{attrs:{src:"https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bf229e071bd14eefb93328f77a047232~tplv-k3u1fbpfcp-watermark.image?",alt:"image.png"}})]),s._v(" "),n("p",[s._v("同源策略会限制AJAX请求不能发送等操作。")]),s._v(" "),n("h2",{attrs:{id:"二、跨域"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#二、跨域"}},[s._v("#")]),s._v(" 二、跨域？")]),s._v(" "),n("p",[s._v("前后端进行数据交互的时候，经常会存在跨域错误。")]),s._v(" "),n("p",[s._v("跨域指的是，在前端领域中，浏览器允许服务器发送跨域清奇，从而克服浏览器的同源策略的限制；跨域错误指的是浏览器不能执行其他网站的脚本而发生错误。")]),s._v(" "),n("p",[s._v("跨域只会出现在浏览器上,小程序和APP开发不会有跨域问题。")]),s._v(" "),n("p",[s._v("举个例子：")]),s._v(" "),n("p",[s._v("前端代码：")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("        //这里是前端代码\n        <script src=\"https://cdn.bootcdn.net/ajax/libs/jquery/3.6.1/jquery.min.js\"><\/script>\n        <button id=\"btn\">get data</button>\n        <script>\n            let btn = document.getElementById('btn');\n            btn.addEventListener('click', () => {\n                $.ajax({\n                    url: 'http://localhost:3000',\n                    data: {\n                        name: 'lucky'\n                    },\n                    method: 'get',\n                    success(res) {\n                        console.log(res);\n                    }\n                })\n            })\n        <\/script>\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br")])]),n("p",[s._v("后端（node）主要的代码：")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("// 引入规范\n//...\n​\nconst main = (ctx, next) => {\n    console.log(ctx.query.name);\n    // 往前端输出\n    ctx.body = 'hi,good afternoon'\n}\n​\napp.use(main)\n​\n// 监听一个端口\n//...\n​\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br")])]),n("p",[n("img",{attrs:{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9c04c7779f42416fa80daf7f556992ce~tplv-k3u1fbpfcp-watermark.image?",alt:"image.png"}})]),s._v(" "),n("p",[s._v("当我们先将后端开启服务，然后在前端页面点击按钮向后端发请求，请求数据的时候，控制台报跨域错误。这个错误正是源于浏览器的安全机制---同源策略。")]),s._v(" "),n("h2",{attrs:{id:"三、跨域通常发生在"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#三、跨域通常发生在"}},[s._v("#")]),s._v(" 三、跨域通常发生在？")]),s._v(" "),n("p",[s._v("前端向后端发送接口请求，后端响应回来的数据，在浏览器接收到时被跨域机制拦截下来（限制跨域访问）。")]),s._v(" "),n("h2",{attrs:{id:"四、解决跨域方案"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#四、解决跨域方案"}},[s._v("#")]),s._v(" 四、解决跨域方案？")]),s._v(" "),n("p",[s._v("首先，我们的HTML文件都是这样的：")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v('<button id="btn">get data</button>\n')])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br")])]),n("p",[s._v("其次，解决跨域，我们还需要知道，HTML5中，有"),n("strong",[s._v("三个标签允许跨域加载资源")]),s._v("，也就是不受同源策略限制。")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v('<link rel="stylesheet" href="xxx.css">\n<script src="xxx.js?callback"><\/script>//只能走get请求\n<img src="xxx.xxx" alt="">\n')])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br")])]),n("p",[s._v("而接下来的一些方法，就会在这个基础上，朝着这个方向去实现解决跨域的手段。")]),s._v(" "),n("h3",{attrs:{id:"_1、jsonp"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_1、jsonp"}},[s._v("#")]),s._v(" 1、JSONP")]),s._v(" "),n("h4",{attrs:{id:"_1-实现原理"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_1-实现原理"}},[s._v("#")]),s._v(" （1）实现原理")]),s._v(" "),n("p",[s._v("首先，JSONP的思路是这样的：")]),s._v(" "),n("p",[s._v("利用"),n("strong",[s._v("script标签")]),s._v("中的src属性加载资源时不受同源策略的影响这一特性解决跨域（需要前后端的契合）。")]),s._v(" "),n("p",[s._v("JSONP的做法是：当需要跨域请求时，不使用AJAX，转而生成一个script元素去请求服务器，由于浏览器并不阻止script元素的请求，这样请求可以到达服务器。服务器拿到请求后，响应一段JS代码，这段代码实际上是一个函数调用，调用的是客户端预先生成好的函数，并把浏览器需要的数据作为参数传递到函数中，从而间接的把数据传递给客户端。")]),s._v(" "),n("p",[s._v("从而，我们可以分清楚前后端分别要做的事情：")]),s._v(" "),n("p",[s._v("前端需要做的事情大底上是这样的：")]),s._v(" "),n("p",[s._v("（1）"),n("em",[s._v("封装一个JSONP方法")]),s._v("，该方法返回一个Promise对象。")]),s._v(" "),n("p",[s._v("（2）"),n("em",[s._v("动态创建一个script标签")]),s._v("，然后设置script标签的src属性，将跨域的API数据接口地址赋值给src，这个地址后面通过?拼接一个回调函数（如callback）；最后让script标签生效。")]),s._v(" "),n("p",[s._v("（3）"),n("em",[s._v("准备一个callback函数")]),s._v("（后端会返回一个函数给前端），形参为要获取的目标数据（后端返回的数据）")]),s._v(" "),n("p",[s._v("（4）"),n("em",[s._v("调用JSONP方法")])]),s._v(" "),n("p",[s._v("如下大概框架：")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("1、封装一个JSONP方法:\nconst jsonp=(...)=>{\n    return new Promise((...)=>{\n        \n        //利用JSONP方法发接口请求：\n        //（1）凭空创建一个script标签,动态创建 script\n        var script = document.createElement('script');\n        //设置 script 的 src 属性，并设置请求地址\n        script.src = 'http://localhost:3000/?callback=getData';\n        // 让 script 生效\n        document.body.appendChild(script);\n        \n        \n        2、准备一个callback函数（后端会返回一个函数给前端）\n        function callback(data){\n            resolve(data)\n        }\n    })\n}\n​\n//调用JSONP方法\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br"),n("span",{staticClass:"line-number"},[s._v("21")]),n("br")])]),n("p",[s._v("后端需要做的事情大底上是这样的：")]),s._v(" "),n("p",[s._v("（1）后端收到请求以后，需要进行特殊的处理：把传递进来的回调函数的函数名与所需数据进行拼接，准备好数据返回给前端")]),s._v(" "),n("p",[s._v("（2）准备好数据以后，后端把准备好的数据通过HTTP协议返回给前端，前端再调用回调函数，对返回的数据进行操作")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("callback()//调用回调函数\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br")])]),n("h4",{attrs:{id:"_2-实现代码"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_2-实现代码"}},[s._v("#")]),s._v(" （2）实现代码")]),s._v(" "),n("p",[s._v("接下来就看看，如何实现的吧~。这里是前端代码：")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("let btn = document.getElementById('btn');\n// 封装一个JSONP方法\nconst jsonp = (url, params, cb) => {\n    return new Promise((resolve, reject) => {\n        // 利用JSONP方法发接口请求\n        // 凭空创建script标签\n        const script = document.createElement('script');\n        params = {\n            ...params,\n            cb: cb\n        }\n        //为了不影响前端传来的参数个数\n        const arr = Object.keys(params).map(key =>\n            `${key}=${params[key]}`); //['name=\"lucky\"','age=\"19\"','cb:xxx']\n​\n        script.src = `${url}?${arr.join('&')}`; //http://localhost:3000?name=\"lucky\"&age=19&cb:xxx\n        document.body.appendChild(script);\n​\n        // 后端会返回一个函数给前端\n        // 前端拿到的相当于：script.src==='callback('lucky is 19 years old!')'\n        window[cb] = (data) => { //相当于在window上挂载了一个方法callback\n            resolve(data)\n        }\n    })\n}\nbtn.addEventListener('click', () => {\n    // 调用JSONP方法，对后端传来的数据进行加工\n    jsonp('http://localhost:3000', {\n            name: 'lucky',\n            age: 19\n        }, 'callback')\n        .then((res) => {\n            console.log(res);\n        })\n})\n​\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br"),n("span",{staticClass:"line-number"},[s._v("21")]),n("br"),n("span",{staticClass:"line-number"},[s._v("22")]),n("br"),n("span",{staticClass:"line-number"},[s._v("23")]),n("br"),n("span",{staticClass:"line-number"},[s._v("24")]),n("br"),n("span",{staticClass:"line-number"},[s._v("25")]),n("br"),n("span",{staticClass:"line-number"},[s._v("26")]),n("br"),n("span",{staticClass:"line-number"},[s._v("27")]),n("br"),n("span",{staticClass:"line-number"},[s._v("28")]),n("br"),n("span",{staticClass:"line-number"},[s._v("29")]),n("br"),n("span",{staticClass:"line-number"},[s._v("30")]),n("br"),n("span",{staticClass:"line-number"},[s._v("31")]),n("br"),n("span",{staticClass:"line-number"},[s._v("32")]),n("br"),n("span",{staticClass:"line-number"},[s._v("33")]),n("br"),n("span",{staticClass:"line-number"},[s._v("34")]),n("br"),n("span",{staticClass:"line-number"},[s._v("35")]),n("br"),n("span",{staticClass:"line-number"},[s._v("36")]),n("br")])]),n("p",[s._v("后端主要代码：")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("//引入一些规范\n​\nconst main = (ctx, next) => {\n    console.log(ctx.query);\n    const {\n        name,\n        age,\n        cb\n    } = ctx.query;\n    const userInfo = `${name} is ${age} years old!`;\n    const str = `${cb}(${JSON.stringify(userInfo)})`; //'callback()'\n    // 往前端输出\n    // ctx.body = 'hi,good afternoon'\n    ctx.body = str;\n}\n​\n//app监听一个端口\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br")])]),n("h4",{attrs:{id:"_3-使用jsonp的优点"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_3-使用jsonp的优点"}},[s._v("#")]),s._v(" （3）使用JSONP的优点")]),s._v(" "),n("p",[s._v("使用JSONP比较简单，兼容性也比较好，可用于解决主浏览器的跨域数据访问的问题")]),s._v(" "),n("h4",{attrs:{id:"_4-使用jsonp的缺点"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_4-使用jsonp的缺点"}},[s._v("#")]),s._v(" （4）使用JSONP的缺点")]),s._v(" "),n("p",[s._v("JSONP "),n("strong",[s._v("只支持发送get请求")]),s._v("，发送请求的方法具有局限性，因为 script 标签只能使用 get 请求；")]),s._v(" "),n("p",[s._v("JSONP 需要后端配合"),n("strong",[s._v("返回指定格式的数据")]),s._v("。")]),s._v(" "),n("h3",{attrs:{id:"_2、cors"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_2、cors"}},[s._v("#")]),s._v(" 2、Cors")]),s._v(" "),n("h4",{attrs:{id:"_1-实现原理-2"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_1-实现原理-2"}},[s._v("#")]),s._v(" （1）实现原理")]),s._v(" "),n("p",[s._v("CORS(Cross-origin resource sharing)跨域资源共享 。"),n("em",[s._v("允许浏览器向跨源服务器发出XMLHttpRequest请求")]),s._v("，从而解决跨域问题。后端开启==给前端一个通行证。")]),s._v(" "),n("p",[s._v("CORS需要"),n("em",[s._v("浏览器和后端同时支持")]),s._v("，而实现CORS哦通信的关键是后端。只要后端开启了CORS，就实现了跨域。")]),s._v(" "),n("p",[s._v("服务器设置对CORS的支持原理：服务器设置"),n("strong",[s._v("Access-Control-Allow-Origin")]),s._v("就可以开启CORS，该属性表示哪些域名可以访问资源，若设置成了*，则表示所有网站都可以进行访问资源。 HTTP响应头之后，浏览器将会允许跨域请求。")]),s._v(" "),n("p",[s._v("也许有人会疑问，既然后端就可以开启CORS，跟前端有什么关系哦？实际上，使用CORS解决跨域问题，会在发送请求时出现两种情况，简单请求和复杂请求。")]),s._v(" "),n("p",[s._v("什么是简单请求？什么是复杂请求呢？")]),s._v(" "),n("p",[s._v("请求满足以下条件为"),n("strong",[s._v("简单请求")]),s._v("：")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("（1）请求方式(Request Method)是 get/post/head\n（2）请求头(Request Headers)包含字段可以有：Accept，Accept-Language，content-Language，Last-Event-ID，Content-Type，其中Content-Type的值只能是 application/x-www-form-urlencoded，text/plain，multipart/form-data。\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br")])]),n("p",[s._v("不满足以上条件的自然就是复杂请求了，简单请求和复杂请求的区别在于，"),n("strong",[s._v("复杂请求会多发一次请求")]),s._v("，也叫预请求，后端也会相应得做出预响应。预请求也存在跨域问题，只有预请求成功后，真实的请求才会执行。")]),s._v(" "),n("p",[s._v("我们接下来的请求将以简单请求为例：")]),s._v(" "),n("h4",{attrs:{id:"_2-实现代码-2"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_2-实现代码-2"}},[s._v("#")]),s._v(" （2）实现代码")]),s._v(" "),n("p",[s._v("前端实现：")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("let btn = document.getElementById('btn');\nbtn.addEventListener('click', () => {\n    $.ajax({\n        url: 'http://localhost:3000',\n        data: {\n            name: 'lucky',\n            age: 19\n        },\n        headers: {\n            // Accept: \"application/json;charset=utf-8\"\n​\n            //为了告诉后端，你返回的响应头的类型应该是xxx\n            \"Content-Type\": \"application/json;charset=utf-8\"\n        },\n        //请求头方法\n        method: 'get',\n        success(res) {\n            console.log(res);\n        }\n    })\n})\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br"),n("span",{staticClass:"line-number"},[s._v("21")]),n("br")])]),n("p",[s._v("后端实现：")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v('// 原生JS实现\nconst http = require(\'http\');\n​\nconst server = http.createServer((req, res) => {\n    // 开启cors\n    // writeHead()后端在响应头中设置\n    res.writeHead(200, {\n        // 允许请求源，将域名地址加入白名单，例如http://127.0.0.1:5500\n        "Access-Control-Allow-Origin": "*",\n        // 允许发请求的方式\n        "Access-Control-Allow-Methods": "GET,POST,PUT,OPTIONS",\n        // 允许请求头的类型\n        // 不管向浏览器返回什么类型都可以，浏览器不会拦截\n        "Access-Control-Allow-Headers": "Content-Type"\n    })\n    res.end(\'hello cors\');\n})\n//server监听一个端口\n')])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br")])]),n("h4",{attrs:{id:"_3-使用cors的场景"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_3-使用cors的场景"}},[s._v("#")]),s._v(" （3）使用CORS的场景")]),s._v(" "),n("p",[s._v("仅适用于开发环境")]),s._v(" "),n("h3",{attrs:{id:"_3、node的proxy"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_3、node的proxy"}},[s._v("#")]),s._v(" 3、node的Proxy")]),s._v(" "),n("p",[s._v("目前常用方式,通过服务器设置代理 ，但是一般情况还是后台解决跨域，因为前台是上线之后是没有服务器的概念的。")]),s._v(" "),n("h4",{attrs:{id:"_1-实现原理-3"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_1-实现原理-3"}},[s._v("#")]),s._v(" （1）实现原理")]),s._v(" "),n("p",[s._v("同源策略是浏览器遵循的标准，而如果是"),n("em",[s._v("服务器向服务器请求数据")]),s._v("，就不需要遵循同源策略。于是，当前端向一个服务器请求数据时，在中间设置一个中间件---代理服务器，设置以后，就变成代理服务器向服务器请求数据了。")]),s._v(" "),n("p",[s._v("代理服务器需要做这些事情：")]),s._v(" "),n("p",[s._v("A.接受客户端请求")]),s._v(" "),n("p",[s._v("B.将请求转发给服务器")]),s._v(" "),n("p",[s._v("C.服务器给代理服务器响应数据")]),s._v(" "),n("p",[s._v("D.代理服务器件响应的数据转发给客户端")]),s._v(" "),n("p",[n("img",{attrs:{src:"https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b0f6ae0639ac42118a96b24c89ab65c1~tplv-k3u1fbpfcp-watermark.image?",alt:"image.png"}})]),s._v(" "),n("h4",{attrs:{id:"_2-实现代码-3"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_2-实现代码-3"}},[s._v("#")]),s._v(" （2）实现代码")]),s._v(" "),n("p",[s._v("前端实现代码：")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("let btn = document.getElementById('btn');\nbtn.addEventListener('click', () => {\n    $.ajax({\n        url: 'http://localhost:3001',\n        data: {\n            name: 'lucky'\n        },\n        method: 'get',\n        success(res) {\n            console.log(res);\n        }\n    })\n})\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br")])]),n("p",[s._v("后端实现代码：")]),s._v(" "),n("p",[s._v("服务器：")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("// 服务器\n// 引入规范\n​\nconst main = (ctx, next) => {\n    // 往前端输出\n    ctx.body = 'hi,good afternoon'\n}\napp.use(main)\n​\n// app监听一个3000端口\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br")])]),n("p",[s._v("代理服务器：")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v('// 代理服务器\n// 原生JS实现\nconst http = require(\'http\');\n​\nconst server = http.createServer((req, res) => {\n    // 开启cors\n    // writeHead()后端在响应头中设置\n    res.writeHead(200, {\n        // 允许请求源，将域名地址加入白名单，例如http://127.0.0.1:5500\n        "Access-Control-Allow-Origin": "*",\n        // 允许发请求的方式\n        "Access-Control-Allow-Methods": "GET,POST,PUT,OPTIONS",\n        // 允许请求头的类型\n        // 不管向浏览器返回什么类型都可以，浏览器不会拦截\n        "Access-Control-Allow-Headers": "Content-Type"\n    })\n    // res.end(\'hello cors\');\n​\n    // 向服务器请求数据\n    const proxyReq = http.request({\n        host: "127.0.0.1",\n        port: \'3000\',\n        path: \'/\',\n        method: \'GET\'\n    }, proxyRes => {\n        // console.log(proxyRes);\n        proxyRes.on(\'data\', result => {\n            // console.log(result.tostring());\n            res.end(result.toString())\n        });\n    }).end()\n})\n​\n//server监听一个3001的端口\n')])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br"),n("span",{staticClass:"line-number"},[s._v("21")]),n("br"),n("span",{staticClass:"line-number"},[s._v("22")]),n("br"),n("span",{staticClass:"line-number"},[s._v("23")]),n("br"),n("span",{staticClass:"line-number"},[s._v("24")]),n("br"),n("span",{staticClass:"line-number"},[s._v("25")]),n("br"),n("span",{staticClass:"line-number"},[s._v("26")]),n("br"),n("span",{staticClass:"line-number"},[s._v("27")]),n("br"),n("span",{staticClass:"line-number"},[s._v("28")]),n("br"),n("span",{staticClass:"line-number"},[s._v("29")]),n("br"),n("span",{staticClass:"line-number"},[s._v("30")]),n("br"),n("span",{staticClass:"line-number"},[s._v("31")]),n("br"),n("span",{staticClass:"line-number"},[s._v("32")]),n("br"),n("span",{staticClass:"line-number"},[s._v("33")]),n("br"),n("span",{staticClass:"line-number"},[s._v("34")]),n("br")])]),n("p",[s._v("当服务器和代理服务器都启动时，前端请求数据，解决跨域问题。")]),s._v(" "),n("h4",{attrs:{id:"_3-使用proxy的场景"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_3-使用proxy的场景"}},[s._v("#")]),s._v(" （3）使用Proxy的场景")]),s._v(" "),n("p",[s._v("适用于开发环境")])])}),[],!1,null,null,null);n.default=e.exports}}]);