import { registerAs } from "@nestjs/config";

export default registerAs('config', () => {
  return {
    database: {
      uri: process.env.DATABASE_URI
    },
    jwt: {
      seed: process.env.JWT_KEY,
      caducidad: process.env.JWT_CADUCIDAD
    }
  }
})