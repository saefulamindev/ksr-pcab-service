const db = require("../../../config/database");

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
  getMateriById: async (id) => {
    const data = await db("tb_materi")
      .select(
        "id",
        "judul_materi",
        "deskripsi",
        "diklat",
        "tanggal",
        "link_file"
      )
      .where("id", id)
      .first();
    return data;
  },
};

module.exports = materiServices;
