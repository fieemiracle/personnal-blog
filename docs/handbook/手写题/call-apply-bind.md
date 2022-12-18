---
title: 码上【call，apply，bind】的手写
date: 2022-12-02
tags:
 - 手写题
categories: 
 - 手写题
---

---
highlight: a11y-dark
theme: healer-readable
---

***本文正在参加[「金石计划 . 瓜分6万现金大奖」](https://juejin.cn/post/7162096952883019783 "https://juejin.cn/post/7162096952883019783")***
## 一、call

### （1）官方用法

**`call()`** 方法使用一个指定的 `this` 值和单独给出的一个或多个参数来调用一个函数。

语法：function.call(要绑定的this值，参数，参数，...)。不一定这些参数都需要，这些参数都是可选的，返回值：使用调用者提供的 `this` 值和参数调用该函数的返回值。若该方法没有返回值，则返回 `undefined`。

```
// 不指定参数
var nickname = 'global'
​
function getName() {
    console.log(this.nickname);
}
getName() //global
getName.call() //global
```

在严格模式下，`this` 的值将会是 `undefined`。当不给`call`指定参数时，相当于将不改变`this`的指向，在哪调用的就指向哪儿，即没有传递第一个参数，`this`的值将会被绑定为全局对象。

```
// 指定第一个参数
var name = 'cat'
var obj = {
    name: 'dog'
}
​
function getName() {
    console.log(this.name);
}
getName() //cat
getName.call(obj) //dog
console.log(obj)//{ name: 'dog'}
```

当指定第一个参数时，第一个参数代表新的`this`值，当调用方法时，该方法的`this`值会绑定到`obj`对象，于是会访问这个对象的`name`属性。

```
//指定第一个参数和其他参数
var obj = {
    user: 'Ducky',
    fn: function(a, b) {
        console.log(a + b);
        console.log(this.user);
    }
}
var b = obj.fn;
b.call(obj, 1, 2);
// 3
// Ducky
```

除了第一个参数，其余参数都是用来做一些必要的运算等。运行到这，应该不难发现，使用`Function.call()`的时候，函数是谁执行的？是使用`call`绑定对象的之后，`call`也把函数执行了。

相信你已经会用了，试着写写实现原理。

### （2）实现原理

实现`call`的关键在于：

第一：如何给函数绑定新的`this`？

第二：如何在绑定完`this`后把函数也给执行完毕？

掌握了这两个关键，那么一切都有迹可循了。接下来看看换成自己手写的是不是一样的效果：

```
Function.prototype.my_call = function(context) {
    // 如何实现绑定新的this
    context.fn = this //context['fn']=this
    // 如何在调用call时把调用call的函数也执行
    context.fn()
}
```

是不是大吃一惊？就实现了？是的，就是实现了，核心原理就是这两个关键，不信可以测试一下：

```
var name = 'cat'
var obj = {
    name: 'dog'
}
​
function getName() {
    console.log(this.name);
}
getName() //cat
getName.my_call(obj) //dog
console.log(obj)//{ name: 'dog', fn: [Function: getName] }
```

真的绑定成功了！接下来继续做点优化，优化也有几个关键点：

第一：非得是函数才可以调用`call`；

第二：`call`除了接收第一个参数（新的`this`）外，还可以接收一个参数列表；

第三：官方`call`调用后，不会改变新的`this`（`obj`）的结构，在上述代码中`obj`内部新增了一个属性`fn`；

第四：当`call`不传第一个参数时，需指向全局对象（`window`）；

第五：调用`call`时，需得有返回值；

第六：当将`this`挂载到新的`this`上时，后者已经存在该属性的情况下，还是会改变后者的结构。

终极实现原理：

```
Function.prototype.my_call = function(context, ...args) {
    if (typeof this !== 'function') throw new TypeError('error')
    context = context || 'window'
    let fn = Symbol('fn')
    context[fn] = this //context.fn = this 
    const res = context[fn](...args)
    delete context[fn]
    return res
}
```

虽然考虑了六种情况，但是代码还是很可人，这回，它就是与官方的源码一样的效果和功能了，简直不要太完美~

## 二、apply

### （1）官方用法

`apply()` 方法调用一个具有给定 `this` 值的函数，以及以一个数组（或一个类数组对象）的形式提供的参数。

语法：function.apply(要绑定的`this`的值，[参数，参数，参数，...])，返回值：调用有指定 **`this`** 值和参数的函数的结果。

可见，它跟`call`就只有一个区别：提供参数的方式不同。`apply` 使用参数数组而不是一组参数列表。`apply` 可以使用数组字面量（array literal），如 `fun.apply(this, ['dog', 'cat'])`，或数组对象，如 `fun.apply(this, new Array('dog', 'cat'))`，还可以使用 `arguments` 对象作为 `argsArray` 参数。`arguments` 是一个函数的局部变量。它可以被用作被调用对象的所有未指定的参数。这样，在使用 `apply` 函数的时候就不需要知道被调用对象的所有参数及其个数。可以直接使用 arguments 来把所有的参数传递给被调用对象。被调用对象接下来就负责处理这些参数，要解构，要切割，要指定索引都可以。

既然`apply`的用法和`call`几乎相同，只是除第一个参数外，其余参数传递方式不一样，那么我们直接在`my_call`的手写上修改传递参数的形式即可。

### （2）实现原理

```
Function.prototype.my_apply = function(context, args) {
    if (typeof this !== 'function') throw new TypeError('error')
    context = context || 'window'
    let fn = Symbol('fn')
    context[fn] = this //context.fn = this 
    const res = context[fn](...args)
    delete context[fn]
    return res
}
```

这。。。。，还是测试一下吧：

```
var obj = {
    user: 'Ducky',
    fn: function(a, b) {
        console.log(a + b);
        console.log(this.user);
    }
}
var b = obj.fn;
b.my_apply(obj, [1, 2]);
// 3
// Ducky
```

好了，成功了，该考虑的已经在手写`call`的时候考虑过了，就是这么的干净利落。

## 三、bind

### （1）官方用法

**`bind()`** 方法创建一个新的函数，在 `bind()` 被调用时，这个新函数的 `this` 被指定为 `bind()` 的第一个参数，而其余参数将作为新函数的参数，提供调用时使用。

语法：function.bind(要绑定的`this`值，参数1，参数2，参数3)。

这里说明，第一个参数是如果为空，或者为`null||undefined`，执行作用域的`this`将被视为形函数的的`this`值，其余参数（当目标函数被调用时，被预置入绑定函数的参数列表中的参数）可有可无，也可在返回的新函数里面传递。返回值是返回一个原函数的拷贝，并拥有指定的 **`this`** 值和初始参数。

举个例子：

```
var name = 'cat'
var obj = {
    name: 'dog',
    fn: foo
}
function foo(a, b) {
    console.log(this.name, a + b);
    return a + b
}
const bar = foo.bind(obj)
bar(3, 4)
//dog 7
```

### （2）实现原理

从上述例子可以看出，`bind()`会创建一个新的绑定函数`bar`。

实现`bind`函数的关键在于：

第一：如何新建一个绑定函数；

第二：如何将拿到在`call（）`传递的参数和调用新建的绑定函数传递的参数并结合

第三：如果使用`new`操作符操作新建的那个绑定函数，`this`又该如何指向

先讨论以下前两个关键，新建一个绑定函数直接在`call`内部返回一个函数即可，将两个地方的传递的参数都传递给执行绑定函数。

```
Function.prototype.my_bind = function(context, ...args1) {
    // 保存外部函数的this
    const _this = this
    return function bound(...args2) {//返回一个新函数
        //返回值
        return _this.call(context, ...args1, ...args2)
    }
}
```

不要惊讶在实现`bind`函数内部用的是`call||apply`，大不了用刚刚手写的`my_call||my_apply`。大体上就实现了，测试一下：

```
var name = 'cat'
var obj = {
    name: 'dog',
    fn: foo
}
​
function foo(a, b) {
    console.log(this.name, a + b);
    return a + b
}
const bar = foo.my_bind(obj)
bar(3, 4)
//dog 7
```

再来考虑第三个问题：

```
//官方bind
const bar = foo.bind(obj)
new bar(3, 4)//cat 7
​
//手写的my_bing
const bar = foo.my_bind(obj)
new bar(3, 4) //dog 7
```

从上可以看出，当使用`new`操作符操作新的函数`bar`时，官方的`bind`会忽略绑定的`this`值，但是前置参数依然会提供给铭记函数，而我们手写的`my_bind`原封不动，这肯定得改！

现在无非是，当使用`new`运算符构造新建的绑定函数`bar`时，`foo.bind(obj)`中，`foo`的·`this`指向不指向`obj`，也不指向全局对象，而是会指向实例对象`new bar()`的执行作用域，接下来可以理一下思路：

```
//目标：(new bar)._proto_==foo.prototype
//即如果新建的绑定函数被new，bind的调用函数就会变成实力对象的构造函数
​
//接下来的操作都是在my_bind函数内部操作
//借助一个辅助函数
const help=function(){}
bound.prototype=new help()//继承到了foo（bind的调用函数）的原型
if(this.prototype){//this指的是bind的调用函数
   help.prototype=this.prototype
 }
​
```

通过一通操作，得到`new help()._proto_==help.prototype=this.prototype==bound.prototype`，`this`是什么，取决于调用`bind`函数的函数是什么，在这里是`foo`，所以`new bound()._proto_==bound.prototype=foo.prototype`，那么，调用`bind`函数的`this`到底指向什么取决于，新建的绑定函数`bar`有没有被`new`，如果没有，则看传递的第一个参数，第一个参数为空则为全局对象，不为空则为指定的对象；如果被`new`了，那么调用`nind`函数的`this`指向新建的绑定函数的执行作用域，`bind`最终实现方式是：

```
Function.prototype.my_bind = function(context, ...args1) {
    if (typeof this !== 'function') {
        throw new TypeError('error')
    }
    context = context || window
    const _this = this
    const help = function() {}
    if (this.prototype) {
        help.prototype = this.prototype
    }
    const bound = function(...args2) {
        return _this.call(
            this instanceof help ? this : context,...args1,...args2)
    }
    bound.prototype = new help()
    return bound
}
```
