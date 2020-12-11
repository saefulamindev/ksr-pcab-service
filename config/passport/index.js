const passport = require("passport");
const UserService = require("../../modules/user/userServices");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      console.log(jwt_payload);
      const user = await UserService.getUserById(jwt_payload.data.id);
      console.log(jwt_payload);

      if (!user) {
        return done(null, false);
      }

      const data = {
        id: user.id,
        email: user.email,
        role: user.role,
        tahap: user.tahap,
      };

      return done(null, data);
    } catch (error) {
      return done(null, error);
    }
  })
);

module.exports = passport.initialize();
