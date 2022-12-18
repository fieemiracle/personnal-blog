---
title: 快来学习javascript设计模式
date: 2022-12-04
tags:
 - 设计模式
categories: 
 - Javascript
---

---
highlight: a11y-dark
theme: healer-readable
---
***本文正在参加[「金石计划 . 瓜分6万现金大奖」](https://juejin.cn/post/7162096952883019783 "https://juejin.cn/post/7162096952883019783")***

关于Javascript的设计模式，你知道几种？接下来聊聊工厂模式、装饰器模式和单例模式~。
## 一、工厂模式

### （1）什么是工厂模式？

工厂模式就是根据不同的输入返回不同类型的实例，一般用来创建同一个类对象，主要思想就是将对象的创建与对象的实现分离，工厂模式属于一种创建型模式。 这里你应该大脑快速飞转，就想到了构造函数和ES6里面的class及其对应new出的实例对象。是的，但是不局限于此。工厂模式就好比这样一个场景：工厂向用户提供一些产品，那么用户只需要关心自己想要的是什么产品，比如材质，颜色等等、关心到手的产品好不好仅此而已；而工厂自然是最累的，用户需要一个XXXX样的产品，那么首先就得构造一个类，并且处理一些属性（形参），让用户去自定义实参，同时考虑一些复杂的操作，比如这些参数要怎么让用户使用，捋清楚内部的复杂逻辑，最后只要用户去调用，就能得到一个实例。

### （2）核心思想

现在思考一个这个问题，如果你现在需要录入每个程序员的一些基本信息，比如姓名，性别，出生日期，爱好，年龄等等。你首先想到的是用一个对象去构建嘛。

```
const coder={
    name:'tt',
    age:18,
    gender:'male',
    birth:'2001.06.12',
    career:'care',
    //......后续有更多的属性
}
//后续有更多的程序员
```

是谁这么想的我不说。每个程序员数目....不可胜数，每个人的特点也...不可胜数，一个一个去构造，是不是太耗费人力资源以及精力了。由此你又心生一计，要是有一个工厂，把需要的参数以及如何去调用都给我实现了，最后我只需要去调用返回一个实例，是不是就更贴心了。于是你想用构造函数试试：

```
function Coder(name, age) { //录入每个程序员的信息
    this.name = name;
    this.age = age;
    this.career = 'coder';
    this.work = ['写代码', '改bug', '马产品'];
}
​
function ProductManager(name, age) { //录入每个管理员的信息
    this.name = name;
    this.age = age;
    this.career = 'product manager';
    this.work = ['定会议室', '画原型图', '催更'];
}
​
// 工厂诞生
function Factory(name, age, career) {
    switch (career) {
        case 'coder':
            return new Coder(name, age);
            break;
        case 'product manager':
            return new ProductManager(name, age);
            break;
    }
}
// 得到实例
const coder1 = new Factory('linda', 19, 'coder')
const manager1 = new Factory('boss1', 32, 'product manager')
console.log(coder1);
console.log(manager1);
```

你不仅实现了如何录入每个程序员的信息，还可以录入每个管理员的信息，于是你很开心，晚上给自己加了两个大鸡腿。但是你觉得不完美，你想着如何要录入其他人的信息，又得创建一个个构造函数，这也很冗杂，于是你想把各种人的录入信息统一为一个录入信息构造函数，让用户自己调用的时候传入自己的身份，一个工厂构造函数，于是你改进了工厂模式：

```
// 改进后的工厂（有构造函数的地方）
function User(name, age, career, work) {
    this.name = name;
    this.age = age;
    this.career = career;
    this.work = work;
}
​
function Factory(name, age, career) {
    switch (career) {
        case 'coder':
            work = ['写代码', '改bug', '马产品'];
            break;
        case 'product manager':
            work = ['定会议室', '画原型图', '催更'];
            break;
        default:
            work = ['守卫公司']
            break;
    }
​
    return new User(name, age, work, career)
}
const guider1 = new Factory('门卫叔叔', 43)
const coder1 = new Factory('程序员甲', 20, 'coder')
const manager1 = new Factory('管理员1', 40, 'product manager')
console.log(guider1, coder1, manager1);
```


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/93d8aebb65c046ccac7b8fc4ff549e3b~tplv-k3u1fbpfcp-watermark.image?)
改进后的工厂看着顺眼多了，管你什么人，我不需要再添加任何构造函数了，刚好现在外卖也到了...

### （3）关于工厂模式

从上述总结，可以知道，工厂起到的作用就是隐藏了创建实例的复杂度，只需要提供一个接口，供调用，一切就会简单清晰。这只是举的一个简单例子，实际上工厂更复杂，因为创建一个实例是一个很复杂的过程，工厂帮我们隐藏了这个过程，只需要一行代码调用就能实现功能。

工厂模式适用于对象的创建比较复杂，但是用户不需要知道创建的具体流程以及复杂的内部逻辑；对处理大量具有相同属性的对象也颇有优势。通过将对象的创建和实例分离，让代码的结构也更加清晰，良好的封装，扩展性也比较好，符合开放封闭原则，简单清晰。

但是，凡事都具有两面性，工厂模式也带来了额外的系统复杂度，主要关注产品实例的创建，对外并不知道其内部逻辑，增加了抽象性。

## 二、单例模式

### （1）什么是单例模式？

单例模式就是一个单一的类，即一个类只能创建单个对象（保证一个类，仅有一个实例），也就是说一对一，这个类是访问实例的唯一，也可直接访问，不需要实例化该类的对象。单例模式也属于一种创建型模式。

单例模式具有以下特点：

