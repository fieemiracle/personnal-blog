---
title: 这个冬天，一起认识Generator函数
date: 2022-12-01
tags:
 - Generator
categories: 
 - ES6
isShowComments: true  
subSidebar: auto
---

---
theme: fancy
highlight: a11y-dark
---

***本文正在参加[「金石计划 . 瓜分6万现金大奖」](https://juejin.cn/post/7162096952883019783 "https://juejin.cn/post/7162096952883019783")***

我们曾几何时在 [  消灭异步回调，还得是async-await  ](https://juejin.cn/post/7122478595787718663#heading-10)一文中提及到Generator函数，来看看为什么说Async-Await也是Generator函数的语法糖吧。

## 一、什么是Generator函数？

Generator 函数也是 ES6 提供的一种解决异步编程方案，虽然Generator 函数是一个普通的函数，但是它的语法行为与传统函数完全不同！

### 1、基本语法

```
// 基本语法
function* generator() {
    yield 'hello'
    yield 'world'
    return "thanks"
}
const gen = generator()
console.log(gen);
console.log(gen.next());  //next1
console.log(gen.next()); //next2
console.log(gen.next()); //next3
console.log(gen.next()); //next4
```

你以为这样打印看得到结果就是完了？No！接下来，一步一步分析：

#### （1）状态

```
//当只是打印Generator实例时
console.log(gen); //Object [Generator] {}
```

在浏览器显示会更加详细：


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c496ac9899024bdc845e9ab33a0fea4e~tplv-k3u1fbpfcp-watermark.image?)

结果显示，`[[GeneratorState]]:suspended`，即Generator的初始状态是暂停的。什么情况下会改变转改呢？当执行next()时，会发生什么？

```
console.log(gen.next());  //1
console.log(gen.next()); //2
```

当继续`只执行next1`或者`执行next1和next2`时，Generator实例的状态依旧是`[[GeneratorState]]: "suspended"`，并且，打印的结果分别是：`{ value: 'hello', done: false }`，`{ value: 'world', done: false }`，字段`done`的值都是`false`，如图所示：



![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5ae01b56735f4d97aacb27e0f688fd4c~tplv-k3u1fbpfcp-watermark.image?)
紧接着，继续执行`next3`，结果就不一样了：

```
console.log(gen.next()); //next3
```


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/22f7b738368d4990904473d05d92a9b4~tplv-k3u1fbpfcp-watermark.image?)

可以看到，Generator实例的状态变更了：`[[GeneratorState]]: "closed"`，代表`generator`函数执行完毕了，另外，`{ value: 'thanks', done: true }`，字段`done`的值都是`true`。执行完毕了还可以继续`next`嘛？看看就知道，继续执行`next4`：

```
console.log(gen.next()); //next4
```


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6c31418825d3432ea3c6d39362e86e46~tplv-k3u1fbpfcp-watermark.image?)

还是可以，Generator实例的状态依旧是关闭的，只不过，注意观察`next4`后的结果的`{ value: undefined, done: true }`。并且，在此之后，无论执行多少个`next`，结果都是`{ value: undefined, done: true }`。

#### （2）执行

Generator 函数`generator`函数的函数体内部有两个`yield`表达式`yield 'hello'和yield 'world'`和一个`return`语句，表示该函数有三个状态：`hello`、`world`和`return(结束执行)`

第一次调用，Generator 函数`generator`开始执行，遇到第一个`yield`则暂停执行，`next`返回一个对象：`{ value: 'hello', done: false }`，此时遍历还没有结束。

第二次调用，Generator 函数`generator`从上一次`yield`暂停执行处继续执行，直到遇到下一个`yield`则暂停执行，`next`返回一个对象：`{ value: 'world', done: false }`，此时遍历还没有结束。

第三次调用：Generator 函数`generator`从上一次`yield`暂停执行处继续执行，直到遇到`return语句`（如果没有return语句，就执行到函数结束）则执行完毕，`next`返回一个对象：`{ value: 'thanks', done: true }`，此时遍历已经结束。

第四次调用：Generator 函数`generator`函数已经执行完毕，`next`返回一个对象：`{ value: 'undefined', done: true }`，无论接下来执行N次`next`，结果一直会是这个，不会再改变。

#### （3）特征

从这个简单的例子示范，可以看出：

第一：Genenrator函数定义时，`function`关键字与函数名之间有一个`*`，一般的写法是紧挨着`function`关键字；

第二：Genenrator函数的函数体内部可以通过`yield表达式`标记暂停执行（定义不同的内部状态），即遇到`yield`表达式，就会暂停执行后面的所有操作，而紧跟在`yield`后面的值作为返回对象中`value`属性的值，其实例对象通过`next`恢复执行，只有调用`next`方法才会遍历下一个内部状态，已经调用`next`方法，那么下一个`next`调用时，会在上次暂停的地方继续执行，而不是从头开始执行。；

第三：Genenrator函数执行时，执行结果会返回一个`Object [Generator] {}`，即遍历器对象。

### 2、yield表达式&&next方法

