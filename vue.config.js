module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/styles/_var.scss";'
      }
    }
  }
};
