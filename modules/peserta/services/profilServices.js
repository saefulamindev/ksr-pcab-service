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
};

module.exports = profilServices;
