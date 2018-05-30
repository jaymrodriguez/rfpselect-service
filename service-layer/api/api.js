const WPAPI = require("wpapi");

class WP_API {
  constructor(namespace, apiURL) {
    // this.registerRouter = this.registerRouter.bind(this);
    // register api
    this.namespace = namespace;
    this.apiURL = apiURL;

    this.wp = new WPAPI({
      endpoint: apiURL,
      username: "randyjp",
      password: "123456"
    });

    this.registerRoutes();
  }

  registerRoutes() {
    this.wp.companies = this.wp.registerRoute(
      this.namespace,
      "/company/(?P<id>\\d+)"
    );
    this.wp.locations = this.wp.registerRoute(
      this.namespace,
      "/location/(?P<id>\\d+)",
      {
        params: ["company_id"]
      }
    );
  }
}

module.exports = WP_API;