相信你已经明白了`yield`和`next`的执行逻辑，但是也还有一些细节需要注意：

#### （1）函数内部没有`yield`和`return语句`

Genenrator函数内部没有`yield`和`return语句`时，需要使用`next`方法开启执行，不然函数不会执行，那么函数会直接执行函数内部的代码，该打印就打印，函数内部执行完毕后，`next`依然会返回一个对象：`{ value: undefined, done: true }`，此时，函数的状态也由`[[GeneratorState]]:suspended`变成了`[[GeneratorState]]:closed`。

综上所述，Generator 函数可以不用`yield`表达式，这时就变成了一个单纯的暂缓执行函数。

```
// 没有yield表达式
function* foo() {
    console.log('hello');
    console.log('world');
}
const f = foo()
console.log(f.next());
// hello
// world
// { value: undefined, done: true }
```

#### （2）函数内部没有`return语句`时

Genenrator函数内部没有`return语句时`，则返回的对象的`value`属性的值为`undefined`

```
function* generator() {
    yield 'hello'
}
const gen = generator()
console.log(gen.next()); //{ value: 'hello', done: false }
console.log(gen.next()); //{ value: undefined, done: true }
​
```

#### （3）`yield`表达式与`return`语句相比

`yield`表达式具备位置记忆的功能，Genenrator函数内部可以执行多个`yield`表达式，并返回一系列值。其实`yield`表达式与`return`语句很相似，都可以返回紧接在后面的值，但是最大的区别就是可以执行多次`yield`表达式，并且每次执行都会暂停执行，需要`next`方法的调用来回复执行，同时会从上次暂停的地方继续执行；而`return`只能执行一次，并且不具备位置记忆功能。

```
function common() {
    console.log('开始执行');
}
const foo = common() //开始执行
​
function* generator() {
    console.log('开始执行');
}
const gen = generator()
gen.next() //开始执行
```

#### （4）`yield`表达式的使用位置

`yield`表达式只能在Genenrator函数内部使用，在其他地方使用会报错。这一点与`await`必须与`async`配对使用有异曲同工之处。

```
// yield的使用位置
function testYield1() {
    yield 'hello'
}
const test = testYield1() 
​
//SyntaxError: Unexpected string   报错
```

另外，如果有需要将`yield`表达式用在另外一个表达式之中，则必须放在圆括号`()`里面，否则会报错。

```
function* testYield2() {
    //错误写法
    // console.log('Hello ' + yield); 
    // console.log('Hello ' + yield 'World'); 
    //SyntaxError: Unexpected identifier
    
    //正确写法
    console.log('Hello ' + (yield));
    console.log('Hello ' + (yield 'World'));
}
const gen = testYield2()
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
​
// { value: undefined, done: false }
// Hello undefined
// { value: 'World', done: false }
// Hello undefined
// { value: undefined, done: true }
```

### 3、中间件next()

在上面的例子中，都只是纯纯地调用`next()`方法，没有给它传递参数，是不能接收参数嘛？当然不是。`next()`也可以接收参数，因为`yield`本身没有返回值。`next`方法可以携带一个参数，这个参数就会被当做上一个`yield`表达式的返回值。

```
function* generator() {
    for (let i = 1; i < 3; i++) {
        let yieldVal = yield i;
        console.log('yieldVal=', yieldVal);
        if (yieldVal == 2) {
            i = 0
        }
    }
}
let gen = generator()
console.log('nextObj=', gen.next());
console.log('nextObj=', gen.next());
console.log('nextObj=', gen.next(2));
console.log('nextObj=', gen.next());
console.log('nextObj=', gen.next());
​
//打印结果：
// nextObj= { value: 1, done: false }
// yieldVal= undefined
// nextObj= { value: 2, done: false }
// yieldVal= 2
// nextObj= { value: 1, done: false }
// yieldVal= undefined
// nextObj= { value: 2, done: false }
// yieldVal= undefined
// nextObj= { value: undefined, done: true }
​
```

观察`yieldVal`每次打印的值可以发现，`yieldVal=undefined`总是等于`undefined`，即`yield`总是返回`` `当给 ``next`传递一个参数2的时候，`yieldVal=2`，所以符合`if`条件，`i=0`，那么下一次循环就会从`0`开始递增。所以说，`next`方法的参数会作为外部的值注入到函数体内部，并且被当做上一个`yield`表达式的返回值。

简单概括一下：`next`方法传入的参数会作为上一个`yield`表达式的返回值，然而，我们在第一次调用`next`并且传入参数时，是无效的，V8引擎会自动忽略第一使用`next`的参数，只会从第二次调用`next`时开始，传入的参数才是有效的。难道第一次调用`next`没有意义了？当然不是，第一次调用`next`方法是用来启动遍历器对象的，不需要带参数。

这时候就有一个疑问了，我就是要在第一次调用的时候给`next`传入参数，并且生效，怎么办？自然还是有解决办法的：

