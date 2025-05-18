const withFlowbiteReact = require("flowbite-react/plugin/nextjs");

module.exports = withFlowbiteReact({
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
});