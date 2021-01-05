const passport = require("passport");
const responseFormatter = require("../responses/responses");

module.exports.reqAuth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    // console.log(user);
    if (!user) {
      return responseFormatter.error(res, null, "Unauthorized", 401);
    } else {
      req.user = user;
      next();
    }
  })(req, res, next);
};
