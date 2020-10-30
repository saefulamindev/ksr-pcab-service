const db = require("../../../config/database");

const soalServices = {
  getPGsoal: async (all) => {
    const data = await db("tb_soal_pg").select(
      "id",
      "text_soal",
      "opsi_1",
      "opsi_2",
      "opsi_3",
      "opsi_4",
      "kunci",
      "skor"
    );
    return data;
  },
  getPGsoalById: (id) => {
    const data = db("tb_soal_pg").where("id", id).first();
    return data;
  },
  createPGsoal: (input) => {
    const data = db("tb_soal_pg").insert({
      text_soal: input.text_soal,
      opsi_1: input.opsi_1,
      opsi_2: input.opsi_2,
      opsi_3: input.opsi_3,
      opsi_4: input.opsi_4,
      kunci: input.kunci,
      skor: input.skor,
    });

    return data;
  },
  updatePGsoal: async (req) => {
    const id = req.params.id;
    const text_soal = req.body.text_soal;
    const opsi_1 = req.body.opsi_1;
    const opsi_2 = req.body.opsi_2;
    const opsi_3 = req.body.opsi_3;
    const opsi_4 = req.body.opsi_4;
    const kunci = req.body.kunci;
    const skor = req.body.skor;

    const hasil = await db("tb_soal_pg")
      .update({
        text_soal: text_soal,
        opsi_1: opsi_1,
        opsi_2: opsi_2,
        opsi_3: opsi_3,
        opsi_4: opsi_4,
        kunci: kunci,
        skor: skor,
      })
      .where("id", id);
    return hasil;
  },
  deletePGsoal: async (req) => {
    const id = req.params.id;
    const hasil = await db("tb_soal_pg").delete().where("id", id);
    return hasil;
  },

  //   Soal Essay
  getEssaySoal: async (all) => {
    const data = await db("tb_soal_essay").select("id", "text_soal", "skor");
    return data;
  },
  getEssaySoalById: (id) => {
    const data = db("tb_soal_essay").where("id", id).first();
    return data;
  },
  createEssaySoal: (input) => {
    const data = db("tb_soal_essay").insert({
      text_soal: input.text_soal,
      skor: input.skor,
    });

    return data;
  },
  updateEssaySoal: async (req) => {
    const id = req.params.id;
    const text_soal = req.body.text_soal;
    const skor = req.body.skor;

    const hasil = await db("tb_soal_essay")
      .update({
        text_soal: text_soal,
        skor: skor,
      })
      .where("id", id);
    return hasil;
  },
  deleteEssaySoal: async (req) => {
    const id = req.params.id;
    const hasil = await db("tb_soal_essay").delete().where("id", id);
    return hasil;
  },
};

module.exports = soalServices;
