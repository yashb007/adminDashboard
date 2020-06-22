const  passport = require('passport')
const  JwtStrategy = require('passport-jwt').Strategy,
       ExtractJwt = require('passport-jwt').ExtractJwt,
       AnonymousStrategy = require('passport-anonymous').Strategy

const Admin = require('../admin/model')
const Config = require('../enviornment/index')

const opts = {
    jwt: {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: Config.auth.jwtSecret,
        passReqToCallback: true
    }
};

module.exports = () => {

    passport.use('admin', new JwtStrategy(opts.jwt, function (req, jwt_payload, done) {
        Admin.findOne({
            where: {
                id: jwt_payload
            }
        })
            .then(u => {
                if (u) {
                    req.admin = true;
                    req.isAdmin = true;
                    done(null, u);
                } else done(null, false);
                return null;
            })
            .catch(e => done(e, false));
    }));
}