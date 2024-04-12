var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport=require('passport');
var path = require('path');
const expressSession=require('express-session');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.use(expressSession({
    resave:false,
    saveUninitialized: false,
    secret:"hellohellobyebyesa"
  }));
  app.use(cors({
    origin: 'https://client-6loulzrwe-pratham-poudels-projects.vercel.app'
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  passport.serializeUser(usersRouter.serializeUser());
  passport.deserializeUser(usersRouter.deserializeUser());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
