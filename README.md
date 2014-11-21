===========

> 构造数据服务

---------------------------

## 安装与配置


### 选择npm安装

> npm install mocktool

### 配置edp服务器 

/// (如果开发依赖不是是edp环境，绕道)

> 配置方法: 在edp-webserver-config文件中添加如下代码

```js

    var mocktool = require('mocktool');
    mocktool.main(context);