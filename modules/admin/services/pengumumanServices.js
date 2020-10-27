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
  update: async (req) => {
    const data = {
      judul: req.body.judul,
      deskripsi: req.body.deskripsi,
    };
    const hasil = await db("tb_pengumuman")
      .update({ data }, [id, judul, deskripsi])
      .where("id", id);
    return hasil;
  },
};

module.exports = pengumumanServices;
