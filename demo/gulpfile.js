
'use strict';

var gulp     = require('gulp');
var path     = require('path');
var del      = require('del');
var sass     = require('gulp-ruby-sass');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var gutil    = require('gulp-util');
var autoprefixer = require('gulp-autoprefixer');
var concat   = require('gulp-concat');
var rename   = require('gulp-rename');
var replace  = require('gulp-replace');
var insert   = require('gulp-insert');
var uglify   = require('gulp-uglify');
var injectDeps = require('gulp-inject-deps');
var notify = require('gulp-notify');
var browserSync = require('browser-sync');


// projects directories and pathes
var dir = {
    css: './css',
    css_scss: './css/_scss',
    css_ui: './css/_ui',
    img: './images'
}, paths = {
    img: dir.img + '/**/*.*',
    view: './views/**/*.html',
    css: dir.css + '/*.css',
    css_scss: dir.css_scss+'/**/*.scss'
}, output = {
    build: './build',
    ui: './build/ui',
    tool: './build/tool',
    data: './build/data',
    img: './build/images',
    css: './build/css',
    view: './build/views'
}, seed_files = [
    
    // lib
    './zero/lib/prezero.js',
    './zero/lib/zepto.min.js',
    './zero/lib/underscore-min.js',
    './zero/lib/require.js',

    // util
    './zero/util/*.js',

    // ui
    './zero/ui/ui-base.js',
    './zero/ui/widgets/*.js',

    // store
    './zero/store/*.js',

    // base
    './zero/controller.js',
    './zero/zero.seed.js'
];

function onError ( err ){
    
    gutil.beep()
    console.log( err );
}

gulp.task( 'sass', function(){
    
    return sass( paths.css_scss , {
        style: ['compressed'],
        emitCompileError:true
    })
    .on('error', sass.logError)
    .pipe(autoprefixer({
        browsers: ['iOS >= 6', 'Android >= 4'],
        cascade: false 
     }))
    .pipe(gulp.dest('./css'));
})

gulp.task( 'delBuild', function( cb ){
    
   return del(['./build/**', '!./build'])
});

gulp.task( 'watch:sass', function(){
    
    return gulp.watch( paths.css_scss, [ 'sass' ])
});

gulp.task( 'seed:dev', function(){
    
    // copy
    var files = seed_files.slice(0);
    // add text.js
    files.splice(4, 0, './zero/lib/text.js');
    
    return gulp.src( files )
        .pipe( concat( 'zero.seed.dev.js' ))
        .pipe( gulp.dest( output.build ))
        .pipe( uglify( ) ).on('error', onError )
        .pipe( rename('zero.seed.dev.min.js') )
        .pipe( gulp.dest( output.build ))
});

gulp.task( 'seed:prd', function(){
    
    var files = seed_files;
    
    var config = require('./build')
    
    return gulp.src( files )
        .pipe( concat( 'zero.seed.js' ))
        .pipe( uglify( ) ).on('error', onError )
        .pipe( insert.prepend(config.licence) )
        .pipe( gulp.dest( output.build )) 
    
});

gulp.task( 'seed', [ 'seed:dev', 'seed:prd' ]);

gulp.task( 'build:tool', function(){
    
    var files = [
        './zero/tool/*.js'
    ];
    
    return gulp.src( files )
        .pipe( uglify( ) ).on('error', onError )
        .pipe( gulp.dest( output.tool )) 
});

gulp.task( 'build:data', function(){
    
    var files = [
        './zero/data/*.js'
    ];
    
    return gulp.src( files )
        .pipe( uglify( ) ).on('error', onError )
        .pipe( gulp.dest( output.data )) 
});

gulp.task( 'build:js',['build:tool','build:data']);

gulp.task( 'build:ui', function(){
    
    var files = [ 
        './zero/ui/**/*.js',
        '!./zero/ui/widgets/*.js',
        '!./zero/ui/ui-base.js' 
    ];
    
    return gulp.src( files )
        .pipe( injectDeps({
            lookupMode: 'relative'
         })).on('error', onError )
        .pipe( uglify( ) ).on('error', onError )
        .pipe( gulp.dest( output.ui ) );
});

gulp.task( 'build:img', function(){
    
    return gulp.src( [paths.img, '!./images/page/**/**.*'] )
       .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
       .pipe(gulp.dest(output.img));
});

// copy
gulp.task( 'build:css', function(){
    
    return gulp.src( paths.css )
        .pipe( gulp.dest( output.css ) );
});

gulp.task( 'build:view', function(){
    
    return gulp.src( paths.view )
        .pipe(replace('build/zero.seed.dev.js', 'build/zero.seed.js'))
        .pipe(replace('env: \'dev\'', 'env: \'prd\''))
        .pipe( gulp.dest( output.view ) );
})

gulp.task( 'build', [ 'seed', 'build:css', 'build:img', 'build:ui', 'build:js', 'build:view' ]);

gulp.task( 'server', function(){
    
    browserSync({
        server: true,
        startPath:'/views/index.html',
        notify:false
    }, function(err, bs) {
        console.log(bs.options.getIn(["urls", "local"]));
    });
    
    var reload = browserSync.reload;
    gulp.watch(['**/*.*', '!./css/_scss/**/*.*']).on('change', reload).on('error', onError );
});


gulp.task( 'replace', function(){
    
    return gulp.src( './**/*.html')
//        .pipe(replace('/js/page/common', '/demo/js/page/common'))
        .pipe(replace('/build/zero.seed.js', '/demo/build/zero.seed.js'))
//        .pipe(replace('css/main.css', '/demo/css/main.css'))
//        .pipe(replace('css/page/index.css', '/demo/css/page/index.css'))
        .pipe(gulp.dest('.'));
})

gulp.task( 'default', [ 'watch:sass' ]);