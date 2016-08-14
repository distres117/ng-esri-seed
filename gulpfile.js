const browserSync = require('browser-sync'),
    gulp = require('gulp'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    ngAnnotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglify');

gulp.task('serve',['build'], function(){
    browserSync({
        server: {
            baseDir: ['site', 'bower_components', 'library']
        },
        open: true,
        port: 3000,
        notify: false
    })
    gulp.watch(['./site/**/*.html', './site/**/*.js'], ['build', browserSync.reload ]);
});

gulp.task('build', [], function(){
    gulp.src(['./site/app.js', './site/common/**/*.js'])
    .pipe(concat('main.js'))
    .pipe(babel())
    .pipe(ngAnnotate())
    .pipe(gulp.dest('./site'));
})

gulp.task('default', ['serve']);