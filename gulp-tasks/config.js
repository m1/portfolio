const config = {
  autoprefixer: {
    browsers: ['last 2 versions'],
  },
  sass:         {
    precision: 10,
    includePaths: [
      './node_modules/reset-css',
      './node_modules/sass-material-colors/sass',
    ],
  },
  paths:        {
    base: {
      build:  'build',
      public: 'public',
      src:    'src',
    },
  },
};

config.paths.build = {
  css:   `${config.paths.base.build}/dist/assets/css`,
  font:  `${config.paths.base.build}/dist/assets/font`,
  image: `${config.paths.base.build}/dist/assets/image`,
  js:    `${config.paths.base.build}/dist/assets/js`,
  html:  `${config.paths.base.build}/dist`,
};

config.paths.public = {
  css:   `${config.paths.base.public}/assets/css`,
  font:  `${config.paths.base.public}/assets/font`,
  image: `${config.paths.base.public}/assets/image`,
  js:    `${config.paths.base.public}/assets/js`,
};

config.paths.src = {
  sass:  `${config.paths.base.src}/sass`,
  font:  `${config.paths.base.src}/font`,
  image: `${config.paths.base.src}/image`,
  js:    `${config.paths.base.src}/js`,
  html:  `${config.paths.base.src}/html`,
};

config.browserify = {
  vueify:   {
    autoprefixer: config.autoprefixer,
    sass:         config.sass,
  },
  aliasify: {
    aliases: {
      vue: 'vue/dist/vue',
    },
    verbose: false,
  },
};

export { config as default };
