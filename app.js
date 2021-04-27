var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var usersWebRouter = require('./routes/usersWeb');
var productosRouter = require('./routes/productos');
var categoriesRouter = require('./routes/categories');
var jwt = require ('jsonwebtoken');
const { token } = require('morgan');

var app = express();

app.set('secretKey', "casaSilvina");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/productos', validateUser, productosRouter);
app.use('/categories', categoriesRouter);
app.use('/usersWeb', usersWebRouter);

function validateUser (req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get("secretKey"), function (err, decoded) {
    if (err) {
      res.json({message: err.message})
    }else {
      console.log(decoded);
      req.body.tokenData = decoded;
      next();
    }
  }); 
}


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
  res.json({code:err.code , msg:err.message});
});

module.exports = app;
