/**
 * @Author:      xd.zang
 * @DateTime:    2016-03-21
 * @description: gulp config
 */
'use strict';

let gulp = require('gulp'),
    os = require('os'),
    gutil = require('gulp-util'),
    gulpOpen = require('gulp-open'),
    clean = require('gulp-clean'),
    connect = require('gulp-connect'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    runSequence = require('gulp-run-sequence'),
    webpack = require('webpack'),
    webpackConfig = require('./webpack.config.js');

// 设置默认打开浏览器
let browser = os.platform() === 'linux' ? 'Google chrome' : (
  os.platform() === 'darwin' ? 'Google chrome' : (
  os.platform() === 'win32' ? 'chrome' : 'firefox'));

let localHost = {
    path: 'assets/',
    port: 3000,
    url: 'http://localhost:3000/views',
    app: browser
};

// clean assets
gulp.task('clean', () => {
  let log = gutil.colors.red('clean assets...');

  gutil.log(gutil.colors.bgBlack(log));

  return gulp.src('assets').pipe(clean({force: true}));
});

// js check
gulp.task('jshint', () => {
  let src = process.cwd() + '/src';

    return gulp.src([
            '!' + src + '/js/lib/**/*.js',
            src + '/js/**/*.js'
        ])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});


// run webpack pack
gulp.task('pack', (done) => {
    return webpack(webpackConfig, (err, stats) => {
        if(err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString({colors: true}));
        done();
    })
});
// html
gulp.task('html',()=>{
  return gulp.src('src/js/page/*/*.html').pipe(gulp.dest('assets/views'));
});
// json
gulp.task('json',()=>{
  return gulp.src('src/js/page/*/*.json').pipe(gulp.dest('assets/views'));
});

// build project
gulp.task('build',['pack','html','json'], ()=>{
  let log = gutil.colors.red('build project......');
  gutil.log(gutil.colors.bgBlack(log));

  connect.server({
      root: localHost.path,
      port: localHost.port,
      livereload: true
  });
});

//auto open browser after build project
gulp.task('open', () => {
    gulp.src('./assets/views/index.html')
      .pipe(gulpOpen({
            app: localHost.app,
            uri: localHost.url
          }));
});

// reload page
gulp.task('reload', ['pack','html'], () => {
    return gulp.src('src/**/*').pipe(connect.reload());
});

// watch file edit
gulp.task('watch', () => {
   gulp.watch(['src/**/*.html'], ['pack','reload']);
   gulp.watch(['src/js/**/*.js'], ['pack','reload']);
   gulp.watch(['src/**/*.css'], ['pack','reload']);
   gulp.watch(['src/**/*.less'], ['pack','reload']);
});

gulp.task('default', ['build','open'], () => {
    let log = gutil.colors.red('project staring......');
    gutil.log(gutil.colors.bgBlack(log));

    runSequence('watch');
});
