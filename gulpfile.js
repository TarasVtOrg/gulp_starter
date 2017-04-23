'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');

const BASE_DIR = './src/';

const sassSrc = [
	`${BASE_DIR}sass/*.scss`,
	`${BASE_DIR}sass/*.sass`,
	`${BASE_DIR}sass/**/*.scss`,
	`${BASE_DIR}sass/**/*.sass`
];
const PUBLIC_DIR = './public/';
const OUTPUT_CSS_BUNDLE = 'test.min.css';

gulp.task('sass', () => {
	return gulp.src(sassSrc)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(rename(OUTPUT_CSS_BUNDLE))
		.pipe(gulp.dest(`${PUBLIC_DIR}/stylesheets`))
});
gulp.task('sass_build', () => {
	return gulp.src(sassSrc)
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 10 versions'],
			cascade: false
		}))
		.pipe(rename(OUTPUT_CSS_BUNDLE))
		.pipe(gulp.dest(`${PUBLIC_DIR}/stylesheets`))
});

gulp.task('watch', () => {
	gulp.watch(sassSrc, ['sass'])
		.on('change', event => console.log('File ' + event.path + ' was ' + event.type + ', running tasks...'));
});

gulp.task('default', ['develop']);

gulp.task('develop', ['sass', 'watch']);

gulp.task('build', ['sass_build']);