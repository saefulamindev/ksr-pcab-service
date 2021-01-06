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
  getPengumumanById: (id) => {
    const data = db("tb_pengumuman").select("*").where({ id }).first();
    return data;
  },
  inputPengumuman: (judul, deskripsi) => {
    const data = db("tb_pengumuman").insert({
      judul: judul,
      deskripsi: deskripsi,
    });
    return data;
  },
  updateData: async (id, judul, deskripsi) => {
    const hasil = await db("tb_pengumuman")
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
    const hasil = await db("tb_pengumuman").delete().where({
      id,
    });
    return hasil;
  },
};

module.exports = pengumumanServices;
