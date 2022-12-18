---
title: 一盏茶的功夫，拿捏作用域&作用域链
date: 2022-07-04
tags:
 - 作用域和作用域链
categories: 
 - Javascript
isShowComments: true  
subSidebar: auto
---

本文已参与「新人创作礼」活动，一起开启掘金创作之路。

酸奶喝对，事半功倍！对于一些晦涩难懂，近乎神话的专业名词，切莫抓耳挠腮，我们直接上代码，加上通俗易懂地语言去渲染，且看今天我们如何拿捏javascript中的小山丘--作用域&作用域链，不止精解。
## 前言
我们需要先知道的是引擎，引擎的工作简单粗暴，就是负责javascript从头到尾代码的执行。引擎的一个好朋友是编译器，主要负责代码的分析和编译等；引擎的另一个好朋友就是今天的主角--作用域。那么作用域用来干什么呢？作用域链跟作用域又有什么关系呢？
## 一、作用域(scope)
作用域的定义：作用域是在运行时代码中的某些特定部分中变量，函数和对象的可访问性。
### 1、作用域的分类
(1)全局作用域

```
var name="global";
function foo(){
    console.log(name);
}
foo();//global
```
这里函数foo()内部并没有声明name变量，但是依然打印了name的值，说明函数内部可以访问到全局作用域，读取name变量。再来一个例子：

```
hobby='music';
function foo(){
    hobby='book';
    console.log(hobby);
}
foo();//book
```
这里全局作用域和函数foo()内部都没有声明hobby这个变量，为什么不会报错呢？这是因为`hobby='music';`写在了全局作用域，就算没有var,let,const的声明，也会被挂在window对象上，所以函数foo()不仅可以读取，还可以修改值。也就是说`hobby='music';`等价于`window.hobby='music';`。

(2)函数体作用域
函数体的作用域是通过隐藏内部实现的。换句话说，就是我们常说的，内层作用域可以访问外层作用域，但是外层作用域不能访问内层。原因，说到作用域链的时候就迎刃而解了。

```
function foo(){
    var age=19;
    console.log(age);
}
console.log(age);//ReferenceError:age is not defined
```
很明显，全局作用域下并没有age变量，但是函数foo()内部有，但是外部访问不到，自然而然就会报错了，而函数foo()没有调用，也就不会执行。

(3)块级作用域
块级作用域更是见怪不怪，像我们接触的let作用域，代码块{}，for循环用let时的作用域，if,while,switch等等。然而，更深刻理解块级作用域的前提是，我们需要先认识认识这几个名词：

--标识符：能在作用域生效的变量。函数的参数，变量，函数名。需要格外注意的是：`函数体内部的标识符外部访问不到`。

--函数声明：function 函数名(){}

--函数表达式： var 函数名=function(){}

--自执行函数： (function 函数名(){})()；`自执行函数前面的语句必须有分号`，通常用于隐藏作用域。

接下来我们就用一个例子，一口气展示完吧

```
function foo(sex){
    console.log(sex);
}
var f=function(){
    console.log('hello');
}
var height=180;
(
    function fn(){
        console.log(height);
    }
)();
foo('female');
//依次打印：
//180
//female
```
分析一下：标识符:foo,sex,height,fn;函数声明：function foo(sex){};函数表达式：var f=function(){};自执行函数：(function fn(){})();需要注意，自执行函数fn()前面的`var height=180;`语句，`分号不能抛弃`。否则，你可以试一下。

## 二、预编译
说好只是作用域和作用域链的，但是考虑到理解作用域链的必要性，这里还是先聊聊预编译吧。先讨论预编译在不同环境发生的情况下，是如何进行预编译的。

### 1. 发生在代码执行之前
（1）声明提升

```
console.log(b);
var b=123;//undefined
```
这里打印undefined,这不是报错，与Refference:b is not defined不同。这是代码执行之前，预编译的结果，等同于以下代码：

```
var b;//声明提升
console.log(b);//undefined
b=123;
```
（2）函数声明整体提升

```
test();//hello123  调用函数前并没有声明，但是任然打印，是因为函数声明整体提升了
function test(){
    var a=123;
    console.log('hello'+a);
}
```

### 2.发生在函数执行之前

理解这个只需要掌握`四部曲`：

（1）创建一个AO（Activation Object）