```
function outerFun(generatorFun) {//参数是一个Generator函数
    return function() {//return出去一个函数
        let gen = generatorFun()
        gen.next()
        return gen
    }
}
​
const outer = outerFun(function*() {
    console.log(`你第一次传入的参数是: ${yield}`)
    return 'World'
});
​
outer().next('Hello!')
//你第一次传入的参数是: Hello~
```

从上述例子中可以看出，Generator函数作为`outerFun`（普通函数）的形参，然后`return`出去一个执行函数（匿名函数），调用`outerFun`，并传入实参，因为闭包的存在，最后执行匿名函数。可见，Generator函数被函数`outerFun`包裹了一层，让第一次调用`next`方法时，传入的参数生效。

### 4、作为对象的属性

这里肯定让人很奇怪，好歹Generator函数也是函数，函数还可以作为对象的键？是什么限制了我的无知。。。。如果一个对象的属性的Generator函数，该怎么写呢？

```
let obj = {
    * generator() {
        console.log('Genrator函数');
        return 'hello'
    }
};
console.log(obj.generator);
//[GeneratorFunction: generator]
​
```

通过展示，发现定义`generator`时，前面多了个`*`，表示该属性是一个Generator函数，这种写法不便于记忆和理解，也可以写成下面的形式：

```
let obj = {
    generator: function*() {
        console.log('Genrator函数');
        return 'hello'
    }
}
console.log(obj.generator); //[GeneratorFunction: generator]
​
```

这种形式就是我们熟悉的写法了，函数名字作为对象的键，而函数本身作为对象的值。

### 5、this指向

`Generator函数的this`关键字，首先箭头函数是没有`this`的，那Generator函数里面有`this`吗？

```
function Person() {
    this.name = 'Person'
}
​
function* Student() {
    this.name = 'Student'
}
​
let person = new Person()
console.log(person); //Person { name: 'Person' }
console.log(person.name); //Person
let student = Student()
console.log(student); //Object [Generator] {}
student.next()
console.log(student.name); //undefined
​
```

从上述代码可以看出，Generator函数返回的总是遍历器对象，就算在Generator函数内部的`this`上挂上一个属性`name`，但是返回的遍历器对象就是拿不到这个属性。难道是Generator函数没有`this`?有没有，打印以下就知道了：

```
function* gen() {
    console.log(this);
}
let g = gen()
g.next()
```


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bfff9f90470441dc961f917e751e0c94~tplv-k3u1fbpfcp-watermark.image?)

有打印结果，说明是存在你`this`的，只不过，Generator函数返回的遍历器对象无法继承`this`。那怎么样才能访问`this`呢？遍历器对象不能访问，那正常的对象是不是就可以了呢？

```
function* gen() {
    this.name = 'cat'
}
let obj = {}
let g = gen.call(obj)
​
console.log(obj instanceof gen); //false
console.log(g instanceof gen); //true
​
console.log(obj); //{name:'cat'}
console.log(g); //Object [Generator] {}
​
g.next()
console.log(obj.name); //cat
console.log(g.name); //undefined
```

上述例子中，将Generator函数`gen`的`this`绑定到一个空对象上，即Generator函数`gen`的`this`指向这个空对象。这样的话，Generator函数`gen`执行后，就能访问Generator函数`gen`的`this`了。不过Generator函数的遍历器对象依旧不能够访问`this`。那就是要遍历器对象`g`访问`this`上的属性，怎么办？有一个办法是将Generator函数的原型替换这个空对象，Generator函数中`[[Prototype]]: Generator`，Generator函数的prototype是除掉yield以外的语句：


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a53ca68226eb42bd886874965b49db24~tplv-k3u1fbpfcp-watermark.image?)

### 6、与构造函数相比

与构造函数相比，Generator函数无法`new`。举个例子：

```
function Person() {}
Person.prototype.say = function() {
    console.log('good morning!');
}
let person = new Person()
console.log(person instanceof Person);
person.say()
​
​
function* Student() {}
Student.prototype.say = function() {
    console.log('good afternoon!');
}
​
let student = Student()
console.log(student instanceof Student);
student.say()
​
//测试能不能使用new操作符
let test = new Student()
console.log(test instanceof Student); 
//TypeError: Student is not a constructor
​
```

### 7、与Async-Await相比

为什么说Async-Await是Generator函数的语法糖？那就举个例子，首先定义一个工具函数`foo`，接收一个形参`num`：

```
function foo(num) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(num * 2)
        }, 1000)
    })
}
```

接下来同时分别使用Async-Await和Generator函数来实现：依次调用传递的参数，首先使用Generator函数实现展示：

```
function* gen() {
    foo(1)
    yield
    foo(2)
    yield
    foo(3)
    yield
}
let g=gen()
g.next()//2
g.next()//4
g.next()//6
```

然后看看Async-Await如何实现：

```
async function AsyncAwait() {
    await foo(1)
    await foo(2)
    await foo(3)
}
AsyncAwait()
//2 4 6
```

对比完发下，Async-Await简直不要太~优雅了。就好比声明Generator函数的`*`换成了`async`，`yield`表达式换成了`await`，但是Async-Await就让人更舒适。
