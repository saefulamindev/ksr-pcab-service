const db = require("../../../config/database");

const kehadiranServices = {
  getAllData: async (req) => {
    const hasil = await db("tb_materi").select("id", "tanggal", "judul_materi");
    // .first();

    return hasil;
  },
  cek: (id_materi) => {
    const data = db("tb_materi").select("*").where({ id: id_materi }).first();
    return data;
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
        id_materi,
      });
    return data;
  },
  updateHadirByMatUser: async (id_user, id_materi, presensi) => {
    console.log(id_user, id_materi, presensi);

    const hasil = await db("tb_kehadiran")
      .update({
        presensi,
      })
      .where({
        id_materi,
        id_user,
      });
    return hasil;
  },
  getHadirByMateri: async (id_user, id_materi) => {
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
        id_materi,
        "tb_peserta.id_user": id_user,
      })
      .first();

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
  getCountByUser: async () => {
    const data = await db("tb_kehadiran")
      .select("tb_kehadiran.id_user", "tb_peserta.nama_lengkap")
      .count({ jumlah: "tb_kehadiran.id_user" })
      .where({
        presensi: "hadir",
      })
      .join("tb_peserta", "tb_peserta.id_user", "tb_kehadiran.id_user")
      .groupBy("tb_kehadiran.id_user");
    // .debug();
    return data;
  },

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
  updateHadirByUserMateri: async (id_user, id_materi, presensi) => {
    const data = await db("tb_kehadiran")
      .update({
        presensi: presensi,
      })
      .where({
        id_user,
        id_materi,
      });
    return data;
  },
  getHadirByUser: async (data) => {
    const { id_user, id_materi } = data.params;
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
