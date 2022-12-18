(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{434:function(n,s,a){"use strict";a.r(s);var e=a(1),t=Object(e.a)({},(function(){var n=this,s=n._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[s("p",[n._v("本文已参与「新人创作礼」活动，一起开启掘金创作之路。")]),n._v(" "),s("p",[n._v("酸奶喝对，事半功倍！对于一些晦涩难懂，近乎神话的专业名词，切莫抓耳挠腮，我们直接上代码，加上通俗易懂地语言去渲染，且看今天我们如何拿捏javascript中的小山丘--作用域&作用域链，不止精解。")]),n._v(" "),s("h2",{attrs:{id:"前言"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#前言"}},[n._v("#")]),n._v(" 前言")]),n._v(" "),s("p",[n._v("我们需要先知道的是引擎，引擎的工作简单粗暴，就是负责javascript从头到尾代码的执行。引擎的一个好朋友是编译器，主要负责代码的分析和编译等；引擎的另一个好朋友就是今天的主角--作用域。那么作用域用来干什么呢？作用域链跟作用域又有什么关系呢？")]),n._v(" "),s("h2",{attrs:{id:"一、作用域-scope"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#一、作用域-scope"}},[n._v("#")]),n._v(" 一、作用域(scope)")]),n._v(" "),s("p",[n._v("作用域的定义：作用域是在运行时代码中的某些特定部分中变量，函数和对象的可访问性。")]),n._v(" "),s("h3",{attrs:{id:"_1、作用域的分类"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1、作用域的分类"}},[n._v("#")]),n._v(" 1、作用域的分类")]),n._v(" "),s("p",[n._v("(1)全局作用域")]),n._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[n._v('var name="global";\nfunction foo(){\n    console.log(name);\n}\nfoo();//global\n')])]),n._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[n._v("1")]),s("br"),s("span",{staticClass:"line-number"},[n._v("2")]),s("br"),s("span",{staticClass:"line-number"},[n._v("3")]),s("br"),s("span",{staticClass:"line-number"},[n._v("4")]),s("br"),s("span",{staticClass:"line-number"},[n._v("5")]),s("br")])]),s("p",[n._v("这里函数foo()内部并没有声明name变量，但是依然打印了name的值，说明函数内部可以访问到全局作用域，读取name变量。再来一个例子：")]),n._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[n._v("hobby='music';\nfunction foo(){\n    hobby='book';\n    console.log(hobby);\n}\nfoo();//book\n")])]),n._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[n._v("1")]),s("br"),s("span",{staticClass:"line-number"},[n._v("2")]),s("br"),s("span",{staticClass:"line-number"},[n._v("3")]),s("br"),s("span",{staticClass:"line-number"},[n._v("4")]),s("br"),s("span",{staticClass:"line-number"},[n._v("5")]),s("br"),s("span",{staticClass:"line-number"},[n._v("6")]),s("br")])]),s("p",[n._v("这里全局作用域和函数foo()内部都没有声明hobby这个变量，为什么不会报错呢？这是因为"),s("code",[n._v("hobby='music';")]),n._v("写在了全局作用域，就算没有var,let,const的声明，也会被挂在window对象上，所以函数foo()不仅可以读取，还可以修改值。也就是说"),s("code",[n._v("hobby='music';")]),n._v("等价于"),s("code",[n._v("window.hobby='music';")]),n._v("。")]),n._v(" "),s("p",[n._v("(2)函数体作用域\n函数体的作用域是通过隐藏内部实现的。换句话说，就是我们常说的，内层作用域可以访问外层作用域，但是外层作用域不能访问内层。原因，说到作用域链的时候就迎刃而解了。")]),n._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[n._v("function foo(){\n    var age=19;\n    console.log(age);\n}\nconsole.log(age);//ReferenceError:age is not defined\n")])]),n._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[n._v("1")]),s("br"),s("span",{staticClass:"line-number"},[n._v("2")]),s("br"),s("span",{staticClass:"line-number"},[n._v("3")]),s("br"),s("span",{staticClass:"line-number"},[n._v("4")]),s("br"),s("span",{staticClass:"line-number"},[n._v("5")]),s("br")])]),s("p",[n._v("很明显，全局作用域下并没有age变量，但是函数foo()内部有，但是外部访问不到，自然而然就会报错了，而函数foo()没有调用，也就不会执行。")]),n._v(" "),s("p",[n._v("(3)块级作用域\n块级作用域更是见怪不怪，像我们接触的let作用域，代码块{}，for循环用let时的作用域，if,while,switch等等。然而，更深刻理解块级作用域的前提是，我们需要先认识认识这几个名词：")]),n._v(" "),s("p",[n._v("--标识符：能在作用域生效的变量。函数的参数，变量，函数名。需要格外注意的是："),s("code",[n._v("函数体内部的标识符外部访问不到")]),n._v("。")]),n._v(" "),s("p",[n._v("--函数声明：function 函数名(){}")]),n._v(" "),s("p",[n._v("--函数表达式： var 函数名=function(){}")]),n._v(" "),s("p",[n._v("--自执行函数： (function 函数名(){})()；"),s("code",[n._v("自执行函数前面的语句必须有分号")]),n._v("，通常用于隐藏作用域。")]),n._v(" "),s("p",[n._v("接下来我们就用一个例子，一口气展示完吧")]),n._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[n._v("function foo(sex){\n    console.log(sex);\n}\nvar f=function(){\n    console.log('hello');\n}\nvar height=180;\n(\n    function fn(){\n        console.log(height);\n    }\n)();\nfoo('female');\n//依次打印：\n//180\n//female\n")])]),n._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[n._v("1")]),s("br"),s("span",{staticClass:"line-number"},[n._v("2")]),s("br"),s("span",{staticClass:"line-number"},[n._v("3")]),s("br"),s("span",{staticClass:"line-number"},[n._v("4")]),s("br"),s("span",{staticClass:"line-number"},[n._v("5")]),s("br"),s("span",{staticClass:"line-number"},[n._v("6")]),s("br"),s("span",{staticClass:"line-number"},[n._v("7")]),s("br"),s("span",{staticClass:"line-number"},[n._v("8")]),s("br"),s("span",{staticClass:"line-number"},[n._v("9")]),s("br"),s("span",{staticClass:"line-number"},[n._v("10")]),s("br"),s("span",{staticClass:"line-number"},[n._v("11")]),s("br"),s("span",{staticClass:"line-number"},[n._v("12")]),s("br"),s("span",{staticClass:"line-number"},[n._v("13")]),s("br"),s("span",{staticClass:"line-number"},[n._v("14")]),s("br"),s("span",{staticClass:"line-number"},[n._v("15")]),s("br"),s("span",{staticClass:"line-number"},[n._v("16")]),s("br")])]),s("p",[n._v("分析一下：标识符:foo,sex,height,fn;函数声明：function foo(sex){};函数表达式：var f=function(){};自执行函数：(function fn(){})();需要注意，自执行函数fn()前面的"),s("code",[n._v("var height=180;")]),n._v("语句，"),s("code",[n._v("分号不能抛弃")]),n._v("。否则，你可以试一下。")]),n._v(" "),s("h2",{attrs:{id:"二、预编译"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#二、预编译"}},[n._v("#")]),n._v(" 二、预编译")]),n._v(" "),s("p",[n._v("说好只是作用域和作用域链的，但是考虑到理解作用域链的必要性，这里还是先聊聊预编译吧。先讨论预编译在不同环境发生的情况下，是如何进行预编译的。")]),n._v(" "),s("h3",{attrs:{id:"_1-发生在代码执行之前"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-发生在代码执行之前"}},[n._v("#")]),n._v(" 1. 发生在代码执行之前")]),n._v(" "),s("p",[n._v("（1）声明提升")]),n._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[n._v("console.log(b);\nvar b=123;//undefined\n")])]),n._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[n._v("1")]),s("br"),s("span",{staticClass:"line-number"},[n._v("2")]),s("br")])]),s("p",[n._v("这里打印undefined,这不是报错，与Refference:b is not defined不同。这是代码执行之前，预编译的结果，等同于以下代码：")]),n._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[n._v("var b;//声明提升\nconsole.log(b);//undefined\nb=123;\n")])]),n._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[n._v("1")]),s("br"),s("span",{staticClass:"line-number"},[n._v("2")]),s("br"),s("span",{staticClass:"line-number"},[n._v("3")]),s("br")])]),s("p",[n._v("（2）函数声明整体提升")]),n._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[n._v("test();//hello123  调用函数前并没有声明，但是任然打印，是因为函数声明整体提升了\nfunction test(){\n    var a=123;\n    console.log('hello'+a);\n}\n")])]),n._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[n._v("1")]),s("br"),s("span",{staticClass:"line-number"},[n._v("2")]),s("br"),s("span",{staticClass:"line-number"},[n._v("3")]),s("br"),s("span",{staticClass:"line-number"},[n._v("4")]),s("br"),s("span",{staticClass:"line-number"},[n._v("5")]),s("br")])]),s("h3",{attrs:{id:"_2-发生在函数执行之前"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-发生在函数执行之前"}},[n._v("#")]),n._v(" 2.发生在函数执行之前")]),n._v(" "),s("p",[n._v("理解这个只需要掌握"),s("code",[n._v("四部曲")]),n._v("：")]),n._v(" "),s("p",[n._v("（1）创建一个AO（Activation Object）")]),n._v(" "),s("p",[n._v("（2）找形参和变量声明，然后将形参和变量声明作为AO的属性名，属性值为undefined")]),n._v(" "),s("p",[n._v("（3）将实参和形参统一")]),n._v(" "),s("p",[n._v("（4）在函数体内找函数声明，将函数名作为AO对象的属性名，属性值予函数体\n那么接下来就放大招了：")]),n._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[n._v("var global='window';\nfunction foo(name,sex){\n    console.log(name);\n    function name(){};\n    console.log(name);\n    var nums=123;\n    function nums(){};\n    console.log(nums);\n    var fn=function(){};\n    console.log(fn);\n}\nfoo('html');\n")])]),n._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[n._v("1")]),s("br"),s("span",{staticClass:"line-number"},[n._v("2")]),s("br"),s("span",{staticClass:"line-number"},[n._v("3")]),s("br"),s("span",{staticClass:"line-number"},[n._v("4")]),s("br"),s("span",{staticClass:"line-number"},[n._v("5")]),s("br"),s("span",{staticClass:"line-number"},[n._v("6")]),s("br"),s("span",{staticClass:"line-number"},[n._v("7")]),s("br"),s("span",{staticClass:"line-number"},[n._v("8")]),s("br"),s("span",{staticClass:"line-number"},[n._v("9")]),s("br"),s("span",{staticClass:"line-number"},[n._v("10")]),s("br"),s("span",{staticClass:"line-number"},[n._v("11")]),s("br"),s("span",{staticClass:"line-number"},[n._v("12")]),s("br")])]),s("p",[n._v("这里的结果是什么呢？分析如下：")]),n._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[n._v("//从上到下\n//1、创建一个AO（Activation Object）\nAO:{\n    //2、找形参和变量声明，然后将形参和变量声明作为AO的属性名，属性值为undefined\n    name:undefined,\n    sex:undefined,\n    nums=undefined,\n    fn:undefined,\n    //3、将实参和形参统一\n    name:html,\n    sex:undefined,\n    nums=123,\n    fn:function(){},\n    //4、在函数体内找函数声明，将函数名作为AO对象的属性名，属性值予函数体\n    name:function(){},\n    sex:undefined,\n    fn:function(){},\n    nums:123//这里不仅存在nums变量声明，也存在nums函数声明，但是取前者的值\n    \n    以上步骤得到的值，会按照后面步骤得到的值覆盖前面步骤得到的值\n}\n//依次打印\n//[Function: name]\n//[Function: name]\n//123\n//[Function: fn]\n")])]),n._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[n._v("1")]),s("br"),s("span",{staticClass:"line-number"},[n._v("2")]),s("br"),s("span",{staticClass:"line-number"},[n._v("3")]),s("br"),s("span",{staticClass:"line-number"},[n._v("4")]),s("br"),s("span",{staticClass:"line-number"},[n._v("5")]),s("br"),s("span",{staticClass:"line-number"},[n._v("6")]),s("br"),s("span",{staticClass:"line-number"},[n._v("7")]),s("br"),s("span",{staticClass:"line-number"},[n._v("8")]),s("br"),s("span",{staticClass:"line-number"},[n._v("9")]),s("br"),s("span",{staticClass:"line-number"},[n._v("10")]),s("br"),s("span",{staticClass:"line-number"},[n._v("11")]),s("br"),s("span",{staticClass:"line-number"},[n._v("12")]),s("br"),s("span",{staticClass:"line-number"},[n._v("13")]),s("br"),s("span",{staticClass:"line-number"},[n._v("14")]),s("br"),s("span",{staticClass:"line-number"},[n._v("15")]),s("br"),s("span",{staticClass:"line-number"},[n._v("16")]),s("br"),s("span",{staticClass:"line-number"},[n._v("17")]),s("br"),s("span",{staticClass:"line-number"},[n._v("18")]),s("br"),s("span",{staticClass:"line-number"},[n._v("19")]),s("br"),s("span",{staticClass:"line-number"},[n._v("20")]),s("br"),s("span",{staticClass:"line-number"},[n._v("21")]),s("br"),s("span",{staticClass:"line-number"},[n._v("22")]),s("br"),s("span",{staticClass:"line-number"},[n._v("23")]),s("br"),s("span",{staticClass:"line-number"},[n._v("24")]),s("br"),s("span",{staticClass:"line-number"},[n._v("25")]),s("br"),s("span",{staticClass:"line-number"},[n._v("26")]),s("br")])]),s("h3",{attrs:{id:"_3-发生在全局-内层作用域可以访问外层作用域"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-发生在全局-内层作用域可以访问外层作用域"}},[n._v("#")]),n._v(" 3.发生在全局（内层作用域可以访问外层作用域）")]),n._v(" "),s("p",[n._v("同发生在函数执行前一样，发生在全局的预编译也有自己的"),s("code",[n._v("三部曲")]),n._v(":")]),n._v(" "),s("p",[n._v("(1)创建GO（Global Object）对象")]),n._v(" "),s("p",[n._v("(2)找全局变量声明，将变量声明作为GO的属性名，属性值为undefined")]),n._v(" "),s("p",[n._v("(3)在全局找函数声明，将函数名作为GO对象的属性名，属性值赋予函数体\n举个栗子：")]),n._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[n._v("var global='window';\nfunction foo(a){\n    console.log(a);\n    console.log(global);\n    var b;\n}\nvar fn=function(){};\nconsole.log(fn);\nfoo(123);\nconsole.log(b);\n")])]),n._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[n._v("1")]),s("br"),s("span",{staticClass:"line-number"},[n._v("2")]),s("br"),s("span",{staticClass:"line-number"},[n._v("3")]),s("br"),s("span",{staticClass:"line-number"},[n._v("4")]),s("br"),s("span",{staticClass:"line-number"},[n._v("5")]),s("br"),s("span",{staticClass:"line-number"},[n._v("6")]),s("br"),s("span",{staticClass:"line-number"},[n._v("7")]),s("br"),s("span",{staticClass:"line-number"},[n._v("8")]),s("br"),s("span",{staticClass:"line-number"},[n._v("9")]),s("br"),s("span",{staticClass:"line-number"},[n._v("10")]),s("br")])]),s("p",[n._v("这个例子比较简单，一样的步骤和思路，就不在赘述分析了，相信你已经会了。打印结果依次是：")]),n._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[n._v("[Function: fn]\n123\nwindow\nReferenceError: b is not defined\n")])]),n._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[n._v("1")]),s("br"),s("span",{staticClass:"line-number"},[n._v("2")]),s("br"),s("span",{staticClass:"line-number"},[n._v("3")]),s("br"),s("span",{staticClass:"line-number"},[n._v("4")]),s("br")])]),s("p",[n._v("好啦，进入正轨，我们接着说作用域链。")]),n._v(" "),s("h2",{attrs:{id:"三、作用域链"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#三、作用域链"}},[n._v("#")]),n._v(" 三、作用域链")]),n._v(" "),s("p",[n._v("作用域链就可以帮我们找到，为什么内层可以访问到外层，而外层访问不到内层？但是同样的，在认识作用域链之前，我们需要见识见识一些更加晦涩抽象的名词。")]),n._v(" "),s("ol",[s("li",[s("code",[n._v("执行期上下文")]),n._v("：当函数执行的时候，会创建一个称为执行期上下文的对象（AO对象），一个执行期上下文定义了一个函数执行时的环境。 函数每次执行时，对应的执行上下文都是独一无二的，所以多次调用一个函数会导致创建多个执行期上下文，当函数执行完毕，它所产生的执行期上下文会被销毁。")]),n._v(" "),s("li",[s("code",[n._v("查找变量")]),n._v("：从作用域链的顶端依次往下查找。\n3."),s("code",[n._v("[[scope]]")]),n._v("：作用域属性，也称为隐式属性,仅支持引擎自己访问。函数作用域，是不可访问的，其中存储了运行期上下文的结合。")])]),n._v(" "),s("p",[n._v("我们先看一眼函数的自带属性：")]),n._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[n._v("function test(){//函数被创建的那一刻，就携带name,prototype属性\n      console.log(123);\n}\nconsole.log(test.name);//test\nconsole.log(test.prototype);//{} 原型\n// console.log(test[[scope]]);访问不到,作用域属性，也称为隐式属性\n\n// test() ---\x3eAO:{}执行完毕会回收\n// test() ---\x3eAO:{}执行完毕会回收\n")])]),n._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[n._v("1")]),s("br"),s("span",{staticClass:"line-number"},[n._v("2")]),s("br"),s("span",{staticClass:"line-number"},[n._v("3")]),s("br"),s("span",{staticClass:"line-number"},[n._v("4")]),s("br"),s("span",{staticClass:"line-number"},[n._v("5")]),s("br"),s("span",{staticClass:"line-number"},[n._v("6")]),s("br"),s("span",{staticClass:"line-number"},[n._v("7")]),s("br"),s("span",{staticClass:"line-number"},[n._v("8")]),s("br"),s("span",{staticClass:"line-number"},[n._v("9")]),s("br")])]),s("p",[n._v("接下来看看作用域链怎么实现的：")]),n._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[n._v("var global='window';\nfunction foo(){\n    function fn(){\n        var fn=222;\n    }\n    var foo=111;\n    console.log(foo);\n}\nfoo();\n")])]),n._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[n._v("1")]),s("br"),s("span",{staticClass:"line-number"},[n._v("2")]),s("br"),s("span",{staticClass:"line-number"},[n._v("3")]),s("br"),s("span",{staticClass:"line-number"},[n._v("4")]),s("br"),s("span",{staticClass:"line-number"},[n._v("5")]),s("br"),s("span",{staticClass:"line-number"},[n._v("6")]),s("br"),s("span",{staticClass:"line-number"},[n._v("7")]),s("br"),s("span",{staticClass:"line-number"},[n._v("8")]),s("br"),s("span",{staticClass:"line-number"},[n._v("9")]),s("br")])]),s("p",[n._v("分析：")]),n._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[n._v("GO:{\n    foo:function(){}\n}\nfooAO:{\n    foo:111,\n    fn:function(){}\n}\nfnAO:{\n    fn:222\n}\n// foo定义时 foo.[[scope]]----\x3e0:GO{}\n// foo执行时 foo.[[scope]]----\x3e0:AO{}  1:GO{}  后访问的在前面\n//fn定义时 fn.[[scope]]----\x3e0:fnAO{} 1:fooAO{}  2:GO{}\nfnAO:fn的AO对象；fooAO:foo的AO对象\n")])]),n._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[n._v("1")]),s("br"),s("span",{staticClass:"line-number"},[n._v("2")]),s("br"),s("span",{staticClass:"line-number"},[n._v("3")]),s("br"),s("span",{staticClass:"line-number"},[n._v("4")]),s("br"),s("span",{staticClass:"line-number"},[n._v("5")]),s("br"),s("span",{staticClass:"line-number"},[n._v("6")]),s("br"),s("span",{staticClass:"line-number"},[n._v("7")]),s("br"),s("span",{staticClass:"line-number"},[n._v("8")]),s("br"),s("span",{staticClass:"line-number"},[n._v("9")]),s("br"),s("span",{staticClass:"line-number"},[n._v("10")]),s("br"),s("span",{staticClass:"line-number"},[n._v("11")]),s("br"),s("span",{staticClass:"line-number"},[n._v("12")]),s("br"),s("span",{staticClass:"line-number"},[n._v("13")]),s("br"),s("span",{staticClass:"line-number"},[n._v("14")]),s("br")])]),s("p",[s("img",{attrs:{src:"https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d7e38c2e45c74f099a76400b48ce6b01~tplv-k3u1fbpfcp-watermark.image?",alt:"image.png"}})]),n._v(" "),s("p",[n._v("综上而言："),s("code",[n._v("作用域链就是[[scope]]中所存储的执行期上下文对象的集合，这个集合呈链式链接，我们把这种链式链接叫做作用域链。")])])])}),[],!1,null,null,null);s.default=t.exports}}]);