var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();

gulp.task('watch', function() {
	browserSync.init({
		notify: false,
		server: {
			baseDir: "app",
			index: "index.html"
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