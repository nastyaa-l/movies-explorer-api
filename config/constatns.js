const {
  PORT = 3000,
  DB_CONNECT = 'mongodb://localhost:27017/moviesdb',
  JWT_SECRET = 'dev-secret',
} = process.env;

const ERR_CODE = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER: 500,
};

module.exports = {
  PORT, DB_CONNECT, JWT_SECRET, ERR_CODE,
};
