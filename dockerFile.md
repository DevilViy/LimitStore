````
 docker ps -a     
 docker commit b2bc3747097d build:v1.1
 docker run -it build:v1.1 /bin/bash
````

````
code-push app add LimitStore android react-native 


Android
Appname:LimitStore
┌────────────┬──────────────────────────────────────────────────────────────────┐
│ Name       │ Deployment Key                                                   │
├────────────┼──────────────────────────────────────────────────────────────────┤
│ Production │ sqmnRRZY6avI3KGpp-ey5cgVigX3836cecb9-c43d-4c5d-8b67-19d66f1316c0 │
├────────────┼──────────────────────────────────────────────────────────────────┤
│ Staging    │ n9vmYRcDcDV2yU-j3V1b_bsS8XHO836cecb9-c43d-4c5d-8b67-19d66f1316c0 │
└────────────┴──────────────────────────────────────────────────────────────────┘

 code-push release-react LimitStore android --t 1.0.0 --dev false  --des "1.全新 页面\n2.已知bug修复\n3.测试"

 code-push deployment ls LimitStore 
 
 code-push deployment history LimitStore Staging

````


````
code-push app add LimitStore-ios ios react-native
Ios
Appname:LimitStore-ios
┌────────────┬──────────────────────────────────────────────────────────────────┐
│ Name       │ Deployment Key                                                   │
├────────────┼──────────────────────────────────────────────────────────────────┤
│ Production │ 43YNh_EpI2Io-ZikFdu35m2J3krN836cecb9-c43d-4c5d-8b67-19d66f1316c0 │
├────────────┼──────────────────────────────────────────────────────────────────┤
│ Staging    │ Qfy-ttgNLeF7i1La_2GdadtyjvE2836cecb9-c43d-4c5d-8b67-19d66f1316c0 │
└────────────┴──────────────────────────────────────────────────────────────────┘



 code-push deployment ls LimitStore-ios -k

 code-push release-react LimitStore-ios ios --t 1.0.0 --dev false  --des "1.全新 页面\n2.已知bug修复\n3.测试"

 code-push deployment history LimitStore-ios Staging
 
````

````
    code-push deployment add <appName> 部署
    code-push deployment rename <appName> 重命名
    code-push deployment rm <appName> 删除部署
    code-push deployment ls <appName> 列出应用的部署情况
    code-push deployment ls <appName> -k 查看部署的key
    code-push deployment history <appName> <deploymentNmae> 查看历史版本(Production 或者 Staging)
    

````