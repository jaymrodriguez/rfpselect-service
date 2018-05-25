const WPAPI = require('wpapi');

// const namespace = 'wp/v2';
// const wp = new WPAPI({
//   endpoint: 'http://wp/wp-json',
//   // username: 'randyjp',
//   // password: '123456',
// });

// const registerCustomRoutes = ((api) => {
//   // register company routes
//   wp.companies = api.registerRoute(namespace, '/company/(?P<id>\\d+)');
// })();

// exports.registerAPI = () => {
//   const wp = new WPAPI({
//     endpoint: 'http://wp/wp-json',
//     // username: 'randyjp',
//     // password: '123456',
//   });

//   registerCustomRoutes(wp);
// };

class WP_API {
  constructor(namespace, apiURL) {
    // this.registerRouter = this.registerRouter.bind(this);
    // register api
    this.namespace = namespace;
    this.apiURL = apiURL;

    this.wp = new WPAPI({
      endpoint: apiURL,
      //   username: 'randyjp',
      //   password: '123456',
    });

    this.registerRoutes();
  }

  registerRoutes() {
    this.wp.companies = this.wp.registerRoute(this.namespace, '/company/(?P<id>\\d+)');
    this.wp.locations = this.wp.registerRoute(this.namespace, '/location/(?P<id>\\d+)');
  }
}

module.exports = WP_API;
