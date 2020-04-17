const sass = require('gulp-sass');
const browserify = require('browserify');
const { watch, series, src, dest } = require('gulp');
const source = require('vinyl-source-stream');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

function jsHandle (cb) {
    browserify('./src/index.js').bundle()
        .pipe(source('index.js'))
        .pipe(dest('dest', { overwrite: true }))
        .pipe(browserSync.stream());

    cb();
}

function htmlHandle (cb) {
    src('src/*.html')
        .pipe(dest('dest', { overwrite: true }))
        .pipe(browserSync.stream());

    cb();
}

function cssHandle (cb) {
    src('src/*.scss')
        .pipe(sass())
        .pipe(concat('styles.css'))
        .pipe(dest('dest'))
        .pipe(browserSync.stream());

    cb();
}

const watchOptions = {
    events: 'all',
    ignoreInitial: false,
}

function watchFiles() {
    browserSync.init({
        server: {
            baseDir: 'dest',
            index: 'index.html'
        }
    })
    watch(
        'src/**/*.js',
        watchOptions,
        jsHandle,
    ).on('change', browserSync.reload);
    watch(
        'src/*.html',
        watchOptions,
        htmlHandle,
    ).on('change', browserSync.reload);
    watch(
        'src/*.scss',
        watchOptions,
        cssHandle,
    ).on('change', browserSync.reload);
}

exports.build = series(htmlHandle, cssHandle, jsHandle);
exports.watch = watchFiles;
exports.default = exports.build;