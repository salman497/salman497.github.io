const { composePlugins, withNx } = require('@nx/webpack');

module.exports = composePlugins(withNx(), (config) => {
  config.devServer = {
    ...config.devServer,
    static: {
      directory: config.output.path,
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