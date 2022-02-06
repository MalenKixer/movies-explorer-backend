const BadRequestCode = 400;
const NotFoundCode = 404;
const UnauthorizedCode = 401;
const ForbiddenCode = 403;
const ConflictCode = 409;

// const allowOrigins = ['https://domainame.movies.nomoredomains.rocks', 'http://domainame.movies.nomoredomains.rocks'];
const allowMethods = 'GET, HEAD, PUT, PATCH, POST, DELETE';
const allowHeaders = 'Origin, X-Requested-With, Content-Type, Accept';
const corsOptions = {
  origin: ['https://domainame.movies.nomoredomains.rocks', 'http://domainame.movies.nomoredomains.rocks'],
  optionsSuccessStatus: 200,
  methods: allowMethods,
  allowedHeaders: allowHeaders,
  credentials: true,
};

module.exports = {
  BadRequestCode,
  NotFoundCode,
  UnauthorizedCode,
  ForbiddenCode,
  ConflictCode,
  corsOptions,
};
