var gulp = require('gulp');
var sass = require('gulp-sass');
var coffee = require('gulp-coffee');
var ejs = require('gulp-ejs');
var uglify = require('gulp-uglify');
var cleanCss = require('gulp-clean-css');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var cache = require('gulp-cached');
var changed = require('gulp-changed');
var rename = require('gulp-rename');
var gulpif = require('gulp-if');
var minimist = require('minimist');
var del = require('del');
var browserSync = require('browser-sync').create();
var destDir = './dist/';
var prodDir = './htdocs/';
var options = minimist(process.argv.slice(2), config);
var config = {
	string: 'env',
	default: { env: process.env.NODE_ENV || 'dev'}
}
var isProd = (options.env === 'prod') ? true : false;
console.log('[build env]', options.env, '[isProd]', isProd);

gulp.task('browser-sync', function(){
	browserSync.init({
		server: {
			baseDir: destDir
		}
	});
});

gulp.task('sass', function() {
  return gulp.src(['src/pc/styles/**/*.scss', '!src/pc/styles/mixin/*.scss'])
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(sass( {
      outputStyle: 'expanded'
    }))
		.pipe(rename(function (path) {
			path.dirname = 'css'
		}))
		.pipe(gulpif(isProd, cleanCss()))
    .pipe(gulpif(!isProd, gulp.dest(destDir)))
		.pipe(gulpif(isProd, gulp.dest(prodDir)))
});


gulp.task('js', function() {
  return gulp.src(['src/pc/js/**/*.js'])
		.pipe(gulpif(!isProd, changed(destDir + 'js/')))
		.pipe(gulpif(isProd, changed(prodDir + 'js/')))
		.pipe(gulpif(isProd, uglify({
        output:{
          comments: /^\/* /
        }
      })))
		.pipe(gulpif(!isProd, gulp.dest(destDir + 'js/')))
		.pipe(gulpif(isProd, gulp.dest(prodDir + 'js/')))
});

gulp.task('coffee', function() {
	return gulp.src(['src/pc/js/**/*.coffee'])
		.pipe(plumber({
			errorHandler: notify.onError('Error: <%= error.message %>')
		}))
		.pipe(coffee())
		.pipe(gulpif(!isProd, changed(destDir + 'js/')))
		.pipe(gulpif(isProd, changed(prodDir + 'js/')))
		.pipe(gulpif(isProd, uglify()))
		.pipe(gulpif(!isProd, gulp.dest(destDir)))
		.pipe(gulpif(isProd, gulp.dest(prodDir + 'js/')))
});

gulp.task('ejs', function() {
	return gulp.src(['src/pc/templates/pages/**/*.ejs', '!src/pc/templates/**/_*.ejs'])
		.pipe(plumber({
			errorHandler: notify.onError('Error: <%= error.message %>')
		}))
		.pipe(changed('./dist/'))
		.pipe(ejs({}, {ext: '.html'}))
		.pipe(gulpif(!isProd, gulp.dest(destDir)))
		.pipe(gulpif(isProd, gulp.dest(prodDir)))
})


gulp.task('images', function() {
	return gulp.src(['src/pc/images/**/'])
	.pipe(changed(destDir + 'images/'))
	.pipe(gulpif(!isProd, gulp.dest(destDir + 'images/')))
	.pipe(gulpif(isProd, gulp.dest(prodDir + 'images/')))
});


gulp.task('bs-reload', function(){
	browserSync.reload();
});

gulp.task('clean', del.bind(null, prodDir));

gulp.task('build', ['sass', 'js', 'coffee', 'ejs', 'images'], function() {
});

gulp.task('default', ['browser-sync', 'sass', 'js', 'coffee', 'ejs', 'images'], function() {
  watch(['src/pc/styles/**/*.scss'], function() {
    gulp.start(['sass','bs-reload']);
  });
  watch(['src/pc/js/**/*.js'], function() {
    gulp.start(['js', 'bs-reload']);
  });
	watch(['src/pc/js/**/*.coffee'], function() {
    gulp.start(['coffee', 'bs-reload']);
  });
  watch(['src/pc/**/*.ejs'], function() {
    gulp.start(['ejs', 'bs-reload']);
  });
	watch(['src/pc/images/**/*'], function() {
    gulp.start(['images', 'bs-reload']);
  });
});
