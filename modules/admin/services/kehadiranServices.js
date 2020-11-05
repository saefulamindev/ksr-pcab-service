const db = require("../../../config/database");

const kehadiranServices = {
  getAllData: async (req) => {
    const hasil = await db("tb_materi").select("id", "tanggal", "judul_materi");

    return hasil;
  },
  getCountById: async (id_materi) => {
    const data = await db("tb_kehadiran").count({ jumlah: "id" }).where({
      presensi: "hadir",
      id_materi: id_materi,
    });
    return {
      id_materi: id_materi,
      jumlah: data[0].jumlah,
    };
  },
  getDetailMateri: async (id_materi) => {
    const data = await db
      .select(
        "tb_peserta.id_user",
        // "tb_materi.id",
        "tb_materi.judul_materi",
        "tb_materi.tanggal",
        "tb_peserta.nama_lengkap",
        "tb_kehadiran.presensi"
      )
      .from("tb_kehadiran")
      .leftJoin("tb_peserta", "tb_kehadiran.id_user", "tb_peserta.id_user")
      .leftJoin("tb_materi", "tb_materi.id", "tb_kehadiran.id_materi")
      .where({
        id_materi: id_materi,
      });
    return data;
  },
  updateHadir: async (req) => {
    const { id_user } = req.params;
    const { id_materi, presensi } = req.body;
    console.log(id_user, id_materi, presensi);

    const hasil = await db("tb_kehadiran")
      .update({
        presensi: presensi,
      })
      .where({
        id_materi: id_materi,
        id_user: id_user,
      });
    return hasil;
  },
  getHadirByMateri: async (data) => {
    const { id_user } = data.params;
    const { id_materi } = data.body;

    const hasil = await db
      .select(
        "tb_peserta.id_user",
        "tb_peserta.nama_lengkap",
        "tb_materi.judul_materi",
        "tb_kehadiran.presensi"
      )
      .from("tb_kehadiran")
      .leftJoin("tb_peserta", "tb_kehadiran.id_user", "tb_peserta.id_user")
      .leftJoin("tb_materi", "tb_materi.id", "tb_kehadiran.id_materi")
      .where({
        id_materi: id_materi,
        "tb_peserta.id_user": id_user,
      });

    return hasil;
  },
  getUserAll: async (req) => {
    const hasil = await db
      .select("tb_peserta.id_user", "tb_peserta.nama_lengkap")
      .from("tb_peserta")
      .rightJoin("tb_kehadiran", "tb_kehadiran.id_user", "tb_peserta.id_user")
      .rightJoin("tb_materi", "tb_materi.id", "tb_kehadiran.id_materi")
      .where({
        presensi: "hadir",
      });

    return hasil;
  },
  getCountByUser: async (id_user) => {
    const data = await db("tb_kehadiran")
      .count({ jumlah: "id" })
      .where({
        presensi: "hadir",
      })
      .groupBy("id_user");
    return {
      id_user: id_user,
      jumlah: data[0].jumlah,
    };
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
  updateHadirByMateri: async (req) => {
    const { id_materi } = req.params;
    const { id_user, presensi } = req.body;
    console.log(id_user, id_materi, presensi);

    const hasil = await db("tb_kehadiran")
      .update({
        presensi: presensi,
      })
      .where({
        id_user: id_user,
        id_materi: id_materi,
      });
    return hasil;
  },
  getHadirByUser: async (data) => {
    const { id_materi } = data.params;
    const { id_user } = data.body;

    const hasil = await db
      .select(
        "tb_peserta.id_user",
        "tb_peserta.nama_lengkap",
        "tb_materi.id",
        "tb_materi.judul_materi",
        "tb_kehadiran.presensi"
      )
      .from("tb_kehadiran")
      .leftJoin("tb_peserta", "tb_kehadiran.id_user", "tb_peserta.id_user")
      .leftJoin("tb_materi", "tb_materi.id", "tb_kehadiran.id_materi")
      .where({
        id_materi: id_materi,
        "tb_peserta.id_user": id_user,
      });
    return hasil;
  },
};

module.exports = kehadiranServices;
