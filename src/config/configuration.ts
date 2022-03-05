export default () => ({
  api: {
    port:
      parseInt(process.env.API_PORT, 10) || 3000,
  },
  db: {
    dbHost: process.env.DATABASE_HOST || 'app-db',
    dbPort:
      parseInt(process.env.DATABASE_PORT, 10) ||
      5432,
  },
});
