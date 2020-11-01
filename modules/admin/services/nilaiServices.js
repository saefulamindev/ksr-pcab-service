const db = require("../../../config/database");

const nilaiServices = {
  // Nilai Afektif
  getAfektifNilai: async (all) => {
    const data = await db
      .select(
        "tb_peserta.id_user",
        "tb_peserta.nama_lengkap",
        "tb_afektif.tg_jawab",
        "tb_afektif.disiplin",
        "tb_afektif.kerjasama"
      )
      .from("tb_peserta")
      .rightJoin("tb_afektif", "tb_peserta.id_user", "tb_afektif.id_user");
    return data;
  },
  getAfekitfNilaiById: (id) => {
    const data = db("tb_afektif").where("id", id).first();
    return data;
  },
  getAfekitfNilaiByIdUser: (id_user) => {
    const data = db("tb_afektif").where("id_user", id_user).first();
    return data;
  },
  createAfektifNilai: (input) => {
    const data = db("tb_afektif").insert({
      id_user: input.id_user,
      tg_jawab: input.tg_jawab,
      disiplin: input.disiplin,
      kerjasama: input.kerjasama,
    });

    return data;
  },
  updateAfektifNilai: async (req) => {
    const id_user = req.params.id_user;
    const tg_jawab = req.body.tg_jawab;
    const disiplin = req.body.disiplin;
    const kerjasama = req.body.kerjasama;

    const hasil = await db("tb_afektif")
      .update({
        tg_jawab: tg_jawab,
        disiplin: disiplin,
        kerjasama: kerjasama,
      })
      .where("id_user", id_user);
    return hasil;
  },
  deleteAfektifNilai: async (req) => {
    const id_user = req.params.id_user;
    const hasil = await db("tb_afektif").delete().where("id_user", id_user);
    return hasil;
  },
};

module.exports = nilaiServices;
