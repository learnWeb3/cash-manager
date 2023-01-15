export const env = {
  JWT_EXP: process.env.JWT_EXP ? parseInt(process.env.JWT_EXP) : 60 * 60 * 24, // 24 hours exp
  CONTAINER_PORT: process.env.CONTAINER_PORT
    ? parseInt(process.env.CONTAINER_PORT)
    : 4000,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_ISSUER: process.env.JWT_ISSUER || "cash-manager",
  CORS_ALLOWED_ORIGIN: process.env.CORS_ALLOWED_ORIGIN || "*",
  DATABASE_URI: process.env.DATABASE_URI,
  PATH_PREFIX: process.env.PATH_PREFIX || "",
};
