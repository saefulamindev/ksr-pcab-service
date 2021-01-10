const db = require("../../../config/database");
const pengumumanServices = {
  get: async (all) => {
    const data = await db("tb_pengumuman").select("id", "judul", "deskripsi");
    return data;
  },
  cekAll: (req) => {
    const data = db("tb_pengumuman").select("*").first();
    return data;
  },
};

module.exports = pengumumanServices;
