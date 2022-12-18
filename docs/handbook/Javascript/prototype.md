---
title: 解析javascript--原型+原型链
date: 2022-07-09
tags:
 - 原型和原型链
categories: 
 - Javascript
isShowComments: true  
subSidebar: auto
---

本文已参与「新人创作礼」活动，一起开启掘金创作之路。

前有作用域和作用域链，后有原型和原型链。不一样的是，前者是一个山丘，后者是一座大山。路漫漫其修远兮，吾将上下而求索。难归难，也不能就此放弃探索，刚接触那会确实令人手足无措，无可奈何，无妨无妨，来日方长。
## 写在前面
1.原型的定义：原型（prototype）是函数function对象的一个属性，它定义了构造函数制造出来的对象（new运算符调用的函数）的公共祖先,通过构造函数产生的对象可以继承到该原型的属性和对象，原型也是对象。

2.意念区别：prototype 函数的原型（显示原型）；
             `__proto__`(或者`[[prototype]]`)对象原型（隐式原型）。
             
3.`constructor`：为了让构造函数构造出来的所有的对象都能找到自己的构造器。

4.原型链的定义：在原型上再加一个原型，再加一个原型...把原型连成链，访问顺序也是按照这个链的顺序跟作用域链一样，叫做原型链。

5.本质区别：对象的原型（`__proto__`）与构造函数的原型(prototype)属性之间性质不一样。前者是每个实例上都有的属性，后者是构造函数的属性。

晕了别着急，Following...

## 一、先掌握

### 1、浅剖析--函数中的原型对象

`每个函数都有一个特殊的属性--原型（prototype）。`

 （1）__proto__和prototype

```
//创建构造函数
function Person(){};
console.log(Person.prototype);//{}
var Student=function(){};
console.log(Student.prototype);//{}
```

![微信图片_20220708213520.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/18d84836f4d24e57b54e2bc38ddc42a3~tplv-k3u1fbpfcp-watermark.image?)


```
// 构造函数原型添加属性
Person.prototype.sex='female';
console.log(Person.prototype);//{ sex: 'female' }
Student.prototype.grade='2020级';
console.log(Student.prototype);//{ grade: '2020级' }
```

![微信图片_20220708213845.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/922f33eae42f46fc8d4caaed02422ad1~tplv-k3u1fbpfcp-watermark.image?)


`构造函数的调用方法`：在正常调用函数时，在函数名的前面加上一个 new 前缀
```
// 调用构造函数创建实例化对象
var person=new Person();
console.log(person);//Person {}
var student=new Student();
```


![微信图片_20220708214041.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4b6e1e723df84403a3736deaa49f24e7~tplv-k3u1fbpfcp-watermark.image?)

```
// 给实例化对象添加属性
person.father='Person()';
console.log(person);//Person { father: 'Person()' }
student.father='Student()';
console.log(student);//Student { father: 'Student()' }
```


![微信图片_20220708214900.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/757deb9a07274879bf9af6c136b42e54~tplv-k3u1fbpfcp-watermark.image?)

```
console.log(person.__proto__==Person.prototype);//true
console.log(student.__proto__==Student.prototype);//true
```
**Attention:**`实例化对象的__proto__属性就是构造函数的prototype。`

灵魂发问：我知道了他就是他，有什么用？

```
console.log(person.sex);//female
```
 作用这不就来了：实例化对象person并没有sex属性，但是居然有打印值？？？
```
这就是原型链了：当访问person的sex属性，浏览器首先搜索person本身，没有？
浏览器继续寻找person.__proto__(person的爹爹===Person.prototype),有了！他的(Person.prototype)就是我的(person)！
还是没有咋整？假设我想要访问student.class,告诉我(student)怎么找吧~
目标：student.class
浏览器:你有class这个属性嘛?
student:不好意思，我没有~你去问问我父亲大人-->person.__proto__(Student.prototype)吧~
浏览器：他没有。。。
student:那你要不问问我祖父-->person.__proto__.__proto__(Student.prototype.__proto__===window.Object.prototype)?
浏览器：你逗我呢？他也没有！
student:那你再问问我太祖父-->person.__proto__.__proto__.__proto__(Object.prototype.__proto__)，
        相信我，这次肯定有结果的。
浏览器:真的栓Q!他都不在世上！
student:大哥，不好意思了，那找遍了都没有那就真没有了...
浏览器:行吧,累死人了。那我要把class属性是undefined记录了。
```

### 2、深剖析--理解原型对象

#### (1)创建构造函数

