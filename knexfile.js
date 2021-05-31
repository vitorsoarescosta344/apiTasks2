module.exports = {

    client: 'mysql2',
    connection: {
      host : 'database-2.cfb2fyrhpdpy.us-east-2.rds.amazonaws.com',
      database: 'tasks',
      user: 'admin',
      password: '33333386'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  
  
  };