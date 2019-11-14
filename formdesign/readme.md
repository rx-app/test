# 表单设计器 #
## 目录结构 ## 
* `index.html`: 入口文件
* `src\`: 代码目录
* `src\component`：React 组件目录
* `src\styles`: 公共的样式
* `src\utils`: 一些工具方法
* `src\App.tsx`: React主入口
* `src\index.tsx`: 代码入口

## 运行 ## 
```sh
yarn start:web
```

## release build ##
```sh
yarn build:web
```

## debug 开关 ##
通过window.lbfdDebug设置
```javascript
window.lbfdDebug = true;  // 默认的debug日志
window.lbfdDebug = ["type1", "type2"]; // 除了默认的日志外，打开type1 和type2类型的日志
window.lbfdDebug = {
    type1: true, // 打开type1类型的日志
    type2：false, // 关闭type2类型的日志
}
```
