const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const WP_API = require('./api/api');
const cors = require('cors');

const routes = require('./routes/index');
// const usersRouter = require('./routes/users');
// const companiesRouter = require('./routes/companies');

const app = express();

// enable cors requests
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// pass api variables to templates and response
app.use((req, res, next) => {
  req.api = new WP_API('wp/v2', process.env.WP_URL);
  // res.api = new WP_API();
  next();
});

app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
