const path  = require("path");

module.exports = {
  outputDir: path.resolve(__dirname, "../node-vue-api/dist"),
  devServer: {
    proxy: {
       '/api' : {
         target: "http://localhost:3000"
       }
     }
  },
}
