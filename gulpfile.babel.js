import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import yargs from 'yargs';
import run from 'run-sequence';

import Config from './gulp-tasks/config';
import Lint from './gulp-tasks/lint';
import Compile from './gulp-tasks/compile';
import Revision from './gulp-tasks/revision';
import Build from './gulp-tasks/build';

const plugins  = gulpLoadPlugins();
const args     = yargs.argv;

process.env.NODE_ENV = args.production ? 'production' : 'debug';
plugins.util.log('NODE_ENV', plugins.util.colors.magenta(process.env.NODE_ENV));

gulp.task('help', plugins.taskListing);
gulp.task('default', ['build:all']);
gulp.task('run', callback => run('default', 'watch', callback));

gulp.task('lint:sass', () => (Lint.sass(plugins)));
gulp.task('lint:js', () => (Lint.js(plugins, process)));

gulp.task('compile:html', () => (Compile.html(plugins)));
gulp.task('compile:sass', () => (Compile.sass(plugins, args)));
gulp.task('compile:js', () => (Compile.js(plugins, args)));

gulp.task('revision:clean', () => (Revision.clean()));
gulp.task('revision:run', () => (Revision.run(plugins)));

gulp.task('build:css', callback => (Build.css(callback)));
gulp.task('build:js', callback => (Build.js(callback)));
gulp.task('build:html', callback => (Build.html(callback)));
gulp.task('build:all', callback => (Build.all(callback)));

gulp.task('watch', () => {
  gulp.watch([`${Config.paths.src.js}/**/*.{js,vue}`], ['build:js']);
  gulp.watch(`${Config.paths.src.sass}/**/*.scss`, ['build:css']);
  gulp.watch(`${Config.paths.src.html}/**/*.html`, ['build:html']);
});
