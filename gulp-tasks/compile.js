import gulp from 'gulp';
import vueify from 'vueify';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';
import browserify from 'browserify';
import babelify from 'babelify';
import aliasify from 'aliasify';
import Config from './config';

export default {
  html: plugins => (
    gulp.src(`${Config.paths.src.html}/**/*.html`)
        .pipe(plugins.htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(Config.paths.build.html))
  ),
  sass: (plugins, args) => (
    gulp.src(`${Config.paths.src.sass}/app.scss`)
        .pipe(plugins.plumber())
        .pipe(plugins.if(!args.production, plugins.sourcemaps.init()))
        .pipe(plugins.sass(Config.sass))
        .pipe(plugins.if(!args.production, plugins.sourcemaps.write()))
        .pipe(plugins.rename({ basename: 'app' }))
        .pipe(gulp.dest(Config.paths.build.css))
        .pipe(plugins.if(args.production, plugins.rename({
          basename: 'app',
          suffix:   '.min',
        })))
        .pipe(plugins.if(args.production, plugins.cssnano({
          discardComments: { removeAll: true },
          autoprefixer:    Config.autoprefixer,
        })))
        .pipe(plugins.if(args.production, gulp.dest(Config.paths.build.css)))
  ),
  js: (plugins, args) => {
    const b = browserify({
      entries:       `${Config.paths.src.js}/index.js`,
      debug:         !args.production,
      insertGlobals: true,
    });
    
    const bError = function (err) {
      plugins.util.log(plugins.util.colors.red(`Error (${err.plugin}): ${err.message}`));
      this.emit('end');
    };
  
    return b.transform(babelify)
            .transform(aliasify, Config.browserify.aliasify)
            .transform(vueify, Config.browserify.vueify)
            .bundle().on('error', bError)
            .pipe(source('app.js'))
            .pipe(buffer())
            .pipe(gulp.dest(Config.paths.build.js))
            .pipe(plugins.if(args.production, plugins.rename({ suffix: '.min' })))
            .pipe(plugins.if(args.production, plugins.stripDebug()))
            .pipe(plugins.if(args.production, plugins.uglify()))
            .pipe(plugins.if(args.production, gulp.dest(Config.paths.build.js)))
            .pipe(gulp.dest(Config.paths.build.js));
  },
};
