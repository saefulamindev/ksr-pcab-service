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
  updatePw: (id, password_baru) => {
    const user = db("tb_users").update("password", password_baru).where({ id });
    return user;
  },
  cekPwLamaById: (id) => {
    const user = db("tb_users").where("id", id).first();
    return user;
  },
  storeToken: (id_user, token) => {
    let now = new Date();
    now.setHours(now.getHours() + 1);

    const insert = db("tb_user_token").insert({
      id_user: id_user,
      access_token: token,
      expires_on: now,
      created_at: new Date()
    });

    return insert;
  }
};

module.exports = UserService;
