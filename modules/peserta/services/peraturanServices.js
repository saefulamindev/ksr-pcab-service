const db = require("../../../config/database");

const peraturanServices = {
  get: async (all) => {
    const data = await db("tb_peraturan").select("id", "judul", "deskripsi");
    return data;
  },
  getPeraturanById: (id) => {
    const data = db("tb_peraturan").where("id", id).first();
    return data;
  },
};

module.exports = peraturanServices;
