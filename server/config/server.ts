export default ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  url: env('PUBLIC_URL', 'http://localhost:1338'),
  cors: {
  	origin: env.array('CORS_ORIGIN', ['http://localhost:3000'])
  },
  app: {
    keys: env.array("APP_KEYS"),
  },
})
