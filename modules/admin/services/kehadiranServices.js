const db = require("../../../config/database");

const kehadiranServices = {
  getAllData: async (req) => {
    const hasil = await db("tb_materi").select("id", "tanggal", "judul_materi");

    return hasil;
  },
  getCountById: async (id_materi) => {
    // console.log("cobaa");
    // const id_materi = req.params.id_materi;
    const data = await db("tb_kehadiran").count({ jumlah: "id" }).where({
      presensi: "hadir",
      id_materi: id_materi,
    });
    return {
      id_materi: id_materi,
      jumlah: data[0].jumlah,
    };
  },
};

module.exports = kehadiranServices;
