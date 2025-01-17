export default ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  url: env("PUBLIC_URL", "http://89.104.69.151:1338"),
  cors: {
    origin: env.array("CORS_ORIGIN", ["http://89.104.69.151:3000"]),
  },
  app: {
    keys: env.array("APP_KEYS"),
  },
})
