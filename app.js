const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const NotFoundError = require('./errors/NotFoundError');
const apiRouter = require('./routes/index');
const { errorLogger, requestLogger } = require('./middlewares/logger');
const limiter = require('./config/rateLimiter');
const errorHandler = require('./errors/ErrorHandler');

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

app.use(express.json());
app.use(helmet());
app.use(limiter);

app.use(requestLogger);

app.use('/api', apiRouter);

app.use(() => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

app.use(errorLogger);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
