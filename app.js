let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let logger = require('morgan');

let indexRouter = require('./routes/index');
let dashboardRouter = require('./routes/dashboard');
let userRouter = require('./routes/user');
let profileRouter = require('./routes/profile');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session(
    {
      secret: "p@$$w0rd",
      resave: false,
      saveUninitialized: true
    }
));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/dashboard', dashboardRouter);
app.use('/user', userRouter);
app.use('/profile', profileRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
