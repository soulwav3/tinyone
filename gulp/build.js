const gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify'),
browserSync = require('browser-sync').create();

gulp.task('previewDist', () => {
  browserSync.init({
    notify: false,
    server: {
      baseDir: "docs"
    }
  });
})

gulp.task('deleteDistFolder', () => {
  return del('./docs')
});

gulp.task('copyGeneralFiles', ['deleteDistFolder'], () => {
  const pathsToCopy = [
    './src/**/*',
    '!./src/index.html',
    '!./src/images/**/*',
    '!./src/styles/**/*',
    '!./src/scripts/**/*',
    '!./src/temp',
    '!./src/temp/**'
  ];
  return gulp.src(pathsToCopy)
    .pipe(gulp.dest('./docs'));
})

gulp.task('optimizeImages', ['deleteDistFolder'], () => {
  return gulp.src('./src/images/**/*')
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      multipass: true
    }))
    .pipe(gulp.dest('./docs/images'));
});

gulp.task('useminTrigger', ['deleteDistFolder'], () => {
  gulp.start('usemin');
})

gulp.task('usemin', ['styles', 'scripts'], () => {
  return gulp.src('./src/index.html')
    .pipe(usemin({
      css: [() => { return rev() },
            () => { return cssnano() }],
      js: [() => { return rev() },
          () => { return uglify()}]
    }))
    .pipe(gulp.dest('./docs'));
});

gulp.task('build', ['deleteDistFolder',
                    'copyGeneralFiles',
                    'optimizeImages',
                    'useminTrigger',
                    ]);