---
title: 扒一扒，javascript中for...in和for...of二者区别细谈
date: 2022-07-29
tags:
 - for-of-in
categories: 
 - ES6
isShowComments: true  
subSidebar: auto
---

本文已参与「新人创作礼」活动，一起开启掘金创作之路。

叮~，你有一份javascript区别论待参与，请到场。

for...in来自ES5标准，遍历的是可遍历对象的key，数组和字符串的index，for...of来自ES6标准，遍历的是可遍历对象的value，数组和字符串的value。除此之外，对于二者，你真的了解嘛？今天，我们就来扒一扒，for...in和for...of如同胞般存在的区别。

## 知识角落

1.  iterable：可遍历的。一种数据结构只要有`Iterator接口`，那么这种数据结构就是可遍历的。

0.  数据集合：javascript中表示“集合”的数据结构有：数组（Array）、对象（Object）、Map和Set。这四种可组合使用。

0.  可迭代对象：即`原生具备iterator接口的对象`

>     -   Array
>     -   Map
>     -   Set
>     -   String
>     -   TypedArray
>     -   函数的 arguments 对象
>     -   NodeList 对象

4.  Symbol：ES6 引入的一种新的原始数据类型`Symbol`，表示`独一无二`的值。它属于 JavaScript 语言的数据类型之一，其他数据类型是：`undefined`、`null`、布尔值（Boolean）、字符串（String）、数值（Number）、大整数（BigInt）、对象（Object）。Symbol作为属性名，遍历对象的时候，该属性不会出现在`for...in`、`for...of`循环中，也不会被`Object.keys()`、`Object.getOwnPropertyNames()`、`JSON.stringify()`返回。

5.  可枚举属性：可枚举属性是指那些内部 “可枚举” 标志设置为 `true` 的属性，对于通过直接的赋值和属性初始化的属性，该标识值默认为即为 `true`。可枚举性决定了这个属性能否被for…in查找遍历到。

6.  不可枚举属性：不可枚举属性是指那些内部 “可枚举” 标志设置为 `false` 的属性，对于通过 `Object.defineProperty` 等定义的属性，该标识值默认为 `false`。 简单地说，用户定义的属性都是可枚举的，而内置对象不可枚举。

## 一、for...in

### for...in语法

语法：for(let/const/var index in object){...}

index：在每次迭代时，index会被赋值为不同的属性名；object：非 Symbol 类型的可枚举属性被迭代的对象。

### 1、for...in遍历数组

遍历数组：

```
//遍历数组 Array
const myArray=[1,2,3,4,5,6,7];
for(let index in myArray){
    console.log(index);
}
//0 1 2 3 4 5 6
```

说明遍历数组得到的是**下标**。我们在进行扩展一下：

```
//遍历数组 Array
Array.prototype.testIn = function () { console.log('index'); }
Array.prototype.age='18'
const myArray = [1, 2, 3, '7', 'gender'];
myArray.name = 'lucky'
for (let index in myArray) {
     console.log('index:'+index,'value:'+myArray[index]);
}
//index:0 value:1
//index:1 value:2
//index:2 value:3
//index:3 value:7
//index:4 value:gender
//index:name value:lucky
//index:testIn value:function () { console.log('index'); }
//index:age value:18
```

通过for..in遍历的数组，不仅可以遍历下标，还可以遍历自定义的属性名（name），还会遍历到原型上的方法名（testIn）以及属性名（age）。其实，`并不是所有的属性通过for...in循环都会显示，数组的 length 属性和 constructor 属性就不会被显示`。但是，**for...in 用来遍历数组并不是一个合适的选择** ，虽然使用for...in可以遍历数组，但是会存在很多问题。

### 2、for...in遍历字符串

```
// 遍历字符串
String.prototype.testIn = function () { console.log('index')};
String.prototype.type='String'
let s='one';
for(let index in s){
    console.log('index:'+index,'value:'+s[index]);
}
​
//index:0 value:o
//index:1 value:n
//index:2 value:e
//index:testIn value:function () { console.log('index')}
//index:type value:String
```

通过for..in遍历字符串与遍历数组类似，同样可以遍历String上的用户自定义的原型属性和方法。

### 3、for...in遍历对象

```
// 遍历对象
Object.prototype.testIn = function () { console.log('key')};
Object.prototype.status='student'
const myObj={
    name: 'duck',
    age:19,
    gender:'female'
}
myObj.grade='2020';
for(let key in myObj){
    console.log('key:'+key,'value:'+myObj[key]);
}
​
​
//key:name value:duck
//key:age value:19
//key:gender value:female
//key:grade value:2020
//key:testIn value:function () { console.log('key')}
//key:status value:student
```

我们知道，遍历对象还可以通过Object.keys()遍历键，Object.values()遍历值，返回的是一个数组，然后我们通过遍历数组可得到一个一个的键或者值。但是，使用**for...in遍历对象，显得方便了许多**。

此外，

