const url = require('url');

const BASE_DIR = process.env.NODE_ENV === 'production' ? 'dist' : 'src';
const DB_URL = process.env.DB_URL || 'postgres';

const { protocol, pathname } = url.parse(DB_URL, true);

const config = {
  type: 'postgres',
};

// if (config.type === 'sqlite') {
//   config.database = pathname.slice(1); // remove leading "/"
// } else {
//   config.url = DB_URL;
// }

module.exports = {
  ...config,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  migrationsRun: false,
  dropSchema: false,
  logging: true,
  entities: [`${BASE_DIR}/**/*.entity.{ts,js}`],
  migrations: [`${BASE_DIR}/db/migrations/**/*.{ts,js}`],
  subscribers: [`${BASE_DIR}/db/subscribers/*.{ts,js}`],
  cli: {
    entitiesDir: 'src/db/entities',
    migrationsDir: 'src/db/migrations',
    subscribersDir: 'src/db/subscribers',
  },
};
