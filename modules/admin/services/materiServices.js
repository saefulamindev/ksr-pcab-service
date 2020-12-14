const db = require("../../../config/database");
const materiController = require("../controller/materiController");

const materiServices = {
  getMateri: async (req) => {
    const data = await db("tb_materi").select(
      "id",
      "judul_materi",
      "deskripsi",
      "diklat",
      "tanggal",
      "link_file"
    );
    return data;
  },
  getMateriById: (id) => {
    const data = db("tb_materi").where("id", id).first();
    return data;
  },
  inputMateri: async (input) => {
    const data = db("tb_materi").insert({
      judul_materi: input.judul_materi,
      deskripsi: input.deskripsi,
      diklat: input.diklat,
      tanggal: input.tanggal,
      link_file: input.link_file,
    });
    return data;
  },
  updateMateri: async (req) => {
    const id = req.params.id;
    const judul_materi = req.body.judul_materi;
    const deskripsi = req.body.deskripsi;
    const diklat = req.body.diklat;
    const tanggal = req.body.tanggal;
    const link_file = req.body.link_file;

    const hasil = await db("tb_materi")
      .update({
        judul_materi: judul_materi,
        deskripsi: deskripsi,
        diklat: diklat,
        tanggal: tanggal,
        link_file: link_file,
      })
      .where({ id });
    return hasil;
  },

  deleteMateri: async (req) => {
    const id = req.params.id;
    const hasil = await db("tb_materi").delete().where("id", id);
    return hasil;
  },
};

module.exports = materiServices;
