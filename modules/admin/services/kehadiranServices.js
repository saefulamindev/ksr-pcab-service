const db = require("../../../config/database");

const kehadiranServices = {
  getAllData: async (req) => {
    const hasil = await db("tb_materi").select("id", "tanggal", "judul_materi");

    return hasil;
  },
};

module.exports = kehadiranServices;
