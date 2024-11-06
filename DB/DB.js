const dotenv=require('dotenv').config();


  const config = {
    user: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
      cryptoCredentialsDetails: {
      minVersion: 'TLSv1'
    },
    trustServerCertificate: true
    },
    port: process.env.DB_PORT,
  }

  module.exports = config