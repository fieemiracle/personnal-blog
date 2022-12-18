---
title: 接得住三连问？XSS不再懵
date: 2022-12-11
tags:
 -XSS
categories: 
 - 浏览器
---

---
highlight: a11y-dark
theme: cyanosis
---
***本文正在参加[「金石计划 . 瓜分6万现金大奖」](https://juejin.cn/post/7162096952883019783 "https://juejin.cn/post/7162096952883019783")***

Web页面安全问题早就让人产生警觉感，想到安全首先想到的肯定是浏览器最基本最核心的安全策略--同源策略。简单概述一下：同源策略是指，若页面的源和页面运行过程中加载的源不一致时，出于安全考虑，浏览器会对跨域的资源访问进行一些限制。即协议+域名+端口三者相同，即使两个不同的域名指向同一个地址，也是非同源的。想象一下，页面没有安全策略的话，Web的世界会是怎样的？肯定有人经历过无意打开一个网站，全是广告弹窗或者骗人的信息等，类似于这样的情况，如果没有安全策略，Web的世界将是开放的，可以加载任意资源，如脚本，音频，视频，对于写论文报告的我，一开始觉得挺好的，不需要每次COPY都要登录注册或者付费。但是，这样的世界也是不安全的，坏处颇多：绝对自由导致页面行为无限制，如信息紊乱，无秩序，隐私信息荡然无存，对恶意网站束手无措...

想到这些，那还是有安全策略比较好，如果没有安全策略，那么网站会容易遭受XSS攻击、SQL注入攻击、URL篡改等，接下来进入正题：

## 一、什么是XSS？

### （1）XSS概念

XSS，即跨站脚本，`Cross Site Scripting`，本来叫做CSS，但是为了和样式CSS区别，所以叫XSS。简单来说，XSS就是攻击者（或者黑客）想尽一切办法，绞尽脑汁往html文件中或者DOM中注入恶意脚本（执行的代码），从而用户在浏览器页面时利用注入的脚本对用户实施攻击。

XSS的重点不在于跨站，而在于执行的脚本或者代码，这是经常出现在Web页面的计算机安全漏洞。

### （2）存储型XSS

存储型XSS攻击是一种持久性的攻击，持久型就是攻击的脚本代码被服务端写⼊进**数据库**中，黑客事先将恶意的脚本代码植入到漏洞服务器中，只要受害者浏览包含此恶意脚本代码的页面，就会执行恶意代码。这意味着只要访问了这个页面的访客，都有可能会执行这段恶意脚本，正因如此，如果⽹站访问量很⼤的话，就会导致⼤量正常访问⻚⾯的⽤户都受到攻击。所以说存储型XSS攻击的危害会更大。此类攻击一般出现在网站留言、评论、博客日志等。

### （3）反射型XSS

反射型XSS攻击是一种非持久性的攻击，黑客通过特定手法，比如在地址后面传入一个参数或者一个`script`脚本，或者诱使用户去访问一个包含恶意代码的URL，当受害者真的访问这些含有恶意脚本的网站时，恶意脚本代码会直接在受害者主机上的浏览器执行。此类攻击一般出现在网站的搜索栏、用户登录口等，常用来窃取客户端Cookies或进行钓鱼欺骗 。

举个例子：

这是后端代码`server.js`：

```
// express自带路由
const express = require('express')
const path = require('path')
const app = express()
app.set('views', path.join(__dirname, 'views'))//读取根目录下的views文件夹
app.engine('html', require('ejs').renderFile) //ejs模板引擎
app.set('view engine', 'html') //读取的模板文件,即views/index.html
app.get('/', function(req, res, next) {
    console.log(req.query.xss);
    res.render('index', { //render渲染模板
        title: "Express",
        xss: req.query.xss
    })
})
app.listen(3030, () => {
    console.log('项目已启动~');
})
​
```

这里是前端代码`index.html`：

```
    <body>
        <p>welcome to <%= title  %></p>
        <div>
            <%- xss%>
        </div>
    </body>
```

当启动后端`node server.js`后，在浏览器访问`https://localhost:3030`，会出现以下界面：


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0068bbf296e14be5be24ea21cf1c7c17~tplv-k3u1fbpfcp-watermark.image?)

接下来，如果直接在后面传入一个xss字段的参数，会发生什么？


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/be570deefd164091a576f158fc155861~tplv-k3u1fbpfcp-watermark.image?)

设置url的参数后，参数的内容直接在页面上展示了！那如果换成脚本，是不是真的会执行呢？


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9a4e82008d974fbca69679eb4a966c81~tplv-k3u1fbpfcp-watermark.image?)

！！！是真的会直接执行，太可怕了~。

### （4）基于DOM的XSS

