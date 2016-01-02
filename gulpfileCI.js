// Include gulp
var gulp = require('gulp');

require('./gulp/main.js')();

// Default Task
gulp.task('default', ['lint', 'css', 'sass', 'scripts']);