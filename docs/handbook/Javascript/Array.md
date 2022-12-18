---
title: 不可不说的Array.xxx（）（上）
date: 2022-07-15
tags:
 - 数组
categories: 
 - Javascript
isShowComments: true  
subSidebar: auto
---

本文已参与「新人创作礼」活动，一起开启掘金创作之路。

你真的熟悉数组嘛？你知道小程序经常使用的数组方法吗？数组方法很多，也总是让人记不住，本文将摘选一些在小程序中经常使用的方法，包括数组迭代方法，以及一些在算法题目上屡用不爽的简单方法，快来看看吧~。


## 一、必须熟悉的数组迭代方法

数组迭代--对每个数组项进行操作。
在小程序中，这些迭代方法（遍历方法）不仅可以简写代码，还能节约性能，而且用起来也比较灵活，以后需要操作数组，再也不会只知道循环了。

### 参数意义

-   total：总数（初始值/先前返回的值）
-   value：项目值
-   index：项目索引
-   array：数组本身
-   item：必需。要检索的项目
-   start：可选。从哪里开始搜索

### 1、Array.forEach(value,index,array）

`（1）不会更改原始数组`

```
const myArray=[1,2,3,4,5];

let alterArray=myArray.forEach(value=>{

 value = value*2;

})

console.log(myArray);//[ 1, 2, 3, 4, 5 ]

console.log(alterArray);//Object [Array Iterator] {}
```

### 2、Array.map(value,index,array)

`（1）通过对每个数组元素执行函数来创建新数组`

`（2）不会对没有值的数组元素执行函数`

`（3）不会更改原始数组`

```
let alterArray1=myArray.map(value=>{

  return value*2;

});

console.log(myArray);//[ 1, 2, 3, 4, 5 ]

console.log(alterArray1);//[ 2, 4, 6, 8, 10 ]
```
foreach()和map()区别在于：`forEach()没有返回值，map（）有返回值`。
### 3、Array.filter(value,index,array)

`（1）创建一个包含通过测试的数组元素的新数组`

`（2）不会更改原始数组`

```
let alterArray2=myArray.filter(value=>{

  return value%2==0;

});

console.log(myArray);//[ 1, 2, 3, 4, 5 ]

console.log(alterArray2);//[ 2, 4 ]
```

### 4、Array.reduce(total, value, index, array)

`（1）在每个数组元素上运行函数，以便生成（减少它）单个值`

`（2）在数组中从左到右工作`

`（3）不会减少原始数组`

`（4）可接受一个初始值`

```
let alterArray3=myArray.reduce((total,value)=>{

  return total+value;

});

console.log(myArray);//[ 1, 2, 3, 4, 5 ]

console.log(alterArray3);//15



let alterArray4=myArray.reduce((total,value)=>{

  return total+value;

},100);

console.log(alterArray4);//115
```

### 5、Array.reduceRight(total, value, index, array)

`（1）在每个数组元素上运行函数，以便生成（减少它）单个值`

`（2）在数组中从右到左工作`

`（3）不会减少原始数组`

```
let alterArray5=myArray.reduce((total,value)=>{

  return total+value;

});

console.log(myArray);//[ 1, 2, 3, 4, 5 ]

console.log(alterArray5);//15
```

### 6、Array.every(value, index, array)

`（1）检查所有数组是否通过测试`

```
let alterArray6=myArray.every((total,value)=>{

  return value%2==1;

});

console.log(alterArray6);//false
```

### 7、Array.some(value, index, array)

`（1）检查某些数组值是否通过测试`

```
let alterArray7=myArray.some((total,value)=>{

  return value%2==1;

});

console.log(alterArray7);//true
```

### 8、Array.indexOf(item, start)

`（1）如果未找到项目，Array.indexOf() 返回 -1。`

`（2）如果项目多次出现，则返回第一次出现的位置。`

`（3）start：可选。从哪里开始搜索。负值将从结尾开始的给定位置开始，并搜索到结尾。`

```
let alterArray8=myArray.indexOf(10);

console.log(alterArray8);//-1  
```

### 9、Array.lastIndexOf(item, start)

