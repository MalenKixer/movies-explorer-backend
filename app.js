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

const { MONGO_SERVER } = process.env;

mongoose.connect(MONGO_SERVER);

app.use(requestLogger);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
app.use(limiter);
app.use(cors(corsOptions));

app.use('/', allRoutes);

app.use(errors());
app.use(centralErrorsHandler);
process.on('uncaughtException', allErrorsHandler);
app.use(errorLogger);

module.exports = app;
