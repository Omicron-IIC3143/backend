// {
//   "development": {
//     "username": "root",
//     "password": null,
//     "database": "database_development",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   },
//   "test": {
//     "username": "root",
//     "password": null,
//     "database": "database_test",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   },
//   "production": {
//     "username": "root",
//     "password": null,
//     "database": "database_production",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   }
// }

const config = {
  default: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      dialect: process.env.DB_DIALECT || 'postgres',
      database: process.env.DB_NAME,
      host: process.env.DB_HOST || '127.0.0.1',
      port: "5432"
  },
  development: {
      extend: 'default',
      database: process.env.DB_NAME || 'dev',
  },
  test: {
      extend: 'default',
      database: 'test',
  },
  production: {
      extend: 'default',
      use_env_variable: 'DATABASE_URL',
  },
};

Object.keys(config).forEach((configKey) => {
  const configValue = config[configKey];
  if (configValue.extend) {
      config[configKey] = { ...config[configValue.extend], ...configValue };
  }
});

module.exports = config;