const { composePlugins, withNx } = require('@nx/webpack');

module.exports = composePlugins(withNx(), (config) => {
  config.devServer = {
    ...config.devServer,
    static: {
      directory: config.output.path,
    },
    watchFiles: {
      paths: ['src/**/*.html'], // adjust the path according to your project structure
      options: {
        usePolling: false,
      },
    },
    hot: true,
    liveReload: true,
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