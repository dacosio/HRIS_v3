const passport = require('passport');
const passportJWT = require('passport-jwt');
const config = require('./config');

const ExtractJwt = passportJWT.ExtractJwt;
const UserService = require('./services/user.service');

const userService = new UserService();

module.exports = ()=>{
    const strategy = new passportJWT.Strategy({
        secretOrKey: config.jwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },(payload,done)=>{

// Logic here reads from a JSON, in a real application you will read from a database
    userService
        .get(payload.id)
        .then(users => {
            if(users && users.length > 0) {
                const user = users[0];
                if (user) {
                    return done(null, user);
                }
                else {
                    return done(new Error("User not found"), null);
                }
            }
        });
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