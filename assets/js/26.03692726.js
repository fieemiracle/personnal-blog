(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{432:function(s,n,e){"use strict";e.r(n);var a=e(1),t=Object(a.a)({},(function(){var s=this,n=s._self._c;return n("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[n("p",[s._v("本文已参与「新人创作礼」活动，一起开启掘金创作之路。")]),s._v(" "),n("p",[s._v("什么是事件循环？为什么要进行事件循环？带着同样的问号，本文将简简单单地厘清浏览器事件循环的来龙去脉，保证清凉来袭~。今天我们就来说说浏览器事件循环，Node的事件循环往后放一放熬。")]),s._v(" "),n("h2",{attrs:{id:"写在前面"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#写在前面"}},[s._v("#")]),s._v(" 写在前面")]),s._v(" "),n("p",[s._v("Event Loop 是一个很重要的概念，指的是计算机系统的一种运行机制。JavaScript语言就采用这种机制，来解决单线程运行带来的一些问题。 浏览器的事件循环是编写的javascript代码和浏览器api调用（Ajax/setTimeout）的一个桥梁，桥梁之间他们通过回调函数进行沟通 多数的浏览器都是多进程的，JavaScript是单线程的，但是JavaScript的线程应该有自己的容器进程：浏览器或者Node。在浏览器中，每次打开一个tab页面就会开启一个新的进程，避免一个页面卡死所有页面无法响应，需要整个强制退出；而在JavaScript中，是在一个单独的线程中执行的 ，同一时刻只做一件事，如果这件事情非常耗时，就会被阻塞。这些简单了解一下就OK。")]),s._v(" "),n("h2",{attrs:{id:"一、准备阶段"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#一、准备阶段"}},[s._v("#")]),s._v(" 一、准备阶段")]),s._v(" "),n("h3",{attrs:{id:"_1、进程和线程"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_1、进程和线程"}},[s._v("#")]),s._v(" 1、进程和线程？")]),s._v(" "),n("p",[s._v("进程和线程都是CPU工作时间片的描述：")]),s._v(" "),n("p",[s._v("（1）"),n("code",[s._v("进程(process)")]),s._v("：描述的是CPU在运行指令及加载和保存上下文所需要的时间。比如计算机已经运行的程序(启动一个应用后程序，默认启动一个进程，也可能是多个进程)。")]),s._v(" "),n("p",[s._v("（2）"),n("code",[s._v("线程(thread)")]),s._v("：执行一段指令所需要的时间。操作系统能够运行运算调度的最小单位（每一个进程中，都会启动一个线程来执行程序中的代码，这个线程叫主线程）。")]),s._v(" "),n("p",[s._v("（3）"),n("code",[s._v("渲染线程")]),s._v("：读取HTML并且渲染。 js的引擎线程和html的渲染线程是互斥的，不能同时工作（js可以修改DOM结构）。")]),s._v(" "),n("p",[s._v("简单的来说，"),n("code",[s._v("进程是线程的容器")]),s._v("，打个比方：一个工厂（操作系统）有很多车间（进程），每个车间（进程）都有工人（线程）。这么说是不是通俗易懂了呢。")]),s._v(" "),n("h3",{attrs:{id:"_2、调用栈-执行栈"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_2、调用栈-执行栈"}},[s._v("#")]),s._v(" 2、调用栈（执行栈）？")]),s._v(" "),n("p",[n("code",[s._v("调用栈")]),s._v("就是 V8内部维护出来的一个用来存放函数的执行上下文环境的一个栈结构。其特点："),n("code",[s._v("先进后出")]),s._v("； 内存泄漏：调用栈被不该用的东西占用，导致可用空间变小")]),s._v(" "),n("h3",{attrs:{id:"_3、javascript单线程的好处"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_3、javascript单线程的好处"}},[s._v("#")]),s._v(" 3、javascript单线程的好处？")]),s._v(" "),n("p",[s._v("（1）js的单线程可节省内存，节省上下文切换的时间")]),s._v(" "),n("p",[s._v("（2）不会和渲染线程冲突")]),s._v(" "),n("h3",{attrs:{id:"_4、浏览器的事件循环-event-loop"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_4、浏览器的事件循环-event-loop"}},[s._v("#")]),s._v(" 4、浏览器的事件循环(Event Loop)？")]),s._v(" "),n("p",[s._v("--同步代码：代码单线执行，发送服务器请求后，等待返回数据，会出现网页空白（阻塞网页运行）。")]),s._v(" "),n("p",[s._v("--异步代码：代码发送请求后继续执行后续代码，不等待服务器返回数据（网页运行流畅）。")]),s._v(" "),n("p",[n("code",[s._v("代码在执行过程中，遇到异步代码，会将异步代码用队列装起来（挂起）。一般异步任务指的都是ajax请求或者定时器等。")])]),s._v(" "),n("p",[s._v("--同步函数调用:该函数会被放到调用栈中执行。")]),s._v(" "),n("p",[s._v("--异步函数调用: 该函数会被放到调用栈中 执行立即结束，不会阻塞后续代码的执行。")]),s._v(" "),n("h3",{attrs:{id:"_5、宏任务和微任务"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_5、宏任务和微任务"}},[s._v("#")]),s._v(" 5、宏任务和微任务？")]),s._v(" "),n("p",[s._v("（1）事件循环中的两个队列（先进先出）：")]),s._v(" "),n("blockquote",[n("p",[n("code",[s._v("I.宏任务队列")]),s._v("：script整个代码，setTimeut和setInterval（定时器），I/O操作，UI-rendering（UI渲染），ajax请求，Dom监听，requestAnimationFrame等")]),s._v(" "),n("p",[n("code",[s._v("II. 微任务队列")]),s._v(" ：Promise.then（Promise的then回调），async-await （async函数的await之后的内容），queueMicrotask，MutationObserver（监控dom变化）")])]),s._v(" "),n("p",[s._v("（2）两个队列的优先级 执行每一个宏任务之前，都会查看微任务队列是否有任务需要执行，也就是宏任务执行之前，必须保证微任务是空的。先执行同步代码，再执行微任务，再检查宏任务是否到达时间，到达时间再执行。")]),s._v(" "),n("h3",{attrs:{id:"_6、最终执行顺序"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_6、最终执行顺序"}},[s._v("#")]),s._v(" 6、最终执行顺序？")]),s._v(" "),n("blockquote",[n("p",[s._v("（1）首先执行同步代码，这属于宏任务")]),s._v(" "),n("p",[s._v("（2）当执行完所有的同步代码后，执行栈为空，检查是否有异步代码要执行")]),s._v(" "),n("p",[s._v("（3）执行微任务")]),s._v(" "),n("p",[s._v("（4）执行完微任务后，有必要的情况下会渲染页面")]),s._v(" "),n("p",[s._v("（5）开启下一轮Event Loop,也就是执行宏任务中的代码")]),s._v(" "),n("p",[s._v("(宏任务不一定在微任务之后执行；如果代码中全部都是异步代码，没有同步代码，那么宏任务一定在微任务之后执行)")])]),s._v(" "),n("h2",{attrs:{id:"二、试水阶段"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#二、试水阶段"}},[s._v("#")]),s._v(" 二、试水阶段")]),s._v(" "),n("h3",{attrs:{id:"_1、牛刀小试1-定时器"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_1、牛刀小试1-定时器"}},[s._v("#")]),s._v(" 1、牛刀小试1--定时器")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("let name = 'yd';\nsetTimeout(function() {\n    name = 'zd';\n    console.log(name);\n}, 1000);\nconsole.log(name);\n//yd\n//zd\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br")])]),n("p",[s._v("首先这个代码是写在javascript里面的，整个代码是一个宏任务，接下来从上往下执行，遇到"),n("code",[s._v("定时器（异步任务）")]),s._v("，会等待返回数据，先挂起，执行后续代码，打印name,再执行定时器。有人说，把定时器的时间参数改为0不就好啦？这肯定是不行的，首先，定时器本身就是异步任务；其次，定时器时间参数为0的情况下，比起立即执行代码，也有4ms的延迟。")]),s._v(" "),n("h3",{attrs:{id:"_2、牛刀小试2-promise"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_2、牛刀小试2-promise"}},[s._v("#")]),s._v(" 2、牛刀小试2-Promise")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("// 2 Promise\nconst myPromise = new Promise((resolve, reject) => {\n    console.log('start');\n    resolve('loading')\n    console.log('next');\n})\n    .then(result => { console.log(result); })\n//start\n//next\n//loading\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br")])]),n("p",[s._v("分析：从上往下，先执行Promise中的同步代码，打印start,Promise状态改为resolved，打印next;再执行.then后面的代码。")]),s._v(" "),n("h3",{attrs:{id:"_3、牛刀小试3-async-await"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_3、牛刀小试3-async-await"}},[s._v("#")]),s._v(" 3、牛刀小试3-Async-await")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("// 3 Async-await\nasync function async1() {\n    console.log(123);\n    //这里是Async-await编译成Promise的代码，效果一样\n    //   return Promise.resolve().then(()=>{\n    //     return async2()\n    //   }).then(()=>{\n    //      return async3()\n    //   })\n    //   }).then(()=>{\n    //     console.log('async1 end');\n    //   })\n    await async2();\n    await async3();\n    console.log('async1 end');//微任务\n}\nasync function async2() {\n    console.log('async2 end');\n}\nasync function async3() {\n    console.log('async3 end');\n}\nasync1();\n​\n//123\n//async2 end\n//async3 end\n//async1 end\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br"),n("span",{staticClass:"line-number"},[s._v("21")]),n("br"),n("span",{staticClass:"line-number"},[s._v("22")]),n("br"),n("span",{staticClass:"line-number"},[s._v("23")]),n("br"),n("span",{staticClass:"line-number"},[s._v("24")]),n("br"),n("span",{staticClass:"line-number"},[s._v("25")]),n("br"),n("span",{staticClass:"line-number"},[s._v("26")]),n("br"),n("span",{staticClass:"line-number"},[s._v("27")]),n("br"),n("span",{staticClass:"line-number"},[s._v("28")]),n("br")])]),n("p",[s._v("解析：从上到下，先执行Async-await的同步代码，打印123，接下来注意的是，"),n("code",[s._v("自浏览器更新后，为await开辟特殊通道，async await会立即执行")]),s._v("；所以会依次调用async2和async3，依次打印async2 end，async3 end，最后打印async3 end。")]),s._v(" "),n("h2",{attrs:{id:"三、进阶阶段"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#三、进阶阶段"}},[s._v("#")]),s._v(" 三、进阶阶段")]),s._v(" "),n("h3",{attrs:{id:"_1、题目一"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_1、题目一"}},[s._v("#")]),s._v(" 1、题目一")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("setTimeout(() => {\n    console.log('timeout1');\n    Promise.resolve().then(data => {\n        console.log('then1');\n    });\n}, 0);\n​\nPromise.resolve().then(data => {\n    console.log('then2');\n    setTimeout(() => {\n        console.log('timeout2');\n    }, 0);\n});\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br")])]),n("p",[s._v("跟着我全面分析一下：首先这一整个js代码是一个宏任务，从上到下执行这个宏任务，首先碰到"),n("em",[s._v("第一个宏任务--定时器")]),s._v("，进宏任务队列；接下来碰到"),n("em",[s._v("第一个微任务--Promise.resolve().then()")]),s._v("，这是一个微任务，进微任务队列；整份代码就这两个队列，微任务先执行，打印then2，碰到"),n("em",[s._v("第二个宏任务--定时器")]),s._v("，进宏任务队列，微任务队列执行完毕。执行第一个宏任务，打印timeout1，碰到第一个微任务（先前的微任务已经执行完啦），进微任务队列。执行微任务队列，打印then1,再执行第二个宏任务，打印timeout2。使用打印顺序为：then2->timeout1->then1->timeout2。")]),s._v(" "),n("h3",{attrs:{id:"_2、题目二"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_2、题目二"}},[s._v("#")]),s._v(" 2、题目二")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("console.log('start');\n​\nasync function async1() {\n    console.log(123);\n    await async2();\n    await async3();//微任务1\n    console.log('async1 end');//微任务3   这里需要等async3执行完毕，先挂起 \n}\nasync function async2() {\n    console.log('async2 end');\n}\nasync function async3() {\n    console.log('async3 end');\n}\n​\nasync1();\n​\nsetTimeout(() => {//宏任务1\n    console.log('setTimeout');\n}, 0)\n​\nnew Promise(resolve => {\n    console.log('Promise');\n    resolve()\n})\n    .then(() => {//微任务2\n        console.log('promise1');\n    })\n    .then(() => {//微任务4    这里依赖前一个.then的返回结果，先挂起\n        console.log('promise2');\n    })\nconsole.log('end');\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br"),n("span",{staticClass:"line-number"},[s._v("21")]),n("br"),n("span",{staticClass:"line-number"},[s._v("22")]),n("br"),n("span",{staticClass:"line-number"},[s._v("23")]),n("br"),n("span",{staticClass:"line-number"},[s._v("24")]),n("br"),n("span",{staticClass:"line-number"},[s._v("25")]),n("br"),n("span",{staticClass:"line-number"},[s._v("26")]),n("br"),n("span",{staticClass:"line-number"},[s._v("27")]),n("br"),n("span",{staticClass:"line-number"},[s._v("28")]),n("br"),n("span",{staticClass:"line-number"},[s._v("29")]),n("br"),n("span",{staticClass:"line-number"},[s._v("30")]),n("br"),n("span",{staticClass:"line-number"},[s._v("31")]),n("br"),n("span",{staticClass:"line-number"},[s._v("32")]),n("br")])]),n("p",[s._v("代码有点长，我们慢慢分析：从上到下，我门的思想是遇到同步代码执行，遇到异步代码分析是宏任务还是微任务，依次进队列。")]),s._v(" "),n("p",[s._v("首先，打印start，毋庸置疑。接下来，是两个函数，我们要知道，函数声明的时候是不会执行的，直到async1();调用了函数，函数执行，则进入async1函数体内部，打印123，没问题吧。")]),s._v(" "),n("p",[s._v("接下来是 await async2()，立即执行，打印async2 end，上篇文章分析过，"),n("code",[s._v("**await后面的代码会立即执行，await下面的代码放到前一个创建的那个Promise对象的.then里面执行-**")]),s._v("- await async3()（"),n("em",[s._v("微任务1")]),s._v("），也就是微任务，进微任务队列。await async2()下面的代码-- console.log('async1 end')，亦是如此，所以async2还没执行前，我们先挂起。async1()执行完毕，接下来碰到第一个宏任务定时器，进宏任务队列。")]),s._v(" "),n("p",[s._v("接下来，执行Promise的同步代码，打印Promise，状态为resolved;碰到第一个.then，是一个微任务（"),n("em",[s._v("微任务2")]),s._v("），进微任务队列；接下里第二个.then,依赖前一个.then返回的Promise，所以第一个.then还没执行前，先挂起；最后打印end。")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("宏任务队列：宏任务1\n微任务队列：微任务1，微任务2，微任务3，微任务4\n​\n打印结果：start,123，async2 end，Promise，end，async3 end，promise1，async1 end，promise2，setTimeout\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br")])]),n("p",[s._v("接下来我们清空以下微任务队列，"),n("em",[s._v("执行微任务1")]),s._v(",打印async3 end，同时产生一个微任务（"),n("em",[s._v("微任务3")]),s._v("），进微任务队列；"),n("em",[s._v("执行微任务2")]),s._v("，打印promise1，同时产生一个微任务（"),n("em",[s._v("微任务4")]),s._v("）；检查微任务队列，还有两个微任务，先"),n("em",[s._v("执行微任务3")]),s._v("，打印async1 end；再"),n("em",[s._v("执行微任务4")]),s._v("，打印promise2")]),s._v(" "),n("p",[s._v("最后我们清空宏任务队列："),n("em",[s._v("执行宏任务1")]),s._v("，打印setTimeout。结束啦，这就是事件循环了，复杂又有趣。")]),s._v(" "),n("p",[s._v("3、题目三")]),s._v(" "),n("p",[s._v("我们再试一下。")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("new Promise(resolve => {//Promise1\n    resolve();\n})\n    .then(() => {//微任务1  Promise2\n        new Promise(resolve => {//Promise4\n            resolve();\n        })\n            .then(() => { console.log(123); })//then1\n            .then(() => { console.log(234); })//微任务3  then3\n    })\n    .then(() => {//微任务2   then2---Promise3\n        console.log(555);\n    })\n    .then(() => {//微任务4   then4\n        new Promise(resolve => {\n            resolve();\n        })\n            .then(() => { console.log(345); })//微任务5   then5\n            .then(() => { console.log(567); })//微任务6   then6\n    })\n​\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br"),n("span",{staticClass:"line-number"},[s._v("21")]),n("br")])]),n("p",[s._v("这个题目看上去简单，实际上还是需要一点技术的。接下来我们分析一下：")]),s._v(" "),n("p",[s._v("从上到下,Promise1的状态变为resolved，执行下一步Promise1.then（"),n("em",[s._v("微任务1")]),s._v("），这是一个微任务，进微任务队列，并且会返回一个新的Promise实例，记为Promise2。")]),s._v(" "),n("p",[s._v("此外，我们要知道："),n("strong",[n("code",[s._v("then中返回一个新的promise实例 ，只有当then中返回的Promise状态确定后才会进行下一步的链式调用")])]),s._v("。Promise后的then也是一个微任务（"),n("em",[s._v("微任务2")]),s._v("），进微任务队列，并且返回一个新的Promise对象，记为Promise3，因为Promise3的状态不确定，不会执行到then4，所以先挂起。")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("微任务队列：微任务1，微任务2，微任务3，微任务4，微任务5，微任务6\n宏任务队列：\n​\n执行结果：123,555，234，345，567\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br")])]),n("p",[s._v("接下来清空微任务队列：")]),s._v(" "),n("p",[n("em",[s._v("执行微任务1")]),s._v("，Promise4的状态为resolved，执行Promise4.then（记为then1）,打印123；then1返回一个新的Promise实例，所以then1.then()是一个微任务（"),n("em",[s._v("微任务3")]),s._v("），进微任务队列；")]),s._v(" "),n("p",[n("em",[s._v("执行微任务2")]),s._v("，打印555，同时Promise3状态为resolved，执行下一步then4，是一个微任务（记为"),n("em",[s._v("微任务4")]),s._v("），进微任务队列；")]),s._v(" "),n("p",[n("em",[s._v("执行微任务3")]),s._v("，打印234；")]),s._v(" "),n("p",[n("em",[s._v("执行微任务4")]),s._v("，碰到then5（记为"),n("em",[s._v("微任务5")]),s._v("），进微任务队列，此时微任务1，微任务2，微任务3已经执行完毕，所以直接"),n("em",[s._v("执行微任务5")]),s._v("，打印345，返回一个新的Promise对象，执行then6，是一个微任务（"),n("em",[s._v("微任务6")]),s._v("），进微任务队列，此时微任务队列只有微任务6了，执行微任务6，打印567。")]),s._v(" "),n("p",[s._v("结束。这里需要注意的就是，"),n("strong",[n("code",[s._v("then中返回一个新的promise实例 ，只有当then中返回的Promise状态确定后才会进行下一步的链式调用")])]),s._v("。举个例子说明：")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("let myPromise=new Promise((resolve,reject) => {//myPromise\n    console.log('promise1');\n})\n    .then(() => { console.log(123); })\n    .catch(()=>{console.log('error');})\n\n//promise1\n\n//只会打印promise1,因为myPromise的状态不确定，所以不会执行下面的.then和.catch。如果状态不确定，我们在\n//事件循环中，可以先挂起，等待前一个Promise的状态确定以后再执行\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br")])]),n("p",[s._v("4、题目四")]),s._v(" "),n("p",[s._v("因为题目三我也研究了很久，所以为了加深印象，我再举一个例子吧。")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("let myPromise=new Promise((resolve,reject) => {\n    console.log('promise1');\n    setTimeout(() => {\n        resolve();\n        console.log(123);\n    })\n})\n    .then(() => { \n        console.log(234); \n    })\n    .then(()=>{console.log('error');})\n​\n//promise1，123,234,error\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br")])]),n("p",[s._v("这个题目的可看之处在于，定时器不是最后执行的，现在你们自己试着分析分析，为什么是这个结果吧。**"),n("code",[s._v("切记：then中返回一个新的promise实例 ，只有当then中返回的Promise状态确定后才会进行下一步的链式调用。")]),s._v("**重要的事情说三遍。")]),s._v(" "),n("h2",{attrs:{id:"四、思考阶段"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#四、思考阶段"}},[s._v("#")]),s._v(" 四、思考阶段")]),s._v(" "),n("p",[s._v("学完这篇，相信你已经跃跃欲试了，那就思考下面问题吧：")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v('Promise.resolve().then(() => {\n    console.log(\'promise1\');\n    setTimeout(() => {\n        console.log(\'timeout1\')\n    }, 0)\n})\n​\nnew Promise(resolve => {\n    resolve();\n})\n    .then(function () {\n        new Promise(resolve => {\n            resolve();\n        })\n            .then(function () {\n                console.log("promise2");\n            })\n            .then(function () {\n                console.log("promise3");\n            })\n        console.log("then1");\n    })\n    .then(function () {\n        new Promise(resolve => {\n            resolve();\n        })\n            .then(function () {\n                console.log("promise4");\n            })\n            .then(function () {\n                console.log("promise5");\n            })\n​\n​\n        console.log("then2");\n    })\n    .then(function () {\n        new Promise(resolve => {\n            resolve();\n        })\n            .then(function () {\n                console.log("promise6");\n            })\n            .then(function () {\n                console.log("promise7");\n            })\n        console.log("then3");\n    });\n​\nsetTimeout(() => {\n    console.log(\'timeout2\')\n    Promise.resolve().then(() => {\n        console.log(\'promise8\')\n    })\n}, 0)\n')])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br"),n("span",{staticClass:"line-number"},[s._v("21")]),n("br"),n("span",{staticClass:"line-number"},[s._v("22")]),n("br"),n("span",{staticClass:"line-number"},[s._v("23")]),n("br"),n("span",{staticClass:"line-number"},[s._v("24")]),n("br"),n("span",{staticClass:"line-number"},[s._v("25")]),n("br"),n("span",{staticClass:"line-number"},[s._v("26")]),n("br"),n("span",{staticClass:"line-number"},[s._v("27")]),n("br"),n("span",{staticClass:"line-number"},[s._v("28")]),n("br"),n("span",{staticClass:"line-number"},[s._v("29")]),n("br"),n("span",{staticClass:"line-number"},[s._v("30")]),n("br"),n("span",{staticClass:"line-number"},[s._v("31")]),n("br"),n("span",{staticClass:"line-number"},[s._v("32")]),n("br"),n("span",{staticClass:"line-number"},[s._v("33")]),n("br"),n("span",{staticClass:"line-number"},[s._v("34")]),n("br"),n("span",{staticClass:"line-number"},[s._v("35")]),n("br"),n("span",{staticClass:"line-number"},[s._v("36")]),n("br"),n("span",{staticClass:"line-number"},[s._v("37")]),n("br"),n("span",{staticClass:"line-number"},[s._v("38")]),n("br"),n("span",{staticClass:"line-number"},[s._v("39")]),n("br"),n("span",{staticClass:"line-number"},[s._v("40")]),n("br"),n("span",{staticClass:"line-number"},[s._v("41")]),n("br"),n("span",{staticClass:"line-number"},[s._v("42")]),n("br"),n("span",{staticClass:"line-number"},[s._v("43")]),n("br"),n("span",{staticClass:"line-number"},[s._v("44")]),n("br"),n("span",{staticClass:"line-number"},[s._v("45")]),n("br"),n("span",{staticClass:"line-number"},[s._v("46")]),n("br"),n("span",{staticClass:"line-number"},[s._v("47")]),n("br"),n("span",{staticClass:"line-number"},[s._v("48")]),n("br"),n("span",{staticClass:"line-number"},[s._v("49")]),n("br"),n("span",{staticClass:"line-number"},[s._v("50")]),n("br"),n("span",{staticClass:"line-number"},[s._v("51")]),n("br"),n("span",{staticClass:"line-number"},[s._v("52")]),n("br"),n("span",{staticClass:"line-number"},[s._v("53")]),n("br"),n("span",{staticClass:"line-number"},[s._v("54")]),n("br"),n("span",{staticClass:"line-number"},[s._v("55")]),n("br")])]),n("h2",{attrs:{id:"总结"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[s._v("#")]),s._v(" 总结")]),s._v(" "),n("p",[s._v("浏览器事件循环到此就告一段落啦~，主要就是，当你一个任务（宏任务或微任务）进入相应队列的时候，当他执行的时候，可能会有新的任务（宏任务或微任务）产生，记得"),n("code",[s._v("实时更新任务队列")]),s._v("。此外记得多温习温习哦。")])])}),[],!1,null,null,null);n.default=t.exports}}]);