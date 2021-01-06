const db = require("../../../config/database");

const nilaiServices = {
  // ===============================Nilai Fisik =========================
  getFisikNilai: async (all) => {
    const hasil = await db("tb_users")
      .select(
        "tb_peserta.id_user",
        "tb_peserta.nama_lengkap",
        "tb_peserta.nilai_fisik"
      )
      .join("tb_peserta", "tb_users.id", "=", "tb_peserta.id_user")
      .where({
        role: "user",
        tahap: "4",
      });

    return hasil;
  },
  updateFisikNilai: async (id_user, nilai_fisik) => {
    const hasil = await db("tb_peserta")
      .update({
        nilai_fisik: nilai_fisik,
      })
      .where({ id_user });
    return hasil;
  },
  cekFisik: (id_user) => {
    const data = db("tb_peserta").select("*").where({ id_user }).first();
    return data;
  },
  //================================= Nilai Afektif ============================
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
    const data = db("tb_afektif").where({ id_user }).first();
    return data;
  },
  createAfektifNilai: (id_user, tg_jawab, disiplin, kerjasama) => {
    const data = db("tb_afektif").insert({
      id_user: id_user,
      tg_jawab: tg_jawab,
      disiplin: disiplin,
      kerjasama: kerjasama,
    });

    return data;
  },
  updateAfektifNilai: async (id_user, tg_jawab, disiplin, kerjasama) => {
    const hasil = await db("tb_afektif")
      .update({
        tg_jawab: tg_jawab,
        disiplin: disiplin,
        kerjasama: kerjasama,
      })
      .where({ id_user });
    return hasil;
  },
  deleteAfektifNilai: async (id_user) => {
    const hasil = await db("tb_afektif").delete().where({ id_user });
    return hasil;
  },
  getEssayByJenis: async (jenis_test, id_user) => {
    const result = await db("tb_jawaban_essay")
      .select("id", "jenis_test", "id_user", "jawaban_essay", "skor")
      .where("jenis_test", jenis_test)
      .where("id_user", id_user);
    return result;
  },
  // ==========================Nilai Essay================================
  getEssayByTes: (jenis_tes, id_user) => {
    const data = db("tb_jawaban_essay")
      .select(
        "tb_peserta.nama_lengkap",
        // "tb_jawaban_essay.id_user",
        "tb_jawaban_essay.id",
        "tb_jawaban_essay.jenis_tes",
        "tb_jawaban_essay.id_soal_essay",
        "tb_jawaban_essay.jawaban_essay",
        "tb_jawaban_essay.skor"
      )
      .rightJoin("tb_peserta", "tb_jawaban_essay.id_user", "tb_peserta.id_user")
      .where({
        jenis_tes,
        "tb_peserta.id_user": id_user,
      });
    return data;
  },
  cek: (id) => {
    const data = db("tb_jawaban_essay").select("*").where({ id }).first();
    return data;
  },
  cekEssay: (jenis_tes, id_user) => {
    const data = db("tb_jawaban_essay")
      .select("*")
      .where({ jenis_tes, id_user })
      .first();
    return data;
  },
  getEssayById: (id) => {
    const data = db("tb_jawaban_essay")
      .select("id", "jenis_tes", "id_soal_essay", "jawaban_essay", "skor")
      .where({
        id,
      });
    return data;
  },
  updateEssaySkorById: async (id, skor) => {
    const hasil = await db("tb_jawaban_essay")
      .update({
        skor: skor,
      })
      .where({
        id,
      });
    return hasil;
  },
  // ==============================Nilai Total =========================
  jmlNilaiPG: (id_user, jenis_tes) => {
    const data = db("tb_jawaban_pg")
      .sum({ pg: "skor" })
      .where({
        id_user,
        jenis_tes,
      })
      .first();
    return data;
  },
  jmlNilaiEssay: (id_user, jenis_tes) => {
    const data = db("tb_jawaban_essay")
      .sum({ essay: "skor" })
      .where({
        id_user,
        jenis_tes,
      })
      .first();
    return data;
  },
  cekIdUser: (id_user) => {
    const data = db("tb_peserta").select("*").where({ id_user }).first();
    return data;
  },
  // ==============================Nilai Akhir=============================
  getuser: (id_user) => {
    const data = db
      .select("id_user", "nama_lengkap")
      .from("tb_peserta")
      .where("id_user", id_user);
    return data;
  },
  getNilai: (req) => {
    const data = db("tb_penilaian")
      .select(
        "tb_penilaian.id",
        "tb_peserta.nama_lengkap",
        // "tb_penilaian.id_user",
        "tb_penilaian.jenis_tes",
        "tb_penilaian.nilai"
      )
      .rightJoin("tb_peserta", "tb_penilaian.id_user", "tb_peserta.id_user");
    return data;
  },
  getNilaiById: (id) => {
    const data = db("tb_penilaian")
      .select("id", "id_user", "jenis_tes", "nilai")
      .where({
        id,
      })
      .first();
    return data;
  },
  getNilaiAllById: (id) => {
    const data = db("tb_penilaian")
      .select("id", "id_user", "jenis_tes", "nilai")
      .where({
        id,
      })
      .first();
    return data;
  },
  getNilaiByTes: (jenis_tes) => {
    const data = db("tb_penilaian")
      .select(
        "tb_penilaian.id",
        "tb_penilaian.id_user",
        "tb_peserta.nama_lengkap",
        "tb_penilaian.jenis_tes",
        "tb_penilaian.nilai"
      )
      .rightJoin("tb_peserta", "tb_penilaian.id_user", "tb_peserta.id_user")
      .where("jenis_tes", jenis_tes);
    return data;
  },

  cekNilaiByTes: async (jenis_tes) => {
    const data = await db("tb_penilaian")
      .select("*")
      .where({
        jenis_tes,
      })
      .first();
    return data;
  },
  inputNilai: (id_user, jenis_tes, nilai) => {
    const data = db("tb_penilaian").insert({
      id_user: id_user,
      jenis_tes: jenis_tes,
      nilai: nilai,
    });

    return data;
  },
  cekNilai: async (id_user, jenis_tes) => {
    const data = await db("tb_penilaian")
      .select("*")
      .where({
        id_user,
        jenis_tes,
      })
      .first();
    return data;
  },
  cekUser: async (id_user) => {
    const data = await db("tb_peserta")
      .select("*")
      .where({
        id_user,
      })
      .first();
    return data;
  },
  cekNilaiUser: async (id_user) => {
    const data = await db("tb_penilaian")
      .select("*")
      .where({
        id_user,
      })
      .first();
    return data;
  },
  getNilaiByUser: async (id_user) => {
    const data = db("tb_penilaian")
      .select(
        "tb_penilaian.id",
        "tb_peserta.nama_lengkap",
        // "tb_penilaian.id_user",
        "tb_penilaian.jenis_tes",
        "tb_penilaian.nilai"
      )
      .leftJoin("tb_peserta", "tb_penilaian.id_user", "tb_peserta.id_user")
      .where({
        "tb_penilaian.id_user": id_user,
      });
    return data;
  },
  getNilaiAkhirById: async (id_user) => {
    const data = await db("tb_penilaian")
      .sum({ nilai_total: "nilai" })
      .where({
        id_user,
      })
      .first();
    return data;
  },
  updateNA: async (id_user, nilai_akhir, status) => {
    const hasil = await db("tb_peserta")
      .update({
        nilai_akhir: nilai_akhir,
        status_kelulusan: status,
      })
      .where({
        id_user,
      });
    return hasil;
  },
  getPembagi: async (id_user) => {
    const data = await db("tb_penilaian")
      .count({ pembagi: "id" })
      .where({
        id_user,
      })
      .first();
    return data;
  },
};

module.exports = nilaiServices;
