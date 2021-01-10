const db = require("../../../config/database");

const peraturanServices = {
  get: async (all) => {
    const data = await db("tb_peraturan").select("id", "judul", "deskripsi");
    return data;
  },
  cekAll: (req) => {
    const data = db("tb_peraturan").select("*").first();
    return data;
  },
};

module.exports = peraturanServices;
