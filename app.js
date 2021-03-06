const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const apiRouter = require('./routes/index');
const { errorLogger, requestLogger } = require('./middlewares/logger');
const limiter = require('./config/rateLimiter');
const errorHandler = require('./errors/ErrorHandler');
const { PORT, DB_CONNECT } = require('./config/constatns');
const clientErrorHandler = require('./middlewares/errorHandler');

const app = express();

mongoose.connect(DB_CONNECT);

app.use(express.json());
app.use(requestLogger);
app.use(helmet());
app.use(limiter);

app.use('/api', apiRouter);

app.use(errorLogger);
app.use(clientErrorHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
