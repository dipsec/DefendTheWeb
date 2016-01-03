var gulp = require("gulp");

module.exports = function() {
    // Include gulp
    var gulp = require('gulp'); 

    // Include Our Plugins
    var jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    mocha = require('gulp-mocha');

    var spawn = require('child_process').spawn,
        node;

    // Lint Task
    gulp.task('lint', function() {
        return gulp.src('src/js/*.js')
            .pipe(jshint())
            .pipe(jshint.reporter('default'));
    });

    // Move CSS
    gulp.task('css', function() {
        return gulp.src('src/css/*.css')
            .pipe(gulp.dest('static/css'));
    });

    // Compile our Sass
    gulp.task('sass', function() {
        var s = sass();
        s.on('error', function() { console.log("Error processing SASS"); this.emit('end'); });

        return gulp.src('src/css/*.scss')
            .pipe(s)
            .pipe(gulp.dest('static/css'));
    });

    // Concatenate & Minify JS - unless filename starts with an underscore
    gulp.task('scripts', function() {
        return gulp.src(['src/js/*.js', '!src/js/_*.js'])
            .pipe(concat('script.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('static/js'));
    });

    // Concatenate & Minify JS - unless filename starts with an underscore
    gulp.task('scriptsStatic', function() {
        return gulp.src(['src/js/_*.js'])
            .pipe(uglify())
            .pipe(rename(function (path) {
                path.basename = path.basename.substring(1) + ".min";
                return path;
              }))
            .pipe(gulp.dest('static/js'));
    });

    // Watch Files For Changes
    gulp.task('watch', function() {
        gulp.watch('src/js/*.js', ['lint', 'scripts', 'scriptsStatic']);
        gulp.watch('src/css/*.scss', ['sass']);
        gulp.watch('src/css/*.css', ['css']);

        gulp.watch(['defend.js', 'routes/*.js', 'views/partials/*.hbs'], ['launch']);
    });

    // Launch server
    gulp.task('launch', function() {
        if (node) node.kill()
        node = spawn('node', ['defend.js'], {stdio: 'inherit'})
        node.on('close', function (code) {
            if (code === 8) {
              gulp.log('Error detected, waiting for changes...');
            }
        });
    })

    // Testing
    gulp.task('test', function () {
        return gulp.src('test/test.js', {read: false})
            .pipe(mocha());
    });
}