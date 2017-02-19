import run from 'run-sequence';

const rs = (sequences, callback) => {
  run.apply(this, ['revision:clean', sequences, 'revision:run', callback]);
};

export default {
  css: callback => rs(['lint:sass', 'compile:sass'], callback),
  js: callback =>   rs(['lint:js', 'compile:js'], callback),
  html: callback =>   rs(['compile:html'], callback),
  all: callback =>  rs(['lint:js', 'lint:sass', 'compile:js', 'compile:sass', 'compile:html'], callback),
};

