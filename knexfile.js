var dotenv = require('dotenv');

dotenv.config()

module.exports = {
  development: {
  client: 'postgresql',
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB,
    user:     process.env.DB_USER,
    password: process.env.DB_PASSWORD
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'migrations'
  }
},
production: {
  client: 'postgresql',
  connection: process.env.DATABASE_URL,
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'migrations'
  }
}
};