<script>
import dsBridge from 'dsbridge'

import appConfig from '@src/app.config'
import Layout from '@layouts/main'

export default {
    page: {
        title: 'Home',
        meta: [{ name: 'description', content: appConfig.description }],
    },
    components: { Layout },
    created: function() {
        this.init()
    },
    methods: {
        init: function() {
            this.nativeToJSAsync()
            this.nativeToJSAsyncCallback()
        },
        // native调用js，异步,无web端向native回调，直接return
        nativeToJSAsync: function() {
            dsBridge.register('nativeToJSAsync', function(l, r) {
                return l + r
            })
        },
        // native调用js，异步，有web端想native端回调
        nativeToJSAsyncCallback: function() {
            dsBridge.registerAsyn('nativeToJSAsyncCallback', function(
                // 注册异步的Javascript APIxm
                arg1,
                arg2,
                arg3,
                responseCallback
            ) {
                responseCallback(arg1 + ' ' + arg2 + ' ' + arg3) // 回调，js向navtive传值
            })
        },
        // js调用native，同步调用
        jsToNavtiveSync: function() {
            var str = dsBridge.call('jsToNavtiveSync', {
                syncParmas1: '1',
                syncParmas2: '2',
                syncParmas3: '3',
            })
        },
        // js调用native,异步调用，无参
        jsToNavtiveAsync: function() {
            dsBridge.call('jsToNavtiveAsync', function(v) {})
        },
        // js调用native,异步调用，有参
        jsToNavtiveAsyncParmas: function() {
            dsBridge.call(
                'jsToNavtiveAsyncParmas',
                {
                    asyncParmas1: '1',
                    asyncParmas2: '2',
                    asyncParmas3: '3',
                },
                function(v) {
                    alert(v)
                }
            )
        },
    },
}
</script>

<template>
  <Layout>
    <h1>Home Page13322</h1>
    <img src="@assets/images/logo.png" alt="Logo">
    <button :class="$style.btn" @click="jsToNavtiveSync()">js调用native，同步调用</button>
    <button @click="jsToNavtiveAsync()">js调用native,异步调用，无参</button>
    <button @click="jsToNavtiveAsyncParmas()">js调用native,异步调用，有参</button>
  </Layout>
</template>
<style lang="scss" module>
@import '@design';
.btn {
    width: 300px;
    height: 100px;
    background: red;
}
</style>
