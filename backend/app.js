var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var app = express();
var session = require('cookie-session');
var passport = require('passport')

app.use(session({ secret: 'blehgh', cookie: { maxAge: 60 * 60 * 1000, secure: false }, resave: true, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())

// uncomment after placing your favicon in /publi
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Serves static react
app.use(express.static(path.join(__dirname, '../frontend/build')))
//app.use(express.static(path.join(__dirname, '../frontend/public')))
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err)
  res.json({ error: err });
});

module.exports = app;
