const db = require("../../../config/database");

const soalServices = {
  cekAllPG: (req) => {
    const data = db("tb_soal_pg").select("*").first();
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
  createPGsoal: (text_soal, opsi_1, opsi_2, opsi_3, opsi_4, kunci, skor) => {
    const data = db("tb_soal_pg").insert({
      text_soal: text_soal,
      opsi_1: opsi_1,
      opsi_2: opsi_2,
      opsi_3: opsi_3,
      opsi_4: opsi_4,
      kunci: kunci,
      skor: skor,
    });

    return data;
  },
  updatePGsoal: async (
    id,
    text_soal,
    opsi_1,
    opsi_2,
    opsi_3,
    opsi_4,
    kunci,
    skor
  ) => {
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
      .where({
        id,
      });
    return hasil;
  },
  deletePGsoal: async (id) => {
    const hasil = await db("tb_soal_pg").delete().where({
      id,
    });
    return hasil;
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
  updateEssaySoal: async (id, text_soal, skor) => {
    const hasil = await db("tb_soal_essay")
      .update({
        text_soal: text_soal,
        skor: skor,
      })
      .where({
        id,
      });
    return hasil;
  },
  deleteEssaySoal: async (id) => {
    const hasil = await db("tb_soal_essay").delete().where({
      id,
    });
    return hasil;
  },
  cekAllEssay: (req) => {
    const data = db("tb_soal_essay").select("*").first();
    return data;
  },
  cekessay: (id) => {
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