-   单例类只能创建并拥有一个实例对象
-   单例类必须自己本身创建自己的唯一实例对象
-   单例类必须给所有其他对象提供这个实例对象（也就是说，这个类可以创建很多个实例，但是这些实例都是同一个实例，一旦改变任一实例的属性值，其他所有的实例的属性值也都改变了）

### （2）核心思想

单例模式，一个类只能创建单个实例对象，这得怎么操作才可以实现呢？于是你想到，其实Vuex状态管理器里面的Store好像就是单例模型，但是你还是不知道怎么实现。现在就是要保证只有一个对象可以访问，于是想试试在类上挂一个属性，这个属性值是一个方法，方法提供一个变量，让这个变量来确保实例只能创建一次，于是下笔如有神助之后：

```
class Person {
    say() {
        console.log('hello world');
    }
}
Person.getInstance = (function() {
    let instance = null  //变量只能被创建一次
    return function() {
        if (!instance) {//变量只能被创建一次
            instance = new Person()
        }
        return instance
    }
})()
​
const p1 = Person.getInstance()
const p2 = Person.getInstance()
console.log(p1 == p2); //true
```

这样就实现了单例模式，熟悉使用`class`的也会不喜欢把方法写在外面，直接写在里面也是可以的，但是注意使用`static`关键字，因为这个方法是不能被原型链继承得到的：

```
class Person {
    say() {
        console.log('hello world');
    }
    static getInstance() {
        if (!Person.instance) {//变量只能被创建一次
            Person.instance = new Person()
        }
        return Person.instance
    }
}
​
const p1 = Person.getInstance()
const p2 = Person.getInstance()
console.log(p1 == p2); //true
```

上面这个方法就是一个闭包！

### （3）关于单例模式

对于上述，可能又有人感到疑惑，为什么改变单例模式的一个实例对象的属性值，其余所有的实例对象的属性值也会改变呢？其实这就相当于对象的浅拷贝，浅拷贝拷贝的仅仅是对象的"引用地址"，而不是值，因此无论改变任一一个对象的值，另一个对象对应的值也会改变。（深拷贝是把引用地址和值一起拷贝，一个对象的值改变，另一个对象的值不会受到任何影响）

其实单例模式也很常用，比如全局缓存、全局状态管理器等都是只需要一个对象。

## 三、装饰器模式

### （1）什么是装饰器模式？

在ES7中有引入了装饰器（Decorator），用来增强Javascript类的功能，装饰器是一种函数，但是现在没有任何浏览器支持这个装饰器，所以我们接下来说的是，Javascript里面的装饰器模式。

装饰器模式，顾名思义，就是不需要改变已有的接口，只需要给对象添加功能，就像平时敲代码，你觉得代码写成“屎山”看着很闹心，于是安装了一个插件...，不改变现有的编译器，让编译器添加一个插件，编译器好，你也好。

也就是说装饰器模式会动态地给对象添加一些额外的功能，在不改变原有对象的基础上，通过对其进行包装和扩展，让原有的对象可以满足用户的更复杂的需求，而不会影这个类中派生的其他对象。

### （2）核心思想

比如你现在收到一个需求是，在页面需要一个打开和关闭按钮，点击打开按钮会出现一个页面，关闭一个按钮会关闭一个页面，有点废话文学...

直接上代码：

```
<style>
    #modal {
        width: 200px;
        height: 200px;
        line-height: 200px;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border: 1px solid #000;
        text-align: center;
    }
</style>
<button id="open">打开弹框</button>
<button id="close">关闭弹框</button>
<script>
    const Modal = (function() {
        et modal = null
        return function() {
            if (!modal) {
                modal = document.createElement('div')
                modal.innerHTML = '全局唯一的modal'
                modal.id = 'modal'
                modal.style.display = 'none'
                document.body.appendChild(modal)
            }
            return modal
        }
    })()
​
    function openModal() {
        const modal = new Modal()
        modal.style.display = 'block'
    }
    document.getElementById('open').addEventListener('click', function() {
        openModal()
    })
​
    document.getElementById('close').addEventListener('click', function() {
        const modal = new Modal()
        if (modal) {
            modal.style.display = 'none'
        }
​
    })
```


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/88d9025cf3fc43379f2dda2d78bd0bcf~tplv-k3u1fbpfcp-watermark.image?)

如图，点击按钮后，中间会出现一个这样的小框。后来老板换成红桃A写了，老板嘱咐红桃A：”你在这个基础上增加一些功能，当用户点击打开弹框按钮后，变为禁用状态，同时每次点击提示‘还未登录’“。红桃A慌了，不改变原来的类，我改变了实现一样的效果不就好了，准备动手发现，之前那个人写的方法和类太不容易看了，还是决定在现有的基础上装饰一下，于是他添加了一些新的装饰和逻辑：

```
// 新的逻辑
function changeButtonText() {
    const btn = document.getElementById('open')
    btn.innerText = '还没登录'
}
​
function disableButton() {
    const btn = document.getElementById('open')
    btn.setAttribute('disabled', true)
}
​
function changeButtonStatus() {
    changeButtonText()
    disableButton()
}
//同时在打开弹框那个按钮添加了调用函数：changeButtonStatus()
```


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/250c86c1958c4b079beb8398158793cd~tplv-k3u1fbpfcp-watermark.image?)

完美收工~。

### （3）关于装饰器模式

装饰器模式是一种结构型模式，允许通过将对象放入包含行为的特殊封装对象中来为原对象绑定新的行为

其实，javascript中的设计模式远不止三种：

![design-patern.webp](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6cfbafeab98449a7b92aa5516c3cba9b~tplv-k3u1fbpfcp-watermark.image?)
今天就先介绍这三种设计模式。
