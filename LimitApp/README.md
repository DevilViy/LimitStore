# SimStore-App

### React-Native学习指南
- https://github.com/reactnativecn/react-native-guide#%E5%BC%80%E6%BA%90app

### 文件采用Pascal命名法

### 层级结构
````
src
├── actionType
├── actions
├── components  //公用组件
├── containers  //route目录
├── img  //图片
├── pages  //文件目录
├── reducers 
├── utils //实用类文件
├── sagas
├── services //请求组件 修改config.json.default->config.json
├── store
├── styles //公用样式
└── root.js

react-native获取android的屏幕宽度和高度（单位是dp）

````

### 安卓安装离线测试版
```
$ vim ~/.gradle/gradle.properties
org.gradle.daemon=true
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=123456
MYAPP_RELEASE_KEY_PASSWORD=123456
```
- $ cd android && ./gradlew installRelease
- 生成的APK文件位于android/app/build/outputs/apk/app-release.apk

### redux 
- http://cn.redux.js.org/index.html

### redux-saga
- http://leonshi.com/redux-saga-in-chinese/docs/api/index.html#putaction
<br/>
Reducers负责处理action的state更新；
Sagas 负责协调那些复杂或异步的操作。


### ant-design-mobile
* https://mobile.ant.design/index-cn

### 导航组件react-navigation
* https://reactnavigation.org/docs/navigators/stack

### Icon图标库
* https://github.com/oblador/react-native-vector-icons
* 图标：https://oblador.github.io/react-native-vector-icons
````
$ yarn add react-native-vector-icons --save
$ react-native link
````
[图标报错]
<br/>
Native module VectorIconsModule tried to override VectorIconsModule for module name RNVectorIconsModule. If this was your intention, set canOverrideExistingModule=true

https://segmentfault.com/a/1190000009757824

### react-native-htmlview 将 HTML 目录作为本地视图的控件
- https://github.com/jsdf/react-native-htmlview

### 热更新组件，微软code-push
* https://github.com/Microsoft/react-native-code-push#getting-started