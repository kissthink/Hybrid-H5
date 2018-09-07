# DsBridge桥接Native
####参考文档

[DsBridge文档](https://github.com/wendux/DSBridge-Android/blob/master/readme-chs.md)



####使用

在Javascript中调用原生 (Java/Object-c/swift) API ,并注册一个 javascript API供原生调用.

- 初始化 dsBridge `npm install dsbridge@3.1.3`
- Js端注册一个 javascript API供原生调用
- 在Java中调用 Javascript API



####1. Native调用JS

- **web端**

```javascript
// 1. 异步,有回调，通过回调函数，web端向native端传值
dsBridge.registerAsyn('functionName', function(
    arg1,                           // android端传递给web端的参数
    arg2,
    arg3,
    responseCallback
) {
    responseCallback(arg1 + ' ' + arg2 + ' ' + arg3) // 回调，js传值navtive
})
// functionName,方法名，android和web端调用的方法名，三端相同
// android端调用到web端的方法后，web端的回调，传值给android端，传递的值写到responseCallback()的括号中
```

 ```javascript
// 2. 异步无回调
dsBridge.register('functionName', function(arg1, arg2) {
   return arg1 + arg2  // android端传递给web端的参数
})
// functionName,方法名，android和web端调用的方法名，三端相同
 ```

- **android**

```java
mWebView.callHandler("functionName", new Object[]{"arg1", "arg2", "arg3"}, new
  @Override
  public void onValue(String retValue) {
      ToastUtil.showCenterToast(JsCallTestActivity.this, retValue);
  }
});
// functionName: 方法名，android和web端调用的方法名，三端相同
// new Object[]{"arg1", "arg2", "arg3"}: 传给functionName方法的参数
// OnReturnValue:  web端传递回调结果给android的方法
// retValue: web端传递回调结果

// 注意
// functionName: 这里有两种情况
// 异步,有回调
// 异步,无回调
// 两种情况android端写法相同

```



#### 2. Js调用Native

- web端

```javascript
// 1. 同步调用,有参，无回调
var str = dsBridge.call('jsToNavtiveSync', {
    syncParmas1: '1', // 参数syncParmas1是js传给navtive的值
    syncParmas2: '2',
    syncParmas3: '3',
})
```

```javascript
// 异步调用,有参，有回调
dsBridge.call(
    'jsToNavtiveAsync',  // 方法名，android和web端调用的方法名，三端相同
    {
        asyncParmas1: '1',     // js传递给native的参数
        asyncParmas2: '2',
        asyncParmas3: '3',
    },
    function(v) {              // v,native传递给js的值
        alert(v)
    }
)
```

```javascript
// 异步调用，无参，有回调
dsBridge.call('functionName',
    function(v) {               // v,native传递给js的值
        alert(v)
    }
)
```



#### Android端

```java
// 1. 同步调用,有参，无回调
@JavascriptInterface
public String jsToNavtiveSync(Object str) {
    return str + " android sync";
}

```

```java
// 2. 异步调用,有参或无参，有回调
@JavascriptInterface
public void functionName(Object str, CompletionHandler<String> handler) {
    handler.complete(str + " android async");
}
// 注意
// functionName: 这里有两种情况
// 异步,有回调
// 异步,无回调
// 两种情况android端写法相同
```
