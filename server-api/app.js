// var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
const { initializeChatSocket } = require('./messages/messages.socket');

const routes = require('./routes');
const http = require('http');
const port = process.env.PORT || 3001;

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
//app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, authorization, refreshtoken'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE');
    return res.status(200).json({});
  }
  next();
});

routes(app);

//catch 404 and forward to error handler
app.use(function(req, res, next) {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
  // next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  console.error(error);
  res.json({
    error: {
      message: error,
    },
  });
});

server = http.createServer(app);
initializeChatSocket(server);

/**
 * Initialize Socket IO Connection
 */

server.listen(port, '0.0.0.0', () => {
  console.log('\n*** Server started on port %d ***\n', port);
});

module.exports = app;
