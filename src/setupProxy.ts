const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app: any) {
  app.use(
    createProxyMiddleware("/api", {
      target: "https://openapi.naver.com",
      pathRewrite: {
        "^/api": "",
      },
      changeOrigin: true,
    }),
  );
};
