# le38_2

> 乐38

## 安装方法

``` bash
# 首先需要先安装node.js和python2.7

# 将npm注册到淘宝镜像：
npm config set registry https://registry.npm.taobao.org 

# 进入到项目目录

# 安装sass：css预处理器
npm install node-sass --registry=http://registry.npm.taobao.org 
# 如果安装sass报错,执行：
npm install --save node-sass --registry=https://registry.npm.taobao.org --disturl=https://npm.taobao.org/dist --sass-binary-site=http://npm.taobao.org/mirrors/node-sass

# 安装sass-loader
npm install sass-loader --save-dev

# install dependencies 安装
npm install

# serve with hot reload at localhost:8080 运行
npm run dev

# build for production with minification 打包编译
npm run build
```

1、打包后生成的文件在/dist目录下，将/dist/static/js及/dist/static/css中的文件复制到后台项目中（文件名相同的表示没改变过，可以不复制）
2、 修改vue.ftl，将/dist/index.html文件中的依赖替换到vue.ftl中

``` html
    <script type=text/javascript src=/static/js/manifest.14efc1f1559e086ee3a9.js></script>
    <script type=text/javascript src=/static/js/vendor.ee7fbd3d9cada6c29d43.js></script>
    <script type=text/javascript src=/static/js/app.e316ff7df043a3aa26e7.js></script>
```



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


config/index文件中可以配置后台接口地址
``
proxyTable: {
        "/api": {        
            target:"http://le38.dayang1.cn",
            changeOrigin: true,
            pathRewrite: {
              '^/api': '/'
            }
        }
    },
``
