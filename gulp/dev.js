const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const scss = require('gulp-sass')(require('sass'));
const scssGlob = require('gulp-sass-glob'); 
const liveServer = require('gulp-server-livereload');
const clean = require('gulp-clean');
const fileSystem = require('fs');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const webpack = require('webpack-stream');
const babel = require('gulp-babel'); 
const imagemin = require('gulp-imagemin'); 
const changed = require('gulp-changed'); 
const ttf2woff2 = require('gulp-ttf2woff2');
const fontfacegen = require('gulp-fontfacegen');



const serverSetting = {
    livereload: true,
    open: true,
}

const fileIncludeSetting = {
    prefix: '@@',
    basepath: '@file'
};

const plumberNotify = (title) => {
    return {
        errorHandler: notify.onError({
        title,
        message: ' Error <%= error.message %> ',
        sound: false
        }),
    };
}

gulp.task('html:dev', function() {
    return gulp.src(['./src/html/**/*.html', '!./src/html/blocks/*.html'])
        .pipe(changed('./build/', {hasChanged: changed.compareContents}))
        .pipe(plumber(plumberNotify('html')))
        .pipe(fileInclude(fileIncludeSetting))
        .pipe(gulp.dest('./build/')) 
}); 

gulp.task('scss:dev', function(){
    return gulp.src('./src/scss/*.scss')
        .pipe(changed('./build/css/'))
        .pipe(plumber(plumberNotify('scss')))
        .pipe(sourcemaps.init())
        .pipe(scssGlob())
        .pipe(scss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/css'))
});

gulp.task('images:dev', function(){
    return gulp.src('./src/img/**/*')
        .pipe(changed('./build/img/'))
        // .pipe(imagemin({verbose: true}))
        .pipe(gulp.dest('./build/img'))
}); 

gulp.task('fonts:dev', function(){
    return gulp.src('./src/fonts/**/*')
        .pipe(ttf2woff2())
        .pipe(changed('./build/fonts/'))
        .pipe(gulp.dest('./build/fonts'))
        // .pipe(fontfacegen({
        //     filepath: "./src/scss/base/",
        //     filename: "_fonts.scss",
        //  }))
}); 

gulp.task('files:dev', function(){
    return gulp.src('./src/files/**/*')
        .pipe(changed('./build/files/'))
        .pipe(gulp.dest('./build/files'))
}); 

gulp.task('js:dev', function(){
    return gulp.src('./src/js/*.js')
        .pipe(changed('./build/js/'))
        .pipe(plumber(plumberNotify('js')))
        // .pipe(babel())
        .pipe(webpack(require('./../webpack.config.js')))
        .pipe(gulp.dest('./build/js'))
});


gulp.task('server:dev', function(){
    return gulp.src('./build')
        .pipe(liveServer(serverSetting))
});

gulp.task('clean:dev', function(done){
    if(fileSystem.existsSync('./build', {read: false})){
        return gulp.src('./build')
            .pipe(clean());
    }
    done();
});

gulp.task('watch:dev', function(){
    gulp.watch('./src/scss/**/*.scss', gulp.parallel('scss:dev'));
    gulp.watch('./src/**/*.html', gulp.parallel('html:dev'));
    gulp.watch('./src/html/**/*.html', gulp.parallel('html:dev'));
    gulp.watch('./src/img/**/*', gulp.parallel('images:dev'));
    gulp.watch('./src/fonts/**/*', gulp.parallel('fonts:dev'));
    gulp.watch('./src/files/**/*', gulp.parallel('files:dev'));
    gulp.watch('./src/js/**/*.js', gulp.parallel('js:dev'));
});

