---
title: Typescript类型|学习笔记
date: 2022-10-09
tags:
 - 类型
categories: 
 - Typescript
isShowComments: true  
subSidebar: auto
---

持续创作，加速成长！这是我参与「掘金日新计划 · 10 月更文挑战」的第1天，[点击查看活动详情](https://juejin.cn/post/7147654075599978532 "https://juejin.cn/post/7147654075599978532")
## 一、认识Typescript

(1)Javascript是一种动态类型的弱类型语言 

Javascript超集： A.包含与兼容所有JS特性，支持共存 B.支持渐进式引入与升级

(2)TypeScript是一种静态类型的弱类型语言

静态类型的优点： 

A.可读性增强：基于语法解析TSDoc,ide增强 

B.可维护性增强：在编译阶段暴露大部分错误=>多人合作大型项目中，可以获得更好的稳定性和开发效率 


(3)Typescript是Javascript的超集，具有可选的类型并可以编译成纯JS

## 二、Typescript优缺点

### 1、优点：

（1）增强代码的可维护性，尤其在大型项目开发中效果显著 

（2）友好地在编译器提示错误，在编译阶段就能检查类型，发现大部分错误 

（3）支持最新的JS的特性 

（4）繁荣的生态圈，typescript被普遍使用，多种框架都支持，尤其是Vue3

### 2、缺点：

（1）插件库兼容不够完美 ​ 

（2）增加前期开发成本

## 三、运行Typescript

例如，创建一个test.ts文件，

（1）npm i -g typescript 

   tsc -v 查看tsc版本

   tsc --init 初始化 使用命令：tsc test.ts ,可将TS文件转化为JS文件 

（2）npm i -g ts-node 使用命令：ts-node test.ts 可以直接执行TS文件 

（3）npm i -D tslib @types/node 如果（2）之后运行还会报错，就再安装（3）

## 四、基本类型

### 1、非Typescript新增类型

（1）boolean（布尔值）

```
// boolean
const isRight: boolean = true;
const isleft: boolean = false;
console.log(isRight, isleft);//true false
```

（2）number（数字）

```
// number
let numberOne: number = 123;
let numberTwo: number = 999;
console.log(numberOne, numberTwo);//123 999
```

（3）string（字符串）

```
// string
let yourName: string = 'baby',
    yourGender: string = 'female';
console.log(yourName, yourGender);//baby female
let adult: string = `your name is ${yourName},your sex is ${yourGender}`;//模板字符串
console.log(adult);//your name is baby,your sex is female
let another: string = "my name is " + yourName + "my gender is " + yourGender;//字符串拼接
console.log(another);//my name is babymy gender is female
```

（4）Array（数组）

```
// Array
let isArray1: string[] = ['1', '2', '3'];//string[]
console.log(isArray1);//[ '1', '2', '3' ]
let isArray2: number[] = [1, 2, 3];//number[]
console.log(isArray2);//[ 1, 2, 3 ]
let isArray3: Array<number> = [1, 2, 3];//数组泛型：Array<number>
console.log(isArray3);//[ 1, 2, 3 ]
let isArray4: Array<string> = ['1', '2', '3'];//数组泛型：Array<string>
console.log(isArray4);//[ '1', '2', '3' ]
```

（5）null

```
// null
const nl: null = null;
console.log(nl);
```

（6）undefined

```
// undefined
const und: undefined = undefined;
console.log(und);
```

默认情况下`null`和`undefined`是所有类型的子类型。 就是说你可以把 `null`和`undefined`赋值给`number|string`等类型的变量。

（7）Object（对象）

`object`表示非原始类型，也就是除`number`，`string`，`boolean`，`symbol`，`null`或`undefined`之外的类型。使用`object`类型，就可以更好的表示像`Object.create`这样的API。

```
// 对象类型
let myObject:object = {};
​
// 非严格模式下，可以这样；严格模式下，myObject不能被重新赋值
myObject=undefined;
myObject=null;
​
// Object有用内置对象
let bigObject:Object = {};
bigObject=1;
bigObject='a'
bigObject=true
bigObject=undefined
bigObject=null
​
// 空对象类型
let emptyObject:{} = {};
emptyObject=1
emptyObject='a'
emptyObject=true
emptyObject=undefined
emptyObject=null
```

（8）Function（函数）

```
// 函数
function add(x:number,y:number):number{//两个参数
    return x+y
}
function subtract(...number:number[]):number{//多个参数
    let sum=0;
    for(let i=0;i<number.length;i++) sum+=number[i]
    return sum;
}
const minus=function(x:number,y:number):number{//函数另一个表示方式
    return x-y
}
const multiply=function(x:number,y:number,z?:number):number{//三个参数
    return z?x*y*z:x*y
}
multiply(1,2)
function defaultFun(x: number, y: number=0): number {
    return x/y
}
```

### 2、Typescript新增类型

（1）Tuple（元祖）

```
// Tuple（元祖）:允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
//定义myTuple的第一个元素只能是字符串，第二个只能是数字
let myTuple: [string, number];
myTuple = ['hello', 10]; // OK
// myTuple = [10, 'hello']; // error
​
//访问元素，当访问不存在的元素时，会报错
console.log(myTuple[0]);//hello
myTuple[0] = 'hello world';
console.log(myTuple);//[ 'hello world', 10 ]
```

（2）enum（枚举类型）

普通枚举：

```
// enum（枚举类型）：支持枚举值到枚举名的正反向映射
enum Operate {
    add = '+',
    mult = '*'
}
console.log(Operate['add'] === '+');//true
console.log(Operate['+'] === 'add');//false
let operation: Operate = Operate.add;
console.log(operation);//+
​
enum Mycolor {
    red, yellow, blue
}
console.log(Mycolor['red'] === 0);//true
console.log(Mycolor[0] === 'red');//true
let myCol: Mycolor = Mycolor.yellow;
let hisCol: string = Mycolor[1]
console.log(myCol, hisCol);//1 yellow
​
// 默认值
enum People {
    Linda = 1,
    Jhon,
    Lihua
}
let per: string = People[2];
console.log(per);//Jhon
```

枚举类型的字符串枚举和常量枚举：

```
// 字符串枚举
enum Person {
    name = 'Lucky',
    age = 19,
    sex = 'female'
}
const pname: Person = Person.name,
    page: Person = Person.age;
console.log(pname, page);//Lucky 19
​
// 常量枚举
const enum Student {
    sname,
    sage,
    ssex
}
const student: Student[] = [Student.sname, Student.sage, Student.ssex];
console.log(student);//[ 0, 1, 2 ]
```

（3）any（任意类型）

any：表示任意类型， 可以被任何类型分配，也可以分配给任何类型;任意类型，是所有类型的子类型

```
//把any类型分配给其他类型
let otherType1: any
let otherType2: any = otherType1;
let otherType3: unknown = otherType1;
let otherType4: void = otherType1;
​
let otherType5: undefined = otherType1;
let otherType6: null = otherType1;
let otherType7: number = otherType1;
let otherType8: string = otherType1;
let otherType9: boolean = otherType1;
// 报错:不能将类型“any”分配给类型“never”
// let val_never:never = val;
​
//把其他类型分配给any
otherType1 = 'hello';
otherType1 = 110;
otherType1 = true;
otherType1 = null;
otherType1 = undefined;
​
otherType1 = unknown;// 报错:“unknown”仅表示类型，但在此处却作为值使用
otherType1 = never;// 报错:“never”仅表示类型，但在此处却作为值使用
otherType1 = any;// 报错:“any”仅表示类型，但在此处却作为值使用
otherType1 = void;// 报错:应为表达式
```

另外，any虽然可以代表任意类型，但是能不用就不要用，这是默认的代码规范问题.

（4）unknown

```
// 把unknown类型分配给其他类型
let myType: unknown;
let myType1: any = myType;
let myType2: unknown = myType;
let myType3: string = myType;//报错
let myType4: number = myType;//报错
let myType5: boolean = myType;//报错
let myType6: null = myType;//报错
let myType7: undefined = myType;//报错
​
// 把其他类型分配给unknown类型
myType = '';
myType = 0;
myType = true;
myType = undefined;
val = null;
​
myType = void;//报错
myType = any;//报错
myType = unknown;//报错
myType = never;//报错
```

与any任意类型相比，因为unknown是未知类型，所以只能进行 ?, typeof, instanceof等有限操作.

（5）never

```
// never：是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）
// 返回never的函数必须存在无法达到的终点
function throwError(message: string): never {
    throw new Error(message);
}
// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}
```

`never`类型表示的是那些永不存在的值的类型。 例如， `never`类型是那些会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是 `never`类型，当它们被永不为真的类型保护所约束时。

（6）interface（接口）

```
// 接口
const hisObj={
    name:'胡琴',
    age:19,
    sex:'boy'
}
hisObj.name='lucky'
​
// 具有一个和jisObj相同属性的对象
let p1:Object={
    name:'dog',
    age:20
}//这种方式不具有针对性
​
// （1）接口（具有针对性）
interface Children{
    name:string,
    age:number,
    sex:string
}
let pp1:Children={
    name:'dog',
    age:20,
    sex:'female'
}
​
// （2）函数接口
interface Push{
    (x:number,y:number):number
}
```

另外，

```
interface Myobj {
    // 只读属性：约束属性不可在对象初始化外赋值
    readonly cardId: number;
    name: string;
    sex: 'male' | 'female';
    age: number;
    // 可选属性：定义该属性可以不存在
    hobby?: string;
    // 任意属性：约束属性都必须是该属性的子类型
    [key: string]: any;
}
​
// 对象类型
const obj: Myobj = {
    cardId: 2020213028,
    name: 'Lucky',
    sex: 'female',
    age: 19,
    hobby: 'reading'
}
​
// const o:Myobj={//报错：缺少name属性，hobby可缺省
//  cardId:2020213026,
//  sex:'female',
//  age:18
// }
console.log(obj);
// {
//   cardId: 2020213028,
//   name: 'Lucky',
//   sex: 'female',
//   age: 19,
//   hobby: 'reading'
// }
console.log(obj.cardId);//2020213028
console.log(obj.shortcoming = 'Math');//Math
console.log(obj.cardId = 2020213026);//Cannot assign to 'cardId' because it is a read-only property.
​
```


