var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var redis = require('redis');
var redisClient = redis.createClient();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var sessionRouter = require('./routes/session');

var app = express();

// my add
app.use(require('connect-history-api-fallback')());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(function(req, res, next){
  console.log('start express 1');
  next();
  
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  store: new RedisStore({ host: 'localhost', port: 6379, client: redisClient,ttl :  260}),
  resave: false,
  saveUninitialized: true,
  secret: 'root'
}));
// app.use(session({
//   store: new RedisStore(/*redis config: host, port 등*/), // 세션 저장소를 레디스 서버로 설정
//   /* 이하 express.session 코드와 동일 */
// }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/session', sessionRouter);

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
  res.status(err.status || 500); c  
  res.render('error');
});

module.exports = app;
