const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const { baseRoute, title } = require('./src/set/index.js');
const resolve = (dir) => {
    return path.join(__dirname, dir);
};
const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
const BASE_URL = '/';
function addStyleResource(rule) {
    rule
        .use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [path.resolve(__dirname, 'src/common/style/index.less')],
        });
}
console.log('运行模式: ~', process.env.VUE_APP_RUN_MODE);
module.exports = {
    publicPath: BASE_URL,
    outputDir: 'dist/' + process.env.VUE_APP_RUN_MODE,
    assetsDir: baseRoute,
    chainWebpack: (config) => {
        //全局预加载样式
        types.forEach((type) => addStyleResource(config.module.rule('less').oneOf(type)));
        //别名配置
        config.resolve.alias
            .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
            .set('_c', resolve('src/components'))
            .set('_v', resolve('src/views'));
        //标题
        config.plugin('html').tap((args) => {
            args[0].title = title;
            return args;
        });
        // 设置svg-sprite-loader
        config.module.rule('svg').exclude.add(resolve('src/icons')).end();
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]',
            })
            .end();
        //生产环境
        if (process.env.NODE_ENV === 'production') {
            config.optimization.minimizer('terser').tap((args) => {
                // 注释console.*
                args[0].terserOptions.compress.drop_console = true;
                // remove debugger
                args[0].terserOptions.compress.drop_debugger = true;
                // 移除 console.log
                args[0].terserOptions.compress.pure_funcs = ['console.log'];
                // 去掉注释 如果需要看chunk-vendors公共部分插件，可以注释掉就可以看到注释了
                args[0].terserOptions.output = {
                    comments: false,
                };
                return args;
            });

            //初始化 filemanager-webpack-plugin 插件实例
            config
                .plugin('filemanager-webpack-plugin')
                .use(FileManagerPlugin)
                .tap((args) => {
                    args[0] = {
                        events: {
                            onEnd: {
                                //首先需要删除项目根目录下的dist.zip
                                delete: [`./dist/${baseRoute}.zip`],
                                //然后我们选择dist文件夹将之打包成dist.zip并放在根目录
                                archive: [{ source: `./dist/${process.env.VUE_APP_RUN_MODE}`, destination: `./dist/${baseRoute}.zip` }],
                            },
                        },
                    };
                    return args;
                });

            //runtimeChunk作用是为了线上更新版本时，充分利用浏览器缓存，使用户感知的影响到最低。
            config.optimization.runtimeChunk('single')
        };


    },
    configureWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {
            //定位代码
            config.devtool = 'cheap-source-map'
        } else {
            config.devtool = 'source-map'
        }

    },
    //生产禁止显示源代码
    productionSourceMap: false,
    //是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
    lintOnSave: false,
    //代理
    devServer: {
        contentBase: './',
        proxy: {
            '/api': {
                target: process.env.VUE_APP_URL,
                changeOrigin: true, //设置同源  默认false，是否需要改变原始主机头为目标URL,
            },
            '/micro': {
                // search为转发路径 http://devgate.shensx.com 开发
                target: process.env.VUE_APP_MICRO_URL,
                pathRewrite: { '^/micro': '/' },
                changeOrigin: true, //设置同源  默认false，是否需要改变原始主机头为目标URL,
            },
        },
        open: true
    },
};