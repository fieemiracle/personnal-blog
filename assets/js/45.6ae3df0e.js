(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{450:function(a,s,n){"use strict";n.r(s);var e=n(1),r=Object(e.a)({},(function(){var a=this,s=a._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("hr"),a._v(" "),s("h2",{attrs:{id:"highlight-a11y-darktheme-channing-cyan"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#highlight-a11y-darktheme-channing-cyan"}},[a._v("#")]),a._v(" highlight: a11y-dark\ntheme: channing-cyan")]),a._v(" "),s("p",[s("em",[s("strong",[a._v("本文正在参加"),s("a",{attrs:{href:"https://juejin.cn/post/7162096952883019783",title:"https://juejin.cn/post/7162096952883019783",target:"_blank",rel:"noopener noreferrer"}},[a._v("「金石计划 . 瓜分6万现金大奖」"),s("OutboundLink")],1)])])]),a._v(" "),s("p",[a._v("什么是扁平化？对于数组扁平化来说，就是降维过程，即将多维数组降为一维数组的过程。而对于对象扁平化来说，就是将深度大于1的对象，降到深度为1的过程。这么一说，肯定不好理解，接下来，让代码说话吧~。")]),a._v(" "),s("h2",{attrs:{id:"一、数组的扁平化"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#一、数组的扁平化"}},[a._v("#")]),a._v(" 一、数组的扁平化")]),a._v(" "),s("p",[a._v("比如现在需要将一个这样的数组进行扁平化，让他变为以为数组：")]),a._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("const myArray=[1,2,[3,4,5,[6,[7]]],8,[9]]\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])]),s("p",[a._v("对于数组的扁平化，你可以使用哪些API来实现呢？首先肯定是先想到ES6里面的"),s("code",[a._v("flat")]),a._v("方法：")]),a._v(" "),s("h3",{attrs:{id:"_1-array-prototype-flat"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-array-prototype-flat"}},[a._v("#")]),a._v(" （1）Array.prototype.flat()")]),a._v(" "),s("p",[a._v("先介绍介绍"),s("code",[a._v("flat")]),a._v('，Array.prototype.flat()用于将嵌套的数组"拉平"，变成一维数组，并且该方法会返回一个新的数组，对原数组没有任何影响。同时，它默认只会拉平一层，如果想拉平多层的嵌套数组，需要给'),s("code",[a._v("flat()")]),a._v("方法传入一个正整数的参数，表示想要拉平的层数，默认值是1。如下扁平化结果：")]),a._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("// 扁平化一层\nconst flatArray1 = myArray.flat()\nconsole.log(flatArray1); //[ 1, 2, 3, 4, 5, [ 6, [ 7 ] ], 8, 9 ]\n​\n// 扁平化两层\nconst flatArray2 = myArray.flat(2)\nconsole.log(flatArray2); //[1,2, 3,4,5, 6,[ 7 ], 8, 9]\n​\n// 扁平化为一维数组\nconst flatArray3 = myArray.flat(3)\nconsole.log(flatArray3); //[1, 2, 3, 4, 5,6, 7, 8, 9]\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br"),s("span",{staticClass:"line-number"},[a._v("3")]),s("br"),s("span",{staticClass:"line-number"},[a._v("4")]),s("br"),s("span",{staticClass:"line-number"},[a._v("5")]),s("br"),s("span",{staticClass:"line-number"},[a._v("6")]),s("br"),s("span",{staticClass:"line-number"},[a._v("7")]),s("br"),s("span",{staticClass:"line-number"},[a._v("8")]),s("br"),s("span",{staticClass:"line-number"},[a._v("9")]),s("br"),s("span",{staticClass:"line-number"},[a._v("10")]),s("br"),s("span",{staticClass:"line-number"},[a._v("11")]),s("br")])]),s("p",[a._v("可烦了，扁平化我还得数一下有几层，但是，有一个关键字，不管有多少层嵌套，都可以将多维数组转成一维数组，即用"),s("code",[a._v("Infinity")]),a._v("关键字作为参数：")]),a._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("const flatArray4 = myArray.flat(Infinity)\nconsole.log(flatArray4);\n////[1, 2, 3, 4, 5,6, 7, 8, 9]\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br"),s("span",{staticClass:"line-number"},[a._v("3")]),s("br")])]),s("h3",{attrs:{id:"_2-array-prototype-tostring"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-array-prototype-tostring"}},[a._v("#")]),a._v(" （2）Array.prototype.toString()")]),a._v(" "),s("p",[s("code",[a._v("toString()")]),a._v("方法可以将一个数组转换成字符串，然后需要将字符串通过"),s("code",[a._v("split()")]),a._v("方法转换成数组，然而这个时候数组的每一项还是一个字符串，需要强制类型转换，这样的话，就只适用于数组的每一个元素都是数字的场景。")]),a._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("const toStringArray = myArray.toString().split(',').map(item => Number(item))\nconsole.log(toStringArray);\n​\n//toString()得到\n1,2,3,4,5,6,7,8,9\n//split()得到\n[\n  '1', '2', '3',\n  '4', '5', '6',\n  '7', '8', '9'\n]\n//map()\n[\n  1, 2, 3, 4, 5,\n  6, 7, 8, 9\n]\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br"),s("span",{staticClass:"line-number"},[a._v("3")]),s("br"),s("span",{staticClass:"line-number"},[a._v("4")]),s("br"),s("span",{staticClass:"line-number"},[a._v("5")]),s("br"),s("span",{staticClass:"line-number"},[a._v("6")]),s("br"),s("span",{staticClass:"line-number"},[a._v("7")]),s("br"),s("span",{staticClass:"line-number"},[a._v("8")]),s("br"),s("span",{staticClass:"line-number"},[a._v("9")]),s("br"),s("span",{staticClass:"line-number"},[a._v("10")]),s("br"),s("span",{staticClass:"line-number"},[a._v("11")]),s("br"),s("span",{staticClass:"line-number"},[a._v("12")]),s("br"),s("span",{staticClass:"line-number"},[a._v("13")]),s("br"),s("span",{staticClass:"line-number"},[a._v("14")]),s("br"),s("span",{staticClass:"line-number"},[a._v("15")]),s("br"),s("span",{staticClass:"line-number"},[a._v("16")]),s("br")])]),s("h3",{attrs:{id:"_3-array-prototype-concat"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-array-prototype-concat"}},[a._v("#")]),a._v(" （3）Array.prototype.concat()")]),a._v(" "),s("p",[a._v("该方法会将数组转化为纯字符串的形式，所以还需要将字符串转换成一维数组，字符串转换成一维数组的方法也有很多，在这里使用的是（...）扩展运算符。")]),a._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("function concatFlatten(array) {\n    while (array.some(item => Array.isArray(item))) {\n        array = [].concat(...array);\n    }\n    return array;\n​\n}\n​\nconst concatArray = concatFlatten(myArray)\nconsole.log(concatArray);\n//[ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br"),s("span",{staticClass:"line-number"},[a._v("3")]),s("br"),s("span",{staticClass:"line-number"},[a._v("4")]),s("br"),s("span",{staticClass:"line-number"},[a._v("5")]),s("br"),s("span",{staticClass:"line-number"},[a._v("6")]),s("br"),s("span",{staticClass:"line-number"},[a._v("7")]),s("br"),s("span",{staticClass:"line-number"},[a._v("8")]),s("br"),s("span",{staticClass:"line-number"},[a._v("9")]),s("br"),s("span",{staticClass:"line-number"},[a._v("10")]),s("br"),s("span",{staticClass:"line-number"},[a._v("11")]),s("br")])]),s("h3",{attrs:{id:"_4-使用generator函数"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-使用generator函数"}},[a._v("#")]),a._v(" （4）使用Generator函数")]),a._v(" "),s("p",[a._v("使用Generator函数，也是可以实现数组扁平化的，但是这需要一些基本的知识基础。巧妙地使用了"),s("code",[a._v("yield")]),a._v("关键字和"),s("code",[a._v("yield*")]),a._v("表达式，如下所示：")]),a._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("var flat = function*(array) {\n    for (var i = 0; i < array.length; i++) {\n        if (Array.isArray(array[i])) {\n            yield* flat(array[i]);\n        } else {\n            yield array[i];\n        }\n    }\n};\nconst flatArray = [...flat(myArray)]\nconsole.log(flatArray);\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br"),s("span",{staticClass:"line-number"},[a._v("3")]),s("br"),s("span",{staticClass:"line-number"},[a._v("4")]),s("br"),s("span",{staticClass:"line-number"},[a._v("5")]),s("br"),s("span",{staticClass:"line-number"},[a._v("6")]),s("br"),s("span",{staticClass:"line-number"},[a._v("7")]),s("br"),s("span",{staticClass:"line-number"},[a._v("8")]),s("br"),s("span",{staticClass:"line-number"},[a._v("9")]),s("br"),s("span",{staticClass:"line-number"},[a._v("10")]),s("br"),s("span",{staticClass:"line-number"},[a._v("11")]),s("br")])]),s("p",[s("code",[a._v("yield")]),a._v("和"),s("code",[a._v("yield*")]),a._v("这两个表达式不一样，"),s("code",[a._v("yield")]),a._v("是关键字，紧接在其后面的是Generator函数返回的遍历器调用"),s("code",[a._v("next")]),a._v("方法得到的值；而"),s("code",[a._v("yield*")]),a._v("是表达式，有返回值，紧接在其后面的是可遍历对象，如数组，类数组，或者另一个Generator函数的执行表达式等，尽管接可遍历对象，但是值是一个一个赋值的，举个例子：")]),a._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("function* gen() {\n    yield* [1, 2];\n    yield* '34';\n    yield* Array.from(arguments);\n}\n​\nvar iterator = gen(5, 6);\nconsole.log(iterator.next());\nconsole.log(iterator.next());\nconsole.log(iterator.next());\nconsole.log(iterator.next());\nconsole.log(iterator.next());\nconsole.log(iterator.next());\n​\n//{ value: 1, done: false }\n//{ value: 2, done: false }\n//{ value: '3', done: false }\n//{ value: '4', done: false }\n//{ value: 5, done: false }\n//{ value: 6, done: false }\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br"),s("span",{staticClass:"line-number"},[a._v("3")]),s("br"),s("span",{staticClass:"line-number"},[a._v("4")]),s("br"),s("span",{staticClass:"line-number"},[a._v("5")]),s("br"),s("span",{staticClass:"line-number"},[a._v("6")]),s("br"),s("span",{staticClass:"line-number"},[a._v("7")]),s("br"),s("span",{staticClass:"line-number"},[a._v("8")]),s("br"),s("span",{staticClass:"line-number"},[a._v("9")]),s("br"),s("span",{staticClass:"line-number"},[a._v("10")]),s("br"),s("span",{staticClass:"line-number"},[a._v("11")]),s("br"),s("span",{staticClass:"line-number"},[a._v("12")]),s("br"),s("span",{staticClass:"line-number"},[a._v("13")]),s("br"),s("span",{staticClass:"line-number"},[a._v("14")]),s("br"),s("span",{staticClass:"line-number"},[a._v("15")]),s("br"),s("span",{staticClass:"line-number"},[a._v("16")]),s("br"),s("span",{staticClass:"line-number"},[a._v("17")]),s("br"),s("span",{staticClass:"line-number"},[a._v("18")]),s("br"),s("span",{staticClass:"line-number"},[a._v("19")]),s("br"),s("span",{staticClass:"line-number"},[a._v("20")]),s("br")])]),s("p",[a._v("我们需要知道，Generator函数返回的对象是一个可遍历的对象，并且通过扩展运算符结构一个Generator函数，解构的是其"),s("code",[a._v("value")]),a._v("的值。")]),a._v(" "),s("h3",{attrs:{id:"_5-array-reduce"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_5-array-reduce"}},[a._v("#")]),a._v(" （5）"),s("strong",[a._v("Array.reduce()")])]),a._v(" "),s("p",[a._v("Array.reduce(total, value, index, array)，该方法为数组中的每个元素按照顺序执行一个"),s("code",[a._v("reducer")]),a._v("函数，每次执行会将先前的计算结果作为参数传入，然后将结果汇总为单个返回值。")]),a._v(" "),s("p",[a._v("该方法的回调函数接收四个参数：")]),a._v(" "),s("p",[s("code",[a._v("preval")]),a._v("：上一次调用回调函数的返回值，在第一次调用时可指定初始值，那么"),s("code",[a._v("preval")]),a._v("就会等于这个初始值；否则初始值默认是数组的索引为0的元素。")]),a._v(" "),s("p",[s("code",[a._v("curval")]),a._v("：当前处理的元素，在第一次调用时如果指定了初始值，则"),s("code",[a._v("curval")]),a._v("就等于索引为0的元素；否则，为索引为1的元素。")]),a._v(" "),s("p",[s("code",[a._v("curindex")]),a._v("：当前处理元素的索引，如果指定了初始值，则索引就等于0；否则索引从1开始。")]),a._v(" "),s("p",[s("code",[a._v("initval")]),a._v("：初始值，可选参数。作为第一次调用回调函数时的"),s("code",[a._v("preval")]),a._v("的值。")]),a._v(" "),s("p",[a._v("现在就来试试水吧：")]),a._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("const flatArray = myArray.reduce((preval, curval, curindex) => {\n    console.log('preval=', preval);\n    console.log('curval=', curval);\n    return preval.concat(curval)\n}, []);\nconsole.log(flatArray); \n//[ 1, 2, 3, 4, 5, [ 6, [ 7 ] ], 8, 9 ]\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br"),s("span",{staticClass:"line-number"},[a._v("3")]),s("br"),s("span",{staticClass:"line-number"},[a._v("4")]),s("br"),s("span",{staticClass:"line-number"},[a._v("5")]),s("br"),s("span",{staticClass:"line-number"},[a._v("6")]),s("br"),s("span",{staticClass:"line-number"},[a._v("7")]),s("br")])]),s("p",[a._v("经过测试，扁平化后的结果并不是我们想要的。通过代码发现，单纯的使用该方法只可以扁平化一层数组，对于多层嵌套的数组就束手无策，而对于多层嵌套层的数组，需要进行递归，遍历深度，所以优化后：")]),a._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("function flatten (array, deep = 1) => {\n    if (deep <= 0) return array;\n    return array.reduce((preval, curval) => {\n        return preval.concat(Array.isArray(curval) ? flatten(curval, deep - 1) : curval)\n    }, [])\n}\n​\nconst flatArray = flatten(myArray, Infinity)\nconsole.log(flatArray);\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br"),s("span",{staticClass:"line-number"},[a._v("3")]),s("br"),s("span",{staticClass:"line-number"},[a._v("4")]),s("br"),s("span",{staticClass:"line-number"},[a._v("5")]),s("br"),s("span",{staticClass:"line-number"},[a._v("6")]),s("br"),s("span",{staticClass:"line-number"},[a._v("7")]),s("br"),s("span",{staticClass:"line-number"},[a._v("8")]),s("br"),s("span",{staticClass:"line-number"},[a._v("9")]),s("br")])]),s("p",[a._v("数组的扁平化，其实有很多种实现方法，不使用任何API也比较好实现，利用递归的实现，层层遍历既可：")]),a._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("const flatArray = []\nconst flatten = (array) => {\n    for (let i in array) {\n        if (Array.isArray(array[i])) { //每一项是否为数组\n            flatten(array[i]) //继续遍历\n        } else {\n            flatArray.push(array[i])\n        }\n    }\n    return flatArray\n}\nconst res = flatten(myArray)\nconsole.log(res);\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br"),s("span",{staticClass:"line-number"},[a._v("3")]),s("br"),s("span",{staticClass:"line-number"},[a._v("4")]),s("br"),s("span",{staticClass:"line-number"},[a._v("5")]),s("br"),s("span",{staticClass:"line-number"},[a._v("6")]),s("br"),s("span",{staticClass:"line-number"},[a._v("7")]),s("br"),s("span",{staticClass:"line-number"},[a._v("8")]),s("br"),s("span",{staticClass:"line-number"},[a._v("9")]),s("br"),s("span",{staticClass:"line-number"},[a._v("10")]),s("br"),s("span",{staticClass:"line-number"},[a._v("11")]),s("br"),s("span",{staticClass:"line-number"},[a._v("12")]),s("br"),s("span",{staticClass:"line-number"},[a._v("13")]),s("br")])]),s("p",[a._v("其实，数组的扁平化实现方法颇多，如使用正则表达式方法，接下来，看看对象的扁平化。")]),a._v(" "),s("h2",{attrs:{id:"二、对象的扁平化"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#二、对象的扁平化"}},[a._v("#")]),a._v(" 二、对象的扁平化")]),a._v(" "),s("p",[a._v("什么是对象的扁平化？比如现在有这样一个对象：")]),a._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("const myObj = {\n    a: 1,\n    b: [1, 2, {c: true},[3]],\n    d: {e: 2,f: 3},\n    g: null,\n    like: [6, 8, 9]\n}\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br"),s("span",{staticClass:"line-number"},[a._v("3")]),s("br"),s("span",{staticClass:"line-number"},[a._v("4")]),s("br"),s("span",{staticClass:"line-number"},[a._v("5")]),s("br"),s("span",{staticClass:"line-number"},[a._v("6")]),s("br"),s("span",{staticClass:"line-number"},[a._v("7")]),s("br")])]),s("p",[a._v("你可以理解数组的元素会是数组，对象的值也可以是对象或者数组，但是这个对象扁平化会是怎么样呢？对象的扁平化同样是需要递归遍历的，对象的扁平化是将对象的值中是对象的的键值对进行扁平化处理，即如果值为对象，就进行递归遍历。如上对象扁平化后的结果为：")]),a._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("const flatObj={\n    a:1,\n    b[0]:1,\n    b[1]:2,\n    b[3].c:true,\n    b[4][0]:3,\n    d.e:2,\n    d.f:3,\n    g:null,\n    like[0]:6,\n    like[1]:8,\n    like[2]:9\n}\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br"),s("span",{staticClass:"line-number"},[a._v("3")]),s("br"),s("span",{staticClass:"line-number"},[a._v("4")]),s("br"),s("span",{staticClass:"line-number"},[a._v("5")]),s("br"),s("span",{staticClass:"line-number"},[a._v("6")]),s("br"),s("span",{staticClass:"line-number"},[a._v("7")]),s("br"),s("span",{staticClass:"line-number"},[a._v("8")]),s("br"),s("span",{staticClass:"line-number"},[a._v("9")]),s("br"),s("span",{staticClass:"line-number"},[a._v("10")]),s("br"),s("span",{staticClass:"line-number"},[a._v("11")]),s("br"),s("span",{staticClass:"line-number"},[a._v("12")]),s("br"),s("span",{staticClass:"line-number"},[a._v("13")]),s("br")])]),s("h3",{attrs:{id:"_1-手写对象扁平化"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-手写对象扁平化"}},[a._v("#")]),a._v(" （1）手写对象扁平化")]),a._v(" "),s("p",[a._v("核心思想：一旦遍历到值为对象的键值对，则立即遍历这个对象（递归遍历），并且保存键名，以便接下来维护一个新的键名。这里借助一个外部变量"),s("code",[a._v("flag")]),a._v("来定义最初始时的键名，以便于将维护好的键值一一对应。")]),a._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("function flatten(myObj) {\n    const flatObj = {}\n    let flag = null\n​\n    function formatKey(obj, keyName) {\n        for (let key in obj) {\n            if (typeof obj[key] === 'object' && obj[key] !== null) { //值为对象\n                if (!keyName) {\n                    formatKey(obj[key], key)\n                } else {\n                    if (Array.isArray(obj)) {\n                        formatKey(obj[key], `${keyName}[${key}]`)\n                    } else {\n                        formatKey(obj[key], `${keyName}.${key}`)\n                    }\n                }\n            } else { //值不为对象或者值为null\n                if (!keyName) {\n                    flatObj[key] = obj[key]\n                } else {\n                    if (Array.isArray(obj)) {\n                        flatObj[`${keyName}[${key}]`] = obj[key]\n                    } else {\n                        flatObj[`${keyName}.${key}`] = obj[key]\n                    }\n                }\n            }\n        }\n    }\n​\n    formatKey(myObj, flag)\n    return flatObj\n}\nflatten(myObj)\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br"),s("span",{staticClass:"line-number"},[a._v("3")]),s("br"),s("span",{staticClass:"line-number"},[a._v("4")]),s("br"),s("span",{staticClass:"line-number"},[a._v("5")]),s("br"),s("span",{staticClass:"line-number"},[a._v("6")]),s("br"),s("span",{staticClass:"line-number"},[a._v("7")]),s("br"),s("span",{staticClass:"line-number"},[a._v("8")]),s("br"),s("span",{staticClass:"line-number"},[a._v("9")]),s("br"),s("span",{staticClass:"line-number"},[a._v("10")]),s("br"),s("span",{staticClass:"line-number"},[a._v("11")]),s("br"),s("span",{staticClass:"line-number"},[a._v("12")]),s("br"),s("span",{staticClass:"line-number"},[a._v("13")]),s("br"),s("span",{staticClass:"line-number"},[a._v("14")]),s("br"),s("span",{staticClass:"line-number"},[a._v("15")]),s("br"),s("span",{staticClass:"line-number"},[a._v("16")]),s("br"),s("span",{staticClass:"line-number"},[a._v("17")]),s("br"),s("span",{staticClass:"line-number"},[a._v("18")]),s("br"),s("span",{staticClass:"line-number"},[a._v("19")]),s("br"),s("span",{staticClass:"line-number"},[a._v("20")]),s("br"),s("span",{staticClass:"line-number"},[a._v("21")]),s("br"),s("span",{staticClass:"line-number"},[a._v("22")]),s("br"),s("span",{staticClass:"line-number"},[a._v("23")]),s("br"),s("span",{staticClass:"line-number"},[a._v("24")]),s("br"),s("span",{staticClass:"line-number"},[a._v("25")]),s("br"),s("span",{staticClass:"line-number"},[a._v("26")]),s("br"),s("span",{staticClass:"line-number"},[a._v("27")]),s("br"),s("span",{staticClass:"line-number"},[a._v("28")]),s("br"),s("span",{staticClass:"line-number"},[a._v("29")]),s("br"),s("span",{staticClass:"line-number"},[a._v("30")]),s("br"),s("span",{staticClass:"line-number"},[a._v("31")]),s("br"),s("span",{staticClass:"line-number"},[a._v("32")]),s("br"),s("span",{staticClass:"line-number"},[a._v("33")]),s("br"),s("span",{staticClass:"line-number"},[a._v("34")]),s("br")])]),s("p",[a._v("还有更多实现数组的扁平化和对象的扁平化，敬请补充~。")])])}),[],!1,null,null,null);s.default=r.exports}}]);