(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{444:function(s,n,e){"use strict";e.r(n);var a=e(1),t=Object(a.a)({},(function(){var s=this,n=s._self._c;return n("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[n("p",[s._v("持续创作，加速成长！这是我参与「掘金日新计划 · 10 月更文挑战」的第10天，"),n("a",{attrs:{href:"https://juejin.cn/post/7147654075599978532",title:"https://juejin.cn/post/7147654075599978532",target:"_blank",rel:"noopener noreferrer"}},[s._v("点击查看活动详情"),n("OutboundLink")],1)]),s._v(" "),n("p",[s._v("首先认识，在vue3.0中，***setup***函数中的变量必须***return***出来才能给***template***使用,例如：")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("<script>\n\texport default defineComponent({\n\t\tsetup() {\n\t\t\t//...\n\t\t\treturn {\n\t\t\t\t//...\n\t\t\t}\n\t\t}\n\t})\n<\/script>\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br")])]),n("p",[s._v("而在vue3.2中使用***setup***语法糖无需***return***变量就可以在***template***中使用。\nvue3.2的语法糖模式")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("<script setup><\/script>\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br")])]),n("p",[s._v("setup函数接收两个参数，第一个参数props，第二个参数context（context有attrs,slots,emit）")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("setup(props,{attrs,slots,emit}){\n    console.log(...);\n    return {\n        //...            \n    }\n}\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br")])]),n("h2",{attrs:{id:"一、props"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#一、props"}},[s._v("#")]),s._v(" 一、Props")]),s._v(" "),n("p",[n("strong",[s._v("Props用于父组件向子组件传值")]),s._v("。父组件以数据绑定的形式声明要传递的数据，子组件通过defineProps()方法创建props对象，或者使用vue3的语法糖（即将setup写在script标签上）以setup函数的第一个参数进行接收数据，就可以接收到父组件传来的数据。")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("//父组件 Parent.vue\n<template>\n    <h3>我是父组件</h3>\n    <ChildView :msg=\"msg\"></ChildView>\n</template>\n​\n<script setup>\n    import {ref} from 'vue';\n    import ChildView from './Child.vue';\n    const msg = ref('给子组件的值')\n<\/script>\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br")])]),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("//子组件 Child.vue\n<template>\n    <h3>我是子组件</h3>\n    <div>父组件传给我的是：{{props.msg}}</div>\n</template>\n​\n<script setup>\n    import {defineProps} from 'vue';\n    const props = defineProps({\n        msg: {\n            type: String,\n            default: ''\n        }\n    })\n<\/script>\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br")])]),n("h2",{attrs:{id:"二、emit"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#二、emit"}},[s._v("#")]),s._v(" 二、emit")]),s._v(" "),n("p",[n("strong",[s._v("emit用于子组件向父组件传值")]),s._v("。子组件通过emit触发父组件中的方法传值，需要使用setup函数的第二个参数里面的emit。")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("//代码块\n<template>\n    <h3>我是父组件</h3>\n    <ChildView @handler='toHandler'></ChildView>\n    <div>{{info}}</div>\n</template>\n​\n<script setup>\n    import {ref} from 'vue';\n    import ChildView from './IsChild.vue';\n    const info = ref(['name', 'age'])\n    const toHandler = (value) => {\n        info.value.push(value)\n    }\n<\/script>\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br")])]),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("//子组件\n<template>\n    <h3>我是子组件</h3>\n</template>\n​\n<script setup>\n    import {defineEmits} from 'vue';\n    const emits = defineEmits(['handler'])\n    emits('handler', 'gender')\n<\/script>\n​\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br")])]),n("p",[s._v("子组件通过emit自定义一个事件，并传递值。emit(自定义事件，传递的值)。父组件只需要监听子组件自定义的事件，然后执行对应的操作。这里父组件接收数据以后，向数组里面添加一个值，在页面上可以看到加入后的数组的样子。")]),s._v(" "),n("h2",{attrs:{id:"三、expose-ref"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#三、expose-ref"}},[s._v("#")]),s._v(" 三、expose/ref")]),s._v(" "),n("p",[n("strong",[s._v("expose/ref用于父组件接收子组件传来的的属性或方法")]),s._v("。在子组件中，向外暴露出（defineExpose）需要传递的属性和方法，父组件可以使用ref接收到子组件身上暴露的属性或者方法，如果ref在DOM元素上使用，引用的指向就是DOM元素；如果在子组件三使用，引用的指向就是指向组件实例，就可以直接调用组件的方法或者访问数据。")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("//父组件\n<template>\n    <ChildView ref=\"childRef\"></ChildView>\n    <button @click=\"getValue\">获取</button>\n</template>\n​\n<script setup>\n    import ChildView from './Child.vue';\n    import {ref} from 'vue';\n    const childRef = ref(null)\n    const getValue = () => {\n        const childTip = childRef.value.childTip\n        console.log(childTip);//我是子组件\n        childRef.value.childMethod()\n    }\n<\/script>\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br")])]),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("//子组件\n<template>\n    <h3>我是子组件</h3>\n</template>\n​\n<script setup>\n    defineExpose({\n        childTip: '我是子组件',\n        childMethod() {\n            alert('这是子组件的方法')\n        }\n    })\n<\/script>\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br")])]),n("h2",{attrs:{id:"四、provide-inject"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#四、provide-inject"}},[s._v("#")]),s._v(" 四、provide/inject")]),s._v(" "),n("p",[n("strong",[s._v("provide/inject用于父组件向子组件或者其他跨级组件或多级嵌套组件之间的通信")]),s._v("。这个方式是Vue中提供的一对夫妻API，无论是父子组件，兄弟组件还是跨级组件之间，这对夫妻API都可以实现组件之间的数据传递。其中，provide在父组件中可以通过provide提供所需要向其他组件（目标组件）传递的数据，也就是提供变量；")]),s._v(" "),n("p",[s._v("inject从父组件到目标组件，无论是什么关系（或父子，或兄弟，或多级嵌套等），都可以直接使用inject接收到父组件传递的数据，不局限与只能从当前父组件props属性中获取数据。")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("//父组件\n<template>\n    <h3>我是父组件</h3>\n    <ChildView></ChildView>\n</template>\n​\n<script setup>\n    import ChildView from './Child.vue';\n    import {\n        provide\n    } from 'vue';\n    provide('msg', '父组件：我要给后代组件捎口信')\n<\/script>\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br")])]),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("//子组件\n<template>\n    <h3>我是子组件</h3>\n    <p>子组件收到的是---\x3e{{msg}}</p>\n</template>\n​\n<script setup>\n    import {\n        inject\n    } from 'vue';\n    const msg = inject('msg')\n<\/script>\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br")])]),n("h2",{attrs:{id:"五、attrs"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#五、attrs"}},[s._v("#")]),s._v(" 五、attrs")]),s._v(" "),n("p",[n("strong",[s._v("attrs用于子组件接收父组件中不是通过Props接收的属性")]),s._v("。父组件给子组件传递特殊属性，可以是任何自定义属性\n在setup语法糖下子组件通过setup函数的第二个参数context里的attrs来获取，或者在非setup语法糖下使用useAttrs 。基于父子通信的数据，如果父组件绑定下来的数据没有被指定为 props ，那么就可以通过attrs方式进行访问。请看下面的简单例子：")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("//父组件\n<template>\n    <h3>我是父组件</h3>\n    <ChildView :name=\"name\" :gender=\"gender\"></ChildView>\n</template>\n​\n<script setup>\n    import ChildView from './Child.vue';\n    import {\n        ref\n    } from 'vue';\n    const name = ref('dog');\n    const gender = ref('female');\n<\/script>\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br")])]),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("//子组件\n<template>\n    <h3>我是子组件</h3>\n    <p>子组件收到的是:{{props.name}}</p>\n    <p>子组件收到的是:{{attrs.gender}}</p>\n</template>\n​\n<script setup>\n    import {\n        defineProps,\n        useAttrs\n    } from \"vue\";\n    const props = defineProps({\n        name: {\n            type: String,\n            default: ''\n        }\n    })\n    const attrs = useAttrs();\n    console.log(attrs);\n<\/script>\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br"),n("span",{staticClass:"line-number"},[s._v("21")]),n("br")])]),n("p",[s._v("聪明的你还知道其他方法吗？")])])}),[],!1,null,null,null);n.default=t.exports}}]);