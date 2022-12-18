---
title: 你真的不知道的javascript
date: 2022-11-27
tags:
 - javascript
categories: 
 - Javascript
---
***本文正在参加[「金石计划 . 瓜分6万现金大奖」](https://juejin.cn/post/7162096952883019783 "https://juejin.cn/post/7162096952883019783")***

## 一、isNaN和Number.isNaN

NaN（Not a Number）不是一个数字，NaN是一种数值表达形式，*表示的是一种未定义的值或者不能够被描述的值*，尤其是浮点型运算的结果。NaN能共欧描述无穷大、数字除0的结果、没有值以及平方根为负数，当然，这些都是虚构的，只有浮点数是真实的。

简而言之，NaN表示的是一个特殊的数值。当一个值被强行转成Number类型的值时，转换失败该值变成NaN。你的脑海里会想到哪些NaN的情况呢？

```
console.log(Number(1)); //1
console.log(Number(null)); //0
console.log(Number([])); //0
console.log(Number('123')); //123
console.log(Number(undefined)); //NaN
console.log(Number('hello world')); //NaN
console.log(Number({})); //NaN
```

迄今为止，判断数据类型的方法有typeof，instanceof，isArray，Object.prototype.toString.call()，而判断NaN当然也有自己的方法。

### （1）isNaN

使用isNaN判断一个值是否为NaN，举个例子：

```
isNaN('123') //false
isNaN(null) //false
isNaN(true) //false
isNaN(true) //false
isNaN([]) //false
​
isNaN('hello') //true
isNaN(undefined) //true
isNaN(NaN) //true
isNaN({}) //true
​
console.log(isNaN("")); //false
console.log(isNaN("   ")); //false
console.log(isNaN(new Date())); //false
console.log(isNaN(new Date().toString())); //true
```

**从上述可知，isNaN()对于可以被Number转换为数值的值，返回的就是false;对于不可以被Number转换为数值的值，返回的就是true。另外，NaN不能通过相等操作符来判断，自身永不相等！即NaN==NaN和NaN===NaN返回的都是false。**

此外，我们需要知道的是，true和false可以分别被Number转换成数字1和0；null和空数组[]分别被Number转换成数字0；空字符串和包含空格的字符串被Number转换成0；空对象{}和undefined不能够被Number成功转换成数字，返回的就是NaN；new Date()是可以被Number转化为数值的（当前时间戳）。这个具体可以查看下图：

![5DC37FB7-4FC7-4cde-8679-D5422CDBDCEB.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/75ea8a0174f34f2987197f8928b9342d~tplv-k3u1fbpfcp-watermark.image?)

isNaN(value)的原理：如果value不是Number类型，isNaN()会先将这个参数value转换为数值，再对转换后的结果进行判断，对于能被强制转换为有效的非NaN数值，返回false；否则返回true。

### （2）Number.isNaN

使用Number.isNaN判断一个值是否为NaN。**`Number.isNaN()`** 方法确定传递的值是否为 `NaN`，并且检查其类型是否为 `Number`。举一些例子：

```
console.log(Number.isNaN('123')) //false
console.log(Number.isNaN(null)) //false
​
console.log(Number.isNaN(1 / 0)) //false
console.log(Number.isNaN(undefined)) //false
console.log(Number.isNaN('hello')) //false
console.log(Number.isNaN([])) //false
console.log(Number.isNaN(0 / 0))
```

和全局函数 `isNaN()` 相比，`Number.isNaN()` 不会自行将参数转换成数字，只有在参数是值为 `NaN` 的数字时，才会返回 `true`。

**isNaN与Number.isNaN最大的区别在于：isNaN函数会尝试把值转成number类型；Number.isNaN类型则不会进行类型转换，仅仅判断一个值是否为NaN，换句话说，isNaN只是判断传入的参数是否能转换成数字，而Number.isNaN()是严格地判断参数是否等于NaN。**

## 二、js引擎内部的装箱与拆箱

在javascript中有两种数据类型：

```
基本类型： 字符串（ String）、 数字(Number)、 布尔(Boolean)、 空（ Null）、 未定义（ Undefined）、 Symbol
引用类型： 对象(Object)、 数组(Array)、 函数(Function)
```

在 JavaScript 中， 有**四个基本的包装类型 String、 Number、 Boolean、 Symbol**。

### 1、装箱

> 装箱就是把基本数据类转化为对应的引用类型的操作，装箱也分为隐式装箱和显式装箱。

#### （1）隐式装箱

隐式装箱是由引擎自动执行的。举个例子：

```
let str = "index_name"
let res = str.indexOf("_")
console.log(res); //5
```

我们知道，*基本类型是不能够添加属性和方法的，会报错*，那么为什么普通的字符串str可以调用indexOf()方法呢？装箱又做了些什么呢？

装箱有以下步骤：

```
创建String类型的实例
在实例上调用指定的方法
销毁这个实例
```

接下来，我们根据这三个步骤，转换一下代码：

```
let str = new String("index_name")
let res = str.indexOf("_")
str = null
console.log(res);
```

> 简短概括一下隐式装箱：当读取一个基本类型值时，首先会创建一个该基本类型所对应的基本包装类型对象，在这个基本类型的对象上调用指定的方法，其实就是在这个基本类型对象上调用方法，这个基本包装类型的对象是临时的，它只存在于方法调用时执行瞬间，执行完毕后立即被销毁，这也就是str使用indexOf()方法能正确使用的原因了。

#### （2）显式装箱

显式装箱可就更加好理解了，就是通过基本包装类型对象对基本类型进行装箱，举个例子：

```
let person = new String('index_name')
person.name = 'cat'
person.greet = function() {
    console.log('hello cat');
}
console.log(person.name); //cat
person.greet() //hello cat
```

显式装箱可以对new出的对象进行添加属性和方法，毕竟new操作符创建的引用类型的实例，在执行流离开当前作用域之前一直保存在内存中。

*显式装箱和隐式装箱最大的区别在于：前者可以添加属性和方法，后者不能添加属性和方法。*

### 2、拆箱

> 拆箱就是把引用类型转化为对应的基本数据类型的操作（通过valueOf和toString方法）。拆箱说简单点就是跟装箱反着来。

首先，对象中有toPrimitive方法，此方法提供了将对象强制转换为基元并替换toString()和valueOf()方法的通用接口，拆箱也是有自己的一套执行逻辑的：

```
//首先，判断PreferredType的值是哪种类型
//（1）如果是Number
A.如果是基本类型，按照原样返回
B.否则，输入的是一个对象，调用 obj.valueOf() 方法，如果结果是原始的，则将其返回。
C.否则，调用 obj.toString() 方法，如果结果是原始数据，则将其返回。
D.否则，抛出 TypeError错误
//（2）如果是String
A.如果是基本类型，按照原样返回
B.否则，输入的是一个对象，调用 obj.toString() 方法，如果结果是原始的，则将其返回。
C.否则，调用 obj.valueOf() 方法，如果结果是原始数据，则将其返回。
D.否则，抛出 TypeError错误
//（3）如果没有PreferredType，对于 Date 的实例将其设置为 String
//（4）对于所有的其他值，设置为 Number
```

举个例子：

```
​
let num = new Number(123)
let str = new String('name')
​
console.log(typeof num); //object
console.log(typeof str); //object
​
// 拆箱
console.log(typeof num.valueOf()); //number 123
console.log(typeof num.toString()); //string '123'
​
console.log(typeof str.valueOf()); //string '123'
console.log(typeof str.toString()); //string '123'
```

## 三、typeof null？

看这个，你肯定心理乐开了花，等于object嘛，除此外，若知道这其中的原理就更好了。首先我们需要知道，typeof：在二进制中只要前三位为000，就会被判断成object

```
console.log(typeof null); //object
```

在javascript中，typeof null==object其实是一个bug，因为众所周知，null并不是一个对象，而是一个基本数据类型，然而这个bug是不可修复的。这个bug的历史是在javascript第一个版本遗留下来的，即所有制都存储在32位单元中，每个单元包含一个小的 类型标签(1 - 3 bits) 以及当前要存储值的真实数据。 类型标签存储在每个单元的低位中， 共有五种数据类型：

```
000: object  - 当前存储的数据指向一个对象。 
1: int       - 当前存储的数据是一个 31 位的有符号整数。 
010: double  - 当前存储的数据指向一个双精度的浮点数。 
100: string  -当前存储的数据指向一个字符串。 
110: boolean - 当前存储的数据是布尔值。
```

> 如果最低位是 1, 则类型标签标志位的长度只有一位; 如果最低位是 0, 则类型标签标志位的长度占三位, 为存储其他四种数据类型提供了额外两个 bit 的长度。

另外，有两种特殊数据类型:

```
undefined 的值是(-2) 30(一个超出整数范围的数字) 
null 的值是机器码 NULL 指针(null 指针的值全是 0)
```

也就是说，null 的值是机器码 NULL 指针(null 指针的值全是 0) 那也就是说 null 的类型标签也是 000， 和 Object 的类型标签一样,这也就是null会被判定为 Object的原因了。

## 四、js隐式转换规则

### 1、运算符

1、转成string类型

```
+（字符串链接）
```

只要'+'左右两边有一边是字符串，则结果就是字符串类型，举个例子：

2、转成number类型

```
++/--、+、-、*、/、%、>、<、>=、<=、==、！=、===、!==
```

3、转成boolean类型

```
!
```
以上三种类型的详细操作，[可移步](https://juejin.cn/post/7130571331279519752)。

### 2、等号

'=='的情况下，有四种情况：

```
1、如果有一边是boolean，则会将布尔值转换成数字，在比较(所有对象转换成布尔值都是true)
2、如果有一边是string，另一边是数字，则就会将字符串转换成数字，进行比较
3、如果有一边是object，另一边不是，那就先将对象按照拆箱步骤进行转换，得到原始类型再按照上述规则对比
4、null==undefined  //true
```

举个例子：

```
[]==![]
undefined>=undefined
NaN>=NaN
```

这些其实不需要死记硬背，记住原理就可以了，第一个，'=='右边是布尔类型，那么将布尔类型转成数字，则Number([])为0，接下里就变成`[]==0`，一边是对象，一边不是，就先将对象按照拆箱的步骤进行转换，得到原始值再进行对比。剩下的相信你可以自己揣摩了。
