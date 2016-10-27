
var gulp = require('gulp'),
  plugins = require('gulp-load-plugins')({
        rename: {
           // 'gulp-live-server': 'serve'
        }
    });

  var srcc = './src/' ;
  var assets = './assets/';

//plugins will auto load all plugins started with gulp name and add plugin. beforename to load from plugin

// sass = require('gulp-sass'),
// autoprefixer = require('gulp-autoprefixer'),
// cssMin = require('gulp-cssmin'),
// sourcemaps = require('gulp-sourcemaps');*/
// 
// 
// gulp.task('css', function() {
// 
// gulp.src(['./src/sass/main.scss'])
// .pipe(sourcemaps.init())
// .pipe(sass().on('error', sass.logError))
// .pipe(cssMin())
// .pipe(autoprefixer())
// .pipe(sourcemaps.write())
// .pipe(gulp.dest('./dist/css'));
// 
// });



gulp.task('css', function () {


  // for sass

  // return gulp.src([srcc + 'sass/**/*.scss']) // Gets all files ending with .scss
  //   // .pipe(plugins.sourcemaps.init())
  //   .pipe(plugins.sass().on('error', plugins.sass.logError)) //Log the error
  //   .pipe(plugins.cssmin()) //minify css
  //   .pipe(plugins.autoprefixer()) // add cross browser css
  //   .pipe(plugins.concat('style.css')) // merge all files
  //   // .pipe(plugins.sourcemaps.write())
  //   .pipe(gulp.dest(assets +'/css'));
    
// for less
    return gulp.src([srcc + 'less/**/*.less']) // Gets all files ending with .scss
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.plumber())
    .pipe(plugins.less())
        .on('error', function (err) {
            plugins.util.log(err);
            this.emit('end');
        })
    .pipe(plugins.cssmin()) //minify css
    .pipe(plugins.autoprefixer()) // add cross browser css
    .pipe(plugins.concat('style.css')) // merge all files
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest(assets +'/css')).on('error', plugins.util.log);

});


gulp.task('js', function () {
  return gulp.src([srcc +'js/**/*.js'])
    .pipe(plugins.uglify())
    .pipe(plugins.concat('jscript.js'))
    .pipe(gulp.dest(assets +'js'));

});


gulp.task('watch', function () {
    // gulp.watch([srcc + 'sass/*.scss'], ['css']);
    gulp.watch([srcc + 'less/*.less'], ['css']);
    gulp.watch([srcc +'js/*.js'], ['js']);

});
gulp.task('default', ['css', 'js', 'watch'] );


