module.exports = {
  "/api": {
    target: process.env.BACKEND || "http://localhost:3000",
    changeOrigin: true,
    ws: false
    // pathRewrite: {
    //   "^/api": ""
    // }
  }
};
