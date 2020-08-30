const CompressionWebpackPlugin = require("compression-webpack-plugin");
const proxy = require("./vue.config.proxy");
const webpack = require("webpack");

module.exports = {
  lintOnSave: process.env.NODE_ENV !== "production",
  publicPath: "/",
  outputDir: "dist",
  productionSourceMap: false,
  runtimeCompiler: false,

  devServer: {
    proxy: proxy
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      distCompression(config);

      imageOptimize(config);
    }
  },

  configureWebpack: {
    // webpack plugins
    plugins: [
      // Ignore all locale files of moment.js
      // 去掉本地化文件减少moment打包体积
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
  }
};

function distCompression(config) {
  config.plugin("compression").use(CompressionWebpackPlugin, [
    {
      test: /\.js$|\.css$/,
      algorithm: "gzip",
      threshold: 1024 * 10
    }
  ]);
}

function imageOptimize(config) {
  config.module
    .rule("images")
    .use("image-webpack-loader")
    .loader("image-webpack-loader")
    .tap(() => ({
      mozjpeg: {
        progressive: true,
        quality: 65
      },
      optipng: {
        enabled: true
      },
      pngquant: {
        quality: [0.65, 0.9],
        speed: 4
      },
      gifsicle: {
        interlaced: false
      }
    }));
}
