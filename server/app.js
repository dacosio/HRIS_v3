var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cors = require('cors');
var exphbs  = require('express-handlebars');


//routes folder import
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var departmentsRouter = require('./routes/api/department');
var dependentsRouter = require('./routes/api/dependent');
var emergencyContactsRouter = require('./routes/api/emergency_contact');
var employeesRouter = require('./routes/api/employee');
var leavesRouter = require('./routes/api/leave');
var logsRouter = require('./routes/api/log');
var rolesRouter = require('./routes/api/role');
var undertimeOvertimeRouter = require('./routes/api/undertime_overtime');
var usersRouter = require('./routes/api/user');
var eodsRouter = require('./routes/api/eod');

var app = express();
app.use(cors());

// view engine setup
app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main',
  helpers: {
    ifCond: function(v1, v2, options) {
      if(v1 === v2) {
          return options.fn(this);
      }
      return options.inverse(this);
    }
  }
}));
app.set('view engine', '.hbs');

app.use(cookieParser());


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




//router from routes folder
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/departments',departmentsRouter);
app.use('/api/dependents',dependentsRouter);
app.use('/api/emergency',emergencyContactsRouter);
app.use('/api/employees',employeesRouter);
app.use('/api/leaves',leavesRouter);
app.use('/api/logs',logsRouter);
app.use('/api/roles',rolesRouter);
app.use('/api/time',undertimeOvertimeRouter);
app.use('/api/users',usersRouter);
app.use('/api/eods',eodsRouter);


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
