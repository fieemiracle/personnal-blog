---
title: 那就聊聊深拷贝和浅拷贝
date: 2022-10-11
tags:
 - 深浅拷贝
categories: 
 - Javascript
isShowComments: true  
subSidebar: auto
---

持续创作，加速成长！这是我参与「掘金日新计划 · 10 月更文挑战」的第2天，[点击查看活动详情](https://juejin.cn/post/7147654075599978532 "https://juejin.cn/post/7147654075599978532")

## 一、浅拷贝

### 1、什么是浅拷贝？

浅拷贝是创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址 ，所以如果其中一个对象改变了这个地址，就会影响到另一个对象。

浅拷贝只是拷贝一层，更深层次对象级别的只拷贝引用

### 2、如何实现浅拷贝？

（1）Object.assign()

Object.assign({},obj,...)可以接收无限个参数，obj中的引用类型属性会被深拷贝。

```
// 1、Object.assign()
let person = {          //原数据 { name: 'lucky', hobby: { like: 'running' } }
    name: 'lucky',
    hobby: {
        like: 'running'
    }
}
let copyPerson = Object.assign({}, person)
copyPerson.name = 'mouse'           //name是基本数据类型
copyPerson.hobby.like = 'singing'   //hobby是引用类型
​
console.log(copyPerson); //{ name: 'mouse', hobby: { like: 'singing' } }
//对比原数据，对象copyPerson的改变影响了对象person的改变
console.log(person);     //{ name: 'lucky', hobby: { like: 'singing' } }
```

（2）扩展运算符

扩展运算符（...）类似于Object.assign()

A.拷贝对象

```
// 扩展运算符
let person = {  //原数据 { name: 'lucky', hobby: { like: 'running' } }
    name: 'lucky',
    hobby: {
        like: 'running'
    }
}
​
let copyPerson = {
    ...person
}
copyPerson.name = 'dunny'
copyPerson.hobby.like = 'swimming'
console.log(person);        //{ name: 'lucky', hobby: { like: 'swimming' } }
//对比原数据，对象copyPerson的改变影响了对象person的改变
console.log(copyPerson);    //{ name: 'dunny', hobby: { like: 'swimming' } }
```

B.拷贝数组

```
let arr = ['name', 'hobby', 'person', {//原数据[ 'name', 'hobby', 'person', { age: 19 } ]
    age: 19
}]
​
let copyArr = [...arr];
copyArr[0] = 'nickname';
copyArr[copyArr.length - 1].age = 20;
​
console.log(copyArr);   //[ 'nickname', 'hobby', 'person', { age: 20 } ]
//对比原数据，数组copyArr的改变影响了数组arr的改变
console.log(arr);       //[ 'name', 'hobby', 'person', { age: 20 } ]
```

（3）Array.prototype.concat()

```
//Array.prototype.concat()
let myArr = ['old', null, undefined, true, {//原数据[ 'old', null, undefined, true, { hobby: 'undefined' } ]
    hobby: undefined
}];
let copyMyarr1 = myArr.concat();
​
copyMyarr1[0] = 'nickname';
copyMyarr1[copyMyarr1.length - 1].hobby = 'books'
​
console.log(copyMyarr1); //[ 'nickname', null, undefined, true, { hobby: 'books' } ]
//对比原数据，数组copyMyarr1的改变影响了数组myArr的改变
console.log(myArr); //[ 'old', null, undefined, true, { hobby: 'books' } ]
​
```

（4）Array.prototype.slice()

A.demo1

```
//Array.prototype.slice()
let myArr = ['old', null, undefined, true, {
    hobby: undefined
}]; //原数据[ 'old', null, undefined, true, { hobby: 'undefined' } ]
let copyMyarr2 = myArr.slice();
copyMyarr2[0] = 'nickname';
copyMyarr2[copyMyarr2.length - 1].hobby = 'books'
console.log(copyMyarr2); //[ 'nickname', null, undefined, true, { hobby: 'books' } ]
//对比原数据，数组copyMyarr2的改变影响了数组myArr的改变
console.log(myArr); //[ 'old', null, undefined, true, { hobby: 'books' } ]
​
```

B.demo2

```
let newArr = [
    [{
        name: 'lucky'
    }],
    ['age']
]
let copyNewarr = newArr.slice()
copyNewarr[0].name = 'chicken'
​
console.log(copyNewarr);//[ [ { name: 'lucky' }, name: 'chicken' ], [ 'age' ] ]
​
```

## 二、深拷贝

### 1、什么是深拷贝？

深拷贝是将一个对象从内存中完整的拷贝一份出来,从堆内存中开辟一个新的区域存放新对象,且修改新对象不会影响原对象。

深拷贝拷贝多层，每一级别的数据都会拷贝。

### 2、如何实现深拷贝？

(1)JSON.parse(JSON.stringify(obj))

`JSON.stringify()` 将JSON格式的对象转为字符串

`JSON.parse()` 将JSON格式的字符串转为对象

```
// 1、 JSON.parse(JSON.stringify(obj))
let student = {
    name: 'lucky',
    hobby: {
        like: 'dancing'
    },
    birth: undefined,
    title: Symbol('Banana'),
    date: new Date(),
    regexp: /^A/
}
let myStudent = JSON.parse(JSON.stringify(student));
//会忽略Symbol,undefined和函数
console.log(myStudent);
// {
//   name: 'lucky',
//   hobby: { like: 'dancing' },
//   date: '2022-10-11T10:45:21.484Z',
//   regexp: {}
// }
myStudent.name = 'duck';
myStudent.hobby.like = 'reading'
​
console.log(myStudent);
// {
//   name: 'duck',
//   hobby: { like: 'reading' },
//   date: '2022-10-11T10:45:21.484Z',
//   regexp: {}
// }
// myStudent的改变不会影响student
console.log(student);
// {
//  name: 'lucky',
//  hobby: {
//      like: 'dancing'
//  },
//  birth: undefined,
//  title: Symbol(Banana),
//  date: 2022 - 10 - 11 T10: 49: 10.521 Z,
//  regexp: /^A/
// }
```

缺陷：

A.会忽略Symbol和undefined和function

B.不能拷贝循环引用的对象，例如：

```
// 循环
let b = {}
let a = {
    b: b
}
​
b.a = a
let c = JSON.parse(JSON.stringify(a))//TypeError: Converting circular structure to JSON
console.log(c);
```

C.不能序列化函数，拷贝出来的对象的属性顺序可能会和源对象不一致

D.拷贝Date对象，得到的是字符串；拷贝RegExp对象，得到的是{}

E.对象中含有NaN，Infinity会变成null

## 三、手写浅拷贝

实现浅拷贝核心思想：如果属性是基本数据类型，则拷贝基本类型的值；如果属性是引用类型，拷贝的就是内存地址 ，会受拷贝对象（本体）的影响。

```
function shallowCopy(obj) {
    if (typeof obj !== 'object') return;
​
    let newObj = Array.isArray(obj) ? [] : {};
    // let newObj=obj instanceof Array ?[]:{};
    // let newObj=obj instanceof Object ?[]:{};//这个不能判断
​
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) { //自己本身具有的属性
            newObj[key] = obj[key];
        }
    }
    return newObj;
    // console.log(newObj);
}
// 测试对象
let obj = {
    name: 'lucky',
    like: {
        life: 'running'
    }
}
let myObj = shallowCopy(obj)
myObj.name = 'dunny'
myObj.like.life = 'singing'
console.log(myObj); //{ name: 'dunny', like: { life: 'singing' } }
console.log(obj); //{ name: 'lucky', like: { life: 'singing' } }
​
​
// 测试数组
let arr = ['hello', 'world', {
    name: 'cat'
}]
let myArr = shallowCopy(arr)
myArr[1] = 'moon'
myArr[myArr.length - 1].name = 'dog'
console.log(myArr); //[ 'hello', 'moon', { name: 'dog' } ]
console.log(arr); //[ 'hello', 'world', { name: 'dog' } ]
​
```

## 四、手写深拷贝

实现深拷贝核心思想：原始类型直接拷贝，引用类型递归。

```
// 深拷贝
function deepCopy(obj) {
    // 过滤原始类型
    if (typeof obj !== 'object') return obj;
​
    // 过滤null类型 因为typeof null==object，使用不能使用typeof判断null数据类型
    if (obj == null) return obj;
​
    let newObj = Array.isArray(obj) ? [] : {};
    // let newObj=obj instanceof Array ?[]:{};
​
    // 拷贝Date对象
    if (obj instanceof Date) {
        newObj = new Date(obj)
    }
    // 拷贝RegExp对象
    if (obj instanceof RegExp) {
        newObj = new RegExp(obj)
    }
​
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) { //自己本身具有的属性
            newObj[key] = typeof obj[key] == 'object' ? deepCopy(obj[key]) : obj[key];
        }
    }
    return newObj;
}
​
// 测试对象
let obj = {
    name: 'lucky',
    like: {
        life: 'running'
    }
}
let myObj = deepCopy(obj)
myObj.name = 'dunny'
myObj.like.life = 'singing'
console.log(myObj); //{ name: 'dunny', like: { life: 'singing' } }
console.log(obj); //{ name: 'lucky', like: { life: 'running' } }
​
​
// 测试数组
let arr = ['hello', 'world', {
    name: 'cat'
}]
let myArr = deepCopy(arr)
myArr[1] = 'moon'
myArr[myArr.length - 1].name = 'dog'
console.log(myArr); //[ 'hello', 'moon', { name: 'dog' } ]
console.log(arr); //[ 'hello', 'world', { name: 'cat' } ]
​
```
