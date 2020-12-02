const db = require("../../../config/database");
const pengumumanServices = {
  get: async (all) => {
    const data = await db("tb_pengumuman").select("id", "judul", "deskripsi");
    return data;
  },
};

module.exports = pengumumanServices;
