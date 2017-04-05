
'use strict';

var gulp     = require('gulp');
var path     = require('path');
var sass     = require('gulp-ruby-sass');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var gutil    = require('gulp-util');
var replace    = require('gulp-replace');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var includefile = require('gulp-file-include');
var injectDeps  = require('gulp-inject-deps');
var uglify   = require('gulp-uglify');
var rename   = require('gulp-rename');
//var htmlminifier   = require('html-minifier').minify;
var tinify   = require('gulp-tinypng-nokey');


// projects directories and pathes
var dir = {
    sass: './css/_scss',
    css: './css',
    img: './images',
    build: './build'
}, paths = {
    sass: dir.sass + '/**/*.scss',
    img: dir.img + '/**/*.*',
    css: dir.css + '/*.css',
    views: './views/**/*.js',
    js: './js/**/*.js'
}, output = {
    root: './',
    templates: './templates',
    img: './images',
    views: dir.build + '/views',
    js:  dir.build + '/js',
    css:  dir.build + '/css'
};

function onError (err){
    
    gutil.beep()
    console.log( err );
}

/* ============
 * Task: compile .scss file
 * ============
 **/
gulp.task( 'sass', function () {
    
    return sass(paths.sass, {
            style: ['compressed'],
            emitCompileError:true
         })
        .on('error', onError)
        .pipe(autoprefixer({
            browsers: ['iOS >= 6','Android >= 4'],
            cascade: false 
         }))
        .pipe(gulp.dest(dir.css));
});

/* ============
 * Task: watch .scss file
 * ============
 **/
gulp.task( 'watch:sass', function () {
    
    return gulp.watch( paths.sass, ['sass'] );
});

gulp.task( 'build:view', function(){
    
    return gulp.src( paths.views )
       .pipe(injectDeps({
            lookupMode: 'relative',
            baseUrl: 'views'
        }))
       .pipe(uglify()).on('error', onError)
       .pipe(gulp.dest(output.views));
});

gulp.task( 'build:js', function(){
    
    return gulp.src( paths.js )
       .pipe( uglify( ) ).on('error', onError )
       .pipe(gulp.dest(output.js));
});

//gulp.task( 'build:css', function(){
//    
//    return gulp.src( paths.css )
//       .pipe(gulp.dest(output.css));
//});

gulp.task( 'build:index', function(){
    
    return gulp.src( './index.dev.html' )
       .pipe(replace('zero.seed.dev.min.js', 'zero.seed.js'))
       .pipe(replace(/baseUrl\s*:\s*'\/spa\/views'/, 'baseUrl:\'\/spa\/build/views\''))
       .pipe(replace('js/common.js', 'build/js/common.js'))
       .pipe(rename('index.html'))
       .pipe(gulp.dest('./'));
});

//gulp.task( 'copyimg', function(){
//    
//    return gulp.src( './images/**/*.*' )
//       .pipe(gulp.dest(dir.build + '/images'));
//});

gulp.task( 'tinypng', function(){

    return gulp.src( './images/**/*.*' )
        .pipe(tinify())
        .pipe(gulp.dest(output.img));
});

gulp.task( 'server', function(){
    
    browserSync({
        server: true,
        startPath:'default.html',
        notify: false
    }, function(err, bs) {
        console.log(bs.options.getIn(["urls", "local"]));
    });
    
    var reload = browserSync.reload;
    gulp.watch(["./**/*.js", "./**/*.html", "./css/*.css", "!/build/**/*.*"]).on('change', reload);
})

gulp.task( 'build', ['build:js', 'build:view', 'build:index'])

gulp.task( 'default', [ 'watch:sass' ]);