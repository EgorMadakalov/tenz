const gulp = require('gulp');


const fileInclude = require('gulp-file-include');
const htmlclean = require('gulp-htmlclean');

const csso = require('gulp-csso');
const scss = require('gulp-sass')(require('sass'));
const scssGlob = require('gulp-sass-glob'); 
const autoprefixer = require('gulp-autoprefixer');
const groupMedia = require('gulp-group-css-media-queries');
const sourcemaps = require('gulp-sourcemaps');

const webp = require('gulp-webp');
const webpHTML = require('gulp-webp-html');
const webpCss = require('gulp-webp-css');
const imagemin = require('gulp-imagemin'); 

const clean = require('gulp-clean');
const babel = require('gulp-babel'); 
const changed = require('gulp-changed'); 
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const webpack = require('webpack-stream');
const liveServer = require('gulp-server-livereload');
const fileSystem = require('fs');


const ttf2woff2 = require('gulp-ttf2woff2');




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

gulp.task('html:docs', function() {
    return gulp.src(['./src/html/**/*.html', '!./src/html/blocks/*.html'])
        .pipe(changed('./docs/'))
        .pipe(plumber(plumberNotify('HTML')))
        .pipe(fileInclude(fileIncludeSetting))
        .pipe(webpHTML())
        .pipe(htmlclean())
        .pipe(gulp.dest('./docs/')) 
}); 

gulp.task('scss:docs', function(){
    return gulp.src('./src/scss/*.scss')
        .pipe(changed('./docs/css/'))
        .pipe(plumber(plumberNotify('SCSS')))
        .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        .pipe(scssGlob())
        .pipe(webpCss())
        .pipe(groupMedia())
        .pipe(scss())
        // .pipe(sourcemaps.write())
        .pipe(csso())
        .pipe(gulp.dest('./docs/css'))
});

gulp.task('images:docs', function(){
    return gulp.src('./src/img/**/*')
        .pipe(changed('./docs/img/'))
        .pipe(webp())
        .pipe(gulp.dest('./docs/img'))

        .pipe(gulp.src('./src/img/**/*'))
        .pipe(changed('./docs/img/'))
        .pipe(imagemin({verbose: true}))
        .pipe(gulp.dest('./docs/img'))
}); 

gulp.task('fonts:docs', function(){
    return gulp.src('./src/fonts/**/*')
        .pipe(ttf2woff2())
        .pipe(changed('./docs/fonts/'))
        .pipe(gulp.dest('./docs/fonts'))
}); 

gulp.task('files:docs', function(){
    return gulp.src('./src/files/**/*')
        .pipe(changed('./docs/files/'))
        .pipe(gulp.dest('./docs/files'))
}); 

gulp.task('js:docs', function(){
    return gulp.src('./src/js/*.js')
        .pipe(changed('./docs/js/'))
        .pipe(plumber(plumberNotify('js')))
        .pipe(babel())
        .pipe(webpack(require('../webpack.config.js')))
        .pipe(gulp.dest('./docs/js'))
});


gulp.task('server:docs', function(){
    return gulp.src('./docs')
        .pipe(liveServer(serverSetting))
});

gulp.task('clean:docs', function(done){
    if(fileSystem.existsSync('./docs', {read: false})){
        return gulp.src('./docs')
            .pipe(clean());
    }
    done();
});


