const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
require('dotenv').config();

const app = express();
const limiter = require('./middlewares/rateLimiter');
const centralErrorsHandler = require('./middlewares/centralErrorsHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const allErrorsHandler = require('./middlewares/errorsHandler');

const corsOptions = require('./utils/const');
const allRoutes = require('./routes/index');

const { NODE_ENV, MONGO_SERVER } = process.env;

mongoose.connect(NODE_ENV === 'production' ? MONGO_SERVER : 'mongodb://127.0.0.1:27017/moviesdb');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
app.use(limiter);
app.use(cors(corsOptions));

app.use(requestLogger);

app.use('/', allRoutes);

app.use(errorLogger);
app.use(errors());
app.use(centralErrorsHandler);
process.on('uncaughtException', allErrorsHandler);

module.exports = app;
