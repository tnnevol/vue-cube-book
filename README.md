# vue-cube-book

## 描述
这是一个基于vue-cli3开发的小说阅读器，该项目适配方案采用rem布局

## 插件
* cube-ui
* axios
* babel
* amfe-flexible **用于适配**
* @babel/preset-env

## 支持
* es6
* es7

## 目的
* 2019.9.16
    * es7语法支持
    * 封装存储模块
    * 封装vuex
    * 封装基本工具类
* 2019.9.18
    * 请求拦截器封装

## 更新
* 2019.9.16
    * es7语法支持
    * init
* 2019.9.17
    * 封装存储模块
* 2019.9.18
    * 封装基本工具类
    * 请求拦截器封装
    * 封装vuex
* 2019.9.20
    * 更新服务层
    * 书城页面更新
* 2019.9.21
    * 服务层基础架构
    * 服务层基础爬虫脚本
* 2019.9.23
    * 加入日志中间件 morgan
* 2019.10.17
    * 加入主题，数据层爬取完成
* 2019.10.18
    * 可以基础阅读，未做上次阅读标记
* 2019.11.02
    * 阅读器加入标记
    * 功能优化
     
## 爬取数据
*要求: 需要mongo数据库，数据库连接 /server/model/index.js文件，自行修改*

爬取执行(会自动存库，自行查看)
```
yarn run reptile:book
```

## 项目架构图


## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Run your end-to-end tests
```
yarn run test:e2e
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
