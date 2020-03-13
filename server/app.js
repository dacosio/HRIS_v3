var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var cors = require("cors");
const bearerToken = require("express-bearer-token");
const jwt = require("jwt-simple");
var exphbs = require("express-handlebars");

const authClass = require("./auth")();

//routes folder import
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var departmentsRouter = require("./routes/api/department");
var dependentsRouter = require("./routes/api/dependent");
var emergencyContactsRouter = require("./routes/api/emergency_contact");
var employeesRouter = require("./routes/api/employee");
var leavesRouter = require("./routes/api/leave");
var logsRouter = require("./routes/api/log");
var rolesRouter = require("./routes/api/role");
var undertimeOvertimeRouter = require("./routes/api/undertime_overtime");
var usersRouter = require("./routes/api/user");
var eodsRouter = require("./routes/api/eod");
var applicantsRouter = require("./routes/api/applicant");

var app = express();
app.use(cors({ origin: true }));
// the two middlewares below logs the bearer token from the Authentication Header in the request object. For demo purpose.
// You don't need this because passport jwt strategy will also extract it with the function
// ExtractJwt.fromAuthHeaderAsBearerToken

// this middleware reads the Authentication header and retrieve the bearer token
// then store it to req.bearerToken
app.use(
  bearerToken({
    reqKey: "bearerToken"
  })
);

// custom middleware that logs the bearer token from client
app.use((req, res, next) => {
  if (req.bearerToken) {
    console.log(req.bearerToken);
  }
  next();
});

app.use(authClass.initialize());

// view engine setup
app.engine(
  ".hbs",
  exphbs({
    extname: ".hbs",
    defaultLayout: "main",
    helpers: {
      ifCond: function(v1, v2, options) {
        if (v1 === v2) {
          return options.fn(this);
        }
        return options.inverse(this);
      }
    }
  })
);
app.set("view engine", ".hbs");

app.use(cookieParser());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//router from routes folder
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/departments", departmentsRouter);
app.use("/api/dependents", dependentsRouter);
app.use("/api/emergency", emergencyContactsRouter);
app.use("/api/employees", employeesRouter);
app.use("/api/leaves", leavesRouter);
app.use("/api/logs", logsRouter);
app.use("/api/roles", rolesRouter);
app.use("/api/time", undertimeOvertimeRouter);
app.use("/api/users", usersRouter);
app.use("/api/eods", eodsRouter);
app.use("/api/applicants", applicantsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
