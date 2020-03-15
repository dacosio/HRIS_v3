const passport = require('passport');
const passportJWT = require('passport-jwt');
const config = require('./config');

const EmployeeService = require('./services/employee.service');
const employeeService = new EmployeeService();

module.exports = ()=>{
    const strategy = new passportJWT.Strategy(
    {
        secretOrKey: config.jwtSecret,
        jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken()
    }
    , async (payload,done)=>{
        const emps = await employeeService.get(payload.id);
        if(emps && emps.length > 0) {
            const emp = emps[0];
            if (emp) {
                return done(null, emp);
            }
            else {
                return done(new Error("User not found"), null);
            }
        }
    });
    passport.use(strategy);

    return {
        initialize: function() {
            return passport.initialize();
        },
         authenticate: function() {
             return passport.authenticate("jwt", config.jwtSession);
         }
    };
}
