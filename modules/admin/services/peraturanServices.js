const db = require("../../../config/database");
const peraturanServices = {
  get: async (all) => {
    const data = await db("tb_peraturan").select("id", "judul", "deskripsi");
    return data;
  },
  getPeraturanById: (id) => {
    const data = db("tb_peraturan").select("*").where("id", id).first();
    return data;
  },
  inputPeraturan: (judul, deskripsi) => {
    const data = db("tb_peraturan").insert({
      judul: judul,
      deskripsi: deskripsi,
    });

    return data;
  },
  updateData: async (id, judul, deskripsi) => {
    const hasil = await db("tb_peraturan")
      .update({
        judul: judul,
        deskripsi: deskripsi,
      })
      .where({
        id,
      });
    return hasil;
  },
  deleteData: async (id) => {
    const hasil = await db("tb_peraturan").delete().where("id", id);
    return hasil;
  },
};

module.exports = peraturanServices;
