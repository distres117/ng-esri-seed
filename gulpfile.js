const browserSync = require('browser-sync'),
    gulp = require('gulp'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    ngAnnotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglify'),
    runSeq = require('run-sequence'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify');

gulp.task('serve',['build'], function(){
    browserSync({
        server: {
            baseDir: ['site', 'bower_components', 'library']
        },
        browser: 'chrome',
        open: true,
        port: 3000,
        notify: false
    })
    gulp.watch(['./site/app/**/*.html', './site/app/**/*.js', './site/scss/**/*.scss'], ['build', browserSync.reload ]);
});

gulp.task('build',function(){
    runSeq(['compileJS', 'buildCSS']);
});

gulp.task('compileJS', [], function(){
    gulp.src(['./site/app.js', './site/app/**/*.js', './site/app/**/**/*.js'])
    .pipe(concat('main.js'))
    .pipe(babel())
    .pipe(ngAnnotate())
    .pipe(gulp.dest('./site'));
});

gulp.task('compileCSS', function() {
    return gulp.src('./site/scss/**/*.css')
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./css'))
});

gulp.task('buildCSS', function () {
    var sassCompilation = sass();
    sassCompilation.on('error', console.error.bind(console));

    return gulp.src('./site/scss/main.scss')
        .pipe(plumber({
            errorHandler: notify.onError('SASS processing failed! Check your gulp process.')
        }))
        .pipe(sassCompilation)
        .pipe(rename('style.css'))
        .pipe(gulp.dest('./site/css'))
});

gulp.task('default', function(){
    gulp.start('serve');
});