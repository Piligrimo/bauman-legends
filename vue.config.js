 const fs = require('fs')

module.exports = {
  publicPath: '/',
  devServer: {
      https: {
      key: fs.readFileSync('./certs/cert-key.pem'),
      cert: fs.readFileSync('./certs/cert.pem'),
    },
     // public: 'https://localhost:8080/'
  }
}