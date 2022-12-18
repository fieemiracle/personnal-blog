---
title: 关于Javascript类型转换，你该了解这些
date: 2022-08-11
tags:
 - 类型转换
categories: 
 - Javascript
isShowComments: true  
subSidebar: auto
---

本文已参与「新人创作礼」活动，一起开启掘金创作之路。
关于Javascript类型转换，你会想到什么？想到什么不重要，重要的是，你知道这些嘛？

## 一、将其他数据类型转换为原始数据类型

### 1、将其他数据类型转换为Boolean

（1）方法一：使用Boolean()函数转换

`规律：在js中，只有 0 、NaN 、空字符串、null 、undefined 和false(布尔值本身)这个6个值转换成布尔为false，其余都转换为true。`

```
//六种为false的情况
console.log(Boolean(0));
console.log(Boolean(''));
console.log(Boolean(null));
console.log(Boolean(undefined));
console.log(Boolean(NaN));
console.log(Boolean(false));//布尔值false本身
//结果：
//false
//false
//false
//false
//false
//false
​
//其余都为true
// 对象转布尔值：结果都为TRUE
console.log(Boolean({}));
console.log(Boolean([]));
console.log(Boolean(Function));
console.log(Boolean(new Boolean(false)));
```

（2）方法二：隐式类型转换

`规律：为任意的数据类型做两次非运算`

```
let a='active';
// !:取反  先把其他数据类型转换为布尔类型，再取反
b=!a;
console.log(b);//false
console.log(typeof b);//boolean
// !!:取两次反，等价于没有取反，直接转换为布尔类型
c=!!a;
console.log(c);//true
console.log(typeof c);//boolean
```

### 2、将其他数据类型转换为Number

（1）方法一：使用Number()函数

`规则:使用Number()函数强制转换，实际上是调用内部的ToNumber(value)方法`

I.字符串->数字

A、如果纯数字的字符串，则直接将其转换为数字

B、如果字符串中有非数字的内容，则转换为NaN

C、如果字符串是一个空串或者是一个全是空格的字符串,则转换为0

II.布尔->数字

A、true 转成1

B、false 转成0

III.此外

A. null 转成0

B. undefined 转成NaN

```
console.log(Number('123'));//123
console.log(Number('hello world'));//NaN
console.log(Number(''));//0
console.log(Number('   '));//0
console.log(Number(true));//1
console.log(Number(false));//0
console.log(Number(null));//0
console.log(Number(undefined));//NaN
```

> null和undefined区别：
> 
> 转换为数字后的不同，null转换数字是0，undefined转换数字是NaN。
> 
> null一般是意料之中的没有，暂时没有，使用时一般先手动赋值为null，后面使用的时候再次会赋值。
> 
> undefined 不是人为手动控制的，大部分都是浏览器自主为空，后面可以赋值也可以不复制。

（2）使用parseInt(),parseFloat()

这种方式专门用来对付字符串。

parseInt()把一个数字字符串转换为一个整数， parseFloat()把一个字符串转换为一个浮点数

如果对非String使用parseInt()或parseFloat()，可以在parseInt()中传递一个第二个参数，来指定数字的进制把各种类型的值转十进制

它会先将其转换为String,然后再操作。

> 其他进制的数字
> 
> A、八进制数字：0开头
> 
> B、二进制数字：0b开头
> 
> C、十六进制数字：0x开头

```
console.log(parseInt('123'));
console.log(parseInt(70,8));//70是8进制，转换成十进制=>56
console.log(parseInt(070));//070是8进制，转换成十进制=>56
console.log(parseInt(070,8));//46
```

### 3、将其他数据类型转换为String

（1）方式一：调用被转换数据类型的toString()方法

该方法不会影响到原变量，它会将转换的结果返回， 但是注意，null undefined这两个值没有toString()方法

```
console.log((123).toString());//'123'
console.log((true).toString());//'true'
console.log(({}).toString());//'[object Object]'
console.log((null).toString());//TypeError: Cannot read property 'toString' of null
console.log((undefined).toString());//TypeError: Cannot read property 'toString' of undefined
```

（2）方法二：使用String()函数，并将被转换的数据作为参数传递递给函数

`规则:使用String()函数强制转换，实际上是调用内部的ToString(value)方法。`

使用String()函数类型强制类型转换时，

对于Number和Boolean实际上就是调用的toString()方法

但是对于null和undefined，就不会调用toString()方法

它会将null直接转换为“null”

将undefined直接转换为“undefined”

```
console.log(String(true));//'true'
console.log(String(190));//'190'
console.log(String(null));//'null'
console.log(String(undefined));//'undefined'
```

## 二、将原始数据类型转换为Object

```
//String(),Number(),Boolean()三大包装类
//包装类具有[[PrimitiveValue]]属性
let string=new String('hello')
console.log(typeof string,string);
let number=new Number(123)
console.log(typeof number,number);
let boolean=new Boolean(false)
console.log(typeof boolean,boolean);
```

