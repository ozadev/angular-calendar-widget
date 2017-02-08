var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var tinypng = require('gulp-tinypng-compress');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var ngmin = require('gulp-ngmin');


gulp.task('sass', function () {
  return gulp.src(['./scss/variables.scss', './scss/mixin.scss',  './scss/style.scss', './app/**/*.scss', '!./node_modules/**/*.scss'])
      .pipe(concat("style.css"))
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
          browsers: ['last 16 versions'],
          cascade: false
        }))
      .pipe(gulp.dest('./../public/assets/css/'));
});

gulp.task('sass-min', function () {
    return gulp.src(['./scss/variables.scss', './scss/mixin.scss',  './scss/style.scss', './app/**/*.scss', '!./node_modules/**/*.scss'])
        .pipe(concat("style.min.css"))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 16 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./../public/assets/css/'));
});

gulp.task('build', function () {
    return gulp.src(['./app/**/*.module.js', './app/**/*.js'])
        .pipe(concat('build.js'))
        .pipe(gulp.dest('./../public/app/'));
});

gulp.task('compress', function () {
    return gulp.src(['./app/**/*.module.js', './app/**/*.js'])
        .pipe(concat('build.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./../public/app/'));
});

gulp.task('template', function () {
   return gulp.src(['./app/**/*.html'], {base:"./app"})
       .pipe(gulp.dest('./../public/app/'));
});

gulp.src(['input/folder/**/*']).pipe(gulp.dest('output/folder'));

gulp.task('watch', function () {
    gulp.watch(['./**/*.scss', '!./node_modules/**/*.scss'], ['sass']);
    gulp.watch(['./app/**/*.js'], ['build']);
    gulp.watch(['./app/**/*.html'], ['template']);
});

gulp.task('default', ['sass', 'build', 'template', 'watch']);