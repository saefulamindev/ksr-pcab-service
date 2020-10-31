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
  updateData: async (req) => {
    const id_user = req.params.id_user;
    const nilai_akhir = req.body.nilai_akhir;
    const status_kelulusan = req.body.status_kelulusan;

    const hasil = await db("tb_peserta")
      .update({
        nilai_akhir: nilai_akhir,
        status_kelulusan: status_kelulusan,
      })
      .where("id", id_user);
    return hasil;
  },
};

module.exports = kelulusanServices;
