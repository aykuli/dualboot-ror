const path = require('path');

const reactFolder = path.resolve(__dirname, '../../app/javascript/');

module.exports = {
  entry: path.resolve(__dirname, '../../app/javascript/applications.js'),
  resolve: {
    alias: {
      repositories: path.resolve(reactFolder, 'repositories'),
      components: path.resolve(reactFolder, 'components'),
      routes: path.resolve(reactFolder, 'repositories'),
      constants: path.resolve(reactFolder, 'constants'),
      helpers: path.resolve(reactFolder, 'helpers'),
      forms: path.resolve(reactFolder, 'forms'),
    },
  },
};
