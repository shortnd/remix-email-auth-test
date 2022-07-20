require("dotenv/config");
/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  cacheDirectory: "./node_modules/.cache/remix",
  ignoredRouteFiles: ["**/.*", "**/*.css", "**/*.test.{js,jsx,ts,tsx}"],
  routes(defineRoutes) {
    return defineRoutes(route => {
      if (process.env.ENABLE_TEST_ROUTES === 'true') {
        return route('__tests/login', '__test_routes__/login.tsx')
      }
    })
  }
};
