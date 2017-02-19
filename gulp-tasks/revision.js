import gulp from 'gulp';
import del from 'del';
import path from 'path';
import Config from './config';

export default {
  clean: () => (
    del([
      `${Config.paths.public.css}/*`,
      `${Config.paths.public.js}/*.js`,
      `${Config.paths.public.image}/*.{png,gif,jpg,jpeg}`,
    ], { force: true })
  ),
  run:   plugins => (
    gulp.src(
      `${Config.paths.base.build}/dist/**/*`,
      { base: path.join(process.cwd(), `${Config.paths.base.build}/dist/`) })
        .pipe(plugins.revAll.revision({
          hashLength:          12,
          dontRenameFile:      [/^\/favicon.ico$/g, '.html'],
          dontUpdateReference: ['.html'],
        }))
        .pipe(gulp.dest(`${Config.paths.base.public}`))
        .pipe(plugins.revAll.manifestFile())
        .pipe(gulp.dest(`${Config.paths.base.build}`))
        .pipe(plugins.revAll.versionFile())
        .pipe(gulp.dest(`${Config.paths.base.build}`))
  ),
};
