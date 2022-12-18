---
title: 快来学习javascript设计模式
date: 2022-12-10
tags:
 -扁平化
categories: 
 - Javascript
---

---
highlight: a11y-dark
theme: channing-cyan
---
***本文正在参加[「金石计划 . 瓜分6万现金大奖」](https://juejin.cn/post/7162096952883019783 "https://juejin.cn/post/7162096952883019783")***

什么是扁平化？对于数组扁平化来说，就是降维过程，即将多维数组降为一维数组的过程。而对于对象扁平化来说，就是将深度大于1的对象，降到深度为1的过程。这么一说，肯定不好理解，接下来，让代码说话吧~。

## 一、数组的扁平化

比如现在需要将一个这样的数组进行扁平化，让他变为以为数组：

```
const myArray=[1,2,[3,4,5,[6,[7]]],8,[9]]
```

对于数组的扁平化，你可以使用哪些API来实现呢？首先肯定是先想到ES6里面的`flat`方法：

### （1）Array.prototype.flat()

先介绍介绍`flat`，Array.prototype.flat()用于将嵌套的数组"拉平"，变成一维数组，并且该方法会返回一个新的数组，对原数组没有任何影响。同时，它默认只会拉平一层，如果想拉平多层的嵌套数组，需要给`flat()`方法传入一个正整数的参数，表示想要拉平的层数，默认值是1。如下扁平化结果：

```
// 扁平化一层
const flatArray1 = myArray.flat()
console.log(flatArray1); //[ 1, 2, 3, 4, 5, [ 6, [ 7 ] ], 8, 9 ]
​
// 扁平化两层
const flatArray2 = myArray.flat(2)
console.log(flatArray2); //[1,2, 3,4,5, 6,[ 7 ], 8, 9]
​
// 扁平化为一维数组
const flatArray3 = myArray.flat(3)
console.log(flatArray3); //[1, 2, 3, 4, 5,6, 7, 8, 9]
```

可烦了，扁平化我还得数一下有几层，但是，有一个关键字，不管有多少层嵌套，都可以将多维数组转成一维数组，即用`Infinity`关键字作为参数：

```
const flatArray4 = myArray.flat(Infinity)
console.log(flatArray4);
////[1, 2, 3, 4, 5,6, 7, 8, 9]
```

### （2）Array.prototype.toString()

`toString()`方法可以将一个数组转换成字符串，然后需要将字符串通过`split()`方法转换成数组，然而这个时候数组的每一项还是一个字符串，需要强制类型转换，这样的话，就只适用于数组的每一个元素都是数字的场景。

```
const toStringArray = myArray.toString().split(',').map(item => Number(item))
console.log(toStringArray);
​
//toString()得到
1,2,3,4,5,6,7,8,9
//split()得到
[
  '1', '2', '3',
  '4', '5', '6',
  '7', '8', '9'
]
//map()
[
  1, 2, 3, 4, 5,
  6, 7, 8, 9
]
```

### （3）Array.prototype.concat()
该方法会将数组转化为纯字符串的形式，所以还需要将字符串转换成一维数组，字符串转换成一维数组的方法也有很多，在这里使用的是（...）扩展运算符。
```
function concatFlatten(array) {
    while (array.some(item => Array.isArray(item))) {
        array = [].concat(...array);
    }
    return array;
​
}
​
const concatArray = concatFlatten(myArray)
console.log(concatArray);
//[ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

### （4）使用Generator函数
使用Generator函数，也是可以实现数组扁平化的，但是这需要一些基本的知识基础。巧妙地使用了`yield`关键字和`yield*`表达式，如下所示：
```
var flat = function*(array) {
    for (var i = 0; i < array.length; i++) {
        if (Array.isArray(array[i])) {
            yield* flat(array[i]);
        } else {
            yield array[i];
        }
    }
};
const flatArray = [...flat(myArray)]
console.log(flatArray);
```

`yield`和`yield*`这两个表达式不一样，`yield`是关键字，紧接在其后面的是Generator函数返回的遍历器调用`next`方法得到的值；而`yield*`是表达式，有返回值，紧接在其后面的是可遍历对象，如数组，类数组，或者另一个Generator函数的执行表达式等，尽管接可遍历对象，但是值是一个一个赋值的，举个例子：

```
function* gen() {
    yield* [1, 2];
    yield* '34';
    yield* Array.from(arguments);
}
​
var iterator = gen(5, 6);
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
​
//{ value: 1, done: false }
//{ value: 2, done: false }
//{ value: '3', done: false }
//{ value: '4', done: false }
//{ value: 5, done: false }
//{ value: 6, done: false }
```

我们需要知道，Generator函数返回的对象是一个可遍历的对象，并且通过扩展运算符结构一个Generator函数，解构的是其`value`的值。

### （5）**Array.reduce()**

Array.reduce(total, value, index, array)，该方法为数组中的每个元素按照顺序执行一个`reducer`函数，每次执行会将先前的计算结果作为参数传入，然后将结果汇总为单个返回值。

该方法的回调函数接收四个参数：

`preval`：上一次调用回调函数的返回值，在第一次调用时可指定初始值，那么`preval`就会等于这个初始值；否则初始值默认是数组的索引为0的元素。

`curval`：当前处理的元素，在第一次调用时如果指定了初始值，则`curval`就等于索引为0的元素；否则，为索引为1的元素。

`curindex`：当前处理元素的索引，如果指定了初始值，则索引就等于0；否则索引从1开始。

`initval`：初始值，可选参数。作为第一次调用回调函数时的`preval`的值。

现在就来试试水吧：

```
const flatArray = myArray.reduce((preval, curval, curindex) => {
    console.log('preval=', preval);
    console.log('curval=', curval);
    return preval.concat(curval)
}, []);
console.log(flatArray); 
//[ 1, 2, 3, 4, 5, [ 6, [ 7 ] ], 8, 9 ]
```

经过测试，扁平化后的结果并不是我们想要的。通过代码发现，单纯的使用该方法只可以扁平化一层数组，对于多层嵌套的数组就束手无策，而对于多层嵌套层的数组，需要进行递归，遍历深度，所以优化后：

```
function flatten (array, deep = 1) => {
    if (deep <= 0) return array;
    return array.reduce((preval, curval) => {
        return preval.concat(Array.isArray(curval) ? flatten(curval, deep - 1) : curval)
    }, [])
}
​
const flatArray = flatten(myArray, Infinity)
console.log(flatArray);
```

数组的扁平化，其实有很多种实现方法，不使用任何API也比较好实现，利用递归的实现，层层遍历既可：

```
const flatArray = []
const flatten = (array) => {
    for (let i in array) {
        if (Array.isArray(array[i])) { //每一项是否为数组
            flatten(array[i]) //继续遍历
        } else {
            flatArray.push(array[i])
        }
    }
    return flatArray
}
const res = flatten(myArray)
console.log(res);
```

其实，数组的扁平化实现方法颇多，如使用正则表达式方法，接下来，看看对象的扁平化。

## 二、对象的扁平化

什么是对象的扁平化？比如现在有这样一个对象：

```
const myObj = {
    a: 1,
    b: [1, 2, {c: true},[3]],
    d: {e: 2,f: 3},
    g: null,
    like: [6, 8, 9]
}
```

你可以理解数组的元素会是数组，对象的值也可以是对象或者数组，但是这个对象扁平化会是怎么样呢？对象的扁平化同样是需要递归遍历的，对象的扁平化是将对象的值中是对象的的键值对进行扁平化处理，即如果值为对象，就进行递归遍历。如上对象扁平化后的结果为：

```
const flatObj={
    a:1,
    b[0]:1,
    b[1]:2,
    b[3].c:true,
    b[4][0]:3,
    d.e:2,
    d.f:3,
    g:null,
    like[0]:6,
    like[1]:8,
    like[2]:9
}
```

### （1）手写对象扁平化

核心思想：一旦遍历到值为对象的键值对，则立即遍历这个对象（递归遍历），并且保存键名，以便接下来维护一个新的键名。这里借助一个外部变量`flag`来定义最初始时的键名，以便于将维护好的键值一一对应。

```
function flatten(myObj) {
    const flatObj = {}
    let flag = null
​
    function formatKey(obj, keyName) {
        for (let key in obj) {
            if (typeof obj[key] === 'object' && obj[key] !== null) { //值为对象
                if (!keyName) {
                    formatKey(obj[key], key)
                } else {
                    if (Array.isArray(obj)) {
                        formatKey(obj[key], `${keyName}[${key}]`)
                    } else {
                        formatKey(obj[key], `${keyName}.${key}`)
                    }
                }
            } else { //值不为对象或者值为null
                if (!keyName) {
                    flatObj[key] = obj[key]
                } else {
                    if (Array.isArray(obj)) {
                        flatObj[`${keyName}[${key}]`] = obj[key]
                    } else {
                        flatObj[`${keyName}.${key}`] = obj[key]
                    }
                }
            }
        }
    }
​
    formatKey(myObj, flag)
    return flatObj
}
flatten(myObj)
```
还有更多实现数组的扁平化和对象的扁平化，敬请补充~。