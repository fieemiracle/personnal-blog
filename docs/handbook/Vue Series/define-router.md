---
title: 导航守卫----不登录就不给看！
date: 2022-10-30
tags:
 - 路由守卫
categories: 
 - Vue Series
isShowComments: true  
subSidebar: auto
---



持续创作，加速成长！这是我参与「掘金日新计划 · 10 月更文挑战」的第9天，[点击查看活动详情](https://juejin.cn/post/7147654075599978532)

相信大家也知道大部分的网页版引应用，“不登录就不给看！”，于是，我也给自己的项目添加了这个小细节。如何实现呢？当然是使用路由守卫啦。

正如其名，导航守卫就是通过跳转或取消的方式守卫导航。这里使用的vue-router提供的导航守卫。

## 没有守卫时

以vue3为例，使用脚手架搭建项目， 命令代码：*npm init vue@latest*。选择所需的插件，其中因为方便举例，这里都是会话缓存（用到时再解释），没有使用其他状态管理器，如vuex或者pinia...。需要安装vue-router，接下来的改变都是以最初始的页面为基础（接下来就同意称之为基础页面），进行添加路由守卫。

登录页面和首页页面：

```
//登录页面 views/LoginView.vue
<template>
    <div class="login">
        <h1>This is an login page</h1>
        用户名：<input type="text" v-model="formState.username" />
        <div class="btn" style="margin-top: 20px;">
            <button @click="onFinish">登录</button>
        </div>
    </div>
</template>
​
//登录页面 js代码
<script>
    //...引入defineComponent
    export default defineComponent({
        setup() {
            const formState = reactive({
                username: ''
            })
            const onFinish = async () => {
                console.log('success', formState.username)
            }
            return {
                formState,
                onFinish
            }
        }
    })
</script>
​
//首页页面 /views/HomeView.vue
<template>
    <div class="home">
        <h1>This is an home page</h1>
    </div>
</template>
```

配置路由：

```
//路由配置 router/index.js
//...一些引入
​
const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('../views/HomeView.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginView.vue')
        }
    ]
})
​
export default router
​
```
最开始其实就是准备两个vue3脚手架搭建好两个页面，登录页面和首页页面，然后配置路由即可。
看看效果：


![origin.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/557be3a8e07c4629822ce2a062f7688f~tplv-k3u1fbpfcp-watermark.image?)

## 一、全局路由守卫

### 知识基础

-   全局前置守卫

    可以使用router.beforeEach()注册一个全局前置守卫。当一个导航触发时，全局前置守卫按照创建顺序调用。此时，导航在所有守卫resolve完之前一直处于等待之中。

    ```
    const router = createRouter({ ... })
    router.beforeEach((to, from, next) => {//路由跳转前
      if(...){//不存在token
         //回到登录页面
         return {name:'login'}
      }else{
          next()//只有调用next()，才能成功跳转；否则不成功
      }
    })
    ```

    参数：

    （1）to:即将要进入的目标

    （2）from:当前导航正要离开的路由

    （3）next：去到下一个导航守卫调用。确保next在任何给定的导航守卫中都被严格调用一次。

-   全局解析守卫

    使用router.beforeResolve()注册一个全局解析守卫。与全局前置守卫类似，在每次导航时触发，但是在确保导航被触发之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被正确调用。

    ```
    const router = createRouter({ ... })
    router.beforeResolve((to, from, next) => { //成功调到目的地页面之前
        console.log(to, from);
        next();
    })
    ```

-   全局后置钩子

    使用router.afterEach()注册一个全局后置钩子，与守卫不同，它*不接受next第三个参数*，函数也不会改变导航本身。

    ```
    const router = createRouter({ ... })
    router.afterEach((to, from) => {
     console.log(to, from);
     if (!sessionStorage.getItem('age') && to.name !== 'LoginView') {
         router.push('LoginView');//以这种方式强制回到登录页面
     }
    })
    ```

### 路由守卫

浏览器缓存：

-   本地缓存

    LocalStorage.setItem(key,value) 设置本地缓存

    LocalStorage.setItem(key) 获取本地缓存

    永久性缓存，可手动清除缓存。

-   会话缓存

    SessionStorage.setItem(key,value) 设置会话缓存

    SessionStorage.setItem(key) 获取会话缓存

暂时性缓存，结束会话即缓存清除，可手动清除缓存。

在没有做路由守卫页面的基础上，在登录页面增加做缓存的功能：

```
//...登录页面的html代码
​
<script>
    //...一些引入
    //...其他代码（标准格式）
    const onFinish = async () => {
        console.log('success', formState.username)
                
       //这里是新添加的做缓存功能代码
       // 假设拿到后端数据，接下来做缓存，比如在xxxx天后登录失效
      if (formState.username) {
             //设置会话缓存
            sessionStorage.setItem('username', formState.username)
            //路由跳转
             router.push('/home')
      } else {
           alert('用户名为空')
     }
                
    }
    //...其他代码（标准格式）
</script>
```

接下来，在全局设置路由守卫，即在搭建的基础之上，添加路由守卫代码。

```
//全局路由守卫：main.js
//...一些引入
​
// 全局路由守卫----全局前置守卫
router.beforeEach((to, from, next) => { //路由跳转前
    // console.log(to, from);
    // 判断是否在缓存，在的话允许访问首页；否则，跳回登录页面
   if (!sessionStorage.getItem('username') && to.name !== 'login') {//不存在
        return next({//去登录页面
            name: 'login'
        })
    } else {//存在，允许去你想要的页面
        next(); //只有调用next()，才能成功跳转；否则不成功
    }
})
​
//...一些use
```

来看看守卫的结果吧：

![global.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4909524945bc403d8aad79347c207e59~tplv-k3u1fbpfcp-watermark.image?)

## 二、路由独享守卫

### 知识基础

-   路由独享的守卫

    ```
    const routes = [
      {
        path: '/users/:id',
        component: UserDetails,
        beforeEnter: (to, from,next) => {
         // return false
            if(...){//未登录或者为授权
               //强制回到登录页面,或者retun false拒绝导航
               next({
                 name: 'login'
               })
            }else{ 
                next()//去到下一个导航守卫
            }
        },
      },
    ]
    ```

    *路由独享的守卫只有在进入路由时才会触发*，不会再路径改变参数（params）、query、hash等时触发。它只是只有在从一个不同的路由导航时，才会被触发。也可以将函数数组传给beforeEnter，在为不同的路由重用守卫时大有作为。

### 路由守卫

在基础页面上，在你想要守卫的路由组件下面增加路由守卫，如下

```
//路由配置 router/index.js
{
            path: '/home',
            name: 'home',
            component: () => import('../views/HomeView.vue'),
                
             //这里是新添加的路由守卫代码   
            // 路由守卫---
            beforeEnter: (to, from, next) => {
                if (!sessionStorage.getItem('username')) {
                    alert('请先登录');
                    next({
                        name: 'login'
                    })
                } else {
                    next();
                }
            }
            
}
```

看看路由守卫结果：


![router.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3195889e090c46489c9703d8219005a1~tplv-k3u1fbpfcp-watermark.image?)

## 三、组件内的守卫

### 知识基础

-   beforeRouteEnter

    beforeRouteEnter()一般在*渲染该组件的对应路由被验证前调用*，但是不能获取组件实例的this，因为当前守卫执行时，组件实例还没被创建。

    ```
    beforeRouteEnter(to, from, next) {
                // 进入当前组件
                if (...) {//没有满足要求
                    return next({
                        name: 'login'
                    })
                } else {
                    next(); //只有调用next()，才能成功跳转；否则不成功
                }
    }
    ```

-   beforeRouteUpdate

    beforeRouteUpdate()一般*在当前路由改变，但是该组件被复用时调用*，如同一个路径下携带参数不一样的情况下。因为路径相同会渲染相同的组件，因此组件实例会被复用，而钩子函数就会在这个时候会被调用。在这种情况下，组件已经挂载就绪，导航守卫可以访问组件实例的this。正是因为可以使用this，所以不支持next的调用。

    ```
     beforeRouteUpdate(to, from) {
        console.log(this)
         this.name=to.params.name
      },
    ```

-   beforeRouteLeave

    beforeRouteLeave()，离开守卫，通常用来预防用户还在未保存修改之前就突然去其他页面。顾名思义，一般*在导航离开渲染组件的对应路由时调用*。也可以访问组件实例的this，同时也没有next可以调用。

    ```
      beforeRouteLeave(to, from) {
        console.log(this)
          return false//可取消守卫
      }
    ```

### 路由守卫

组件内的守卫，那么只需要在页面进行路由守卫即可，在基础1页面上，在需要守卫的页面上添加路由守卫：

```
//home页面js代码
<script>
    import {
        defineComponent
    } from "vue"
    export default defineComponent({
        beforeRouteEnter(to, from, next) {
            // 进入当前组件
            if (!sessionStorage.getItem('username') && to.name !== 'login') {
                return next({
                    name: 'login'
                })
            } else {
                console.log(1233333333333);
                next(); //只有调用next()，才能成功跳转；否则不成功
            }
        }
    })
</script>
```

看看守卫结果:

![component.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5702335af09843528f29dc88a3d28f47~tplv-k3u1fbpfcp-watermark.image?)

## 总结
全局路由守卫三个钩子函数，全局前置守卫（beforeEach），全局解析守卫（beforeResolve）和全局后置守卫（afterEach），其中全局后置守卫（afterEach）没有next可以调用，即不能传递第三个回调参数next；

路由独享的守卫（beforeEnter），只有在进入路由时才会触发；

组件内的路由守卫，也有三个api可以使用，分别是beforeRouteEnter，beforeRouteUpdate，beforeRouteLeave，其中因为beforeRouteEnter调用的时候，组件实例还没有被创建，所以只有beforeRouteEnter可以传递第三个回调参数next，因为beforeRouteUpdate，beforeRouteLeave被调用的时候，组件实例已经被挂载就绪，可以访问组件实例的this,所以没必要next的存在了。