import gulp from 'gulp';
import Config from './config';

export default {
  sass: plugins => (
    gulp.src([`${Config.paths.src.sass}/**/*.scss`])
        .pipe(plugins.scssLint({
          config: '.scss-lint.yml',
        }))
    ),
  js: (plugins, process) => (
    gulp.src([`${Config.paths.src.js}/**/*.{js,vue}`])
        .pipe(plugins.plumber())
        .pipe(plugins.eslint())
        .pipe(plugins.eslint.format('stylish', process.stdout))
  ),
};
