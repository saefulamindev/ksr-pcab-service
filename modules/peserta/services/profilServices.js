const db = require("../../../config/database");

const profilServices = {
  getProfil: async (id) => {
    const hasil = await db("tb_users")
      .select(
        "tb_peserta.id_user",
        "tb_peserta.nama_lengkap",
        "tb_peserta.noreg",
        "tb_peserta.fakultas",
        "tb_peserta.prodi",
        "tb_peserta.angkatan",
        "tb_peserta.golongan_darah"
      )
      .join("tb_peserta", "tb_users.id", "=", "tb_peserta.id_user")
      .where({
        role: "user",
        tahap: "4",
        "tb_peserta.id_user": id,
      });
    return hasil;
  },
};

module.exports = profilServices;
