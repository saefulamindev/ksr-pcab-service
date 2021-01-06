const db = require("../../../config/database");
const materiController = require("../controller/materiController");

const materiServices = {
  cek: (id) => {
    const data = db("tb_materi").select("*").where({ id }).first();
    return data;
  },
  cekAll: (req) => {
    const data = db("tb_materi").select("*").first();
    return data;
  },
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
  inputMateri: async (judul_materi, deskripsi, diklat, tanggal, link_file) => {
    const data = db("tb_materi").insert({
      judul_materi: judul_materi,
      deskripsi: deskripsi,
      diklat: diklat,
      tanggal: tanggal,
      link_file: link_file,
    });
    return data;
  },
  updateMateri: async (
    id,
    judul_materi,
    deskripsi,
    diklat,
    tanggal,
    link_file
  ) => {
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

  deleteMateri: async (id) => {
    const hasil = await db("tb_materi").delete().where("id", id);
    return hasil;
  },
};

module.exports = materiServices;
