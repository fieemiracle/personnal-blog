---
title: 路由带参，简简单单~
date: 2022-11-13
tags:
 - 路由带参
categories: 
 - Vue Series
isShowComments: true  
subSidebar: auto
---

## 带参数的路由匹配
***本文正在参加[「金石计划 . 瓜分6万现金大奖」](https://juejin.cn/post/7162096952883019783 "https://juejin.cn/post/7162096952883019783")***

带参数的路由匹配，其需求主要是：当需要将给定匹配模式的路由映射到`同一个`组件，但是其所需数据的目标用户不同如ID不同，页面参数不同等等时。在 Vue Router 中，我们可以在路径中使用一个动态字段来实现，也就是传入`路径参数`
### 一、query传递/接收路径参数

#### 1、两种方式

（1）方式一

```
router.push({
            name: 路径别名（如home,about,login）,
            query: {
                //路径参数的key:路径参数的value，可以传递一个或者多个
                username: 'catt',
                gender:'male'
            }
})
​
```

（2）方式二

```
router.push({
            path: 路径（如/home,/about,/login）,
            query: {
                //路径参数的key:路径参数的value，可以传递一个或者多个
                username: 'catt',
                sex:'female'
            }
})
```

使用path+query和使用name+query的区别在于：通过name方式跳转的页面在刷新之后，参数会失效，而path方式参数不会失效，会被保留。

#### 2、router-link

`<router-link to="xxx"></router-link>`标签将会呈现一个带有正确 `href` 属性的 `<a href="xxx"></a>` 标签。router-link跳转的路径可以不需要在路由处配置。使用router-link组件进行导航，通过to属性来执行链接，还需要一个路由出口，即router-view，路由匹配到的组件都将渲染在这里。

#### 3、router.push()

编程式导航，即router.push(location,onComplete?,onAbort?)，这个方式会向history栈添加一个新的记录，这样的话就会出现回退按钮，可以返回到来时的路径。在vue3中，没有this，所以不能使用this.$route.params，但是可以通过引入useRouter,useRoute来使用，其中，
> router是路由操作对象，只写对象，以及跳转参数；route是路由信息对象，只读对象，接收传递的路径参数

其实，router不仅仅只有push方法，还有router.go()，router.replace()。
举例如下：

（1）传递参数

```
//home页面
<button @click="toAbout">Go to AboutView</button>
​
<script setup lang="ts">
    import {
        useRouter
    } from 'vue-router';
    const router = useRouter()
    const toAbout = () => {
        router.push({
            name: 'about',
            query: {
                username: 'catt'
            }
        })
    }
</script>
```

（2）接收参数

```
//about页面
<script setup lang="ts">
    import {
        useRoute
    } from 'vue-router';
    import {
        onMounted
    } from 'vue';
    const route = useRoute()
    onMounted(() => {
        console.log(route.query);
    })
</script>
```

通过query传递参数，参数一般是以'?'形式拼接在路径后面，如果参数有多个，则参数与参数之间通过'&'进行拼接。完整路径为：xxxxxxxxxx/about.username?username=catt

传递一个路径参数，如图所示：


![image-20221113214402893.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d5e6f5f1b3c4bf1bcb2cf12d01b934e~tplv-k3u1fbpfcp-watermark.image?)

传递多个路径参数时。如图所示：


![image-20221113215018124.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4e1fe0221feb4a1c9c88abb4de4d1f09~tplv-k3u1fbpfcp-watermark.image?)

## 二、params传递/接收路径参数

如果提供了path，patams会被忽略。所以，通过params传递参数，只有一种方式

```
router.push({
            name: 路径别名（如home,about,login）,
            params: {
                //路径参数的key:路径参数的value，可以传递一个或者多个
                username: 'catt',
                gender:'male'
            }
})
​
```
其中，路由配置`path:"/about/:username"`或者`path:"/about.username"`

在路由中不配置`path`中的参数`username` 第一次可请求,刷新页面`username`会消失

在路由中配置`path`中的参数`username` 刷新页面`username`会保留
### 1、router-link
router-link中链接如果是'/'开始，就是从**根路由**开始，即在路由配置的path;如果开始不带'/',则代表的是从当前路由开始，也就是当前路由的子路由，路由的**子路由**配置中path也不需要'/'。

举个简单例子: 当前页面所在路由为 /app/home，在设置router-link链接的时候，

{path:'about'} 跳转后页面所在路由为 /home/about，配置在某个路由的子路由里

{path:'/about'} 跳转后页面所在路由为 /about

### 2、router.push()

（1）传递参数

```
//home页面
<script setup lang="ts">
    import {
        useRouter
    } from 'vue-router';
    const router = useRouter()
    const toAbout = () => {
        router.push({
            name: 'about',
            params: {
                username: 'dogg'
            }
        })
    }
</script>
```

（2）接收参数

```
<script setup lang="ts">
    import {
        useRoute
    } from 'vue-router';
    import {
        onMounted
    } from 'vue';
    const route = useRoute()
    onMounted(() => {
        console.log(route.params);
    })
</script>
```

（3）需要路由配合，显示参数

```
{
            path: '/about/:username',
            name: 'about',
            component: () => import('../views/AboutView.vue')
}
```

通过params传递参数，如果需要在路径显示参数，则需要路由配合，即把params也当做是路由的参数；否则，不会再路径中显示。完整路径：xxxxxxxxxxxxxxx/about/dogg

传递一个参数时，如图所示：

![image-20221113214157088.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0f8dff194f2d483a97f0d9f12def659f~tplv-k3u1fbpfcp-watermark.image?)

感兴趣的友友，可以自行测试params不配合路由使用，以及path+params会出现什么结果。

## 三、总结
query和params传参的区别：

#### （1）query

使用name+query或者path+query传递路径参数，可以用path或者name两种方式来引入路由。 query是拼接在url后面的参数，没有传参也可以正常显示页面，**query相当于get请求**，页面跳转的时候，可以在地址栏看到请求参数，

#### （2）params

使用name+params传递路径参数，只能用name来引入路由，如果写成了path，或忽略params传递的参数，那么接收参数的页面的结果将会是undefined。 params传参跳转后，接收的参数不显示在路由上，如果刷新页面，参数会消失；但是如果想刷新保留参数，可以通过配合路由使用，将params当成路由的一部分，在路由后面直接添加参数名。**params相当于post请求**，参数不会在地址栏中显示，只有params和路由结合使用才可以在地址栏看到传递参数。
