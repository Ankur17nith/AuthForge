require('dotenv').config();

// const required = ['MONGO_URI', 'JWT_ACCESS_SECRET', 'JWT_REFRESH_SECRET'];
const required = [
  "MONGO_URL",
  "JWT_SECRET",
  "PORT"
];
required.forEach((key) => {
  if (!process.env[key]) throw new Error(`Missing env var: ${key}`);
});

module.exports = {
  port: process.env.PORT || 8000,
  mongoUrl: process.env.MONGO_URL,
  jwtSecret: process.env.JWT_SECRET
//   jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
//   jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
};
