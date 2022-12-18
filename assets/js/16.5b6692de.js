(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{420:function(s,n,a){"use strict";a.r(n);var e=a(1),t=Object(e.a)({},(function(){var s=this,n=s._self._c;return n("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[n("p",[s._v("本文已参与「新人创作礼」活动，一起开启掘金创作之路。")]),s._v(" "),n("p",[s._v("叮~，你有一份javascript区别论待参与，请到场。")]),s._v(" "),n("p",[s._v("for...in来自ES5标准，遍历的是可遍历对象的key，数组和字符串的index，for...of来自ES6标准，遍历的是可遍历对象的value，数组和字符串的value。除此之外，对于二者，你真的了解嘛？今天，我们就来扒一扒，for...in和for...of如同胞般存在的区别。")]),s._v(" "),n("h2",{attrs:{id:"知识角落"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#知识角落"}},[s._v("#")]),s._v(" 知识角落")]),s._v(" "),n("ol",[n("li",[n("p",[s._v("iterable：可遍历的。一种数据结构只要有"),n("code",[s._v("Iterator接口")]),s._v("，那么这种数据结构就是可遍历的。")])]),s._v(" "),n("li",[n("p",[s._v("数据集合：javascript中表示“集合”的数据结构有：数组（Array）、对象（Object）、Map和Set。这四种可组合使用。")])]),s._v(" "),n("li",[n("p",[s._v("可迭代对象：即"),n("code",[s._v("原生具备iterator接口的对象")])])])]),s._v(" "),n("blockquote",[n("div",{staticClass:"language- extra-class"},[n("pre",[n("code",[s._v("-   Array\n-   Map\n-   Set\n-   String\n-   TypedArray\n-   函数的 arguments 对象\n-   NodeList 对象\n")])])])]),s._v(" "),n("ol",{attrs:{start:"4"}},[n("li",[n("p",[s._v("Symbol：ES6 引入的一种新的原始数据类型"),n("code",[s._v("Symbol")]),s._v("，表示"),n("code",[s._v("独一无二")]),s._v("的值。它属于 JavaScript 语言的数据类型之一，其他数据类型是："),n("code",[s._v("undefined")]),s._v("、"),n("code",[s._v("null")]),s._v("、布尔值（Boolean）、字符串（String）、数值（Number）、大整数（BigInt）、对象（Object）。Symbol作为属性名，遍历对象的时候，该属性不会出现在"),n("code",[s._v("for...in")]),s._v("、"),n("code",[s._v("for...of")]),s._v("循环中，也不会被"),n("code",[s._v("Object.keys()")]),s._v("、"),n("code",[s._v("Object.getOwnPropertyNames()")]),s._v("、"),n("code",[s._v("JSON.stringify()")]),s._v("返回。")])]),s._v(" "),n("li",[n("p",[s._v("可枚举属性：可枚举属性是指那些内部 “可枚举” 标志设置为 "),n("code",[s._v("true")]),s._v(" 的属性，对于通过直接的赋值和属性初始化的属性，该标识值默认为即为 "),n("code",[s._v("true")]),s._v("。可枚举性决定了这个属性能否被for…in查找遍历到。")])]),s._v(" "),n("li",[n("p",[s._v("不可枚举属性：不可枚举属性是指那些内部 “可枚举” 标志设置为 "),n("code",[s._v("false")]),s._v(" 的属性，对于通过 "),n("code",[s._v("Object.defineProperty")]),s._v(" 等定义的属性，该标识值默认为 "),n("code",[s._v("false")]),s._v("。 简单地说，用户定义的属性都是可枚举的，而内置对象不可枚举。")])])]),s._v(" "),n("h2",{attrs:{id:"一、for-in"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#一、for-in"}},[s._v("#")]),s._v(" 一、for...in")]),s._v(" "),n("h3",{attrs:{id:"for-in语法"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#for-in语法"}},[s._v("#")]),s._v(" for...in语法")]),s._v(" "),n("p",[s._v("语法：for(let/const/var index in object){...}")]),s._v(" "),n("p",[s._v("index：在每次迭代时，index会被赋值为不同的属性名；object：非 Symbol 类型的可枚举属性被迭代的对象。")]),s._v(" "),n("h3",{attrs:{id:"_1、for-in遍历数组"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_1、for-in遍历数组"}},[s._v("#")]),s._v(" 1、for...in遍历数组")]),s._v(" "),n("p",[s._v("遍历数组：")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("//遍历数组 Array\nconst myArray=[1,2,3,4,5,6,7];\nfor(let index in myArray){\n    console.log(index);\n}\n//0 1 2 3 4 5 6\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br")])]),n("p",[s._v("说明遍历数组得到的是"),n("strong",[s._v("下标")]),s._v("。我们在进行扩展一下：")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("//遍历数组 Array\nArray.prototype.testIn = function () { console.log('index'); }\nArray.prototype.age='18'\nconst myArray = [1, 2, 3, '7', 'gender'];\nmyArray.name = 'lucky'\nfor (let index in myArray) {\n     console.log('index:'+index,'value:'+myArray[index]);\n}\n//index:0 value:1\n//index:1 value:2\n//index:2 value:3\n//index:3 value:7\n//index:4 value:gender\n//index:name value:lucky\n//index:testIn value:function () { console.log('index'); }\n//index:age value:18\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br")])]),n("p",[s._v("通过for..in遍历的数组，不仅可以遍历下标，还可以遍历自定义的属性名（name），还会遍历到原型上的方法名（testIn）以及属性名（age）。其实，"),n("code",[s._v("并不是所有的属性通过for...in循环都会显示，数组的 length 属性和 constructor 属性就不会被显示")]),s._v("。但是，"),n("strong",[s._v("for...in 用来遍历数组并不是一个合适的选择")]),s._v(" ，虽然使用for...in可以遍历数组，但是会存在很多问题。")]),s._v(" "),n("h3",{attrs:{id:"_2、for-in遍历字符串"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_2、for-in遍历字符串"}},[s._v("#")]),s._v(" 2、for...in遍历字符串")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("// 遍历字符串\nString.prototype.testIn = function () { console.log('index')};\nString.prototype.type='String'\nlet s='one';\nfor(let index in s){\n    console.log('index:'+index,'value:'+s[index]);\n}\n​\n//index:0 value:o\n//index:1 value:n\n//index:2 value:e\n//index:testIn value:function () { console.log('index')}\n//index:type value:String\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br")])]),n("p",[s._v("通过for..in遍历字符串与遍历数组类似，同样可以遍历String上的用户自定义的原型属性和方法。")]),s._v(" "),n("h3",{attrs:{id:"_3、for-in遍历对象"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_3、for-in遍历对象"}},[s._v("#")]),s._v(" 3、for...in遍历对象")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("// 遍历对象\nObject.prototype.testIn = function () { console.log('key')};\nObject.prototype.status='student'\nconst myObj={\n    name: 'duck',\n    age:19,\n    gender:'female'\n}\nmyObj.grade='2020';\nfor(let key in myObj){\n    console.log('key:'+key,'value:'+myObj[key]);\n}\n​\n​\n//key:name value:duck\n//key:age value:19\n//key:gender value:female\n//key:grade value:2020\n//key:testIn value:function () { console.log('key')}\n//key:status value:student\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br")])]),n("p",[s._v("我们知道，遍历对象还可以通过Object.keys()遍历键，Object.values()遍历值，返回的是一个数组，然后我们通过遍历数组可得到一个一个的键或者值。但是，使用"),n("strong",[s._v("for...in遍历对象，显得方便了许多")]),s._v("。")]),s._v(" "),n("p",[s._v("此外，")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("// 3 遍历对象得到的属性值\nfunction MyObject(){\n    this[1]='text-1';\n    this['a']='test-a';\n    this['A']='test-A';\n    this[90]='test-90';\n    this['B']='test-B';\n    this['56']='test-56';\n}\n​\nlet myobj= new MyObject();\nfor(let key in myobj){\n    console.log(`key:${key},value:${myobj[key]}`);\n​\n}\n​\n//key:1,value:text-1\n//key:56,value:test-56\n//key:90,value:test-90\n//key:a,value:test-a\n//key:A,value:test-A\n//key:B,value:test-B\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br"),n("span",{staticClass:"line-number"},[s._v("21")]),n("br"),n("span",{staticClass:"line-number"},[s._v("22")]),n("br")])]),n("p",[s._v("对象的数字属性会被"),n("code",[s._v("优先遍历")]),s._v("，且按照顺序遍历（先有的规范，再有的javascript语言）；ECMAScript规范定义了数字属性应该按照索引值的大小升序排序，字符串属性根据创建时的顺序排列。")]),s._v(" "),n("h3",{attrs:{id:"_4、hasownproperty-方法"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_4、hasownproperty-方法"}},[s._v("#")]),s._v(" 4、hasOwnProperty（）方法")]),s._v(" "),n("p",[s._v("以上例子说明通过for..in遍历，还会遍历原型上的属性和方法，如果不想让其输出原型中的属性和方法，可以"),n("code",[s._v("使用 hasOwnProperty方法进行过滤：继承的属性不显示")]),s._v("。例如：")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("Object.prototype.testIn = function () { console.log('key')};\nObject.prototype.status='student'\nconst myObj={\n    name: 'duck',\n    age:19,\n    gender:'female'\n}\nmyObj.grade='2020';\nfor (let key in myObj) {\n    if (myObj.hasOwnProperty(key)) {\n        console.log('key:'+key,'value:'+myObj[key]);\n    }\n}\n​\n//key:name value:duck\n//key:age value:19\n//key:gender value:female\n//key:grade value:2020\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br")])]),n("h2",{attrs:{id:"二、for-of"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#二、for-of"}},[s._v("#")]),s._v(" 二、for...of")]),s._v(" "),n("h3",{attrs:{id:"for-of语法"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#for-of语法"}},[s._v("#")]),s._v(" for...of语法")]),s._v(" "),n("p",[s._v("语法：for(let/const/var value of object){...}")]),s._v(" "),n("p",[s._v("value：在每次迭代中，将不同属性的值分配给变量。；object：被迭代枚举其属性的对象。")]),s._v(" "),n("p",[s._v("相对于for...in，"),n("strong",[s._v("for..of更加适用遍历数、数组对象、字符串、Map、Set等拥有迭代器对象的集合。但是不能遍历对象,因为没有迭代器对象")]),s._v("。")]),s._v(" "),n("h3",{attrs:{id:"_1、for-of遍历数组-字符串"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_1、for-of遍历数组-字符串"}},[s._v("#")]),s._v(" 1、for...of遍历数组/字符串")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("// 遍历数组/字符串\nArray.prototype.testOf=function(){};\nconst myArray=['red','green','yellow'];\nfor(const vlaue of myArray) {\n    console.log('valueofArray:'+vlaue);\n}\n//valueofArray:red\n//valueofArray:green\n//valueofArray:yellow\n​\nlet s='wow'\nfor(var vlaue of s) {\n    console.log('valueofString:'+vlaue);\n}\n//valueofString:w\n//valueofString:o\n//valueofString:w\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br")])]),n("h3",{attrs:{id:"_2、for-of遍历对象"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_2、for-of遍历对象"}},[s._v("#")]),s._v(" 2、for...of遍历对象")]),s._v(" "),n("p",[s._v("for...of循环不会循环对象的key，只会循环出数组/字符串的value，因此for...of不能循环遍历普通对象,对普通对象的属性遍历推荐使用for...in。如果实在想用for...of来遍历普通对象的属性的话，可以通过和Object.keys()搭配使用，先获取对象的所有key的数组。")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("// 遍历对象\nconst obj={\n    name:'duck',\n    age:19\n}\nfor(let vlaue of obj) {\n    console.log(value);\n}\n​\n//TypeError: obj is not iterable\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br")])]),n("h3",{attrs:{id:"_3、for-of遍历map-set"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_3、for-of遍历map-set"}},[s._v("#")]),s._v(" 3、for...of遍历Map/Set")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("// 遍历Set和Map\nconst mySet=new Set()\nmySet.add('name');\nmySet.add('age');\n//遍历Set\nfor(let value of mySet) {\n    console.log('valueofSet:'+value);\n}\n//valueofSet:name\n//valueofSet:age\n​\nconst myMap=new Map();\nmyMap.set('name', 'duck');\nmyMap.set('age', '19');\n//遍历Map\nfor(let [key,value] of myMap) {//注意变量是[key,value],才能只得到value,否则如果是value，会打印[键，值]\n    console.log('valueofMap:'+value);\n​\n}\n//valueofMap:duck\n//valueofMap:19\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br"),n("span",{staticClass:"line-number"},[s._v("21")]),n("br")])]),n("p",[s._v("4、for...of遍历arguments对象")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("// 遍历arguments\n(function() {\n    for (let argument of arguments) {\n      console.log(argument);\n    }\n  })(1,'2', 'luck');\n​\n//1\n//2\n//luck\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br")])]),n("h2",{attrs:{id:"三、区别囊括"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#三、区别囊括"}},[s._v("#")]),s._v(" 三、区别囊括")]),s._v(" "),n("h3",{attrs:{id:"_1、for-in"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_1、for-in"}},[s._v("#")]),s._v(" 1、for...in")]),s._v(" "),n("p",[s._v("（1）for...in遍历的是对象的"),n("code",[s._v("key（键名）")]),s._v("、数组/字符串的"),n("code",[s._v("index（索引）")])]),s._v(" "),n("p",[s._v("（2）for...in能遍历"),n("code",[s._v("所有数据结构")])]),s._v(" "),n("p",[s._v("（3）for...in还会遍历到"),n("code",[s._v("对象自身的和继承的（原型上的）可枚举的属性和方法")])]),s._v(" "),n("p",[s._v("（4）for...in遍历时，对象的数字属性会被"),n("code",[s._v("优先遍历")]),s._v("，且按照顺序遍历（现有的规范，再有的javascript语言）；ECMAScript规范定义了数字属性应该按照索引值的大小升序排序，字符串属性根据创建时的顺序排列")]),s._v(" "),n("p",[s._v("（5）for...in语句以"),n("code",[s._v("任意顺序迭代对象的可枚举属性")])]),s._v(" "),n("h3",{attrs:{id:"_2、for-of"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_2、for-of"}},[s._v("#")]),s._v(" 2、for...of")]),s._v(" "),n("p",[s._v("（1）for...of遍历的是数组/字符串/Set/Map的"),n("code",[s._v("value（值）")])]),s._v(" "),n("p",[s._v("（2）for...of"),n("code",[s._v("只能遍历具有Symbol.iterator属性的数据结构")]),s._v("。能遍历Array（数组）、Set 和 Map 结构、某些类似数组的对象（比如arguments对象、DOM NodeList 对象）、 Generator 对象，以及String（字符串）,不能遍历对象Object（天生不具备迭代器Iterable属性）")]),s._v(" "),n("p",[s._v("（3）for...of不会遍历到对象自身的和继承的（原型上的）可枚举的属性和方法")]),s._v(" "),n("p",[s._v("（4）for...of，相对于for...in更适合遍历数组")]),s._v(" "),n("p",[s._v("（5）for...of 语句遍历"),n("code",[s._v("可迭代对象定义要迭代的数据")]),s._v("。")]),s._v(" "),n("h2",{attrs:{id:"四、小贴士"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#四、小贴士"}},[s._v("#")]),s._v(" 四、小贴士")]),s._v(" "),n("p",[s._v("for ... in"),n("code",[s._v("是为遍历对象属性而构建的，不建议用于迭代一个关注索引顺序的数组，数组可以用")]),s._v("Array.prototype.forEach()"),n("code",[s._v("和")]),s._v("for ... of。for..of适用遍历数/数组对象/字符串/map/set等拥有迭代器对象的集合。for...in更适用于对象的遍历。")])])}),[],!1,null,null,null);n.default=t.exports}}]);