// gulpfile.js
//supervisor -i ./ -x C:\Users\its\AppData\Roaming\npm\electron.cmd ./
var gulp = require('gulp')
var livereload = require('gulp-livereload')
var supervisor = require('gulp-supervisor')
var mocha = require('gulp-mocha')

gulp.task('supervisor', function () {
  supervisor(require('./package.json').scripts.backend, {
    // ignore: [ ".idea", ".git","gulpfile.js"],
    watch: ['backend'],
    exec: 'iojs',
    debug: true,
    noRestartOn: 'error'
  })
})

gulp.task('watch', function () {
  livereload.listen()
  gulp.watch(['frontend/**/*', 'backend/**/*']).on('change', function (filePath) {
    setTimeout(function () {livereload.changed(filePath)}, 1000)
  })
  gulp.watch(['frontend/**/*', 'backend/**/*', 'tests/*_mocha.js'], ['mocha'])
})

gulp.task('mocha', function () {
  gulp.src('tests/*_mocha.js', {read: false})
    .pipe(mocha())
    .on('error', console.log)
})

gulp.task('default', ['mocha', 'watch'])
