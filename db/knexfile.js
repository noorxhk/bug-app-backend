const config = require('../config.json')

module.exports = {

  development: {
    client: config.database.client,
    connection: {
      database: config.database.databaseName,
      user:     config.database.user,
      password: config.database.password
    },
    pool: {
      min: config.database.pool.min,
      max: config.database.pool.max
    },
    migrations: {
      tableName: config.database.migrations.tableName
    }
  },
};
