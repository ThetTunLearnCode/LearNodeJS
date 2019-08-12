var gulp = require('gulp'),
watch = require('gulp-watch'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvar = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
browserSync = require('browser-sync').create();

gulp.task('tt', function() {
	console.log('This is Gulp File');
});

gulp.task('thettun', function() {
	console.log("This task is name Thet Tun");
});
gulp.task('style', function() {
	return gulp.src('./app/asset/style/main.css')
	.pipe(postcss([cssImport, cssvar, nested, autoprefixer]))
	.pipe(gulp.dest('./app/temp/style'));
});
gulp.task('watch', function() {
	browserSync.init({
    server: {
    baseDir: "app",
    index: "index.htm"
}
});
	watch('./app/index.html', function() {
		browserSync.reload();
	});
	watch('./app/asset/style/**/*.css', function() {
		gulp.start('cssInject');
	});
});
gulp.task('cssInject', ['style'], function() {
	return gulp.src('./app/temp/style/main.css')
	.pipe(browserSync.stream());
});