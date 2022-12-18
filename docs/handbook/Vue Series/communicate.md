---
title: 组件之间的通信，你会几种？
date: 2022-10-31
tags:
 - 组件通信
categories: 
 - Vue Series
isShowComments: true  
subSidebar: auto
---

持续创作，加速成长！这是我参与「掘金日新计划 · 10 月更文挑战」的第10天，[点击查看活动详情](https://juejin.cn/post/7147654075599978532 "https://juejin.cn/post/7147654075599978532")

首先认识，在vue3.0中，***setup***函数中的变量必须***return***出来才能给***template***使用,例如：

```
<script>
	export default defineComponent({
		setup() {
			//...
			return {
				//...
			}
		}
	})
</script>
```
而在vue3.2中使用***setup***语法糖无需***return***变量就可以在***template***中使用。
vue3.2的语法糖模式

```
<script setup></script>
```

setup函数接收两个参数，第一个参数props，第二个参数context（context有attrs,slots,emit）

```
setup(props,{attrs,slots,emit}){
    console.log(...);
    return {
        //...            
    }
}
```

## 一、Props

**Props用于父组件向子组件传值**。父组件以数据绑定的形式声明要传递的数据，子组件通过defineProps()方法创建props对象，或者使用vue3的语法糖（即将setup写在script标签上）以setup函数的第一个参数进行接收数据，就可以接收到父组件传来的数据。

```
//父组件 Parent.vue
<template>
    <h3>我是父组件</h3>
    <ChildView :msg="msg"></ChildView>
</template>
​
<script setup>
    import {ref} from 'vue';
    import ChildView from './Child.vue';
    const msg = ref('给子组件的值')
</script>
```

```
//子组件 Child.vue
<template>
    <h3>我是子组件</h3>
    <div>父组件传给我的是：{{props.msg}}</div>
</template>
​
<script setup>
    import {defineProps} from 'vue';
    const props = defineProps({
        msg: {
            type: String,
            default: ''
        }
    })
</script>
```

## 二、emit

**emit用于子组件向父组件传值**。子组件通过emit触发父组件中的方法传值，需要使用setup函数的第二个参数里面的emit。

```
//代码块
<template>
    <h3>我是父组件</h3>
    <ChildView @handler='toHandler'></ChildView>
    <div>{{info}}</div>
</template>
​
<script setup>
    import {ref} from 'vue';
    import ChildView from './IsChild.vue';
    const info = ref(['name', 'age'])
    const toHandler = (value) => {
        info.value.push(value)
    }
</script>
```

```
//子组件
<template>
    <h3>我是子组件</h3>
</template>
​
<script setup>
    import {defineEmits} from 'vue';
    const emits = defineEmits(['handler'])
    emits('handler', 'gender')
</script>
​
```

子组件通过emit自定义一个事件，并传递值。emit(自定义事件，传递的值)。父组件只需要监听子组件自定义的事件，然后执行对应的操作。这里父组件接收数据以后，向数组里面添加一个值，在页面上可以看到加入后的数组的样子。

## 三、expose/ref

**expose/ref用于父组件接收子组件传来的的属性或方法**。在子组件中，向外暴露出（defineExpose）需要传递的属性和方法，父组件可以使用ref接收到子组件身上暴露的属性或者方法，如果ref在DOM元素上使用，引用的指向就是DOM元素；如果在子组件三使用，引用的指向就是指向组件实例，就可以直接调用组件的方法或者访问数据。

```
//父组件
<template>
    <ChildView ref="childRef"></ChildView>
    <button @click="getValue">获取</button>
</template>
​
<script setup>
    import ChildView from './Child.vue';
    import {ref} from 'vue';
    const childRef = ref(null)
    const getValue = () => {
        const childTip = childRef.value.childTip
        console.log(childTip);//我是子组件
        childRef.value.childMethod()
    }
</script>
```

```
//子组件
<template>
    <h3>我是子组件</h3>
</template>
​
<script setup>
    defineExpose({
        childTip: '我是子组件',
        childMethod() {
            alert('这是子组件的方法')
        }
    })
</script>
```

## 四、provide/inject

**provide/inject用于父组件向子组件或者其他跨级组件或多级嵌套组件之间的通信**。这个方式是Vue中提供的一对夫妻API，无论是父子组件，兄弟组件还是跨级组件之间，这对夫妻API都可以实现组件之间的数据传递。其中，provide在父组件中可以通过provide提供所需要向其他组件（目标组件）传递的数据，也就是提供变量；

inject从父组件到目标组件，无论是什么关系（或父子，或兄弟，或多级嵌套等），都可以直接使用inject接收到父组件传递的数据，不局限与只能从当前父组件props属性中获取数据。

```
//父组件
<template>
    <h3>我是父组件</h3>
    <ChildView></ChildView>
</template>
​
<script setup>
    import ChildView from './Child.vue';
    import {
        provide
    } from 'vue';
    provide('msg', '父组件：我要给后代组件捎口信')
</script>
```

```
//子组件
<template>
    <h3>我是子组件</h3>
    <p>子组件收到的是--->{{msg}}</p>
</template>
​
<script setup>
    import {
        inject
    } from 'vue';
    const msg = inject('msg')
</script>
```

## 五、attrs

**attrs用于子组件接收父组件中不是通过Props接收的属性**。父组件给子组件传递特殊属性，可以是任何自定义属性 
在setup语法糖下子组件通过setup函数的第二个参数context里的attrs来获取，或者在非setup语法糖下使用useAttrs 。基于父子通信的数据，如果父组件绑定下来的数据没有被指定为 props ，那么就可以通过attrs方式进行访问。请看下面的简单例子：

```
//父组件
<template>
    <h3>我是父组件</h3>
    <ChildView :name="name" :gender="gender"></ChildView>
</template>
​
<script setup>
    import ChildView from './Child.vue';
    import {
        ref
    } from 'vue';
    const name = ref('dog');
    const gender = ref('female');
</script>
```

```
//子组件
<template>
    <h3>我是子组件</h3>
    <p>子组件收到的是:{{props.name}}</p>
    <p>子组件收到的是:{{attrs.gender}}</p>
</template>
​
<script setup>
    import {
        defineProps,
        useAttrs
    } from "vue";
    const props = defineProps({
        name: {
            type: String,
            default: ''
        }
    })
    const attrs = useAttrs();
    console.log(attrs);
</script>
```
聪明的你还知道其他方法吗？