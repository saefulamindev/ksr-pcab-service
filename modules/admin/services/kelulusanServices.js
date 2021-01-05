const db = require("../../../config/database");

const kelulusanServices = {
  get: async (req) => {
    const hasil = await db("tb_users")
      .select(
        "tb_peserta.id_user",
        "tb_peserta.nama_lengkap",
        "tb_peserta.nilai_akhir",
        "tb_peserta.status_kelulusan"
      )
      .join("tb_peserta", "tb_users.id", "=", "tb_peserta.id_user")
      .where({
        role: "user",
        tahap: "4",
      });

    return hasil;
  },
  cek: (id_user) => {
    const data = db("tb_peserta")
      .select("status_kelulusan")
      .where({ id_user })
      .first();
    return data;
  },
  updateData: async (id_user, status_kelulusan) => {
    const hasil = await db("tb_peserta")
      .update({
        status_kelulusan: status_kelulusan,
      })
      .where({ id_user });
    return hasil;
  },
};

module.exports = kelulusanServices;
