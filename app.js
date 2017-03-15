const express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

const index = require('./routes/index'),
    auth = require('./routes/auth'),
    todo = require('./routes/todo');


const passport = require('passport');
    session = require('express-session');
    LocalStrategy = require('passport-local').Strategy;
    store = require('./session-store'),
    methodOverride = require('method-override'),
    restify = require('express-restify-mongoose');

const Todo = require('./models/todos'),
    User = require('./models/user');


var MongoURI = 'mongodb://pierremrtin:1107061288mlab@ds133279.mlab.com:33279/coen3463-t12'

mongoose.connect(MongoURI, function(err, res) {
    if (err) {
        console.log('Error connecting to ' + MongoURI);
    } else {
        console.log('MongoDB connected!');
    }
});

var app = express();
var router = express.Router();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride());
app.use(router);
app.use(session({
  secret: 'This is a secret',
  cookie: {
    maxAge: 1000 * 60 * 60
  },
  store: store,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
require('./passport-init');

restify.serve(router, Todo);

app.use('/', index);
app.use('/auth', auth);
app.use('/todo', todo);




// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.render('index');
});

// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
