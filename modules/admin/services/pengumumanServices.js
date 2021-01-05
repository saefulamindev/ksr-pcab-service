const db = require("../../../config/database");
const pengumumanServices = {
  get: async (all) => {
    const data = await db("tb_pengumuman").select("id", "judul", "deskripsi");
    return data;
  },
  cek: (id) => {
    const data = db("tb_pengumuman").select("*").where({ id }).first();
    return data;
  },
  getPengumumanById: (id) => {
    const data = db("tb_pengumuman").select("*").where({ id }).first();
    return data;
  },
  inputPengumuman: (input) => {
    const data = db("tb_pengumuman").insert({
      judul: input.judul,
      deskripsi: input.deskripsi,
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
