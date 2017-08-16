# le38_2

> 乐38

## 安装方法

``` bash
# 将npm注册到淘宝镜像：
npm config set registry https://registry.npm.taobao.org

# install dependencies 安装
npm install

# 安装sass：css预处理器
npm install node-sass --registry=http://registry.npm.taobao.org 
npm install sass-loader --save-dev

# serve with hot reload at localhost:8080 运行
npm run dev

# build for production with minification 打包编译
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



项目中用到的一些第三方插件，可能需要自行安装：

-   n-zepto：轻量级jQuery
-   loadjs：延迟加载js文件，解决一些插件和zepto动画问题



Git提交方法：

-   查看状态：git status
-   提交所有文件到缓冲区：git add .
-   提交文件：git commit -m '备注' 
-   可以用次命令代替以上二者：git commit -a -m '备注'
-   推送到GitHub：git push origin master
-   更新代码：git pull
