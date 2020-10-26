const db = require("../../../config/database");

const biodataServices = {
  get: async (req, res, next) => {
    const hasil = await db("tb_users")
      .select()
      // tb_peserta.nama_lengkap,
      // tb_peserta.fakultas,
      // tb_peserta.prodi,
      // tb_peserta.angkatan

      // .join("tb_users", "tb_peserta.user_id", "=", "users.id")
      .where({
        role: "user",
      });
    return hasil;
  },

  getUserById: async (id) => {
    const user = db("tb_users").where("id", id).first();
    return user;
  },
};

module.exports = biodataServices;
