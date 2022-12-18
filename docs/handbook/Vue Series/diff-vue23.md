---
title: vue2和vue3的区别？先从响应式原理说起
date: 2022-10-29
tags:
 - vue2和vue3的区别
categories: 
 - Vue Series
isShowComments: true  
subSidebar: auto
---

持续创作，加速成长！这是我参与「掘金日新计划 · 10 月更文挑战」的第8天，[点击查看活动详情](https://juejin.cn/post/7147654075599978532 "https://juejin.cn/post/7147654075599978532")

## 一、什么是响应式？

Vue 最标志性的功能就是其低侵入性的响应式系统。组件状态都是由响应式的 JavaScript 对象组成的。*当更改数据时，会驱动视图更新*。举个简单的例子：

```
​
    <div id="app">
        <p class="content">result1:{{result1}}</p>
        <p class="content">result2:{{result2}}</p>
    </div>
​
    <script>
        new Vue({
            el:'#app',
            data(){
                return{
                    num1:1,
                    num2:2,
                    //设置result1和result2的初始值恰好是num1+num2
                    result1:3,
                    result2:3
                }
            },
            created(){
                //改变num1的值
                this.num1=2
                this.result2=this.num1+this.num2
            }
        })
    </script>
​
```
当改变num1值之前，页面上应该resulr1和result2的值都是3，而当改变num1的值以后，会触发视图更新，页面上result1的值是3，result2的值是4。数据改变，视图也会随之更新。

而原生JS一个值改变，是不会驱动视图更新的，例如：

```
let num1 = 1
let num2 = 2
let result = num1 + num2
console.log(result) // 3
num1 = 2
console.log(result) // 3，没有改变
```

## 二、vue2响应式原理？

### 1、响应式API

**`Object.defineProperty()`** 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。

```
Object.defineProperty(obj,prop,descriptor)接收三个参数，

obj:要定义属性的目标对象；

prop：要定义或修改属性的名称或Symbol；

descriptor：要定义或修改的属性描述符；返回值是被传递给函数的对象。
```

**属性描述符包括**：

-   *数据描述符*：具有值的属性，该值可以是可写的（ writable: true），也可以是不可写的（ writable: false）
 * *存取描述符*：由getter函数和setter函数所描述的属性。一个描述符只能是数据描述符或者存取描述符，不能同时是两者。

    属性描述符描述的都是对象，在使用Object.defineProperty()定义属性时候有一些可选的键值。如下：

-   *configurable(可配置的)*：当设置值为true的时候，表示该属性的描述符可以被改变，同时该属性也能从对应的对象上删除。默认为false。

-   *enumerable(可枚举的)*：当设置值为true时，表示该属性是可枚举属性。默认为false。

    **数据描述符的可选键值**：

-   *value(属性值)*：可以设置任何有效的Javascript值（数值，对象，函数等），默认为undefined。

    *writable(可写的)*：当设置的值为true时，代表value可以被重新赋值。默认为false。

   **存取描述符的可选键值**：
   
  *set*：属性的setter函数，若没有setter，则为undefined。当属性值被修改时，会调用该函数。写法：set(newValue){oldValue=newValue}。默认为undefined。
   
  *get*：属性的getter函数，若没有getter，则为undefined。当访问属性的时候，会调用该函数。执行的时候不需要传入任何参数，但是会传入this对象。该函数的返回值会被用作属性的值。写法：get(){return oldValue}。默认为undefined。
    
  

另外，**defineProperty应当直接在Object构造器对象上调用此方法，而不是在任意一个Object类型的实例身上调用**。

举个例子：

```
const obj_origin = {}
Object.defineProperty(obj_origin, 'name', { //劫持对象obj_origin
  value: '秦霄贤',
  writable: false
})
obj_origin.name = '哈尼~'//非严格模式下
console.log(obj_origin.name); //秦霄贤
​
```

### 2、响应式原理

```
// vue2.0 响应式原理--数据变了  可以更新视图
​
function type(data) {
    return Object.prototype.toString.call(data).slice(8, -1) // 'Number'
  }
  
  let oldArrayPrototype = Array.prototype
  let proto = Object.create(oldArrayPrototype) // 继承
  
  // pushxxxx  函数劫持， 把函数重写 
  Array.from(['push', 'shift', 'unshift', 'pop']).forEach(method => {
    proto[method] = function() { 
      oldArrayPrototype[method].call(this, ...arguments)
      updateView()
    }
  })
  
// observer函数专门用于劫持数据
  function observer(target) { 
    if (typeof target !== 'object' || typeof target == null) { // 崩
      return target
    }
  
    if (Array.isArray(target)) {
      // target.__proto__ = proto
      Object.setPrototypeOf(target, proto)
    }
  
    for (let key in target) {
      defineReactive(target, key, target[key])
    }
  }
  
  // 响应式
  function defineReactive(target, key, value) {
    observer(value)//这个递归是默认执行的
  // Object.defineProperty () 可以重新定义属性 给属性安插 getter setter 方法
    Object.defineProperty(target, key, {
      get() {
        return value
      },
      set(newVal) {
        if (newVal !== value) {
          value = newVal
          updateView()
        }
      }
    })
  }
  
  
  function updateView() {
    console.log('更新视图');
  }
  
let data = {
  name: 'hunny',
  age: {
    n: 19
  },
  hobby: ['reading']
}
observer(data)
​
// （1）当改变属性是基本数据类型的时，不触发更新视图
data.name = 'hunny'
// （2）但改变属性是对象类型的值时，触发更新视图
data.age.n = 101
data.age = {
  n: 102
}
// （3）当属性不存在时，不触发更新视图
data.sex = 'boy'
​
// （4）当改变数组类型，触发更新视图
Array.prototype.push = function() {}
data.hobby.push('singing')
​
// （5）当改变数组原本的长度，数组长度会改变，会放两个empty,占位符，但是不触发更新视图
data.hobby.length = 5
console.log(data.hobby.length); //5，实际上是2
```

### 3、缺点

（1）vue2 对象中不存在的属性不能被拦截， Object.defineProperty()只能劫持对象

（2）数组改变length属性不会驱动视图更新，虽然长度被改变了。

（3）当对象是一个嵌套的对象的时候，需要使用递归进行深度监听，vue2当中 递归是默认执行的

（4）vue2中无法监听到对象的增删，所以vue2还补充了Vue.$set()，Vue.$delete()等其他方法进行弥补。

（5）对象新增的属性没有响应式 数组的部分操作没有响应式。数组的一些方法会改变数组，在vue2中被重写。

## 三、vue3响应式原理？

### 1、响应式API

**Proxy** 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。const myProxy=new Proxy(target,handler)。target：被Proxy代理虚拟化的目标对象（整个对象），可以是任何类型的对象，包括原生数组、函数，另一个代理等；handler：一般以函数作为属性的对象，各睡醒的函数分别定义了在执行各种操作时代理的myProxy的行为。

**Proxy的内置方法**：

-   Proxy.revocable()：创建一个可撤销的Proxy对象

handler独享是一个容纳一批特定属性的占位符对象。它包含Proxy的各个捕获器。

**handler对象上的方法**：(以实现响应式原理用到的方法进行列举)
-   handler.has()：针对in操作符的代理方法

-   handler.set()：设置属性值操作的捕获器

-   handler.get()：拦截对象的读取属性的操作

-   handler.deleteProperty()：拦截对对象属性的删除操作

    举个例子：

```
const obj_origin = {}
const handler = {
  get(obj, name) {
    return name in obj ? obj[name] : '嘻哈'
  }
}
const myProxy = new Proxy(obj_origin, handler)
myProxy.name = '嗯哼~'
myProxy.age = undefined
​
console.log(myProxy.name, myProxy.age); //嗯哼~ undefined
console.log(myProxy.gender);//嘻哈
```

### 2、响应式原理

```
// vue3 响应式原理
let toProxy = new WeakMap() // 弱引用映射表  存放原对象：代理过的对象
let toRaw = new WeakMap()   // 代理过的对象：原对象
​
// 判断对象
function isObject(val) {
    return typeof val === 'object' && val !== null
}
​
function hasOwn(target, key) {
    return target.hasOwnProperty(key)
}
​
// 核心方法
function reactive(target) {
    return createReactiveObject(target)
}
​
// 创建响应式对象
function createReactiveObject(target) {
    if (!isObject(target)) {    // 原始类型，直接返回
        return target
    }
​
    let proxy = toProxy.get(target)
    if (proxy) {    // 代理过
        return proxy
    }
    if (toRaw.has(target)) {    // 防止多层代理
        return target
    }
​
    let baseHandler = {
        get(target, key, receiver) {
            // reflect对象上的方法与proxy上的方法一一对应
            let res = Reflect.get(target, key, receiver) // reflect 做反射
            return isObject(res) ? reactive(res) : res
        },
        set(target, key, value, receiver) { // [1,2,3,4]
            // 判断是新增属性还是修改属性
            let hadKey = hasOwn(target, key)
            let oldValue = target[key]
            let res = Reflect.set(target, key, value, receiver)
​
            if (!hadKey) {
                console.log('新增属性');
            } else if (oldValue !== value) {
                console.log('修改属性');
            }
            return res
        },
        deleteProperty(target, key) {
            let res = Reflect.deleteProperty(target, key)
            console.log('删除属性');
            return res
        }
    }
​
    let observed = new Proxy(target, baseHandler)
    toProxy.set(target, observed)
    toRaw.set(observed, target)
    return observed
}
​
// 数组
let users = ['cat', 'dog', 'mice']
let myProxy = reactive(users)
// （1）当给数组添加元素时，'新增属性'
myProxy.push('fish')
​
// （2）当改变数组原本长度时，'修改属性'
myProxy.length = 5
​
// （3）当进行多层代理时， 利用get读取时才代理
let otherProxy = reactive({
  name: 'bird',
  food: {
    type: 'meat'
  },
  hobbies: ['flying', 'singing']
})
// 当修改基本类型的属性值，'修改属性'
otherProxy.name = 'duck'
// 当删除基本类型的属性时，'删除属性'
delete otherProxy.name
console.log(otherProxy.name); //undefined
​
// 当改变对象类型的属性时,'修改属性'
otherProxy.food.type = 'leaves'
console.log(otherProxy.food.type); //leaves
​
// 被代理过的对象需要记录一下，不要再次代理了
// reactive(otherProxy)
```

### 3、对比vue2

（1）Proxy代理的对象是整个对象，而不是对象的某个特定的属性。

（2）代理之后操作的对象是实例对象，而不是原对象。

（3）vue3的响应式原理不需要递归，性能比较好。
