const db = require("../../../config/database");

const kehadiranServices = {
  cek: async (id_user) => {
    const data = await db
      .select("*")
      .from("tb_kehadiran")
      .leftJoin("tb_peserta", "tb_kehadiran.id_user", "tb_peserta.id_user")
      .leftJoin("tb_materi", "tb_materi.id", "tb_kehadiran.id_materi")
      .where("tb_kehadiran.id_user", id_user)
      .first();
    return data;
  },
  getDetailUserById: async (id_user) => {
    const data = await db
      .select(
        "tb_peserta.id_user",
        "tb_peserta.nama_lengkap",
        "tb_peserta.prodi",
        "tb_peserta.angkatan",
        "tb_materi.id",
        "tb_materi.judul_materi",
        "tb_materi.tanggal",
        "tb_kehadiran.presensi"
      )
      .from("tb_kehadiran")
      .leftJoin("tb_peserta", "tb_kehadiran.id_user", "tb_peserta.id_user")
      .leftJoin("tb_materi", "tb_materi.id", "tb_kehadiran.id_materi")
      .where("tb_kehadiran.id_user", id_user);
    return data;
  },
};

module.exports = kehadiranServices;
