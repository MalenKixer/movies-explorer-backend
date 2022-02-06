const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
require('dotenv').config();
const cors = require('cors');

const allowOrigins = ['https://domainame.movies.nomoredomains.rocks', 'http://domainame.movies.nomoredomains.rocks', 'http://localhost:3000'];
const allowHeaders = 'Origin, X-Requested-With, Content-Type, Accept';

const app = express();
const limiter = require('./middlewares/rateLimiter');
const centralErrorsHandler = require('./middlewares/centralErrorsHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const allErrorsHandler = require('./middlewares/errorsHandler');

const allRoutes = require('./routes/index');

const { NODE_ENV, MONGO_SERVER } = process.env;

mongoose.connect(NODE_ENV === 'production' ? MONGO_SERVER : 'mongodb://127.0.0.1:27017/moviesdb');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
app.use(limiter);
app.use(cors({
  origin(origin, callback) {
    if (allowOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
  allowedHeaders: allowHeaders,
  credentials: true,
}));

app.use(requestLogger);

app.use('/', allRoutes);

app.use(errorLogger);
app.use(errors());
app.use(centralErrorsHandler);
process.on('uncaughtException', allErrorsHandler);

module.exports = app;
