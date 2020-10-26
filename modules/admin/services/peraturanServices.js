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
  inputPeraturan: (input) => {
    const data = db("tb_peraturan").insert({
      judul: input.judul,
      deskripsi: input.deskripsi,
    });

    return data;
  },
};

module.exports = peraturanServices;
