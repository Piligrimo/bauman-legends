 const fs = require('fs')

 const host = 'local.legends.batalichev.pro'

module.exports = {
    publicPath: '/',
    devServer: {
      https: {
        key: fs.readFileSync('./certs/cert-key.pem'),
        cert: fs.readFileSync('./certs/cert.pem'),
      },
      host
     // public: 'https://localhost:8080/'
  }
}