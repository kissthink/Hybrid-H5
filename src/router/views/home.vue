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
            alert('native调用js，同步1')
            dsBridge.register('nativeToJSAsync', function(l, r) {
                return l + r
            })
            alert('native调用js，同步2')
        },
        // native调用js，异步，有web端想native端回调
        nativeToJSAsyncCallback: function() {
            alert('native调用js，异步1')
            dsBridge.registerAsyn('nativeToJSAsyncCallback', function(
                // 注册异步的Javascript APIxm
                arg1,
                arg2,
                arg3,
                responseCallback
            ) {
                alert('native调用js，异步2')
                responseCallback(arg1 + ' ' + arg2 + ' ' + arg3) // 回调，js向navtive传值
                alert('native调用js，异步3')
            })
            alert('native调用js，异步4')
        },
        // js调用native，同步调用
        jsToNavtiveSync: function() {
            alert('js调用native，同步调用1')
            var str = dsBridge.call('jsToNavtiveSync', {
                syncParmas1: '1',
                syncParmas2: '2',
                syncParmas3: '3',
            })
            alert('str1=' + str)
            alert('js调用native，同步调用2')
        },
        // js调用native,异步调用，无参
        jsToNavtiveAsync: function() {
            alert('js调用native,异步调用，无参1')
            dsBridge.call('jsToNavtiveAsync', function(v) {
                alert('js调用native,异步调用，无参2')
                alert(v)
            })
            alert('js调用native,异步调用，无参3')
        },
        // js调用native,异步调用，有参
        jsToNavtiveAsyncParmas: function() {
            alert('js调用native,异步调用，有参1')
            dsBridge.call(
                'jsToNavtiveAsyncParmas',
                {
                    asyncParmas1: '1',
                    asyncParmas2: '2',
                    asyncParmas3: '3',
                },
                function(v) {
                    alert('js调用native,异步调用，有参2')
                    alert(v)
                }
            )
            alert('js调用native,异步调用，有参3')
        },
    },
}
</script>

<template>
  <Layout>
    <h1>Home Page</h1>
    <img src="@assets/images/logo.png" alt="Logo">
    <button @click="jsToNavtiveSync()">js调用native，同步调用</button>
    <button @click="jsToNavtiveAsync()">js调用native,异步调用，无参</button>
    <button @click="jsToNavtiveAsyncParmas()">js调用native,异步调用，有参</button>
  </Layout>
</template>
<style lang="scss" module>
@import '@design';
</style>
