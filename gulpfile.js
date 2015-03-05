var gulp = require('gulp'),
    shell = require('gulp-shell'),
    livereload = require('gulp-livereload');


//
gulp.task('compass_compile', shell.task([
  'compass compile'
]));


//
gulp.task('watch', function(){
  
  livereload.listen();
  
  gulp.watch('public_html/assets/_scss/**/*.scss', function(event){
    gulp.run('compass_compile');
  });
  
  gulp.watch('public_html/**/*.html').on('change', livereload.changed);
  gulp.watch('public_html/**/*.css').on('change', livereload.changed);
  gulp.watch('public_html/**/*.js').on('change', livereload.changed);
  
});


//
gulp.task('default', ['watch']);

