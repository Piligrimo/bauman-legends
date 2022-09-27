 const fs = require('fs')

module.exports = {
  publicPath: '/',
  devServer: {
      https: {
      key: fs.readFileSync('./certs/cert2-key.pem'),
      cert: fs.readFileSync('./certs/cert2.pem'),
    },
     // public: 'https://localhost:8080/'
  }
}