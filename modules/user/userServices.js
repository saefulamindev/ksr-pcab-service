const db = require("../../config/database");

const UserService = {
  getUserByEmail: (email) => {
    const user = db("tb_users").where("email", email).first();
    return user;
  },
  getUserById: (id) => {
    const user = db("tb_users").where("id", id).first();
    return user;
  },
  createUser: (input) => {
    const user = db("tb_users").insert({
      email: input.email,
      password: input.password,
    });
    return user;
  },
  updateVerified: (id) => {
    const user = db("tb_users").update("isVerified", true).where({ id });
    return user;
  },
};

module.exports = UserService;
