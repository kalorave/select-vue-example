module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/assets/styles/main.scss";`
      }
    }
  }
};

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/my-project/'
    : '/'
}
