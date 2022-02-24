const passport = require("passport");
const responseFormatter = require("../responses/responses");
const db = require('../config/database')

const checkToken = (id_user, token) => {
  const availToken = db("tb_user_token").where("access_token", token).where("id_user", id_user).where("expires_on", ">", new Date()).first("id");
  return availToken;
}

module.exports.reqAuth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, async(err, user, info) => {
    // console.log(user);
    let bearer = req.get('Authorization');
    let usedToken = bearer.split(' ')[1];

    let validToken = await checkToken(user.id, usedToken);
    if(!validToken) {
      return responseFormatter.error(res, null, 'Unavailable Token', 401);
    }

    if (!user) {
      return responseFormatter.error(res, null, "Unauthorized", 401);
    } else {
      req.user = user;
      next();
    }
  })(req, res, next);
};