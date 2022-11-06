const path = require('path');

const reactFolder = path.resolve(__dirname, '../../app/javascript/react/');

module.exports = {
  entry: path.resolve(__dirname, '../../app/javascript/react/applications.js'),
  resolve: {
    alias: {
      components: path.resolve(reactFolder, 'components'),
      constants: path.resolve(reactFolder, 'constants.js'),
      forms: path.resolve(reactFolder, 'forms'),
      helpers: path.resolve(reactFolder, 'helpers'),
      repositories: path.resolve(reactFolder, 'repositories'),
      routes: path.resolve(reactFolder, 'repositories'),
    },
  },
};