基于DOM的XSS也是一种非持久性的攻击，⾮持久型的攻击相⽐于持久性的攻击危害就⼩的多了，⼀般通过**修改** **URL** **参数**的⽅式加⼊攻击代码，诱导⽤户访问链接从⽽进⾏攻击。我们知道客户端的脚本程序可以动态地检查和修改页面内容，而不依赖于服务器端的数据。比方说，客户端如从URL中提取数据并在本地执行，如果用户在客户端输入的数据包含了恶意的脚本代码，并且这些脚本没有进行过滤或者转码，则应用程序就可能受到基于DOM的XSS攻击。

需要特别注意以下的用户输入源document.URL、location.hash、location.search、document.referrer等。

## 二、XSS有哪些危害？

```
    A.修改DOM结构，伪造页面，欺骗用户，获取账户密码等信息
    B.在页面内生成浮窗广告，影响用户体验
    C.恶意的JS会监听用户行为，比如addEventListener('keydown'),窃取用户信息
    D.窃取cookie信息，通过document.cookie()窃取，
```

## 三、如何防范XSS？

### （1）服务器对脚本进行过滤和转码

⾸先，对于⽤户的输⼊应该是永远不信任的。最普遍的做法就是转义输⼊输出的内容，对于引号、尖括号、斜杠进⾏转义，基于上述后端`server.js`，可以通过后端对前端接收的路径参数进行转码，即把`javascript`脚本变成不能识别成功执行的字符串既可，所以我们给后端添加转码操作：

```
// 阻止恶意脚本注入，转码
function transCode(str) {
    str = str.replace(/&/g, '&amp;')
    str = str.replace(/</g, '&lt;')
    str = str.replace(/>/g, '&gt;')
    str = str.replace(/"/g, '&quto;')
    str = str.replace(/'/g, '&#39;')
    str = str.replace(/`/g, '&#96;')
    str = str.replace(///g, '&#x2F;')
    return str
}
​
​
app.get('/', function(req, res, next) {
    console.log(req.query.xss);
    res.render('index', { //render渲染模板
        title: "Express",
        xss: req.query.xss ? transCode(req.query.xss) : ''
    })
})
```

进行转码后，脚本代码就不会再执行了。如图所示：


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1b2ab44876af4c5eb35ba8d97f8fa6b7~tplv-k3u1fbpfcp-watermark.image?)

### （2）充分利用CSP

CSP，Content-Security-Policy，是服务器的安全策略，本质上就是建⽴⽩名单，开发者明确告诉浏览器哪些外部资源可以加载和执⾏。限制加载其他域下的资源文件、禁止向第三方提交数据，可有效防范XSS攻击。开启CSP：

```
1. 设置 HTTP Header 中的 Content-Security-Policy
//设值default-src "self"只允许加载本站资源
//设值child-src "none" 允许加载任何来源框架
//设值img-src https://*只允许加载https协议图片
2.设置 meta 标签的方式 <meta http-equiv="Content-Security-Policy">
```
## 四、应用场景

平常在通过`javascript`直接使用 innerHTML 插入文本内容，存在 XSS 攻击的风险，举个例子：

```javascript
 	<div id="box"></div>
    <script>
        let box=document.getElementById('box')
        // let content='hello world'
        let content='<img src onerror="alert(1)">'
        box.innerHTML = "<p>"+content+"</p>"
    </script>
```

用户一打开页面，就能看到恶意图片信息，如图所示：


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c997ab206fef408c9d88ce51bda7101d~tplv-k3u1fbpfcp-watermark.image?)

所以，像`React`和`Vue`内部都有做防范XSS攻击的操作，来看看`React`是如何防范的吧~：

```javascript
		<div id="root"></div>
		<script type="text/babel">
         class Weather extends React.Component {
                render() {
					let content='<img src onerror="alert(11111111111111111)">'

					return (
						<div>{content}</div>
					);
				}
            }
			ReactDOM.render( < Weather / > , document.getElementById('root'));
		</script>
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c3f93e4c76024a8f9349cfe2a49eedfb~tplv-k3u1fbpfcp-watermark.image?)

如图所示，对于同样的恶意代码或者脚本，`react`不会遭受XSS攻击，这是为何？

这是因为`React`在渲染页面的过程中对于普通文本节点来说，采用的是`testContent`或者`createTextNode`的方式为DOM动态添加内容，即设置文本内容，因此不会有遭受XSS攻击的风险；而对于富文本内容，`React`使用`documentSetInnerHTML`的方式去添加富文本内容，在更新DOM某些属性的时候，会判断该属性是否为`dangerousSetInnerHTML`，如果是，就会调用`setInnerHTML`直接给DOM的`innerHTML`设置文本内容，所以在处理富文本时，潜在着安全风险。