`（1）start 可选。从哪里开始搜索。负值将从结尾开始的给定位置开始，并搜索到开头。`

```
let alterArray9=myArray.indexOf(10);

console.log(alterArray9);//-1  
```

### 10、Array.find(value, index, array)

`（1）返回通过测试函数的第一个数组元素的值`

```
let alterArray10=myArray.find(value=>{

  return value>3;

});

console.log(alterArray10);//4
```

### 11、Array.findIndex(value, index, array)

`（1）返回通过测试函数的第一个数组元素的索引`

```
let alterArray11=myArray.findIndex(value=>{

  return value>3;

});

console.log(alterArray11);//3
```

## 二、必须会的简单方法
### 1、反转

--Array.reverse()

```
const arr=[1,2,3,4,5]
console.log(arr.reverse());//[ 5, 4, 3, 2, 1 ]

const strArr=['apple','pear','peach','watermelon','strawberry']
console.log(strArr.reverse());//[ 'strawberry', 'watermelon', 'peach', 'pear', 'apple' ]
```

### 2、切割
slice()和splice()分不清？不可能！先看例子：

`（1）--slice() 方法用数组的某个片段切出新数组`

```
// 一个参数时，比如从数组元素 （"myself"）开始切出一段数组
const person=['grandfather','grandmother','father','mother','brother','sister','myself','son','dauther'];
console.log(person.slice(person.indexOf('myself')));//从起点开始切到最后 [ 'myself', 'son', 'dauther' ]
console.log(person.slice(-2));//反方向切2个元素  [ 'son', 'dauther' ]
console.log(person);//slice() 方法创建新数组，不改变原数组

// 两个参数时，比如从数组元素“grandfather”切到“myself”
console.log(person.slice(person.indexOf('grandfather'),person.indexOf('myself')));//切左不切右
//[ 'grandfather', 'grandmother', 'father' ,'mother','brother','sister']
```
`--splice() 方法可用于向数组添加新项，或者在数组中不留“空洞”的情况下移除元素`

```
// 第一个参数:添加新元素的位置（拼接）。
// 第二个参数:删除多少元素。
// 其余参数:要添加的新元素。
// splice() 方法返回一个包含已删除项的数组
const myArr=['you','are','a','big','banana','!']
// 现在在"are"后面添加"not"
myArr.splice(2,0,'not')
console.log(myArr);//会改变原数组   [ 'you', 'are', 'not', 'a', 'big', 'banana', '!' ]

// 能够使用 splice() 在数组中不留空洞的情况下移除元素
// 第一个参数:新元素应该被添加（接入）的位置。
// 第二个参数:删除几个元素。
// 现在删除末尾的感叹号"!"
console.log(myArr.splice(myArr.length-1,1));//返回被删除的元素 [ '!' ]
console.log(myArr);//会改变原数组  [ 'you', 'are', 'not', 'a', 'big', 'banana' ]
```
综上所述：

slice()和splice()的区别有以下几点：

（1）作用不同

（2）slice()不会改变原数组，splice()会改变原数组

（3）slice()返回的是切出的新片段，splice()返回的是删除的元素

### 3、类型转换

--tostring()和join()，以及Array.from()

```
// toString() 把数组转换为数组值（逗号分隔）的字符串。
var fruits = ["Banana", "Orange", "Apple", "Mango"];
console.log( fruits.toString());//Banana,Orange,Apple,Mango

// join() 方法也可将所有数组元素结合为一个字符串。行为类似 toString()，但是可以规定分隔符
console.log(fruits.join("")); //BananaOrangeAppleMango

// Array.from(),将其他类型转为数组
var str='abcdef';
console.log(Array.from(str));//[ 'a', 'b', 'c', 'd', 'e', 'f' ]
```
### 4、排序

排序炒鸡简单，只需要记住一行代码既可。

```
let arr=[11,54,23,45,67,12,34];
arr=arr.sort((a,b)=>a-b);//升序 [11,12,23,45,54,67]
// arr=arr.sort((a,b)=>b-a);//降序 [67, 54, 45, 34,23, 12, 11]
console.log(arr);
```

## 总结

以上方法都是在小程序中比较常见的方法，快快过个眼吧~。有遗漏的，评论区补充。
