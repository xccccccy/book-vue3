'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./hooks/index.js');
var version = require('./version.js');
var index = require('./hooks/use-global-config/index.js');

const INSTALLED_KEY = Symbol("INSTALLED_KEY");
const makeInstaller = (components = []) => {
  const install = (app, options) => {
    if (app[INSTALLED_KEY])
      return;
    app[INSTALLED_KEY] = true;
    components.forEach((c) => app.use(c));
    if (options)
      index.provideGlobalConfig(options, app, true);
  };
  return {
    version: version.version,
    install
  };
};

exports.makeInstaller = makeInstaller;
//# sourceMappingURL=make-installer.js.map
