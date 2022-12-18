---
title: 会用new还不够，还得知道它到底做了什么
date: 2022-10-24
tags:
 - new原理
categories: 
 - Javascript
isShowComments: true  
subSidebar: auto
---

持续创作，加速成长！这是我参与「掘金日新计划 · 10 月更文挑战」的第6天，[点击查看活动详情](https://juejin.cn/post/7147654075599978532 "https://juejin.cn/post/7147654075599978532")

你知道new吗？你知道new的实现原理吗？你能手写new方法吗？

## 一、new做了哪些事？

先看看new的使用场景：

```
// 1、创建一个构造函数
function Vehicle(name, price) {
    this.name = name
    this.price = price
}
​
// 2、new一个实例对象
let truck = new Vehicle()
console.log(truck); //Vehicle { name: undefined, price: undefined }
console.log(Object.prototype.toString.call(truck)); //[object Object]
​
// 传入参数
let car = new Vehicle('car', '￥9999999')
console.log(car);
//Vehicle { name: 'car', price: '￥9999999' }
​
```

司空见惯的代码，烂熟于心的写法，那你知道new具体做了哪些事情嘛？从上述代码可以看出，一个构造函数使用new操作符调用的时候，会生成一个具有构造函数相同属性的新对象。是不是很奇怪？明明Vehicle是构造函数：

```
console.log(typeof Vehicle); //function
```

然而，经过new的一番操作后，它的实例化是一个对象！！！new到底做了哪些事情呢?对于这个例子，我们可以概括为以下事情：

```
​
    // 第一件：在构造函数内部，创建一个this对象
    let this = {
        name = name,
        price = price
    }
​
    // 第二件：返回this对象
    return this;
​
    // 第三件：给this对象的属性赋值
    this.name = name
    this.price = price
```

很抽象，看不懂。。。进一步剖析如下：

```
function Person(name, gender) {
    console.log('赋值前的this=', this); //赋值前的this= Person {}
    this.name = name
    this.gender = gender
    console.log('赋值后的this=', this); //赋值后的this= Person { name: '小灰灰', gender: 'boy' }
}
​
let child = new Person('小灰灰', 'boy')//Person { name: '小灰灰', gender: 'boy' }
console.log(child);
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/017ae5d1a00043f8aa562969565e77fe~tplv-k3u1fbpfcp-watermark.image?)


由以上代码可以看出，

第一：在构造函数内部有一个空的this对象，通过new操作符，会创建生成一个全新的对象（实例对象）。

第二：实例对象会执行[[Prototype]]（ __.proto__）链接，并且实例对象的this会指向构造函数的this（实例对象会绑定函数调用的this）。通过new创建的实例对象最终被[[Prototype]]（ __.proto__）链接到构造函数的Prototype对象上。也就是说，**实例对象的隐式原型===构造函数的显示原型**

## 二、返回不同类型时有哪些表现？

创建一个构造函数X，通过new操作符，实例化X得到实例化对象x，打印x,一定会是X{...}这个对象嘛？当构造函数内部有返回值，并且返回的是不同类型的值，打印的结果又会是怎么样呢？

```
function Student(id, name) {
    this.id = id
    this.name = name
​
    // 返回基本类型的值时：返回的结果依然是对象Student {name:xxx,age:xxx}
    // return null   //Student { id: '1001', name: 'cat' }
    // return undefined //Student { id: '1001', name: 'cat' }
    // return 123        //Student { id: '1001', name: 'cat' }
    // return 'hello world'   //Student { id: '1001', name: 'cat' }
    // return true  //Student { id: '1001', name: 'cat' }
    // return false  //Student { id: '1001', name: 'cat' }
    //return Symbol('abc')  //Student { id: '1001', name: 'cat' }
​
    // 返回引用类型时：
    //返回空对象时：返回的结果是空对象
    // return {}  //{}
    //返回函数时，返回的结果是函数
    return function() {} //[Function (anonymous)]
    // return [] //[]
    // return new Date() //2022-10-24T04:44:18.581Z
    // return new Error() //Error...
}
​
let student = new Student('1001', 'cat')
console.log(student); //构造函数内部返回不同类型的值时，这里的打印结果是一样的吗？
```

## 三、手写new的实现原理?

思路：new的实现原理核心是new做了哪些事情。

总结：
（1）通过new操作符调用构造函数，会返回一个全新的对象，这个对象的属性是构造函数的参数。

若构造函数内部有返回值，且返回值是基本数据类型（number|string|null|undefined|Symbol|boolean），则实例对象的返回结果是原本的对象；

若返回值是引用数据类型（Object|Array|Function|Date|RegExp|Error），则实例对象的返回的结果就是引用类型对应的值。

（2）通过new操作符创建的实例对象的隐式原型会挂载到构造函数的显示原型上。实例对象.__proto__==构造函数.prototype。

（3）通过new操作符创建的实例对象的this会绑定调用函数的this
请看如下代码：

```
// new的实现原理
function newPerson() {
    // 先return一个对象
    var obj = {};
    
    var constructor = Array.prototype.shift.call(arguments); //把数组的shift方法借给constructor使用
    
    // 实例对象的隐式原型===构造函数的显示原型
    obj._proto_ = constructor.prototype;
    var result = constructor.apply(obj, arguments);
    return typeof result === 'object' && result != 'null' ? result : obj;
}
​
let p = newPerson(Person, 'hunny')
console.log(p); //{ _proto_: {}, name: 'hunny', age: undefined }
```
