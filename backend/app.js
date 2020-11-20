var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var expressJwt = require('express-jwt');
const secretKey = require('./util/config').secret;

// MongoDB connection
const url = "mongodb+srv://admin:admin@cluster0.ca243.mongodb.net/<eventDB>?retryWrites=true&w=majority";
var mongoose = require('mongoose');

var usersRouter = require('./routes/users');
var eventsRouter = require('./routes/events');
var purchasesRouter = require('./routes/purchases');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));

// Express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Parsers
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Decode jwt token from client. Return 401 error if invalid or not found
app.use(expressJwt({
  secret: secretKey,
  algorithms: [ 'HS256' ]
}).unless({
  // API call that should not be check for token. (Public routes)
  path: [
    '/users/register',
    '/users/login',
    '/events/getEvents',
    '/events/getUpcomingEvents',
    '/events/getEvent',
    '/purchases/getSales'
  ]
})
);

// Default connection to Atlas MongoDB
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

// Route
app.use('/events', eventsRouter);
app.use('/users', usersRouter);
app.use('/purchases', purchasesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
