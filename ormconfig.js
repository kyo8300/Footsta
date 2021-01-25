module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: process.env.DB_PASSWORD,
  database: 'footsta2',
  // synchronize: true,
  synchronize: false,
  logging: true,
  entities: ['src/entity/*.ts'],
  migrations: ['src/migration/*.ts'],
  cli: {
    // entitiesDir: 'dist/entity',
    migrationsDir: 'src/migration',
  },
}
