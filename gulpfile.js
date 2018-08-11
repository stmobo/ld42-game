const gulp = require('gulp');
const webpack = require('webpack-stream');

gulp.task('js', function () {
    return gulp.src('js/index.js').pipe(webpack({
        mode: 'development',
        resolve: {
            modules: ['node_modules', 'js']
        },
        output: {
            filename: 'game.bundle.js'
        }
    })).pipe(gulp.dest('dist/js/'));
});

gulp.task('default', ['js']);