（2）找形参和变量声明，然后将形参和变量声明作为AO的属性名，属性值为undefined

（3）将实参和形参统一

（4）在函数体内找函数声明，将函数名作为AO对象的属性名，属性值予函数体
那么接下来就放大招了：

```
var global='window';
function foo(name,sex){
    console.log(name);
    function name(){};
    console.log(name);
    var nums=123;
    function nums(){};
    console.log(nums);
    var fn=function(){};
    console.log(fn);
}
foo('html');
```
这里的结果是什么呢？分析如下：

```
//从上到下
//1、创建一个AO（Activation Object）
AO:{
    //2、找形参和变量声明，然后将形参和变量声明作为AO的属性名，属性值为undefined
    name:undefined,
    sex:undefined,
    nums=undefined,
    fn:undefined,
    //3、将实参和形参统一
    name:html,
    sex:undefined,
    nums=123,
    fn:function(){},
    //4、在函数体内找函数声明，将函数名作为AO对象的属性名，属性值予函数体
    name:function(){},
    sex:undefined,
    fn:function(){},
    nums:123//这里不仅存在nums变量声明，也存在nums函数声明，但是取前者的值
    
    以上步骤得到的值，会按照后面步骤得到的值覆盖前面步骤得到的值
}
//依次打印
//[Function: name]
//[Function: name]
//123
//[Function: fn]
```
### 3.发生在全局（内层作用域可以访问外层作用域）

同发生在函数执行前一样，发生在全局的预编译也有自己的`三部曲`:

 (1)创建GO（Global Object）对象
 
 (2)找全局变量声明，将变量声明作为GO的属性名，属性值为undefined
 
 (3)在全局找函数声明，将函数名作为GO对象的属性名，属性值赋予函数体
 举个栗子：
 
```
var global='window';
function foo(a){
    console.log(a);
    console.log(global);
    var b;
}
var fn=function(){};
console.log(fn);
foo(123);
console.log(b);
```
这个例子比较简单，一样的步骤和思路，就不在赘述分析了，相信你已经会了。打印结果依次是：

```
[Function: fn]
123
window
ReferenceError: b is not defined
```
好啦，进入正轨，我们接着说作用域链。
## 三、作用域链
作用域链就可以帮我们找到，为什么内层可以访问到外层，而外层访问不到内层？但是同样的，在认识作用域链之前，我们需要见识见识一些更加晦涩抽象的名词。

1. `执行期上下文`：当函数执行的时候，会创建一个称为执行期上下文的对象（AO对象），一个执行期上下文定义了一个函数执行时的环境。 函数每次执行时，对应的执行上下文都是独一无二的，所以多次调用一个函数会导致创建多个执行期上下文，当函数执行完毕，它所产生的执行期上下文会被销毁。
2. `查找变量`：从作用域链的顶端依次往下查找。
3.` [[scope]]`：作用域属性，也称为隐式属性,仅支持引擎自己访问。函数作用域，是不可访问的，其中存储了运行期上下文的结合。

我们先看一眼函数的自带属性：

```
function test(){//函数被创建的那一刻，就携带name,prototype属性
      console.log(123);
}
console.log(test.name);//test
console.log(test.prototype);//{} 原型
// console.log(test[[scope]]);访问不到,作用域属性，也称为隐式属性

// test() --->AO:{}执行完毕会回收
// test() --->AO:{}执行完毕会回收
```
接下来看看作用域链怎么实现的：

```
var global='window';
function foo(){
    function fn(){
        var fn=222;
    }
    var foo=111;
    console.log(foo);
}
foo();
```
分析：

```
GO:{
    foo:function(){}
}
fooAO:{
    foo:111,
    fn:function(){}
}
fnAO:{
    fn:222
}
// foo定义时 foo.[[scope]]---->0:GO{}
// foo执行时 foo.[[scope]]---->0:AO{}  1:GO{}  后访问的在前面
//fn定义时 fn.[[scope]]---->0:fnAO{} 1:fooAO{}  2:GO{}
fnAO:fn的AO对象；fooAO:foo的AO对象
```
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d7e38c2e45c74f099a76400b48ce6b01~tplv-k3u1fbpfcp-watermark.image?)

综上而言：`作用域链就是[[scope]]中所存储的执行期上下文对象的集合，这个集合呈链式链接，我们把这种链式链接叫做作用域链。`


    


