---
title: 解析JavaScript--关键字this
date: 2022-07-12
tags:
 - 关键字this
categories: 
 - Javascript
isShowComments: true  
subSidebar: auto
---

本文已参与「新人创作礼」活动，一起开启掘金创作之路。

在javascript中，关键字this备受关注，地位颇高。作为今天的主角--this，本文将从（1）this的绑定规则；（2）this的指向；（3）改变this的指向，三方面深度解析this。若初学者暂不明白，不妨不妨，來日方長，自己写一篇文章或许会更深刻哦~。

## Tips
- this是一个关键字，能够在函数执行过程中访问运行环境。
- this是一个对象，当函数执行时产生的内部对象，this的指向只与函数的执行环境有关，与函数的声明环境无关。
- this是一个指针型变量，在JavaScript没有指针概念，但是this真实地指向当前调用对象。
- this是动态的，动态指向当前函数的运行环境。在不同的环境调用同一个函数，this的指向也可能会发生变化。
## 一、this的绑定规则
### 1、默认绑定

> --独立的函数调用
> 
>  -this所处的词法作用域在哪里生效了，this就绑定在哪里
> 
> -在严格模式下，在浏览器环境中全局对象是 `Window`，在 Node.js 环境中是 Global，全局作用域无法进行默认绑定，所以导致this只能绑定在`undefined`上

```
  // 默认绑定

   function A(){
     console.log(this.a);
   }
   var a=2;
   A();//浏览器:2;node:undefined
```
### 2、隐式绑定
> -当`函数引用`(非调用！)有上下文对象时，隐式绑定的规则就会把函数调用中的this绑定到这个上下文对象。

```
function foo(){
    console.log(this.a);
  }

  var obj={
    a:2,
    foo:foo//函数引用
  }

  console.log(obj.foo());//2 obj就是这个上下文对象
```
### 3、隐式丢失
> -当隐式绑定的函数丢失绑定对象，就会引用默认绑定
> 
> -对象属性引用链`只有上一层或者说最后一层`在调用位置中起作用

```
 function foo(){
    console.log(this.a);
  }

  var obj={
    a:2,
    foo:foo //隐式绑定的函数
  }

  var obj1={
    a:4,
    obj:obj
  }

  // console.log(obj.foo());//2 显示绑定
  obj1.obj.foo();//2  绑定对象是obj，而不是obj1
```
### 4、显式绑定
>  --`apply(thisArg, [argsArray])`
> 
>  --`call(thisArg,arguments)`
> 
> --`bind(thisArg,arguments)`可以强行将函数的this指向改变

```
  obj1.obj.foo();//2

  function Fn(){
    console.log(this.a);
  }

  var o1={
   a:2
  }

  Fn.call(o1);//2 call()
  Fn.apply(o1);//2 apply()
  var bar=Fn.bind(o1)//2 bind()
  bar();
```
## 二、this的指向
### 1、函数的普通调用
> -当函数`直接调用`时，this指向调用它的那个对象，一般使用默认绑定
```
function A(){
    let a="function name"
    console.log(this.a);
}

var a="window name";
A();//调用A()，当前运行环境是window，this指向window对象
//浏览器：window name；node端：undefined
```
### 2、构造函数
> -构造函数的this永远指向`实例化对象`
> 
> -严格模式下,如果构造函数不加new调用, this 指向的是undefined 如果给他赋值，则会报错.
```
var Func=function(){
    this.a="我是构造函数的属性";
    this.fun=function(){
        console.log(this);
    }
}
let myFunc=new Func();
myFunc.fun();//Func { a: '我是构造函数的属性', fun: [Function (anonymous)] }
```
> -通过构造函数的内部原理，可以将以上代码通过以下三个步骤理解并更写为：
> 
> 1、在函数体内部最前面隐式的创建一个`this={}`
> 
> 2、执行函数中的代码（往this身上挂载属性）
> 
> 3、隐式的返回这个this（构造函数中只有显式的`return 引用类型`，才会干扰隐式return值）

```
var Func=function(){
    // this.a="我是构造函数的属性";
    // this.fun=function(){
    //     console.log(this);
    // }
    let this={
        a:"我是构造函数的属性",
        fun:function(){
            console.log(this);
        }
    }
    return this;
}
let myFunc=new Func();
myFunc.fun();//Func { a: '我是构造函数的属性', fun: [Function (anonymous)] }
```
### 3、箭头函数
> -箭头函数不会创建自己的`this`，所以它没有自己的`this`，它只会从自己的作用域链的上一层继承`this`。
> 
> -如果外部函数是普通函数，this的指向取决于`外部函数`的绑定类型，`外部函数！=定义箭头函数的外部对象`。
```
function foo(){
    var a="function"
    setInterval(()=>{
        console.log(this.a);
    },1000)
}
var a="window"
foo();//箭头函数外部函数是foo;foo没有任何绑定，则使用默认绑定
//浏览器每个1秒打印window;node.js每隔一秒打印undefined
```
## 三、改变this的指向
### 1、使用 ES6 的箭头函数
> -箭头函数的 this 始终指向函数定义时的 this，而非执行时.
> 
> -箭头函数中没有 this 绑定，必须通过查找作用域链来决定其值，如果箭头函数被非箭头函数包含，则 this 绑定的是最近一层非箭头函数的 this;否则，this 为 undefined.
```
var name = "window";
var obj = {
    name : "object",
    func1: function () {
        console.log(this.name)     
    },
    func2: function () {
        setTimeout( () => {
            this.func1()
        },1000);
        // setTimeout(function(){
        //     this.func1()
        // },1000);//定时器里面的回调函数如果不是箭头函数，将会报错
    }
};
obj.func2() //object
```
### 2、在函数内部使用 _this = this
> -`var _this = this`可防止定时器 被 window 调用，而导致的在 定时器 中的 this 为 window
> 
> -定时器会干扰this指向
```
var name = "window";
var obj = {
    name : "object",
    func1: function () {
        console.log(this.name)     
    },
    func2: function () {
        var _this = this;//这里的 this 是调用 func2 的对象 obj
        setTimeout( () => {
            _this.func1()
        },1000);
    }
};
obj.func2() //object
```
### 3、使用 apply()、call()、bind()
> 注意：这三种方法使用的区别，apply()和call()区别在于，两个参数时，前者参数用数组或类数组对象封装，其中的数组元素将作为单独的参数传给 调用apply的函数,如果该参数的值为null 或 undefined，则表示不需要传入任何参数；bind()与前两者的区别在于，bind()必须有返回值
> 
> bind()方法创建一个新的函数, 当被调用时，将其this关键字设置为提供的值，在调用新函数时，在任何提供之前提供一个给定的参数序列。需要手动调用
```
var person = {
    fullName: function() {
        return this.name;
    }
}
var person1 = {
    name:"ducky"
}
var person2 = {
    name:"lucky"
}
console.log(person.fullName.call(person1));// ducky
console.log(person.fullName.apply(person2));// ducky
//注意bind()的绑定方式，与call()和apply()不同
var person3=person.bind(person1);
person3();//ducky

```

### 4、new 实例化一个对象
> 构造函数的this永远指向通过new运算符创建的实例化对象
```
var Student=function(sex){
    this.sex=sex;
}
var student=new Student("girl");
console.log(student.sex);//girl
```