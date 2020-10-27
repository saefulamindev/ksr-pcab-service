const db = require("../../../config/database");
const pengumumanServices = {
  get: async (all) => {
    const data = await db("tb_pengumuman").select("id", "judul", "deskripsi");
    return data;
  },
  getPengumumanById: (id) => {
    const data = db("tb_pengumuman").where("id", id).first();
    return data;
  },
  inputPengumuman: (input) => {
    const data = db("tb_pengumuman").insert({
      judul: input.judul,
      deskripsi: input.deskripsi,
    });
    console.log("cobaa servicess");
    return data;
  },
  updateData: async (req) => {
    const id = req.params.id;
    const judul = req.body.judul;
    const deskripsi = req.body.deskripsi;

    const hasil = await db("tb_pengumuman")
      .update({
        judul: judul,
        deskripsi: deskripsi,
      })
      .where("id", id);
    return hasil;
  },
  deleteData: async (req) => {
    const id = req.params.id;
    const hasil = await db("tb_pengumuman").delete().where("id", id);
    return hasil;
  },
};

module.exports = pengumumanServices;
