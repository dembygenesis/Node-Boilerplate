const passport = require('passport');
const userService = require('../../services/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const utils = require('../../utilities');

// Create Local Strategy (customized to expects emails instead of username)
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {
    try {
        const user = await userService.getByEmail(email);

        if (user.length === 0) {
            return done(null, false);
        }

        const hashedPassword = user[0]['password'];
        const passwordValid = await utils.auth.compareHashed(password, hashedPassword);

        if (!passwordValid) {
            return done(null, false);
        } else {
            return done(null, user);
        }
    } catch (e) {
        return done(e, false);
    }
});

// Options
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.SECRET
};

// Create JWT Strategy (login)
const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
    try {

        /**
         * If we want to add an expirey.
         * For now, not yet.
         */

        /*const iat = Math.floor(payload.iat / 1000);
        const now = Math.floor(Date.now() / 1000);

        if (now > iat + 86400) {
            return done(null, { expired: true });
        }*/

        const user = await userService.getById(payload.sub);

        if (user.length > 0) {
            return done(null, user)
        } else {
            return done(null, false)
        }
    } catch(e) {
        return done(e, false)
    }
});

// Tell passport to use this strategy
passport.use(localLogin);
passport.use(jwtLogin);
