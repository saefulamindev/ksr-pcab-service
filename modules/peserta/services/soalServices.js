const db = require("../../../config/database");

const soalServices = {
  cekAllPG: (req) => {
    const data = db("tb_soal_pg").select("*").first();
    return data;
  },
  cekPG: (id) => {
    const data = db("tb_soal_pg").select("*").where({ id }).first();
    return data;
  },
  getPGsoal: async (all) => {
    const data = await db("tb_soal_pg").select(
      "id",
      "text_soal",
      "opsi_1",
      "opsi_2",
      "opsi_3",
      "opsi_4"
      // "kunci",
      // "skor"
    );
    return data;
  },
  getPGsoalById: (id) => {
    const data = db("tb_soal_pg")
      .select(
        "id",
        "text_soal",
        "opsi_1",
        "opsi_2",
        "opsi_3",
        "opsi_4"
        // "kunci",
        // "skor"
      )
      .where({
        id,
      })
      .first();
    return data;
  },
  cekpg: (id) => {
    const data = db("tb_soal_pg").select("*").where({ id }).first();
    return data;
  },

  //   Soal Essay
  getEssaySoal: async (all) => {
    const data = await db("tb_soal_essay").select("id", "text_soal");
    return data;
  },
  getEssaySoalById: (id) => {
    const data = db("tb_soal_essay").where("id", id).first();
    return data;
  },
  createEssaySoal: (text_soal, skor) => {
    const data = db("tb_soal_essay").insert({
      text_soal: text_soal,
      skor: skor,
    });
    return data;
  },
  cekAllEssay: (req) => {
    const data = db("tb_soal_essay").select("*").first();
    return data;
  },
  cekEssay: (id) => {
    const data = db("tb_soal_essay").select("*").where({ id }).first();
    return data;
  },
  // kirim jawaban pg
  kirimJawabanPG: (id_user, jenis_tes, id_soal_pg, jawaban_pg, skor) => {
    const data = db("tb_jawaban_pg")
      .insert({
        id_user: id_user,
        jenis_tes: jenis_tes,
        id_soal_pg: id_soal_pg,
        jawaban_pg: jawaban_pg,
        skor: skor,
      })
      .where({ id_user });

    return data;
  },
  // kirim jawaban essay
  kirimJawabanEssay: (id_user, jenis_tes, id_soal_essay, jawaban_essay) => {
    const data = db("tb_jawaban_essay")
      .insert({
        id_user: id_user,
        jenis_tes: jenis_tes,
        id_soal_essay: id_soal_essay,
        jawaban_essay: jawaban_essay,
      })
      .where({ id_user });

    return data;
  },
  getJawabanPGById: (id) => {
    const data = db("tb_jawaban_pg").where("id", id).first();
    return data;
  },
  getJawabanEssayById: (id) => {
    const data = db("tb_jawaban_essay").where("id", id).first();
    return data;
  },
  getKunci: (id_soal_pg) => {
    const data = db("tb_soal_pg")
      .select("kunci")
      .where({
        id: id_soal_pg,
      })
      .first();
    return data;
  },
};

module.exports = soalServices;
