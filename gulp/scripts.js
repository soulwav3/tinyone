const gulp = require('gulp'),
webpack = require('webpack'),
webpackConf = require('../webpack.config.js');


gulp.task('scripts', (callback) => {
  webpack(webpackConf,
    (err, stats) => {
      if (err) {
        console.log(err.toString());
      }
      console.log(stats.toString());
      callback();
    });
});