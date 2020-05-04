const gulp = require('gulp');
const uglify_js = require('gulp-uglify');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const htmlImport = require('gulp-html-import');
const rename = require("gulp-rename");
const sass = require('gulp-sass');
const clean_css = require('gulp-clean-css');
const prefix = require('gulp-autoprefixer');

gulp.task('build-js', function(){
	return gulp.src('./script/src/**/*.js')
	.pipe(plumber(true))
	.pipe(babel({presets: ['@babel/preset-env']}))
	.pipe(concat('main.min.js'))
	.pipe(uglify_js())
	.pipe(gulp.dest('./script/'));
});

gulp.task('build-css', function(){
	return gulp.src(`./style/src/**/*.scss`)
	.pipe(plumber(true))
	.pipe(sass({outputStyle: 'compressed'}))
	.pipe(clean_css())
	.pipe(prefix())
	.pipe(concat('main.min.css'))
	.pipe(gulp.dest('./style/'));
});

gulp.task('build-html', function () {
	return gulp.src('./template.html')
		.pipe(htmlImport('./html/'))
		.pipe(rename("index.html"))
		.pipe(gulp.dest('./')); 
});

gulp.task('watch', function(done) {
	if (process.argv.includes('--watch')) {
		console.log(`Watching docs directory, press Ctrl+C to exit`);
		gulp.watch(['./style/**/*.scss', './script/**/*.js', './html/**/*.html'], gulp.series('build-js', 'build-css', 'build-html'));
	} else {
		done();
	}
});

gulp.task('default', gulp.series('build-js', 'build-css', 'build-html', 'watch'));