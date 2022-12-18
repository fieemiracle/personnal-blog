---
title: TypeScript类型推论和类型断言
date: 2022-11-20
tags:
 - 类型推论和类型断言
categories: 
 - Typescript
isShowComments: true  
subSidebar: auto
---

***本文正在参加[「金石计划 . 瓜分6万现金大奖」](https://juejin.cn/post/7162096952883019783 "https://juejin.cn/post/7162096952883019783")***


## 一、类型推论

类型推论，顾名思义就是指类型在哪里如何被推断。在TS语法中，如果有些没地方有明确指出类型，类型推论就会帮助提供类型，即声明变量时，不赋给类型，就会触发类型推论。

### 1、最佳通用类型

最佳通用类型就是指，在一个或者多个表达式中，变量的类型会从这些表达式中的所有类型来推断出一个最合适的通用类型。

举个例子：

```
let brand = 'YSL'
brand = 123
```

当定义一个变量`brand`，变量brand的类型被推断为字符串，但是后来修改值为另外一种类型，如number，boolean等，TS就会很贴心的提示不能将其他类型分配给字符串。然而这只是从单个表达式里面推断，如果是多个表达式呢？又会如何推断呢？例如：

```
let money = [1, 'yuan', null]
money = [123]
money = ['hello']
money = [null]
​
​
money = [{ name: 'ducky' }]//错误提示
```

可见，当需要从几个表达式中推断类型时候，会使用这些表达式的类型来推断出一个最合适的通用类型---称为最佳通用类型。当有多个表达式时，为了推断`money`的类型，必须要考虑所有元素的类型。 这里有三种选择： `number`，`string`和`null`。 计算通用类型算法会考虑所有的候选类型，并给出一个兼容所有候选类型的类型。那如果想要的类型不在候选名单上，又该如何推论呢？例如：

```
function Animal() {
    console.log('animal');
}
function Food() {
    console.log('food');
}
function Fruit() {
    console.log('fruit');
}
let target= [new Animal(), new Food(), new Fruit()]
```

如果想让`terget`的类型被推断为`People[]`类型，但是数组里的候选类型有三种，没有`People[]`类型，这肯定是不能推断出结果的。那怎么办呢？这种情况下，当候选类型不能使用的时候，我们必须明确地指出类型：

```
let target:People[]= [new Animal(), new Food(), new Fruit()]
```

此时，如果没有找到最佳通用类型的话，`target`会被推断为联合数组类型：`(Animal|Food|Fruit)[]`

### 2、上下文类型

上下文类型取决于表达式的类型和其所处的位置，例如：

```
window.onclick = function(e) {
    console.log(e);  //报错提示
};
```

会出现这样的报错提示：`[ts] Parameter :'e' implicitly has an 'any' type， but a better type may be inferred from usage.`，TS类型检查器使用window.onclick函数的类型来推断右边函数表达式的类型，从而推出`e`参数的类型，如果函数表达式不是在上下文类型的位置，则参数`e`具有`any`类型。我们知道，any表示任意类型， 可以被任何类型分配，也可以分配给任何类型;任意类型，是所有类型的子类型，当被赋予`any`类型的时候，就意味着跟JS运行一样了。那这里怎么改呢？既然已经提示了`e`具有`any`类型，那就明确`e`的类型为`any`就好了。一旦这个函数表达式有了明确的参数类型注解，上下文类型就会被忽略。

## 二、类型断言

类型断言是指：当不确定一个联合类型的变量到底是哪种类型的时候，我们只能访问这个联合类型的所有类型里共有的属性或者方法，但是有的时候就是需要在还不确定类型的情况下就访问其中一个类型的属性和方法。类型断言可以用来手动指定一个值的类型。

类型断言不是类型转换，断言成一个联合类型中不存在的类型毫无疑问是不被允许的。

语法：`<类型>值`或者`值 as 类型`。

举个例子：

```
function getFullName(fullname: string | number): number {
    if (fullname.length) {
        return fullname.length;
    } else {
        return fullname.toString().length;
    }
}
getFullName('hhhhhhhhh')
```

如上代码，看上去逻辑好像一点问题也没有，但是就是会给你报错`Property 'length' does not exist on type 'string | number'` 。这个时候，肯定不是换成JS来写，而是通过类型断言来让代码顺利执行，改造如下：

```
function getFullName(fullname: string | number): number {
    // if ((<string>fullname).length) {
    if (fullname as string) {
        return (<string>fullname).length
    } else {
        return fullname.toString().length
    }
}
getFullName('hhhhhhhhh')
```

那么理解下面的代码，对你来说肯定就是小菜一碟啦~：

```
let greet: any = 'hello'
let greetLength1: number = (<string>greet).length
let greetLength2: number = (<string>greet).length
console.log(greetLength1);//5
console.log(greetLength2);//5
​
interface Ob1 {
    name: string,
}
interface Ob2 {
    name: number,
}
let myOb: Ob1 | Ob1 = {
    name: '123'
}
let obLength: number = (<string>myOb.name).length
console.log(obLength);//3
```