```
function Teacher(name,age,sex,wage){
    this.name=name;
    this.age=age;
    this.sex=sex;
    this.wage=wage;
}
var teacher=new Teacher('Lucky','23','female','15k');
console.log(teacher);//Teacher { name: 'Lucky', age: '23', sex: 'female', wage: '15k' }
​
```
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b0c5cfbeb5e540979df95dad2736fbe6~tplv-k3u1fbpfcp-watermark.image?)
现在看到teacher.[[prototype]].[[prototype]]里面，我(teacher)能调用里面的方法吗?比如toString(),valueOf()...

看到`teacher.[[prototype]].[[prototype]].__proto__==Object`了嘛！是到顶了吗？`Object.__proto__`等于什么呢？是的到顶了，`Object.__proto__==null`。

那Object.prototype又是什么呢？打印看看咯。

```
console.log(Object.prototype);//[Object: null prototype] {}
                             //结果如下图：有大量的方法,凡是继承自Object即可使用这些方法
console.log(Object.__proto__);//{}  ƒ () { [native code] }
```

![微信图片_20220708231055.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5459be4fd6e740718ec8e771ac0c6bf8~tplv-k3u1fbpfcp-watermark.image?)

## 二、再分析

![60B47CCF-F24E-42D8-8ECE-692DEE5E1CA5.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e21b39c61d784492927f9027d8092a7d~tplv-k3u1fbpfcp-watermark.image?)


```
// 构造函数Foo--上溯：Object()
function Foo(name){
    this.name=name;
};
console.log(Foo.prototype);//{constructor: ƒ}constructor: ƒ Foo(name)[[Prototype]]: Object
console.log(Foo.prototype.constructor);//[Function: Foo]

// 实例化对象f1,f2--上溯：Foo()
var f1=new Foo();
console.log(f1.__proto__);//{constructor: ƒ}constructor: ƒ Foo(name)[[Prototype]]: Object==Foo.prototype
console.log(f1.__proto__==Foo.prototype);//true


console.log(Foo.prototype.__proto__);//constructor: ƒ Object()

//对象
function Object(){};
console.log(Object.prototype);//constructor: ƒ Object()==Foo.prototype.__proto__
console.log(Object.prototype.constructor);//ƒ Object() { [native code] }

var o1=new Object();
console.log(o1.__proto__==Object.prototype);//true

console.log(Object.prototype.__proto__);//null
```
值得注意的是，Foo和Object都是通过function Function(){}创造的，所以`Foo.__proto__`和`Object.__proto__`都等于Function.prototype。万物皆对象,“食物链”的最顶端是Object，`Function.prototype==Object.__proto__`
## 三、后拓展

### 1、原型的增删改查

`原型的增删改：不能通过实例对象修改，只能通过原型对象修改`

```
Fruit.prototype.classify=function(){
    console.log('Fruits');
}
Fruit.prototype.price='￥10';
function Fruit(name){
    this.name=name;
}
var fruit=new Fruit('pear');

//添加color属性
fruit.color='green';
console.log(fruit.color);//green 给我自己添加成功了
console.log(Fruit.color);//undefined Fruit.prototype.color不存在！

// 改变price值
fruit.price='$9';//本来想改变Fruit.prototype.price=$9
console.log(fruit.price);//只是自己的fruit.price=$9
var myFruit=new Fruit('pear');
console.log(myFruit.price);//没有改变Fruit.prototype.price=￥10

// 删除颜色属性
delete fruit.price;
console.log(fruit.price);//￥10,好家伙没删除成功！
delete Fruit.prototype.price;
console.log(fruit.price);//undefined，居然成功了！

// 查找name属性和price属性
console.log(fruit.name);//查到啦！pear
console.log(fruit.price);//没有诶~，undefined

// 原型的增删改：不能通过实例对象修改，只能通过原型对象修改
```

### 2、对象的原型

`对象的原型（__proto__）与构造函数的原型(prototype)属性不一样。`

```
// 对象的原型
// 对象可以转换成给字符串
Person.prototype.name='wn';//构造函数的显式原型 Person.prototype
function Person(){
    var this={
        __proto__:Person.prototype
    }
    
}
var obj={
    name:'Dubi'
}
var person=new Person();
console.log(person.__proto__);//{ name: 'wn' }//实例对象的隐式原型 Person.prototype
Person.prototype=obj;
console.log(person.__proto__);//{ name: 'Dubi' }
// 实例对象的隐式原型==构造函数的显式原型

var obj1=Object.create(null);//obj1没有隐式原型,更不会继承自Object.prototype
var obj2=Object.create(obj1);
obj1.__proto__={//手动添加隐式原型
    name:'lucky'
}
console.log(obj1.name);//undefined  undefined没有原型，也就没有对象上的toString()方法

```


