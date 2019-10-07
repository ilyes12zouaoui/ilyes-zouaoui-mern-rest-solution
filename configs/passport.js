const userModel = require("../models/userModel");
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;

const keys = require("./keys_dev");

const passportJwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
  secretOrKey: keys.JWT_SECRET
};

module.exports = passport => {
  passport.use(
    "jwt-load-user",
    new JwtStrategy(passportJwtOptions, async function(jwt_payload, done) {
      const user = await userModel
        .findOne({
          _id: jwt_payload.id
        })
        .exec();

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
  );

  passport.use(
    "jwt-only",
    new JwtStrategy(passportJwtOptions, async function(jwt_payload, done) {
      if (jwt_payload) {
        return done(null, jwt_payload);
      } else {
        return done(null, false);
      }
    })
  );
};