```
// 3 遍历对象得到的属性值
function MyObject(){
    this[1]='text-1';
    this['a']='test-a';
    this['A']='test-A';
    this[90]='test-90';
    this['B']='test-B';
    this['56']='test-56';
}
​
let myobj= new MyObject();
for(let key in myobj){
    console.log(`key:${key},value:${myobj[key]}`);
​
}
​
//key:1,value:text-1
//key:56,value:test-56
//key:90,value:test-90
//key:a,value:test-a
//key:A,value:test-A
//key:B,value:test-B
```

对象的数字属性会被`优先遍历`，且按照顺序遍历（先有的规范，再有的javascript语言）；ECMAScript规范定义了数字属性应该按照索引值的大小升序排序，字符串属性根据创建时的顺序排列。

### 4、hasOwnProperty（）方法

以上例子说明通过for..in遍历，还会遍历原型上的属性和方法，如果不想让其输出原型中的属性和方法，可以`使用 hasOwnProperty方法进行过滤：继承的属性不显示`。例如：

```
Object.prototype.testIn = function () { console.log('key')};
Object.prototype.status='student'
const myObj={
    name: 'duck',
    age:19,
    gender:'female'
}
myObj.grade='2020';
for (let key in myObj) {
    if (myObj.hasOwnProperty(key)) {
        console.log('key:'+key,'value:'+myObj[key]);
    }
}
​
//key:name value:duck
//key:age value:19
//key:gender value:female
//key:grade value:2020
```

## 二、for...of

### for...of语法

语法：for(let/const/var value of object){...}

value：在每次迭代中，将不同属性的值分配给变量。；object：被迭代枚举其属性的对象。

相对于for...in，**for..of更加适用遍历数、数组对象、字符串、Map、Set等拥有迭代器对象的集合。但是不能遍历对象,因为没有迭代器对象**。

### 1、for...of遍历数组/字符串

```
// 遍历数组/字符串
Array.prototype.testOf=function(){};
const myArray=['red','green','yellow'];
for(const vlaue of myArray) {
    console.log('valueofArray:'+vlaue);
}
//valueofArray:red
//valueofArray:green
//valueofArray:yellow
​
let s='wow'
for(var vlaue of s) {
    console.log('valueofString:'+vlaue);
}
//valueofString:w
//valueofString:o
//valueofString:w
```

### 2、for...of遍历对象

for...of循环不会循环对象的key，只会循环出数组/字符串的value，因此for...of不能循环遍历普通对象,对普通对象的属性遍历推荐使用for...in。如果实在想用for...of来遍历普通对象的属性的话，可以通过和Object.keys()搭配使用，先获取对象的所有key的数组。

```
// 遍历对象
const obj={
    name:'duck',
    age:19
}
for(let vlaue of obj) {
    console.log(value);
}
​
//TypeError: obj is not iterable
```

### 3、for...of遍历Map/Set

```
// 遍历Set和Map
const mySet=new Set()
mySet.add('name');
mySet.add('age');
//遍历Set
for(let value of mySet) {
    console.log('valueofSet:'+value);
}
//valueofSet:name
//valueofSet:age
​
const myMap=new Map();
myMap.set('name', 'duck');
myMap.set('age', '19');
//遍历Map
for(let [key,value] of myMap) {//注意变量是[key,value],才能只得到value,否则如果是value，会打印[键，值]
    console.log('valueofMap:'+value);
​
}
//valueofMap:duck
//valueofMap:19
```

4、for...of遍历arguments对象

```
// 遍历arguments
(function() {
    for (let argument of arguments) {
      console.log(argument);
    }
  })(1,'2', 'luck');
​
//1
//2
//luck
```

## 三、区别囊括

### 1、for...in

（1）for...in遍历的是对象的`key（键名）`、数组/字符串的`index（索引）`

（2）for...in能遍历`所有数据结构`

（3）for...in还会遍历到`对象自身的和继承的（原型上的）可枚举的属性和方法`

（4）for...in遍历时，对象的数字属性会被`优先遍历`，且按照顺序遍历（现有的规范，再有的javascript语言）；ECMAScript规范定义了数字属性应该按照索引值的大小升序排序，字符串属性根据创建时的顺序排列

（5）for...in语句以`任意顺序迭代对象的可枚举属性`

### 2、for...of

（1）for...of遍历的是数组/字符串/Set/Map的`value（值）`

（2）for...of`只能遍历具有Symbol.iterator属性的数据结构`。能遍历Array（数组）、Set 和 Map 结构、某些类似数组的对象（比如arguments对象、DOM NodeList 对象）、 Generator 对象，以及String（字符串）,不能遍历对象Object（天生不具备迭代器Iterable属性）

（3）for...of不会遍历到对象自身的和继承的（原型上的）可枚举的属性和方法

（4）for...of，相对于for...in更适合遍历数组

（5）for...of 语句遍历`可迭代对象定义要迭代的数据`。

## 四、小贴士

for ... in`是为遍历对象属性而构建的，不建议用于迭代一个关注索引顺序的数组，数组可以用
`Array.prototype.forEach()`和`for ... of。for..of适用遍历数/数组对象/字符串/map/set等拥有迭代器对象的集合。for...in更适用于对象的遍历。
