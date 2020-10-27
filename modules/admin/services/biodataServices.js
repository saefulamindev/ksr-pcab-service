const db = require("../../../config/database");

const biodataServices = {
  get: async (req) => {
    const hasil = await db("tb_users")
      .select(
        "tb_peserta.id_user",
        "tb_peserta.nama_lengkap",
        "tb_peserta.fakultas",
        "tb_peserta.prodi",
        "tb_peserta.angkatan"
      )
      .join("tb_peserta", "tb_users.id", "=", "tb_peserta.id_user")
      .where("role", "user");

    return hasil;
  },

  detail: async (data) => {
    // console.log(data);
    const hasil = await db("tb_users")
      .select(
        "tb_peserta.id_user",
        "tb_peserta.file_foto",
        "tb_peserta.nama_lengkap",
        "tb_peserta.noreg",
        "tb_peserta.fakultas",
        "tb_peserta.prodi",
        "tb_peserta.angkatan",
        "tb_peserta.tempat_lahir",
        "tb_peserta.tanggal_lahir",
        "tb_peserta.jenis_kelamin",
        "tb_peserta.alamat_ktp",
        "tb_peserta.alamat_sekarang",
        "tb_peserta.agama",
        "tb_peserta.golongan_darah",
        "tb_peserta.nomor_hp",
        "tb_peserta.nohp_orangdekat",
        "tb_peserta.nama_orangtua",
        "tb_peserta.alamat_orangtua",
        "tb_peserta.nohp_orangtua"
      )
      .join("tb_peserta", "tb_users.id", "=", "tb_peserta.id_user")
      .where({
        role: "user",
        id_user: data,
      });

    return hasil;
  },
};

module.exports = biodataServices;
