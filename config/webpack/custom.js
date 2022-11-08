const path = require('path');

const reactFolder = path.resolve(__dirname, '../../app/javascript/');

module.exports = {
  resolve: {
    alias: {
      repositories: path.resolve(reactFolder, 'repositories'),
      components: path.resolve(reactFolder, 'components'),
      constants: path.resolve(reactFolder, 'constants'),
      helpers: path.resolve(reactFolder, 'helpers'),
      routes: path.resolve(reactFolder, 'routes'),
      utils: path.resolve(reactFolder, 'utils'),
      forms: path.resolve(reactFolder, 'forms'),
    },
  },
};
