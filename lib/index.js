/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2020-06-28 21:56:56
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');


/**
 *****************************************
 * 样式注入插件
 *****************************************
 */
class StyleInjectWebpackPlugin {

    /* 插件描述 */
    descriptor = { name: 'style-inject-webpack-plugin' };

    /* 应用插件 */
    apply(compiler) {
        compiler.hooks.compilation.tap(this.descriptor, (compilation) => {
            let hooks = HtmlWebpackPlugin.getHooks(compilation),
                styles = [];

            // 监听生成资源文件
            hooks.beforeAssetTagGeneration.tapPromise(this.descriptor, async data => {
                let { assets } = compilation,
                    { css, publicPath } = data.assets;

                // 获取样式文件
                if (css && css.length) {
                    data.assets.css = css.filter(id => {
                        id = id.replace(publicPath, '');

                        // 添加资源文件
                        if (assets[id]) {
                            styles.push(`<style type="text/css">${assets[id]._value.toString()}</style>`);

                            // 删除资源
                            delete assets[id];
                        } else {
                            return true;
                        }
                    });
                }

                // 返回数据
                return data;
            });

            // 生成样式代码
            hooks.beforeEmit.tapPromise(this.descriptor, async data => {

                // 存在样式
                if (styles.length) {
                    data.html = data.html.replace('</head>', styles.join('') + '</head>');
                }

                // 返回数据
                return data;
            });
        });
    }
}


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
module.exports = StyleInjectWebpackPlugin;
