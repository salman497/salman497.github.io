const { composePlugins, withNx } = require('@nx/webpack');
const path = require('path');

module.exports = composePlugins(withNx(), (config) => {
  // Copy HTML files directly to output
  config.module.rules.push({
    test: /\.html$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[name].html',
        },
      },
    ],
    exclude: path.resolve(__dirname, 'src/index.html')
  });

  config.devServer = {
    ...config.devServer,
    static: {
      directory: path.join(__dirname, 'src'),
      watch: {
        ignored: /node_modules/,
        usePolling: true,
      },
    },
    setupMiddlewares: (middlewares, devServer) => {
      devServer.app.use((req, res, next) => {
        if (!req.path.includes('.')) {
          req.url = `${req.url}.html`;
        }
        next();
      });
      return middlewares;
    }
  };

  return config;
});