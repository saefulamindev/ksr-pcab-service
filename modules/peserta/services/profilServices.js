const db = require("../../../config/database");

const profilServices = {
  getProfilById: async (id_user) => {
    const hasil = await db("tb_peserta")
      .select(
        "id_user",
        "nama_lengkap",
        "noreg",
        "fakultas",
        "prodi",
        "angkatan",
        "golongan_darah",
        "file_foto"
      )
      .where({
        id_user,
      });
    return hasil;
  },
  cekProfil: (id_user) => {
    const data = db("tb_peserta").select("*").where({ id_user }).first();
    return data;
  },
};

module.exports = profilServices;