![tr1.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2c00bf35e32e4ceab0cda0ec30f770c1~tplv-k3u1fbpfcp-watermark.image?)


## 三、将Object转换为String/Number

对象转String/Number

toString()，valueOf()对象都可以使用的方法，可以把对象往原始类型转换。与原始类型的ToNumber()/ToString()不一样。

对象转原始类型一定会调用ToPrimitive(obj,Number/String)方法，

ToPrimitive(input,PreferredType),PreferredType:String/Number

PreferredType不存在时，默认为String，input是Date类型，相当于PreferredType==String

### 1、将Object转换为String

> ToPrimitive(obj,String)
> 
> （1）如果obj是基本类型，直接返回
> 
> （2）否则，调用toString()方法，如果得到一个原始类型，则返回
> 
> （3）否则，调用valueOf()方法，如果得到一个原始类型，则返回
> 
> （4）否则，报错

```
Number(new Date(2022,7,11))//1660147200000
​
String({name:'duck'})//'[object Object]'
//执行过程
//({name:'duck'}).toString()//'[object Object]'
//String('[object Object]')=>'[object Object]'
​
```

### 2、将Object转换为Number

> ToPrimitive(obj,Number)
> 
> （1）如果obj是基本类型，直接返回
> 
> （2）否则，调用valueOf()方法，如果得到一个原始类型，则返回
> 
> （3）否则，调用toString()方法，如果得到一个原始类型，则返回
> 
> （4）否则，报错

```
Number({})//NaN
//执行过程
//({}).valueOf()//{}
//({}).toString()//'[object Object]'
//Number('[object Object]')=>NaN
​
Number([])//0
```

### 3、将Object转换为JSON

关于JSON你该了解：
```
-Javascript Object Notation js对象表示法
        -JSON和JS对象的格式一样，只不过JSON字符串中的属性名必须加双引号
        -其他的和JS语法一致
        -JS中的对象只有JS自己认识，其他的语言都不认识
        -JSON就是一个特殊格式的字符串，这个字符串可以被任意的语言所识别
        并且可以转换为任意语言中的对象,JSON在开发中主要用来数据的交互
        JSON的分类
            1、对象{}
            2、数组[]
        JSON中允许的值
            1、字符串
            2、数值
            3、布尔值
            4、null
            5、对象
            6、数组
```


1、JS对象-->JSON JSON.stringify() 

-可以将一个JS对象转换为JSON字符串 

-需要一个JS对象作为参数，会返回一个JSON字符串

```
var obj={name:"Lucky",age:45,gender:"man"};
console.log(JSON.stringify(obj));
​
//{"name":"Lucky","age":45,"gender":"man"}
```

2、JSON-->JS对象

JSON.parse()

-可以将以JSON字符串转换为JS对象 

-它需要一个JS字符串作为参数，会将该字符串转换为JS对象

```
 var json='{"name":"Lucky","age":89,"gender":"woman"}';
 var o=JSON.parse(json);
console.log(o)//{name: 'Lucky', age: 89, gender: 'woman'}
 console.log(o.gender);//woman
```

## 四、运算符与隐式转换

### 1、一元操作符

当 - 运算作为一元操作符时，会调用ToNumber()处理该值（非Number类型的值），转不了的变为NaN

当 + 运算作为一元操作符时，会调用ToNumber()处理该值（非Number类型的值）,转不了的变为NaN


![tr2.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9d3fae9c5fdb44d29eb0250ddbb64f9f~tplv-k3u1fbpfcp-watermark.image?)

### 2、二元操作符

v1+v2

> （1）lprim=ToPrimitive(v1)
> 
> （2）rprim=ToPrimitive(v2)
> 
> （3）如果lprim或者rprim是字符串，那么返回ToString(Lprim)和ToString(rprim)的拼接结果
> 
> （4）返回ToNumber(Lprim)和ToNumber(rprim)的相加结果

```
console.log(1+'1');
console.log({}+[]);////谷歌浏览器将{}当做块级作用域，然后操作+[]
console.log('hello'+666);
console.log(1+NaN);
console.log(1+null);
console.log(1+undefined);
​
//11
//0
//hello666
//NaN
//1
//NaN
```

### 3、二元运算符

（1）如果x和y是同一类型：

a.x是undefined,返回true

b.x是null,返回true

c.x是数字，x为NaN,返回false

d.x和y指向同一个对象（内存地址），返回true:let x={};let y=x;x==y =>true;否则返回false:{}=={} =>false;[]==[] =false


![tr3.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5778f51484f149b8bbe9290e25771c33~tplv-k3u1fbpfcp-watermark.image?)

（2）如果x和y不是同一类型：a.null==undefined =>true

b.x是String类型，ToNumber(x)

c.x是Boolean类型,ToNumber(x)

d.x不是String/Number,y是Object true=={a:123} =>false


![tr4.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c446c9b029ba47ebbe63fca3bc59d306~tplv-k3u1fbpfcp-watermark.image?)
