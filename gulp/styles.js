const gulp = require('gulp'),
postcss = require('gulp-postcss'),
nested = require('postcss-nested'),
mixins = require('postcss-mixins'),
cssImport = require('postcss-import'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
hexrgba = require('postcss-hexrgba'),
colorFunction = require('postcss-color-function'),
rename = require('gulp-rename');

gulp.task('styles', () => {
  return gulp.src('./src/styles/style.pcss')
          .pipe(postcss([cssImport, mixins, cssvars, nested, hexrgba, colorFunction, autoprefixer]))
          .on('error', function(errorInfo) {
            console.log(errorInfo.toString());
            this.emit('end');
          })
          .pipe(rename('style.css'))
          .pipe(gulp.dest('./src/temp/styles'));
});