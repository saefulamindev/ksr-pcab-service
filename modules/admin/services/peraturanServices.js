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
  updateData: async (req) => {
    const id = req.params.id;
    const judul = req.body.judul;
    const deskripsi = req.body.deskripsi;

    const hasil = await db("tb_peraturan")
      .update({
        judul: judul,
        deskripsi: deskripsi,
      })
      .where("id", id);
    return hasil;
  },
  deleteData: async (req) => {
    const id = req.params.id;
    const hasil = await db("tb_peraturan").delete().where("id", id);
    return hasil;
  },
};

module.exports = peraturanServices;
