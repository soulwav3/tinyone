const gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();

gulp.task('watch', () => {
  browserSync.init({
    notify: false,
    server: {
      baseDir: "src"
    }
  });

  watch('./src/index.html', () => {
    browserSync.reload();
  });

  watch('./src/styles/**/*.pcss', () => {
    gulp.start('cssInject');
  });

  watch('./src/scripts/**/*.js', () => {
    gulp.start('scriptsRefresh');
  })
});

gulp.task('cssInject', ['styles'], () => {
  return gulp.src('./src/temp/styles/style.css')
    .pipe(browserSync.stream());
});

gulp.task('scriptsRefresh', ['scripts'], () => {
  browserSync.reload();
});